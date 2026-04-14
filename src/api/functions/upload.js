const multer = require('multer')
const path = require('path')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const imgFormats = /jpeg|jpg|png/
  const valid = imgFormats.test(path.extname(file.originalname).toLowerCase())
              && imgFormats.test(file.mimetype)

  if (valid) {
    cb(null, true)
  } else {
    cb(new Error('Only jpg/png allowed'))
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
})

module.exports = upload