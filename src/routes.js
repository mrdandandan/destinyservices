function initialize(app) {
    app.use('/api', require('./services'));
}

module.exports = initialize;