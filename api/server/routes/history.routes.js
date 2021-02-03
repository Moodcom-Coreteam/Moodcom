module.exports = app => {
    const historyController = require("../controllers/history.controller");

    let routeur = require('express').Router();

    routeur.get('/',historyController.findAll)

    routeur.get('/:idUser', historyController.findOneById);

    app.use('/api/history', routeur);
}
