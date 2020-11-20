const redis = require('redis');
const client = redis.createClient(6379);

function cache(req, res, next) {
    const { id } = req.params;
    client.get(id, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.json(data);
        } else {
            next();
        }
    });
}

module.exports = cache;