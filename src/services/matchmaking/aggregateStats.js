const {PLATFORM, ACTIVITY_MODE, GENDER_HASH, RACE_HASH, CLASS_HASH} = require('../../constants');
const playerAggregateStatsEndpoint = require('../player/aggregateStats');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');
const getMembershipId = require('../../utilitis/destiny/getMembershipId');
let _ = require('lodash');

let aggregateStatsEndpoint = new ApiEndpoint({
    name: 'Matchmaking by Aggregate Stats',
    route: 'aggregate-stats/:platform',
    query: ['displayNames', 'activityMode:optional'],
    method: 'GET',
    requestHandler: ({platform}, {displayNames = '', activityMode = ACTIVITY_MODE.AllPvP}) => {
        displayNames = displayNames.split(',');
        if(displayNames.length % 2 === 1) {
            return Promise.reject({
                details: {
                    displayNames
                },
                message: `Number of displayNames provided should be even`
            });
        }

        let promises = displayNames.map(displayName => playerAggregateStatsEndpoint.requestHandler({platform, displayName}, {activityMode}));
        return Promise.all(promises)
            .then(players => _.sortBy(players, o => o.aggregateStats.killsDeathsRatio).reverse())
            .then(makeTeams)
            .then(buildResult)
    }
});

module.exports = aggregateStatsEndpoint;

function makeTeams(players) {
    let alpha = [],
        bravo = [];


    let isAlpha = true;
    while (players.length) {
        let team = isAlpha ? alpha : bravo,
            player;

        if (players.length === 2 &&
            (
                (alpha.length && bravo.length && alpha.length - bravo.length === 0) ||
                (!alpha.length && !bravo.length)
            )) {
            player = players.shift();
            player.team = 'BRAVO';
            bravo.push(player);
            player = players.shift();
            player.team = 'ALPHA';
            alpha.push(player);
            break;
        }

        player = players.shift();
        player.team = isAlpha ? 'ALPHA' : 'BRAVO';
        team.push(player);
        player = players.pop();
        player.team = isAlpha ? 'ALPHA' : 'BRAVO';
        team.push(player);

        isAlpha = !isAlpha;
    }

    return alpha.concat(bravo);
}

function buildResult(results) {
    return results.reduce((output, player) => {
        let arr = [],
            {displayName, team, aggregateStats} = player;
        switch (team) {
            case 'ALPHA':
                arr = output.alpha;
                break;
            case 'BRAVO':
                arr = output.bravo;
                break;
        }
        arr.push(displayName);
        output.aggregateStats[displayName] = aggregateStats;

        return output;
    }, {
        alpha: [],
        bravo: [],
        aggregateStats: {}
    })
}