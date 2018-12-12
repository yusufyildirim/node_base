const supertest = require('supertest'); // eslint-disable-line node/no-unpublished-require
const conf = require('./config');

const server = supertest.agent(conf.url);

test('auth/login user not found', (done) => {
  server
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send({ email: 'x@xxxx1111111.com', password: '123123123' })
    .expect(400)
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});

test('auth/login valid login', (done) => {
  server
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send({ email: conf.auth.email, password: conf.auth.password })
    .expect(200)
    .expect((response) => {
      expect(response.body).toBeDefined();
      // expect(response.body).toHaveProperty('token2');
      expect(response.body.token).toBeDefined();
    })
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});
