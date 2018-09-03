const bungie = require('mrdandandan-destiny-api-module').default;
const {ACTIVITY_MODE} = require('../../constants');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');

const Convert = require('../../utilitis/Convert');

const {requestHandler: aggregateStatsById} = require('./aggregateStatsById');
const {requestHandler: membershipId} = require('./membershipId');

let aggregateStatsByNameEndpoint = new ApiEndpoint({
    name: 'Aggregate Character Stats by Name',
    route: 'aggregate-stats-by-name/:platform/:displayName',
    query: ['activityMode:optional'],
    method: 'GET',
    requestHandler: ({platform, displayName}, {activityMode = ACTIVITY_MODE.AllPvP}) => {
        return membershipId({platform, displayName})
            .then(response => {
                const {
                    membershipId
                } = response;
                if(!membershipId) {
                    return Promise.reject('No membership id found')
                }
                return aggregateStatsById({platform, membershipId}, {activityMode});
            })
    }
});

module.exports = aggregateStatsByNameEndpoint;

function processAccountSummary(characterIds, membershipId, membershipType, activityMode) {
    let promises = characterIds.map(characterId => {
        return bungie.d2.stats.getHistoricalStats({
            characterId,
            membershipType,
            membershipId,
            modes: activityMode
        }).then(stats => {
            let allStats = stats[Convert.toUncapitalized(ACTIVITY_MODE.toString(+activityMode))];
            allStats = allStats ? allStats.allTime : undefined;

            return {
                membershipId,
                characterId,
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