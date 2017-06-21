class ApiEndpoint {
    constructor({name, route, query = [], body = [], method, requestHandler}) {
        this.name = name;
        this.route = route;
        this.method = method.toUpperCase();
        this.requestHandler = requestHandler;
        this.query = query;
        this.body = body;

        this.handleRequest = this.handleRequest.bind(this);
    }

    handleRequest(req, res) {
        this[this.method](...arguments)
            .then(output => {
                res.json(output);
            });
    }

    GET(req, res) {
        return this.requestHandler(req.params, req.query);
    }

    POST(req, res) {
        return this.requestHandler(req.params, req.body);
    }
}

module.exports = ApiEndpoint;