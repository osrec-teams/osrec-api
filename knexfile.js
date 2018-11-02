module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'osrec',
      host: '127.0.0.1',
      user: process.env.USER,
      password: process.env.USER,
      charset: 'utf8',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'osrec',
      user: process.env.USER,
      password: process.env.USER,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
