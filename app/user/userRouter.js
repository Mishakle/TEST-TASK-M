const express = require('express');
const router = express.Router();
const cache = require('../../cacheMiddleware/cacheMiddleware');
const getUser = require('./getUser');
const postUser = require('./postUser');
const changeUser = require('./changeUser');

// GET certain user by id
router.get('/user/:id', cache, getUser);

// POST user into a db
router.post('/user', postUser);

// CHANGE user information
router.put('/user/:id', cache, changeUser)

module.exports = router;
