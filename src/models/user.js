const bookshelf = require('./bookshelf.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
});

module.exports = User;
