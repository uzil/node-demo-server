/* eslint-disable func-names, prefer-arrow-callback, import/no-extraneous-dependencies */

'use strict';

const { expect } = require('chai');
const jwt = require('../utils/jwt');


describe('#JWT Functions', function () {
  it('should decode jwt token', function (done) {
    const payload = {
      username: 'user',
      password: 'pass'
    };

    jwt.generateToken(payload)
      .then(jwt.verifyToken)
      .then((decodedData) => {
        expect(decodedData.username).to.equal(payload.username);
        expect(decodedData.password).to.equal(payload.password);
        done();
      })
      .catch(done);
  });
});
