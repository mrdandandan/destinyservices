const bungie = require('mrdandandan-destiny-api-module').default;
const {PLATFORM, ACTIVITY_MODE, GENDER_HASH, RACE_HASH, CLASS_HASH} = require('../../constants');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');

const Convert = require('../../utilitis/Convert');
const getMembershipId = require('../../utilitis/destiny/getMembershipId');

let aggregateStatsEndpoint = new ApiEndpoint({
    name: 'Aggregate Character Stats',
    route: 'aggregate-stats/:platform/:displayName',
    query: ['activityMode:optional'],
    method: 'GET',
    requestHandler: ({platform, displayName}, {activityMode = ACTIVITY_MODE.AllPvP}) => {
        console.log(platform, displayName, activityMode);

        return getMembershipId(displayName, platform)
            .then(membershipId => bungie.account.summary({membershipType: platform, membershipId}))
            .then(accountSummaryResponse => processAccountSummary(accountSummaryResponse, activityMode))
            .then(doAggregateStats)
            .then(aggregateStats => {
                return {
                    displayName,
                    aggregateStats
                };
            });
    }
});

module.exports = aggregateStatsEndpoint;

function processAccountSummary({characters, membershipId, membershipType}, activityMode) {
    let promises = characters.map(character => {
        const {
            emblemPath,
            backgroundPath,
            characterBase
        } = character;
        const {
            characterId,
            raceHash,
            genderHash,
            classHash
        } = characterBase;

        return bungie.stats.all({
            membershipType,
            membershipId,
            characterId,
            modes: activityMode
        }).then(stats => {
            let allStats = stats[Convert.toUncapitalized(ACTIVITY_MODE.toString(+activityMode))];
            allStats = allStats ? allStats.allTime : undefined;

            return {
                membershipId,
                characterId,
                race: RACE_HASH.toString(raceHash),
                gender: GENDER_HASH.toString(genderHash),
                class: CLASS_HASH.toString(classHash),
                emblem: emblemPath,
                background: backgroundPath,
                stats: allStats
            };
        });
    });
    return Promise.all(promises);
}

function doAggregateStats(characters) {
    let aggregateStats = {
        assists: 0,
        combatRating: 0,
        deaths: 0,
        kills: 0,
        killsDeathsAssists: 0,
        killsDeathsRatio: 0,
        winLossRatio: 0
    };
    let charactersMissingStats = 0;
    characters.forEach(character => {
        if (!character.stats) {
            charactersMissingStats++;
            return;
        }
        for (let key in aggregateStats) {
            aggregateStats[key] += character.stats[key].basic.value;
        }
    });
    let divisor = characters.length - charactersMissingStats;
    divisor = divisor || 1;
    aggregateStats.combatRating /= divisor;
    aggregateStats.killsDeathsRatio /= divisor;
    aggregateStats.killsDeathsAssists /= divisor;
    aggregateStats.winLossRatio /= divisor;

    for (let key in aggregateStats) {
        aggregateStats[key] = Convert.toRoundedValue(aggregateStats[key], 2);
    }

    return aggregateStats;
}