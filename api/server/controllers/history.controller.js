const AnalysisModel = require('../models/analysis.model');
const VideoAnalysisModel = require('../models/video-analysis.model');

exports.findAll = (req, res) => {
    console.log("all");
    AnalysisModel.find()
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
    console.log("one");
    const idUser = req.params.idUser;
    console.log("L'id est "+idUser);
    AnalysisModel.find({'analyses.user': idUser})
        .then(data => {
            // console.log(data.length);
            let historique = [];

            data.forEach(function (videos){
                let video = VideoAnalysisModel(videos);

                let analyses = video.analyses;

                // console.log(analyses)

                analyses.forEach(function (analyseOne){
                    let analyse = AnalysisModel(analyseOne);
                    console.log(analyse.date.split('\d{4}-\d{2}-\d{2}T\d{2}:\d{2}'));

                });
            });


            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : "Erreur : " + err
            })
        })
}
