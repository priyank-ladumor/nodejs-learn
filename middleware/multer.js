
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // cb(null, '/Desktop/SCT/multer/uploads')
      cb(null, ".././front/src/images")
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
  }
})

module.exports.upload = multer({ storage: storage })