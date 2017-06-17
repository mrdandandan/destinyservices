const router = require('express').Router();
let gamerTags = require('./gamertags'),
    membershipIds = require('./membershipIds');

module.exports = [
    gamerTags,
    membershipIds
];