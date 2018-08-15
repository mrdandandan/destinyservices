const bungie = require('mrdandandan-destiny-api-module').default;

function getDisplayName(membershipId) {
    return bungie.user.getBungieNetUserById({
        membershipId
    }).then(_unwrapDisplayName);
}

function _unwrapDisplayName(getBungieAccountResponse) {
    return getBungieAccountResponse.destinyAccounts[0].userInfo.displayName
}

module.exports = getDisplayName;