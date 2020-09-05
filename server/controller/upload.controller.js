const uploadManager = require('../manager/upload.manager')
const uploadImages = function (request, response) {
    uploadManager.uploadImages(request, response)
        .then(result => response.status(result.code).send(result.data))
        .catch(error => response.status(500).send(error.message))
}

const fetchImageList = function (request, response) {
    uploadManager.fetchImageList(request.body, response)
        .then(result => response.status(result.code).send(result.data))
        .catch(error => response.status(500).send(error.message))
}

const showImages = function (request, response) {
    uploadManager.showImages(request.body, response)
        .then(result => response.status(result.code).send(result.data))
        .catch(error => response.status(500).send(error.message))
}

module.exports = {
    uploadImages,
    fetchImageList,
    showImages
}