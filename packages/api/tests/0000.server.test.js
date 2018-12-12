const supertest = require('supertest'); // eslint-disable-line node/no-unpublished-require
const conf = require('./config');

const server = supertest.agent(conf.url);

test('should pass server up tests', (done) => {
  server
    .get('/test')
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});
