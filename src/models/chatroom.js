/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
/* eslint object-shorthand: 0 */

const bookshelf = require('../utils/bookshelf.js');

const User = bookshelf.Model.extend({
  tableName: 'chatrooms',
  hasTimestamps: true,
});

module.exports = User;
