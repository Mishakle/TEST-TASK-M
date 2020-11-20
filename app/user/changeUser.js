const redis = require('redis');
const client = redis.createClient(6379);
let userSchema = require('./userModel');

async function changeUser(req, res, next) {
    try {
        const { id } = req.params;
        const { name, birthday, gender } = req.body;
        await userSchema.findById(id, async(err, getUser) => {
            if (!getUser) {
                res.status(404).send('User does not exist');
            } else {
                getUser.name = name;
                getUser.birthday = birthday;
                getUser.gender = gender;
                await getUser.save();
                // Set data to Redis
                await client.setex(id, 60, JSON.stringify(getUser));
                res.json('User was updated');
            }
        });
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports = changeUser;