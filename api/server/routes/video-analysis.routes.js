module.exports = app => {
    const videoAnalysis = require("../controllers/video-analysis.controller");
    let routeur = require('express').Router();

    routeur.get('/', videoAnalysis.findAll);

    routeur.get('/:id', videoAnalysis.findOneById);
    
    //console.log("ROUTEUR : ", routeur);
    app.use('/video', routeur);
}