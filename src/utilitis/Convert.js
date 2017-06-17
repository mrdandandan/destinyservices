const Enumeration = require('./Enumeration');

const membershipType = new Enumeration({
    xbox: 1,
    ps: 2
});

class Convert {
    static toInt(value) {
        return +value.toString().replace(/,/g, '');
    }
    static toRoundedValue(value, places) {
        return +(Math.round(`${value}e+${places}`) + `e-${places}`);
    }
    static membershipTypeToPlatform(membershipTypeId) {
        return membershipType.toString(+membershipTypeId);
    }
    static platformToMembershipType(platform) {
        return membershipType[platform];
    }
    static arrayToChunksOf(array, size) {
        var sets = [];
        var chunks = array.length / size;

        for (var i = 0, j = 0; i < chunks; i++, j += size) {
            sets[i] = array.slice(j, j + size);
        }
        return sets;
    }
}

module.exports = Convert;