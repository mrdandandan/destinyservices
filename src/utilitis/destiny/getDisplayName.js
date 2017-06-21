const bungie = require('mrdandandan-destiny-api-module').default;

function getDisplayName(membershipId, platform) {
    return bungie.user.getBungieAccount({
        membershipId,
        membershipType: platform
    }).then(_unwrapDisplayName);
}

function _unwrapDisplayName(getBungieAccountResponse) {
    return getBungieAccountResponse.destinyAccounts[0].userInfo.displayName
}

module.exports = getDisplayName;