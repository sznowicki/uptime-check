const chai = require('chai');
const should = chai.should();
const assert = chai.assert;

const check = require('../index');

const correctUrl = 'https://agentslug.com/';
const redirectUrl = 'http://agentslug.com';

const propertiesRequired = [
  'httpCode',
  'httpCodeLang',
  'nameLookupTime',
  'connectTime',
  'preTransferTime',
  'startTransferTime',
  'response',
  'headerSize',
  'bodySize',
  'header',
  'body',
  'status',
  'redirectsCount',
  'effectiveUrl'
];

describe('Uptime test', function () {
  it(`should test ${correctUrl} and finish with status: true`, function (done) {
    this.timeout(4000);
    check({
      url: correctUrl,
      keyword: 'agentslug'
    })
      .then((result) => {
        propertiesRequired.forEach(property => {
          result.should.have.property(property);
        });
        result.httpCode.should.be.a('number');
        result.httpCodeLang.should.be.a('string');
        result.status.should.be.equal(true);

        return done();
      })
      .catch((err) => {
        setTimeout(() => {
          assert(false, err.message);
          return done();
        });
      })
  });
  it(`test ${correctUrl} without keyword and finish with status: true`, function (done) {
    this.timeout(4000);
    check({
      url: correctUrl
    })
      .then(result => {
        propertiesRequired.forEach(property => {
          result.should.have.property(property);
        });
        result.httpCode.should.be.a('number');
        result.httpCodeLang.should.be.a('string');
        result.status.should.be.equal(true);

        return done();
      })
      .catch((err) => {
        setTimeout(() => {
          assert(false, err.message);
          return done();
        })
      })
  });
  it(`should test ${redirectUrl} with default redirects limit and finish with status: true`, function (done) {
    this.timeout(4000);
    check({
      url: redirectUrl
    })
      .then(result => {
        propertiesRequired.forEach(property => {
          result.should.have.property(property);
        });
        result.httpCode.should.be.a('number');
        result.httpCodeLang.should.be.a('string');
        result.status.should.be.equal(true);
        result.effectiveUrl.should.be.equal(correctUrl);
        result.redirectsCount.should.be.equal(1);

        return done();
      })
      .catch((err) => {
        setTimeout(() => {
          assert(false, err.message);
          return done();
        })
      })
  });
  it(`should test ${redirectUrl} with no redirects limit and finish with status: false`, function (done) {
    this.timeout(4000);
    check({
      url: redirectUrl,
      redirectsLimit: 0,
    })
      .then(result => {
        assert(false, 'Uptime should fail but promise is resolved.');
        return done();
      })
      .catch((result) => {
        propertiesRequired.forEach(property => {
          result.should.have.property(property);
        });
        result.httpCode.should.be.a('number');
        result.httpCodeLang.should.be.a('string');
        result.status.should.be.equal(false);
        return done();
      })
  });
});