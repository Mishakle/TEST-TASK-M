let userSchema = require('./userModel');

async function postUser(req, res, next) {
    try {
        const { name, birthday, gender } = req.body;
        const user = new userSchema({ name, birthday, gender });
        const newUser = await user.save();
        res.json(newUser);
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports = postUser;