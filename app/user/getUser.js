const redis = require('redis');
const client = redis.createClient(6379);
let userSchema = require('./userModel');

async function getUser(req, res, next) {
    try {
        const { id } = req.params;
        await userSchema.findById(id, (err, getUser) => {
            if (!getUser) {
                res.status(404).send('User does not exist');
            }
            // Set data to Redis
            client.setex(id, 60, JSON.stringify(getUser));
            res.json(getUser);
        });
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports = getUser;