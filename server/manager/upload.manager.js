const ResponseUtil = require('../utils/response.util');

const uploadImages = async function (request, res) {
    try {
        let imagesExits = await require('../models/images.model').findOne()
        let files = [];
        let pushFiles = [];
        let fileSize = []
        // if (request.files.length > 0) {
        //     for (let i = 0; i <= request.files.length - 1; i++) {
        //         let fsize = request.files[i].size;
        //         let file = Math.round((fsize / 1024));
        //         if (file >= 2048) {
        //             fileSize.push(request.files[i])
        //             return ResponseUtil.success({ code: 500, message: "File too Big, please select a file less than 2mb" })
        //         }
        //     }
        // }
        // console.log(fileSize);
        

        if (request.files.length >= 4) {

            request.files.forEach(async (f, i) => {

                let obj = {
                    local: f.path,
                    remote: 'images/' + f.originalname,
                    path: 'images/' + f.originalname,
                    mimetype: f.mimetype
                }

                files.push(obj);
            });
            await require("../utils/upload").uploadFiles(files);
            files.forEach((f) => {
                pushFiles.push({ path: f.path, uploadedOn: new Date() });
            });
            if (imagesExits && imagesExits._id) {
                await require('../models/images.model').updateOne({ _id: imagesExits._id }, { $push: { 'images': pushFiles } })
            } else {
                await require('../models/images.model')({ 'images': pushFiles }).save();
            }
            return ResponseUtil.success({ code: 200, message: "Image Save SuccessFully" })

        } else {
            return ResponseUtil.success({ code: 500, message: "Please upload more than 4 file" })
        }

    } catch (error) {
        console.log(error);
        if (error.code == 'NetworkingError')
            return ResponseUtil.error(201, {});
    }
}


const showImages = async function (body, userId) {
    try {
        let path = body.path;
        /**
         * Getting Path with AwsBaseUrl
         * so removing the first url and getting the path
         */
        path = path.split('/').splice(3).join('/');

        /**
         * Downloading here the file via Upload Util
         */
        let file = await require("../utils/upload").downloadFile(path);
        /**
         * After file receives make it encoded string and send to client
         */
        return ResponseUtil.success(file.Body.toString('base64'));
    } catch (error) {
        if (error.code == 'NoSuchKey' )
            return ResponseUtil.error(201, {});
    }
}

const fetchImageList = async function (body, userId) {
    try {
        let images = await require('../models/images.model').findOne()

        return ResponseUtil.success(images);
    } catch (error) {
        Logger.log('fetchImageList', error, userId);
    }
}

module.exports = {
    uploadImages,
    fetchImageList,
    showImages
}