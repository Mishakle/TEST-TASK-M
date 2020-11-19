const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./app/user/userRouter');
const app = express();
const url = 'mongodb://127.0.0.1:27017/cruddb';

// mongo connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => console.log('Mongodb connection established successfully'));

app.use(express.json());
app.use(userRouter);


app.listen(3000, () => {
    console.log('server is running on port 3000');
})