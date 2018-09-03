const {PLATFORM, ACTIVITY_MODE, GENDER_HASH, RACE_HASH, CLASS_HASH} = require('../../constants');
const {requestHandler: playerAggregateStatsByName} = require('../player/aggregateStatsByName');
const {requestHandler: playerAggregateStatsById} = require('../player/aggregateStatsById');
const generateTeams = require('./generateTeams');

let ApiEndpoint = require('../../utilitis/ApiEndpoint');
const getMembershipId = require('../../utilitis/destiny/getMembershipId');
let _ = require('lodash');

let aggregateStatsEndpoint = new ApiEndpoint({
    name: 'Matchmaking by Aggregate Stats',
    route: 'aggregate-stats/:platform',
    query: ['oneOrMore(displayNames|membershipIds)', 'activityMode:optional', 'aggregate:optional'],
    method: 'GET',
    requestHandler: ({platform}, {displayNames, membershipIds, activityMode = ACTIVITY_MODE.AllPvP, aggregate = 'killsDeathsRatio'}) => {
        if(!displayNames && !membershipIds) {
            return Promise.reject({
                details: {
                    displayNames
                },
                message: `Must provide a list of displayName or membershipId`
            });
        }

        membershipIds = membershipIds ? membershipIds.split(',') : [];
        displayNames = displayNames ? displayNames.split(','): [];
        if((displayNames.length + membershipIds.length) % 2 === 1) {
            return Promise.reject({
                details: {
                    displayNames,
                    membershipIds
                },
                message: `Number of displayNames + membershipIds provided should be even`
            });
        }

        let displayNamePromises = displayNames.map(displayName => playerAggregateStatsByName({platform, displayName}, {activityMode})),
            membershipIdPromises = membershipIds.map(membershipId => playerAggregateStatsById({platform, membershipId}, {activityMode}));
        return Promise.all(displayNamePromises.concat(membershipIdPromises))
            .then(players => _.sortBy(players, o => o.aggregateStats[aggregate]).reverse())
            .then(players => generateTeams(players, aggregate));
    }
});

module.exports = aggregateStatsEndpoint;


// http://localhost:8081/api/matchmaking/aggregate-stats/4?displayNames=dasWoj%231113,dandandan%231503,epik%231998,gjein%232953,villealexi%232746,friedpk%231298