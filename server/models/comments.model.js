const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    detail: {
        type: String,
        required: [true, 'comment empty']
    },
    vote: {
        type: Number
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    voters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment