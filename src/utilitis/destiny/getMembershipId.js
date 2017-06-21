const bungie = require('mrdandandan-destiny-api-module').default;

function getMembershipId(gamerTag, platform) {
    return bungie.search.searchDestinyPlayer({
        membershipType: platform,
        displayName: gamerTag
    }).then(_unwrapMembershipId);
}

function _unwrapMembershipId(searchDestinyPlayerResponse) {
    return searchDestinyPlayerResponse[0].membershipId;
}

module.exports = getMembershipId;