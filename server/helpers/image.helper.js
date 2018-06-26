'use strict'
require('dotenv').config()

const Storage = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const gcsname = new Date() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      // set image url ke req.body.url
      req.body.url = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const deleteFileFromGCS = (filename) => {
  storage
    .bucket(CLOUD_BUCKET)
    .file(filename)
    .delete()
    .then(() => {
      return
    })
    .catch(err => {
      throw (err)
    })
}

const Multer = require('multer'),
multer = Multer({
storage: Multer.MemoryStorage,
limits: {
    fileSize: 5 * 1024 * 1024
}
// dest: '../images'
}),
multerUpload = Multer({
storage: Multer.MemoryStorage,
limits: {
    fileSize: 5 * 1024 * 1024
},
fileFilter (req, file, cb) {
  if (!req.body.image) {
    // skip image pas upload kalau tidak ada image
    return cb(null, false)
  }

  cb(null, true)
}
// dest: '../images'
})

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer,
  deleteFileFromGCS,
  multerUpload
}