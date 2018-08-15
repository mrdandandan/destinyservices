const Convert = require('../../utilitis/Convert');

function generateTeams(players = [], aggregate = 'killsDeathsRatio') {
    const getAggregateAverage = (arr, aggregate) => arr.reduce((output, player) => {
        return output + +player.aggregateStats[aggregate];
    }, 0) / arr.length;

    let iterations = 0,
        maxIterations = 50,
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

    let limitedTeams = possibleTeams.slice(0, possibleTeams.length > 5 ? 5 : possibleTeams.length),
        teams = limitedTeams[randomIndex(limitedTeams)],
        output = {
            aggregate,
            alphaAggregates: teams.alphaAggregates,
            bravoAggregates: teams.bravoAggregates,
            aggregateAverageDifference: teams.aggregateAverageDifference,
            aggregateStats: {},
            alpha: [],
            bravo: []
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

// const players = [
//     {
//         "displayName": "Sv rocks 3",
//         "aggregateStats": {
//             "assists": 10316,
//             "combatRating": 105.19,
//             "deaths": 31028,
//             "kills": 44959,
//             "killsDeathsAssists": 1.64,
//             "killsDeathsRatio": 1.48,
//             "winLossRatio": 1.69
//         }
//     },
//     {
//         "displayName": "XXL JIGSAW",
//         "aggregateStats": {
//             "assists": 22754,
//             "combatRating": 96.06,
//             "deaths": 58115,
//             "kills": 81092,
//             "killsDeathsAssists": 1.58,
//             "killsDeathsRatio": 1.38,
//             "winLossRatio": 2.07
//         }
//     },
//     {
//         "displayName": "mistervischous",
//         "aggregateStats": {
//             "assists": 38777,
//             "combatRating": 86.29,
//             "deaths": 99173,
//             "kills": 136726,
//             "killsDeathsAssists": 1.54,
//             "killsDeathsRatio": 1.34,
//             "winLossRatio": 1.22
//         }
//     },
//     {
//         "displayName": "A tasty samichx",
//         "aggregateStats": {
//             "assists": 7572,
//             "combatRating": 95.55,
//             "deaths": 23679,
//             "kills": 29646,
//             "killsDeathsAssists": 1.49,
//             "killsDeathsRatio": 1.34,
//             "winLossRatio": 1.44
//         }
//     },
//     {
//         "displayName": "Slothee",
//         "aggregateStats": {
//             "assists": 15291,
//             "combatRating": 71.02,
//             "deaths": 30663,
//             "kills": 37421,
//             "killsDeathsAssists": 1.49,
//             "killsDeathsRatio": 1.23,
//             "winLossRatio": 0.86
//         }
//     },
//     {
//         "displayName": "Riv3rmon5ters",
//         "aggregateStats": {
//             "assists": 8554,
//             "combatRating": 94.02,
//             "deaths": 21707,
//             "kills": 25037,
//             "killsDeathsAssists": 1.24,
//             "killsDeathsRatio": 1.06,
//             "winLossRatio": 1.13
//         }
//     },
//     {
//         "displayName": "Thorecw00tstick",
//         "aggregateStats": {
//             "assists": 15684,
//             "combatRating": 74.48,
//             "deaths": 44216,
//             "kills": 49020,
//             "killsDeathsAssists": 1.23,
//             "killsDeathsRatio": 1.06,
//             "winLossRatio": 1.37
//         }
//     },
//     {
//         "displayName": "DJaye",
//         "aggregateStats": {
//             "assists": 20966,
//             "combatRating": 68.57,
//             "deaths": 56223,
//             "kills": 55270,
//             "killsDeathsAssists": 1.18,
//             "killsDeathsRatio": 0.99,
//             "winLossRatio": 1.68
//         }
//     }
// ];