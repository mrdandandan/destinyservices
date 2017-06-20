const bungie = require('mrdandandan-destiny-api-module').default;
const {PLATFORM, ACTIVITY_MODE, GENDER_HASH, RACE_HASH, CLASS_HASH} = require('../../constants');

let ApiEndpoint = require('../../utilitis/ApiEndpoint'),
    Convert = require('../../utilitis/Convert');

let _ = require('lodash');

let membershipIdsEndpoint = new ApiEndpoint(
    'By MembershipId',
    'membershipIds/:platform',
    'GET',
    ({platform}, {membershipIds = [], activityMode = ACTIVITY_MODE.AllPvP}) => {
        let promises = membershipIds.map(membershipId => _getCharactersWithStats(membershipId, platform, activityMode)
            .then(_aggregateCharacterStats));

        return Promise.all(promises)
            .then(players => {
                return _.sortBy(players, (o) => {
                    return o.aggregateStats.killsDeathsRatio
                }).reverse();
            }).then(players => {
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
            })
            .then(results => {
                return results.reduce((output, player) => {
                    let arr = [],
                        {displayName, team, aggregateStats} = player;
                    switch(team) {
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
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }
);

module.exports = membershipIdsEndpoint;


function _aggregateCharacterStats(characters) {
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

    return {
        aggregateStats,
        characters,
        displayName: characters[0].displayName
    }
}

function _getCharactersWithStats(membershipId, platform, activityMode = ACTIVITY_MODE.AllPvP) {
    return _getDisplayName(membershipId, platform)
        .then(displayNameResponse => _getAccountSummary(membershipId, platform)
            .then(accountSummaryResponse => {
                let promises = accountSummaryResponse.characters.map(character => {
                    return bungie.stats.all({
                        membershipType: platform,
                        membershipId,
                        characterId: character.characterBase.characterId,
                        modes: activityMode
                    }).then(stats => {
                        let allStats = stats[_uncapitalize(ACTIVITY_MODE.toString(+activityMode))];
                        allStats = allStats ? allStats.allTime : undefined;

                        return {
                            displayName: displayNameResponse.destinyAccounts[0].userInfo.displayName,
                            membershipId: character.characterBase.membershipId,
                            characterId: character.characterBase.characterId,
                            race: RACE_HASH.toString(character.characterBase.raceHash),
                            gender: GENDER_HASH.toString(character.characterBase.genderHash),
                            class: CLASS_HASH.toString(character.characterBase.classHash),
                            emblem: character.emblemPath,
                            background: character.backgroundPath,
                            stats: allStats
                        }
                    })
                });
                return Promise.all(promises);
            })
        );
}


function _getAccountSummary(membershipId, platform) {
    return bungie.account.summary({
        membershipType: platform,
        membershipId
    });
}

function _getDisplayName(membershipId, platform) {
    return bungie.user.getBungieAccount({
        membershipId,
        membershipType: platform
    });
}

function _uncapitalize(word) {
    return word[0].toLowerCase() + word.substr(1);
}
