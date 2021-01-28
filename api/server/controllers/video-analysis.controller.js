const axios = require('axios');

const VideoAnalysisModel = require('../models/video-analysis.model');
const AnalysisModel = require('../models/analysis.model');

exports.create = (req, res) => {
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

    VideoAnalysisModel.findOne({_id : id})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : "Erreur lors de la récupération des vidéos : " + err
        })
    })
}

exports.doAnalysis = (req,response) => {
    //récupértation du tableau de videos
    let listVideos = req.body.videos;
    //récupération du paramètre user
    let user = req.body.user;

    //le compteur sera utilisé pour déterminer quand le serveur peut renvoyer l'analyse
    let videoCount = listVideos.length;

    let checkpoint = Date.now();

    listVideos.forEach(function (video) {

        //Construction de l'url pour l'analyse
        let url = 'http://51.91.121.249:5000/analyse?nbComments=1000&videoId=' + video.idYoutube;

        //appel vers le service d'analyse
        axios.get(url)
            .then((res) => {

                //Extraction des variables intéressantes
                let feelings = res.data.analysis.feelings;
                let likes = res.data.analysis.like;
                let dislikes = res.data.analysis.dislike;
                let commentCount = res.data.analysis.commentCount;
                let viewCount = res.data.analysis.viewCount;

                //ajout d'un élément analyse à un objet video
                video.analyses = new AnalysisModel({
                    anger: feelings.anger,
                    disappointment: feelings.disappointment,
                    joy: feelings.joy,
                    love: feelings.love,
                    sadness: feelings.sadness,
                    optimism: feelings.optimism,
                    like: likes,
                    dislike: dislikes,
                    commentCount: commentCount,
                    viewCount: viewCount,
                    checkpoint: checkpoint,
                    user: user,
                    date: new Date()
                });

                //on retire 1 au compteur à chaque analyse terminée
                videoCount--;

                //si l'utilisateur s'est authentifié sur le portail, on enregistre l'analyse pour l'historique
                if (user != null) {
                    //enregistrer l'analyse
                    register(video);
                }



            })
            .catch((error) => {
                //on retire 1 au compteur à chaque analyse terminée
                video.analyses = null;
                videoCount--;
            }).finally(() => {
                //si toutes les vidéos ont été analysés on peut renvoyer la reponse au client
                if(videoCount === 0){
                    response.send(listVideos);
                }
            });
    });
}

function register(video){
    //On vérifie si un enregistrement de la video existe ou non
    //si oui, on fait seulement une mise à jour de l'objet en ajoutant l'analyse actuelle
    //si non, on crée un objet video avec l'analyse actuelle
    VideoAnalysisModel.findOne({
        idVideo : video.idYoutube
    })
    .then(data => {

        const newVideo = new VideoAnalysisModel({
            title: video.title,
            channel: video.channelTitle,
            url: video.url,
            idVideo: video.idYoutube,
            description: video.description || "test",
            publishedAt: video.publishedAt,
            analyses: [video.analyses],
        });

        if(data == null){
            //Création d'un nouvel objet video
            newVideo.save()
                .catch(err => {
                    console.log(err);
                })

        }else{
            //ajout d'un objet analyse à un objet video existant
            const newVideo = data;

            newVideo.analyses.push(video.analyses);

            newVideo.save(function (err) {
                if (err) return handleError(err)
            });

        }
    });
}
