const bookshelf = require('./bookshelf.js');
const bcrypt = require('bcryptjs');

const SALT_ROUND = 10;

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  hashPassword: (model, attrs) => {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(SALT_ROUND, function(err, salt) {
        if (err) return reject(err);
        bcrypt.hash(model.attributes.password, salt, function(err, hash) {
          if (err) return reject(err);
          model.set('password', hash);
          resolve();
        });
      });
    });
  },
});

module.exports = User;
