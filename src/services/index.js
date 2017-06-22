const router = require('express').Router();
let crucible = require('./crucible');
let matchmaking = require('./matchmaking');
let player = require('./player');


crucible.forEach(endpoint => {
    const route = `/crucible/${endpoint.route}`;
    const method = endpoint.method.toLowerCase();
    router[method](route, endpoint.handleRequest);
});
matchmaking.forEach(endpoint => {
    const route = `/matchmaking/${endpoint.route}`;
    const method = endpoint.method.toLowerCase();
    router[method](route, endpoint.handleRequest);
});
player.forEach(endpoint => {
    const route = `/player/${endpoint.route}`;
    const method = endpoint.method.toLowerCase();
    router[method](route, endpoint.handleRequest);
});

router.get('/reflect', (req, res) => {
    let routes = {

        crucible: crucible.reduce((output, endpoint) => {
            output[endpoint.name] = {
                route: endpoint.route,
                method: endpoint.method,
                query: endpoint.query,
                body: endpoint.body
            };
            return output;
        }, {}),
        matchmaking: matchmaking.reduce((output, endpoint) => {
            output[endpoint.name] = {
                route: endpoint.route,
                method: endpoint.method,
                query: endpoint.query,
                body: endpoint.body
            };
            return output;
        }, {}),
        player: player.reduce((output, endpoint) => {
            output[endpoint.name] = {
                route: endpoint.route,
                method: endpoint.method,
                query: endpoint.query,
                body: endpoint.body
            };
            return output;
        }, {})
    };

    res.json(routes);
});


module.exports = router;