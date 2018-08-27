const Convert = require('../../utilitis/Convert');

function generateTeams(players = [], aggregate = 'killsDeathsRatio') {
    const getAggregateAverage = (arr, aggregate) => arr.reduce((output, player) => {
        return output + +player.aggregateStats[aggregate];
    }, 0) / arr.length;

    let iterations = 0,
        maxIterations = Math.pow(players.length, 2) * 2,
        possibleTeams = [],
        allAggregates = Object.keys(players[0].aggregateStats);


    do {
        let iterationPlayers = players.slice(),
            alpha = [],
            bravo = [],
            alphaAggregates = {},
            bravoAggregates = {};

        while (iterationPlayers.length > 0) {
            alpha.push(iterationPlayers.splice(randomIndex(iterationPlayers), 1)[0]);
            bravo.push(iterationPlayers.splice(randomIndex(iterationPlayers), 1)[0]);
        }

        allAggregates.forEach(aggregate => {
            alphaAggregates[aggregate] = Convert.toRoundedValue(getAggregateAverage(alpha, aggregate), 4)
            bravoAggregates[aggregate] = Convert.toRoundedValue(getAggregateAverage(bravo, aggregate), 4)
        });

        let duplicate = false;
        for (let i = 0; i < possibleTeams.length; i++) {
            let team = possibleTeams[i];
            duplicate = isDuplicateArray(alpha, team.alpha) || isDuplicateArray(bravo, team.alpha);
            if (duplicate) {
                break;
            }
        }

        if (!duplicate) {
            possibleTeams.push({
                alpha,
                bravo,
                alphaAggregates,
                bravoAggregates,
                aggregateAverageDifference: Convert.toRoundedValue(Math.abs(alphaAggregates[aggregate] - bravoAggregates[aggregate]), 4)
            });
        }

    } while (++iterations < maxIterations);

    possibleTeams.sort((a, b) => {
        if (a.aggregateAverageDifference > b.aggregateAverageDifference) {
            return 1;
        }
        if (a.aggregateAverageDifference < b.aggregateAverageDifference) {
            return -1;
        }
        return 0;
    });

    let maxPossibleTeams = 6;
    if(players.length <= 4) {
        maxPossibleTeams = 2;
    } else if(players.length <= 6) {
        maxPossibleTeams = 4;
    }

    let limitedTeams = possibleTeams.slice(0, possibleTeams.length > 5 ? 5 : possibleTeams.length),
        teams = limitedTeams[randomIndex(limitedTeams)],
        output = {
            aggregate,
            alphaAggregates: teams.alphaAggregates,
            bravoAggregates: teams.bravoAggregates,
            aggregateAverageDifference: teams.aggregateAverageDifference,
            aggregateStats: {},
            alpha: [],
            bravo: [],
            maxPossibleTeams
        };

    teams.alpha.forEach(player => {
        output.alpha.push(player.displayName);
        output.aggregateStats[player.displayName] = player.aggregateStats;
    });
    teams.bravo.forEach(player => {
        output.bravo.push(player.displayName);
        output.aggregateStats[player.displayName] = player.aggregateStats;
    });

    return output;
}

function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function isDuplicateArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            return false;
        }
    }
    return true;
}

module.exports = generateTeams;