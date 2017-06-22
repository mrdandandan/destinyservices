const {PLATFORM} = require('../../constants');
const CrucibleMapCollection = require('../../utilitis/data/CrucibleMapCollection');
const {GROUPING} = require('../../utilitis/data/CrucibleMap');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');

let getMap = new ApiEndpoint({
    name: 'Get random crucible map',
    route: 'get-map/:platform',
    query: ['grouping:optional'],
    method: 'GET',
    requestHandler: ({platform}, {grouping = ''}) => {
        grouping = grouping.length ? grouping.split(',').map(g => g.trim()) : [];
        if(+platform === PLATFORM.LIVE) {
            grouping.push(`!${GROUPING.PS_ONLY}`);
        }

        return new Promise((resolve, reject) => {
            resolve(CrucibleMapCollection.getRandom(grouping))
        });
    }
});

module.exports = getMap;
