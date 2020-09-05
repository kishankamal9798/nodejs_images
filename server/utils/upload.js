// Import------------------------------------------------------------------------------------------
const S3Config = require('../config/aws.config')
const S3FS = require('s3fs')
const S3Store = new S3FS(S3Config.bucketName, S3Config.credentials)
const fs = require('fs');
//END----------------------------------------------------------------------------------------------


/**
 */
module.exports.uploadFiles = async function (paths, folder = null) {
    try {
        
        /**
         * local - Local path of the file
         * remote - Remote folder path on S3.
         */
        paths.forEach(async ({ local, remote, mimetype }) => {
            await uploadToAwsS3(local, remote, mimetype, folder)
        })

    } catch (error) {
        console.log(error, 'uploadFiles')
    }
}


/**
 */
async function uploadToAwsS3(localPath, remotePath, mimetype, folder) {
    try {
        /**
         * Read file from local path
         */
        const buffer = await fs.readFileSync(localPath);
        /**
         * Write file to remote path of aws S3 folder
         */
        await S3Store.writeFile(remotePath, buffer, { "ContentType": mimetype });
        /**
         * 'Remove the local file synchronously
         */
        let exists = await fs.existsSync(localPath);

        if (exists) {
            await fs.unlinkSync(localPath)
            if (folder) {
                await fs.rmdirSync(folder);
            }
        }
    } catch (error) {
        console.log(error, "uploadToAwsS3");
    }
}



/**
 */
module.exports.downloadFile = async function (file) {
    return S3Store.readFile(file);
}

/***************************************************
 */
module.exports.deleteFolder = async function (path) {
    await S3Store.rmdirp(path)
    return 200;
}

/***************************************************
 */
module.exports.deleteFiles = async function (files) {
    for (let i = 0; i < files.length; i++) {
        let path = files[i].path
        await S3Store.unlink(path);
    }
    return 200;
}

