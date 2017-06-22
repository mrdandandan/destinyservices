const Enumeration = require('../Enumeration');
class CrucibleMap {
    constructor(name, groupings = []) {
        this.name = name;
        this.groupings = groupings;
    }
}

CrucibleMap.GROUPING = new Enumeration({
    LARGE: 'large',
    VANILLA: 'vanilla',
    HOUSE_OF_WOLVES: 'how',
    DARK_BELOW: 'dark',
    TAKEN_KING: 'ttk',
    RISE_OF_IRON: 'roi',
    EARTH: 'earth',
    MOON: 'moon',
    MARS: 'mars',
    VENUS: 'venus',
    MERCURY: 'mercury',
    REEF: 'reef',
    DREADNAUGHT: 'dreadnaught',
    TRIALS: 'trials',
    PS_ONLY: 'psonly'
});

module.exports = CrucibleMap;