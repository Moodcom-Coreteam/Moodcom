const AnalysisModel = require('../models/analysis.model');
const VideoAnalysisModel = require('../models/video-analysis.model');

exports.findAll = (req, res) => {
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
    //Récupération de l'email de l'utilisateur
    const idUser = req.params.idUser;

    //Requete pour récupérer l'ensemble des analyses de l'utilisateur
    AnalysisModel.find({'analyses.user': idUser})
        .then(data => {

            //Utilisation d'une structure Map pour faciliter la création de l'objet qui contiendra les historiques
            let historique = new Map;

            //On parcourt chaque élément video extrait par la recherche
            data.forEach(function (videos){

                //récupération des variables essentielles
                let video = VideoAnalysisModel(videos);

                let analyses = video.analyses;

                //Pour chaque vidéo on va partir les analyses qui ont été trouvé
                analyses.forEach(function (analyseOne){

                    let analyse = AnalysisModel(analyseOne);

                    if(analyse.user === idUser) {

                        //Extraction de la date pour la mettre en format français
                        let date = new Date(analyse.date);
                        let jour = (date.getDate().toString().length === 1) ? '0'+date.getDate() : date.getDate();
                        let mois = ((date.getMonth()+1).toString().length === 1) ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
                        let heure = (date.getHours().toString().length === 1) ? '0'+date.getHours() : date.getHours();
                        let minute = (date.getMinutes().toString().length === 1) ? '0'+date.getMinutes() : date.getMinutes();

                        let dateRetour = jour + '/' + mois + '/' + date.getFullYear() + ' ' + heure + ':' + minute;

                        //récupération du checkpoint qui sert à déterminer si différentes vidéos font partis d'une même analyse
                        let checkpointAnalyseCourant = analyse.checkpoint;

                        //Construction de l'objet contenant la video et l'analyse à une date précise
                        let historyAnalyse = {
                            title: video.title,
                            channel: video.channel,
                            url: video.url,
                            idVideo: video.idVideo,
                            description: video.description,
                            publishedAt: video.publishedAt,
                            analyse
                        }

                        //Si il y a déjà un élément créé dans l'historique, on ajoute l'objet historyAnalyse au tableau d'analyse à une date
                        if (historique.has(checkpointAnalyseCourant)) {

                            let historiqueExistantAnalysesObject = historique.get(checkpointAnalyseCourant);
                            let videosArray = historiqueExistantAnalysesObject.videos;

                            videosArray.push(historyAnalyse);


                        } else {
                            //Sinon on crée un nouvel élement dans la Map historique
                            let historicObject = {
                                date: dateRetour,
                                videos: [historyAnalyse]
                            }
                            historique.set(checkpointAnalyseCourant, historicObject);
                        }
                    }

                });
            });

            //Permet de renvoyer les 5 analyses les plus récentes
            let historiqueSortByDate = new Map([...historique.entries()].sort().reverse().slice(0,5));

            //on renvoie les données en transformant la Map historique en Json
            res.send(Object.fromEntries(historiqueSortByDate));
        })
        .catch(err => {
            res.status(500).send({
                message : "Erreur : " + err
            })
        })
}
