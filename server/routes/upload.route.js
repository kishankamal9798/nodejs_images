const UploadController = require("../controller/upload.controller");
const routes = require('express').Router()
const commonUtils = require('../utils/common');
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
routes.post('/uploadImages', upload.array("file"), commonUtils.renameFiles, UploadController.uploadImages);
routes.post('/fetchImageList', UploadController.fetchImageList)
routes.post('/showImages', UploadController.showImages)


module.exports = routes;
