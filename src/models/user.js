const bookshelf = require('../utils/bookshelf.js');
const bcrypt = require('bcryptjs');

const SALT_ROUND = 10;

const hashPassword = (model, attrs) =>
  new Promise(function(resolve, reject) {
    bcrypt.genSalt(SALT_ROUND, function(err, salt) {
      if (err) return reject(err);
      bcrypt.hash(model.attributes.password, salt, function(err, hash) {
        if (err) return reject(err);
        model.set('password', hash);
        resolve();
      });
    });
  });

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  hashPassword,
});

module.exports = User;
