const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).josn({ message: 'Invalid Credentials' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(403).json({ message: 'You Shall Not Pass' });
  }
}

module.exports = restricted;
