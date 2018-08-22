const cors = require('cors');
const APP_CONFIG = require('../app.config.json');
const {DestinyApiRequest} = require('mrdandandan-destiny-api-module');

let app = require('express')(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8081;

// DestinyApiRequest.setApiKey(process.env.BUNGIE_API_KEY);
DestinyApiRequest.setApiKey('f8f0e9ab876644c8a37728121619bb74');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);


app.listen(port);
console.log(`...listening on port ${port}`);