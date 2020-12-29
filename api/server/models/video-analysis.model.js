const mongoose = require('mongoose');
//require('mongoose-type-url');

const schema = mongoose.Schema({
    _id : Number,
    idVideos : String,
    url : String,   
    analyses : Array,
},
{ collection : 'videos_analyse' })

module.exports = mongoose.model('videoAnalysis', schema);