const mongoose = require('mongoose');

const schemaAnalyse = mongoose.Schema({
        anger: Number,
        disappointment: Number,
        joy: Number,
        love: Number,
        sadness: Number,
        optimism: Number,
        like: Number,
        dislike: Number,
        commentCount: Number,
        viewCount: Number,
        user: String,
        checkpoint: String,
        date: Date
    },
    { collection : 'videos_analyse' }
)

module.exports = mongoose.model('analysis', schemaAnalyse);
