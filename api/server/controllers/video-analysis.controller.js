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
    let listVideos = req.body.videos;

    let backAnalyses = {};

    listVideos.forEach(function (video){

        //TODO Envoi vers l'analyse
        //analyse de test
        const analyse = new AnalysisModel({
            anger: 0.12,
            fear: 0.13,
            joy: 0.29,
            love: 0.25,
            sadness: 0.25,
            surprise: 0.25,
            like: 25,
            date: new Date()
        });

        video.analyses = analyse;

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
                    analyses: [analyse],
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
                    const newVideo = data;

                    newVideo.analyses.push(analyse);

                    newVideo.save(function (err) {
                        if (err) return handleError(err)
                        console.log('Success!');
                    });

                }
                res.send(listVideos);
            })
            .catch(err => {
                res.status(500).send({
                    message : "Erreur lors de la récupération de la vidéo : " + err
                })
            });
    });
}
