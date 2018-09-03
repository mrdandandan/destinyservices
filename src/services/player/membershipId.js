const bungie = require('mrdandandan-destiny-api-module').default;

let ApiEndpoint = require('../../utilitis/ApiEndpoint');

let membershipIdEndpoint = new ApiEndpoint({
    name: 'Get Membership Id',
    route: 'membershipId/:platform/:displayName',
    query: [],
    method: 'GET',
    requestHandler: ({platform, displayName}) => {
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
});

module.exports = membershipIdEndpoint;

function _unwrapMembershipId(searchDestinyPlayerResponse) {
    const player = searchDestinyPlayerResponse[0];
    return {
        displayName: player.displayName,
        membershipId: player.membershipId
    };
}