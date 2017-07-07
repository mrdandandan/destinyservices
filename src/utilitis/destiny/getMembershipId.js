const bungie = require('mrdandandan-destiny-api-module').default;

function getMembershipId(displayName, platform) {
    return bungie.search.searchDestinyPlayer({
        membershipType: platform,
        displayName: displayName
    })
        .then(_unwrapMembershipId)
        .catch(error => {
            error.details = {displayName, platform};
            return Promise.reject(error);
        });
}

function _unwrapMembershipId(searchDestinyPlayerResponse) {
    return searchDestinyPlayerResponse[0].membershipId;
}

module.exports = getMembershipId;