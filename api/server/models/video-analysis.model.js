const mongoose = require('mongoose');
//require('mongoose-type-url');
const schemaAnalyse = mongoose.Schema({
        anger: Number,
        fear: Number,
        joy: Number,
        love: Number,
        sadness: Number,
        surprise: Number,
        date: Date
    },
    { collection : 'videos_analyse' }
)

const schemaVideo = mongoose.Schema({
    title : { type: String, required: true },
    channel: { type: String, required: true },
    url: { type: String, required: true },
    idVideo: { type: String, required: true },
    description: { type: String, required: true },
    publishedAt: { type: Date, required: true },
    analyses: [schemaAnalyse]
},
{ collection : 'videos_analyse' })

module.exports = mongoose.model('videoAnalysis', schemaVideo);

