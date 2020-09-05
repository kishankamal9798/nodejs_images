const renameFiles = async function (request, response, next) {
    try {
      let files = request.file ? [request.file] : request.files;
      if (files) {
        let promises = [];
        files.forEach(file => {
          let crypto = require('crypto')
          let ext = file.originalname.split('.').pop();
          let newName = 'FUS' + crypto.randomBytes(3).toString('hex') + 'T' + Date.now() + '.' + ext;
          file['newName'] = newName;
          file['oldName'] = file.originalname;
          file['originalname'] = newName;
        });
        await Promise.all(promises);
      }
      next()
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {
    renameFiles
  }