const router = require('express').Router();

const db = require('../database/dbConfig.js');

const bcrypt = require('bcryptjs');

const Users = require('./users/users-model.js');

router.get('/users', (req, res) => {});

router.post('/register', (req, res) => {});

router.post('/login', (req, res) => {});

module.exports = router;
