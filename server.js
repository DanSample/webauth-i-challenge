const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/users-router');

const sessionOptions = {
  name: 'mycookie',
  secret: 'cookiesareyumyummewantcookies',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    knex: require('./database/dbConfig.js'),
    tablename: 'session',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use('/api', usersRouter);

server.get('/', (req, res) => {
  res.send({ api: 'up' });
});

module.exports = server;
