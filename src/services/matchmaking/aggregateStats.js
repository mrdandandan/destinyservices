const {PLATFORM, ACTIVITY_MODE, GENDER_HASH, RACE_HASH, CLASS_HASH} = require('../../constants');
const playerAggregateStatsEndpoint = require('../player/aggregateStats');
const generateTeams = require('./generateTeams');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');
const getMembershipId = require('../../utilitis/destiny/getMembershipId');
let _ = require('lodash');

let aggregateStatsEndpoint = new ApiEndpoint({
    name: 'Matchmaking by Aggregate Stats',
    route: 'aggregate-stats/:platform',
    query: ['displayNames', 'activityMode:optional', 'aggregate:optional'],
    method: 'GET',
    requestHandler: ({platform}, {displayNames = '', activityMode = ACTIVITY_MODE.AllPvP, aggregate = 'killsDeathsRatio'}) => {
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
            .then(players => _.sortBy(players, o => o.aggregateStats[aggregate]).reverse())
            .then(players => generateTeams(players, aggregate));
    }
});

module.exports = aggregateStatsEndpoint;