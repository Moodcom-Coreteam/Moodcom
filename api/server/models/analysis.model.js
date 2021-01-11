const mongoose = require('mongoose');

const schemaAnalyse = mongoose.Schema({
        anger: Number,
        fear: Number,
        joy: Number,
        love: Number,
        sadness: Number,
        surprise: Number,
        like: Number,
        date: Date
    },
    { collection : 'videos_analyse' }
)

module.exports = mongoose.model('analysis', schemaAnalyse);
