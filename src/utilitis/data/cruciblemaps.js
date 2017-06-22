const CrucibleMap = require('./CrucibleMap');
const CrucibleMapCollection = require('./CrucibleMapCollection');



/*
 *
 *  EARTH
 *
 */
CrucibleMapCollection.addMap('Twilight Gap', [
    CrucibleMap.GROUPING.EARTH,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Rusted Lands', [
    CrucibleMap.GROUPING.EARTH,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Exodus Blue', [
    CrucibleMap.GROUPING.EARTH,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Widow\'s Court', [
    CrucibleMap.GROUPING.EARTH,
    CrucibleMap.GROUPING.HOUSE_OF_WOLVES,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Bannerfall', [
    CrucibleMap.GROUPING.EARTH,
    CrucibleMap.GROUPING.TAKEN_KING,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Frontier', [
    CrucibleMap.GROUPING.EARTH,
    CrucibleMap.GROUPING.TAKEN_KING,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Memento', [
    CrucibleMap.GROUPING.EARTH,
    CrucibleMap.GROUPING.TAKEN_KING,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Sector 618', [
    CrucibleMap.GROUPING.EARTH,
    CrucibleMap.GROUPING.PS_ONLY
]);

/*
 *
 *  Moon
 *
 */
CrucibleMapCollection.addMap('Anomaly', [
    CrucibleMap.GROUPING.MOON,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Cauldron', [
    CrucibleMap.GROUPING.MOON,
    CrucibleMap.GROUPING.DARK_BELOW,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('First Light', [
    CrucibleMap.GROUPING.LARGE,
    CrucibleMap.GROUPING.MOON,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

/*
 *
 *  Mars
 *
 */
CrucibleMapCollection.addMap('Firebase Delphi', [
    CrucibleMap.GROUPING.MARS,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Blind Watch', [
    CrucibleMap.GROUPING.MARS,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Pantheon', [
    CrucibleMap.GROUPING.MARS,
    CrucibleMap.GROUPING.DARK_BELOW,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Black Shield', [
    CrucibleMap.GROUPING.MARS,
    CrucibleMap.GROUPING.HOUSE_OF_WOLVES,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Crossroads', [
    CrucibleMap.GROUPING.MARS,
    CrucibleMap.GROUPING.TAKEN_KING
]);

CrucibleMapCollection.addMap('Skyline', [
    CrucibleMap.GROUPING.MARS,
    CrucibleMap.GROUPING.RISE_OF_IRON
]);

/*
 *
 *  Venus
 *
 */
CrucibleMapCollection.addMap('Shores of Time', [
    CrucibleMap.GROUPING.VENUS,
    CrucibleMap.GROUPING.VANILLA
]);

CrucibleMapCollection.addMap('Asylum', [
    CrucibleMap.GROUPING.VENUS,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Thieve\'s Den', [
    CrucibleMap.GROUPING.VENUS,
    CrucibleMap.GROUPING.HOUSE_OF_WOLVES,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('The Timekeeper', [
    CrucibleMap.GROUPING.VENUS,
    CrucibleMap.GROUPING.HOUSE_OF_WOLVES,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('The Last Exit', [
    CrucibleMap.GROUPING.VENUS,
    CrucibleMap.GROUPING.RISE_OF_IRON,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Floating Gardens', [
    CrucibleMap.GROUPING.VENUS,
    CrucibleMap.GROUPING.RISE_OF_IRON,
    CrucibleMap.GROUPING.TRIALS
]);

/*
 *
 *  Mercury
 *
 */
CrucibleMapCollection.addMap('Burning Shrine', [
    CrucibleMap.GROUPING.MERCURY,
    CrucibleMap.GROUPING.VANILLA,
    CrucibleMap.GROUPING.TRIALS
]);

CrucibleMapCollection.addMap('Vertigo', [
    CrucibleMap.GROUPING.MERCURY,
    CrucibleMap.GROUPING.TAKEN_KING
]);

CrucibleMapCollection.addMap('Icarus', [
    CrucibleMap.GROUPING.MERCURY,
    CrucibleMap.GROUPING.PS_ONLY
]);

/*
 *
 *  The Reef
 *
 */
CrucibleMapCollection.addMap('The Drifter', [
    CrucibleMap.GROUPING.REEF,
    CrucibleMap.GROUPING.TAKEN_KING,
    CrucibleMap.GROUPING.TRIALS
]);

/*
 *
 *  The Dreadnaught
 *
 */
CrucibleMapCollection.addMap('The Dungeons', [
    CrucibleMap.GROUPING.DREADNAUGHT,
    CrucibleMap.GROUPING.TAKEN_KING
]);

CrucibleMapCollection.addMap('Cathedral of Dusk', [
    CrucibleMap.GROUPING.DREADNAUGHT,
    CrucibleMap.GROUPING.LARGE,
    CrucibleMap.GROUPING.TAKEN_KING
]);

module.exports = CrucibleMapCollection;