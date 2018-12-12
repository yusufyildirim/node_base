const supertest = require('supertest'); // eslint-disable-line node/no-unpublished-require
const conf = require('./config');
const objection = require('../utils/objection');// eslint-disable-line no-unused-vars

const { User } = require('../models');

const server = supertest.agent(conf.url);
server.set('Accept', 'application/json');

beforeAll(async (done) => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  // delete test user first
  await User
    .query()
    .delete()
    .where('email', conf.auth.email);
  done();
});

test('auth/register parameter check', async (done) => {
  const response = await server
    .post('/auth/register')
    .send({ })
    .expect(400);
  expect(response.body.type).toBeDefined();
  expect(response.body.type).toEqual('ModelValidation');
  done();
});

test('auth/register valid registration', async (done) => {
  const response = await server
    .post('/auth/register')
    .send(conf.user)
    .expect(200);
  // expect(response.body).toHaveProperty('token2');
  expect(response.body.token).toBeDefined();
  done();
});

test('auth/register user already exist', async (done) => {
  const response = await server
    .post('/auth/register')
    .send(conf.user)
    .expect(400);
  expect(response.body.error.code).toBeDefined();
  expect(response.body.error.code).toEqual('user_exists');
  done();
});

test('auth/login parameter check', async (done) => {
  await server
    .post('/auth/login')
    .send({ })
    .expect(400);
  done();
});

test('auth/login user not found', async (done) => {
  await server
    .post('/auth/login')
    .send({ email: 'x@xxxx1111111.com', password: '123123123' })
    .expect(400);
  done();
});

test('auth/login valid login', async (done) => {
  const response = await server
    .post('/auth/login')
    .send({ email: conf.auth.email, password: conf.auth.password })
    .expect(200);

  expect(response.body.token).toBeDefined();
  done();
});
