const request = require('supertest');
const { omit } = require('lodash');

const bookshelf = require('../../utils/bookshelf.js');

const { knex } = bookshelf;

const app = require('../../app.js');

beforeEach(async () => {
  await knex.migrate.latest();
});

afterEach(async () => {
  await knex.migrate.rollback();
  app.close();
});

afterAll(async () => {
  await knex.destroy();
});

describe('POST /users', () => {
  const userData = {
    username: 'odin',
    password: 'od1',
    email: 'odin@test.com',
  };

  test("route won't save user if username is not specified", async () => {
    const res = await request(app)
      .post('/users')
      .send(omit(userData, 'username'));
    expect(res.status).toEqual(400);
    expect(res.text).toMatch(/"username" is required/);
  });

  test("route won't save user if password is not specified", async () => {
    const res = await request(app)
      .post('/users')
      .send(omit(userData, 'password'));
    expect(res.status).toEqual(400);
    expect(res.text).toMatch(/"password" is required/);
  });

  test("route won't save user if email is not specified", async () => {
    const res = await request(app)
      .post('/users')
      .send(omit(userData, 'email'));
    expect(res.status).toEqual(400);
    expect(res.text).toMatch(/"email" is required/);
  });

  test("route won't save user if email is a duplicate", async () => {
    await knex.insert(userData).into('users');
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.status).toEqual(400);
    expect(res.text).toMatch(
      /duplicate key value violates unique constraint "users_email_unique"/,
    );
  });
});
