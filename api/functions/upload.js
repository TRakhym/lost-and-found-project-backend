const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'cache/'),

  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 10000)}`
    const ext = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${unique}${ext}`)
  }
})

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