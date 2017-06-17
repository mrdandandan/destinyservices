const bungie = require('mrdandandan-destiny-api-module');
const {PLATFORM, ACTIVITY_MODE, GENDER_HASH, RACE_HASH, CLASS_HASH} = require('../../constants');

let apiItem = require('../../utilitis/apiItem');

module.export = apiItem(
    '/membershipIds/{platform}',
    'GET',
    ({membershipIds = [], activityMode = ACTIVITY_MODE.AllPvP}) => {

    }
);