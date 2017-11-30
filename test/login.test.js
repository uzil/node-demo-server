/* eslint-disable func-names, prefer-arrow-callback, import/no-extraneous-dependencies */


'use strict';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const request = supertest.agent(app);

describe('#Login', function () {
  it('fail if username missing', function (done) {
    request
      .post('/login')
      .send({
        password: 'password'
      })
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('fail if password missing', function (done) {
    request
      .post('/login')
      .send({
        username: 'user'
      })
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('fail if request body missing', function (done) {
    request
      .post('/login')
      .expect(400)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        done();
      })
      .catch(done);
  });

  it('generate token', function (done) {
    request
      .post('/login')
      .send({
        username: 'user',
        password: 'pass'
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.haveOwnProperty('accessToken');
        done();
      })
      .catch(done);
  });
});
