const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

let config = require('./config/bd.config')

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Add json content type
    res.header('Content-Type', 'application/json');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', async (req, res) => {
    res.send("Hello world from Express application !")
});

app.get('/api/', (req, res) => {
    res.send("It works well with routing !");
});

require('./server/routes/video-analysis.routes')(app);
require('./server/routes/history.routes')(app);

const connectUrl = config.db['prod'].mongo + config.db['prod'].auth;

mongoose.connect(connectUrl);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Listenning on port " + PORT));
