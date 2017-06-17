const bungie = require('mrdandandan-destiny-api-module').default;
const {PLATFORM, ACTIVITY_MODE, GENDER_HASH, RACE_HASH, CLASS_HASH} = require('../../constants');
let membershipIdEndpoint = require('./membershipIds');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');

let gamertagsEndpoint = new ApiEndpoint(
    'By Gamertag',
    'gamertags/:platform',
    'GET',
    ({platform}, {gamertags = '', activityMode = ACTIVITY_MODE.AllPvP}) => {
        gamertags = gamertags.split(',');
        console.log(platform, gamertags, activityMode);

        return new Promise((resolve, reject) => {
            let promises = [];
            gamertags.forEach(gamertag => {
                promises.push(_getMembershipId(gamertag, platform));
            });

            Promise.all(promises)
                .then(membershipIds => membershipIdEndpoint.requestHandler({platform}, {membershipIds, activityMode}))
                .then(output => resolve(output))
                .catch(error => reject(error));
            // resolve({platform, gamertags, activityMode});
        });
    }
);

module.exports = gamertagsEndpoint;

function _getMembershipId(gamerTag, platform) {
    return bungie.search.searchDestinyPlayer({
        membershipType: platform,
        displayName: gamerTag
    }).then(_unwrapMembershipId);
}

function _unwrapMembershipId(searchDestinyPlayerResponse) {
    return searchDestinyPlayerResponse[0].membershipId;
}
