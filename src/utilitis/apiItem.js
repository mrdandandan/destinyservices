module.exports = (route, method, requestHandler) => {
    return {
        route,
        method,
        requestHandler: (req, res) => {
            switch(method) {
                case 'GET':
                    requestHandler(req.params, req.query)
                        .then(output => {
                            res.json(output);
                        });
                    break;
                case 'POST':

                    break;
            }
        }
    };
};