/* eslint-disable func-names, prefer-arrow-callback, import/no-extraneous-dependencies */

'use strict';

const { expect } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const app = require('../app');
const jwt = require('../utils/jwt');
const testApp = require('./server/express');

const request = supertest.agent(app);
const headers = {
  'x-access-token': 'super-long-jwt-token'
};

describe('#Auth', function () {
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it('reject if token is missing', function (done) {
    request
      .post('/createjsonpatch')
      .expect(403)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.message).to.be.equal('Forbidden');
        done();
      })
      .catch(done);
  });

  it('reject if token is invalid/expired', function (done) {
    sandbox.stub(jwt, 'verifyToken').rejects({});

    request
      .post('/createjsonpatch')
      .set(headers)
      .expect(401)
      .then(() => {
        done();
      })
      .catch(done);
  });
});

describe('#patchJSON', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    sandbox.stub(jwt, 'verifyToken').resolves({});
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('fail if request body missing', function (done) {
    request
      .post('/createjsonpatch')
      .set(headers)
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('fail if request body json missing', function (done) {
    request
      .post('/createjsonpatch')
      .set(headers)
      .send({
        patch: [
          { op: 'replace', path: '/baz', value: 'boo' },
          { op: 'add', path: '/hello', value: ['world'] },
          { op: 'remove', path: '/foo' }
        ]
      })
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('fail if request body patch missing', function (done) {
    request
      .post('/createjsonpatch')
      .set(headers)
      .send({
        json: {
          foo: 'bar'
        }
      })
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('fail if patch invalid', function (done) {
    request
      .post('/createjsonpatch')
      .set(headers)
      .send({
        json: {
          baz: 'boo',
          foo: ['world']
        },
        patch: [
          { op: 'rseplace', path: '/baz', value: 'boo' },
          { op: 'add', path: '/hello', value: ['world'] },
          { op: 'remove', path: '/foo' }
        ]
      })
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('patch json', function (done) {
    request
      .post('/createjsonpatch')
      .set(headers)
      .send({
        json: {
          baz: 'boo',
          foo: ['world']
        },
        patch: [
          { op: 'replace', path: '/baz', value: 'boo' },
          { op: 'add', path: '/hello', value: ['world'] },
          { op: 'remove', path: '/foo' }
        ]
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.baz).to.equal('boo');
        expect(res.body.hello).instanceOf(Array);
        expect(res.body.hello[0]).to.equal('world');
        done();
      })
      .catch(done);
  });
});

describe('#createThumbnail', function () {
  const sandbox = sinon.createSandbox();
  const PORT = 5000;
  let testServer;

  before(function (done) {
    testServer = testApp.listen(PORT, (err) => {
      if (err) return done(err);
      return done();
    });
  });

  beforeEach(function () {
    sandbox.stub(jwt, 'verifyToken').resolves({});
  });

  afterEach(function () {
    sandbox.restore();
  });

  after(function (done) {
    testServer.close();
    done();
  });

  it('fail if no url given', function (done) {
    request
      .get('/createthumbnail')
      .set(headers)
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('fail if invalid url given', function (done) {
    request
      .get('/createthumbnail?url=h++p://hello')
      .set(headers)
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('create thumbnail', function (done) {
    request
      .get(`/createthumbnail?url=http://localhost:${PORT}/image.jpg`)
      .set(headers)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });
});
