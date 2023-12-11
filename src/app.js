const express = require('express')
const app = express()
const port = 3000
const host ='0.0.0.0';

const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/apimusic');

app.use(express.urlencoded());
app.use(express.json());

const musiqueRoute = require('./routes/musiqueRoute');
app.use('/musiques', musiqueRoute);


const voteRoute = require('./routes/voteRoute');
app.use('/', voteRoute);

app.listen(port,host);