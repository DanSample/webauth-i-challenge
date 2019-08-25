const router = require('express').Router();

const db = require('../database/dbConfig.js');

const bcrypt = require('bcryptjs');

const Users = require('./users-model');

const restricted = require('../middleware');

router.get('/users', restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/register', async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  try {
    const saved = await Users.add(user);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({
      err
    });
  }
});

router.post('/login', restricted, (req, res) => {
  let { username } = req.headers;
  req.session.user = user;
  res.status(200).json({ message: `Welcome ${username}! have a cookie...` });
});

module.exports = router;
