const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    url: String,
    title: {
        type: String,
        required: [true, 'title must be inputed']
    },
    detail: {
        type: String,
        required: [true, 'description must be inputed']
    },
    vote: {
        type: Number
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    voters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]   
}, {
    timestamps: true
})

const Video = mongoose.model('Video', videoSchema)

module.exports = Video