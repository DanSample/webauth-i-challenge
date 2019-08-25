const router = require('express').Router();

const db = require('../database/dbConfig.js');

const bcrypt = require('bcryptjs');

const Users = require('./users-model');

router.get('/users', async (req, res) => {
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

router.post('/login', (req, res) => {});

module.exports = router;
