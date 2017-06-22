const {PLATFORM} = require('../../constants');
const CrucibleMapCollection = require('../../utilitis/data/CrucibleMapCollection');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');

let getPlaylist = new ApiEndpoint({
    name: 'Get crucible map playlist',
    route: 'get-playlist/:platform',
    query: ['size:[default=5]', 'grouping:[optional]'],
    method: 'GET',
    requestHandler: ({platform}, {grouping = '', size = 5}) => {
        grouping = grouping.length ? grouping.split(',').map(g => g.trim()) : [];
        size = +size;

        if(+platform === PLATFORM.LIVE) {
            grouping.push(`!${GROUPING.PS_ONLY}`);
        }

        let playlist = [];
        for(let i = 0; i < size; i++) {
            playlist.push(CrucibleMapCollection.getRandom(grouping));
        }

        return new Promise((resolve, reject) => {
            resolve({playlist})
        });
    }
});

module.exports = getPlaylist;
