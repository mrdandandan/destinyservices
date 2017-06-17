const router = require('express').Router();
let matchmaking = require('./matchmaking');

matchmaking.forEach(endpoint => {
    router[endpoint.method.toLowerCase()](`matchmaking/${endpoint.route}`, endpoint.routeHandler);
});


module.exports = router;