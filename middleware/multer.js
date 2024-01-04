
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // cb(null, ".././front/src/images")
      cb(null, "./public/images")
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
  }
})

module.exports.upload = multer({ storage: storage })