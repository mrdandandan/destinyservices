const bungie = require('mrdandandan-destiny-api-module').default;

function getMembershipId(displayName, platform) {
    displayName = encodeURIComponent(displayName);

    return bungie.d2.search.searchDestinyPlayer({
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