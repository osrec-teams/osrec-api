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

describe('POST /auth', async () => {
  const userData = {
    username: 'frigg',
    password: 'fr1gg',
    email: 'frigg@asgard.com',
  };

  const loginData = { login: userData.username, password: userData.password };

  test("authentication won't succeed if login is not specified", async () => {
    const res = await request(app)
      .post('/auth')
      .send(omit(loginData, 'login'));
    expect(res.status).toEqual(400);
    expect(res.type).toBe('application/json');
    expect(res.body).toMatchObject({
      message: 'child "login" fails because ["login" is required]',
    });
  });

  test("authentication won't succeed if password is not specified", async () => {
    const res = await request(app)
      .post('/auth')
      .send(omit(loginData, 'password'));
    expect(res.status).toEqual(400);
    expect(res.type).toBe('application/json');
    expect(res.body).toMatchObject({
      message: 'child "password" fails because ["password" is required]',
    });
  });

  // test('authentication will succeed', async () => {
  //   await knex.insert(userData).into('users');
  //   const res = await request(app)
  //     .post('/auth')
  //     .send(loginData);
  //   expect(res.status).toEqual(200);
  //   expect(res.type).toBe('application/json');
  //   expect(res.body).toMatchObject({
  //     message: 'child "password" fails because ["password" is required]',
  //   });
  // });
});
