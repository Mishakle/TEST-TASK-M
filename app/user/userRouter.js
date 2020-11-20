const express = require('express');
const router = express.Router();
let userSchema = require('./userModel');
const redis = require('redis');
const client = redis.createClient(6379);
const cache = require('../../cacheMiddleware/cacheMiddleware');

// GET certain user by id
router.get('/user/:id', cache, async(req, res, next) => {
    try {
        const { id } = req.params;
        await userSchema.findById(id, async(err, getUser) => {
            if (!getUser) {
                res.status(404).send('User does not exist');
            }
            // Set data to Redis
            console.log(getUser);
            await client.setex(id, 60, JSON.stringify(getUser));
            res.json(getUser);
        });
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
})

// POST user into a db
router.post('/user', async(req, res, next) => {
    try {
        const { name, birthday, gender } = req.body;
        const user = new userSchema({ name, birthday, gender });
        const newUser = await user.save();
        res.json(newUser);
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
})

// CHANGE user information
router.put('/user/:id', cache, async(req, res, next) => {
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
                console.log(getUser);
                await client.setex(id, 60, getUser);
                res.json('User was updated');
            }
        });
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
})

module.exports = router;
