const multer  = require('multer')

const storage = multer.diskStorage({
    //kothay image upload hobe tar location
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    //image er real name
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = { upload }