const VideoAnalysisModel = require('../models/video-analysis.model');
const AnalysisModel = require('../models/analysis.model');

exports.create = (req, res) => {
    console.log(req.body.videos[0].title)
    const video = new VideoAnalysisModel({
        title: req.body.videos[0].title,
        channel: req.body.videos[0].channelTitle,
        url: req.body.videos[0].url,
        idVideo: req.body.videos[0].idYoutube,
        description: req.body.videos[0].description,
        publishedAt: req.body.videos[0].publishedAt,
        analyses: []
    });
    video.save().then(
        (data) => {
            res.status(201).json({
                message: data
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
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
    VideoAnalysisModel.find()
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
    console.log("L'id est "+id);
    VideoAnalysisModel.findOne({_id : id})
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : "Erreur lors de la récupération des vidéos : " + err
        })
    })
}

exports.doAnalysis = (req,res) => {
    const listVideos = req.body.videos;
    //TODO Envoi vers l'analyse

    listVideos.forEach(function (video){

        //Verification existance
        VideoAnalysisModel.findOne({
            idVideo : video.idYoutube
        })
            .then(data => {

                const newVideo = new VideoAnalysisModel({
                    title: video.title,
                    channel: video.channelTitle,
                    url: video.url,
                    idVideo: video.idYoutube,
                    description: video.description,
                    publishedAt: video.publishedAt,
                    analyses: [],
                });

                statusOperationBDD = false;
                if(data == null){
                    console.log("Faire create");
                    console.log("enregistrment nouvelle video");
                    console.log(video);

                    newVideo.save()
                    .then(data => {
                        console.log('data'+ data);
                        statusOperationBDD = true;
                    })
                    .catch(err => {
                        console.log(err);
                        statusOperationBDD = false;
                    })

                }else{
                    console.log(data);
                    const newVideo = data;
                    console.log("update");
                    // console.log(data);
                    const analyse = new AnalysisModel({
                        anger: 0.12,
                        fear: 0.13,
                        joy: 0.29,
                        love: 0.25,
                        sadness: 0.25,
                        surprise: 0.25,
                        date: new Date()
                    });
                    // console.log(analyse)
                    // const filter = { _id: data._id,  };
                    // const update = { $push: { analyses: analyse }};
                    // // console.log(filter,update)
                    // newVideo.updateOne(filter, update)
                    //     .then(data => {
                    //         console.log(data);
                    // })
                    newVideo.analyses.push(analyse);
                    console.log(newVideo);
                    newVideo.save(function (err) {
                        if (err) return handleError(err)
                        console.log('Success!');
                    });

                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message : "Erreur lors de la récupération de la vidéo : " + err
                })
            });
    });
}

// -> getAnalysis
