const mongoose = require('mongoose');
const AnalysisModel = require('../models/analysis.model');

const schemaVideo = mongoose.Schema({
    title : { type: String, required: true },
    channel: { type: String, required: true },
    url: { type: String, required: true },
    idVideo: { type: String, required: true },
    description: { type: String, required: true },
    publishedAt: { type: Date, required: true },
    analyses: [AnalysisModel.schema]
},
{ collection : 'videos_analyse' })

module.exports = mongoose.model('videoAnalysis', schemaVideo);

