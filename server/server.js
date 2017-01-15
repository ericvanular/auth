'use strict';

import express from 'express';
import path from 'path';

import mongoose from 'mongoose';

import cors from 'cors';

import User from './models/User.js';
import passport from 'passport';
require('../config/passport')(passport);

const app = express();

// set env vars
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/chat_dev';
process.env.PORT = process.env.PORT || 3001;

// connect our DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use(cors());
app.use(passport.initialize());

// load routers
const beerRouter = express.Router();
const usersRouter = express.Router();
require('./routes/beer_routes')(beerRouter);
require('./routes/user_routes')(usersRouter, passport);
app.use('/api', beerRouter);
app.use('/api', usersRouter);

app.use(express.static(path.resolve(__dirname, '../client', 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
});

app.listen(process.env.PORT, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('server listening on port: %s', process.env.PORT);
});
