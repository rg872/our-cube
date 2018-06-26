const User = require('../models/users.model')  
const Video = require('../models/videos.model') 
const Commentd = require('../models/comments.model') 

module.exports = {
    getAllVideos (req, res) {
        Video.find({})
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'email'
            }
        })
        .populate('user', 'email')
        .then(videos => {
            res.status(200).json({
                message: 'success get all videos',
                videos
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    getVideosByEmail (req, res) {
        let { email } = req.payload

        User.findOne({email})
        .populate({
            path: 'videos',
            populate: {
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'email'
                }
            }
        })
        .populate('user', 'email')
        .then(user => {
            res.status(200).json({
                message: 'success get video by email',
                videos: user.videos
            })
        })
        .catch(err => {
            res.status().json({
                message: err.message
            })
        })

    },

    getAllComments (req, res) {
        Commentd.find({})
        .populate('user', 'email')
        .then(comments => {
            res.status(200).json({
                message: 'success get all comments',
                comments
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    getCommentsByEmail (req, res) {
        let { email } = req.payload

        User.findOne({email})
        .populate({
            path: 'videos',
            populate: {
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'email'
                }
            }
        })
        .then(user => {
            res.status(200).json({
                message: 'success get comment by email',
                videos: user.videos
            })
        })
        .catch(err => {
            res.status().json({
                message: err.message
            })
        })

    },
    createVideo (req, res) {
        let { email } = req.payload        
        
        User.findOne({email})
        .then(user => {
            let addition = {
                vote: 0,
                voters: [],
                comments: [],
                user:user._id
            }
            req.body = Object.assign(addition, req.body)
    
            let new_video = new video(req.body)
            let error = new_video.validateSync()
    
            if(error) {
                res.status(400).json({
                    message: error.message
                })
            } else {
                new_video.save()
                .then(video => {
                    User.findByIdAndUpdate(user._id, {$push: {videos: video._id}})
                    .then(user => {
                        let opts = [
                            {
                                path: 'comments',
                                populate: {
                                    path: 'user',
                                    select: 'email'
                                }
                            },
                            {
                                path: 'user',
                                select: 'email'
                            }
                        ]
                        Video.populate(video, opts, (err, video) => {
                            res.status(200).json({
                                message: 'success create video',
                                video
                            })
                        })
                    })
                })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message
            })
        })
    },

    voteVideo (req, res) {
        let { email } = req.payload
        let { vote } = req.body
        let id = req.params.id

        User.findOne({email})
        .then(user => {
            Video.findByIdAndUpdate(id, {$push: {voters: user._id}, vote})
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'email'
                }
            })
            .populate('user', 'email')
            .then(video => {
                res.status(200).json({
                    message: 'succes voting video',
                    video
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    updateVideo (req, res) {
        let id = req.params.id

        Video.findByIdAndUpdate(id, req.body)
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'email'
            }
        })
        .populate('user', 'email')
        .then(video => {
            res.status(200).json({
                message: 'success update video',
                video
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    deleteVideo (req, res) {
        let id = req.params.id
        let { email } = req.payload

        Video.findByIdAndRemove(id)
        .then(() => {
            User.findOneAndUpdate({email}, {$pull: {videos: id}})
            .then(user =>{
                res.status(200).json({
                    message: 'success delete video'
                })
            })
        })
        .catch(err => {
            res.status.json({
                message: err.message 
            })
        })
    },

    commentVideo (req, res) {
        let { email } = req.payload
        let id = req.params.id

        User.findOne({email})
        .then(user => {
            let addition = {
                vote: 0,
                voters: [],
                user: user._id
            }
            req.body = Object.assign(addition, req.body)
            let new_comment = new comment(req.body)
            let error = new_comment.validateSync()
            if(error) {
                console.log(error);
                
                res.status(400).json({
                    message: error.message
                })
            } else {
                new_comment.save()
                .then(comment => {
                    Video.findByIdAndUpdate(id, {$push: {comments: comment._id}})
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'user',
                            select: 'email'
                        }
                    })
                    .populate('user', 'email')
                    .then(video => {
                        res.status(200).json({
                            message: 'success create comment',
                            video
                        })
                    })
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    voteComment (req, res) {
        let { email } = req.payload
        let { vote } = req.body
        let id = req.params.id

        User.findOne({email})
        .then(user => {
            Commentd.findByIdAndUpdate(id, {$push: {voters: user._id}, vote})
            .populate('user', 'email')
            .then(comment => {
                res.status(200).json({
                    message: 'succes voting comment',
                    comment
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    updateComment (req, res) {
        let id = req.params.id

        Commentd.findByIdAndUpdate(id, req.body)
        .populate('user', 'email')
        .then(comment => {
            res.status(200).json({
                message: 'success comment comment',
                comment
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    deleteComment (req, res) {
        let commentId = req.params.aid
        let videoId = req.params.qid
        let { email } = req.payload

        Commentd.findByIdAndRemove(commentId)
        .then(() => {
            Video.findByIdAndUpdate(videoId, {$pull: {comments: commentId}})
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'email'
                }
            })
            .populate('user', 'email')
            .then(video =>{
                res.status.json({
                    message: 'success delete comment',
                    video
                })
            })
        })
        .catch(err => {
            res.status.json({
                message: err.message 
            })
        })
    },

}