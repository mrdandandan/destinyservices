const CrucibleMapCollection = require('../../utilitis/data/CrucibleMapCollection');
const {GROUPING} = require('../../utilitis/data/CrucibleMap');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');

let getMapGroups = new ApiEndpoint({
    name: 'Get map group definitions',
    route: 'get-map-groups',
    query: ['expanded:[default=false]'],
    method: 'GET',
    requestHandler: ({platform}, {expanded = false}) => {
        let groups = {mappings: GROUPING};

        if(expanded === 'true') {
            let groupKeys = Object.keys(GROUPING);
            groups.groupings = groupKeys.reduce((output, key) => {
                output[key] = CrucibleMapCollection.getFiltered([GROUPING[key]]);
                return output;
            }, {});
        }

        return new Promise((resolve, reject) => {
            resolve(groups)
        });
    }
});

module.exports = getMapGroups;
