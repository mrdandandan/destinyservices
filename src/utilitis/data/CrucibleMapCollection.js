const CrucibleMap = require('./CrucibleMap');

let privateProps = new WeakMap();
class CrucibleMapCollection {
    constructor() {
        let groups = {},
            maps = [];
        for (let key in CrucibleMap.GROUPING) {
            if (!CrucibleMap.GROUPING.hasOwnProperty(key)) {
                continue;
            }
            groups[CrucibleMap.GROUPING[key]] = [];
        }
        privateProps.set(this, {
            groups,
            maps
        });
    }

    addMap(mapName, groupings) {
        let groups = privateProps.get(this).groups,
            maps = privateProps.get(this).maps,
            map = new CrucibleMap(mapName, groupings);

        maps.push(map);
        groupings.forEach(group => {
            groups[group].push(map);
        });
    }

    getRandom(groupings = []) {
        let filteredMaps = this.getFiltered(groupings),
            map = filteredMaps[Math.floor(Math.random() * filteredMaps.length)];
        return map || 'could not find a map';
    }

    getFiltered(groupings = []) {
        let filteredCollection = privateProps.get(this).maps.slice();
        groupings.forEach(grouping => {
            let include = true;
            if(grouping[0] === '!') {
                include = false;
                grouping = grouping.substr(1);
            }
            filteredCollection = filteredCollection.filter(map => {
                if(!include) {
                    return !map.groupings.includes(grouping);
                }
                return map.groupings.includes(grouping);
            });
        });
        return filteredCollection.map(map => map.name);
    }
}

module.exports = new CrucibleMapCollection();