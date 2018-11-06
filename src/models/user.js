/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
/* eslint object-shorthand: 0 */

const bcrypt = require('bcryptjs');
const bookshelf = require('../utils/bookshelf.js');

const SALT_ROUND = 10;

const hashPassword = model =>
  new Promise(function(resolve, reject) {
    return bcrypt.genSalt(SALT_ROUND, function(serr, salt) {
      if (serr) return reject(serr);
      return bcrypt.hash(model.attributes.password, salt, function(herr, hash) {
        if (herr) return reject(herr);
        model.set('password', hash);
        return resolve();
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
