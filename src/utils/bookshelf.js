const knexfile = require('../../knexfile.js');
const dbConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return knexfile.development;
    case 'production':
      return knexfile.production;
    case 'test':
      return knexfile.test;
    default:
      throw new Error('Invalid NODE_ENV variable');
  }
};
const knex = require('knex')(dbConfig());
module.exports = require('bookshelf')(knex);
