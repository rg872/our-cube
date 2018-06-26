const express = require('express')
const router = express.Router()
const { decryptToken } = require('../middlewares/auth.middleware')
const {
    commentVideo,
    createVideo,
    deleteComment,
    deleteVideo,
    getAllComments,
    getAllVideos,
    getCommentsByEmail,
    getVideosByEmail,
    updateComment,
    updateVideo,
    voteComment,
    voteVideo
} = require('../controllers/index.controller')
const { multer, multerUpload, sendUploadToGCS } = require('../helpers/image.helper')

router.get('/comments', decryptToken, getAllComments)
router.get('/videos', decryptToken, getAllVideos)
router.get('/comments/email', decryptToken, getCommentsByEmail)
router.get('/videos/email', decryptToken, getVideosByEmail)
router.post('/videos', decryptToken, multer.single('video'), sendUploadToGCS, createVideo)
router.post('/comments/:id', decryptToken, commentVideo)
router.put('/videos/vote/:id', decryptToken, voteVideo)
router.put('/comments/vote/:id', decryptToken, voteComment)
router.put('/comments/:id', decryptToken, updateComment)
router.put('/videos/:id', decryptToken, multerUpload.single('video'), sendUploadToGCS, updateVideo)
router.delete('/comments/:id', decryptToken, deleteComment)
router.delete('/videos/:id', decryptToken, deleteVideo)

module.exports = router
