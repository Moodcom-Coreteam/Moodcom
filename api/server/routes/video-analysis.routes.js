module.exports = app => {
    const videoAnalysisController = require("../controllers/video-analysis.controller");
    let routeur = require('express').Router();

    routeur.get('/', videoAnalysisController.findAll);

    routeur.get('/:id', videoAnalysisController.findOneById);

    routeur.post('/', videoAnalysisController.doAnalysis);
    
    //console.log("ROUTEUR : ", routeur);
    app.use('/api/video', routeur);
}
