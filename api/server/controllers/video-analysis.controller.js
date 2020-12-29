const VideoAnalysis = require('../models/video-analysis.model');

exports.create = (req, res) => {
    
    const video = {
        _id: req.body._id,
        idVideos: req.body.idVideos,
        url: req.body.url,
        analyses: req.body.analyses
    }

    VideoAnalysis.create(video)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error while creating the video in database"
        })
    })
};

/*const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }*/

exports.findAll = (req, res) => {
    VideoAnalysis.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : "Erreur lors de la récupération des vidéos : " + err
        })
    })
};

exports.findOneById = (req, res) => {
    const id = req.params.id;
    VideoAnalysis.find({_id : id})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : "Erreur lors de la récupération des vidéos : " + err
        })
    })
}

// -> getAnalysis
