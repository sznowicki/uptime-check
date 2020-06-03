const chai = require('chai');
const assert = require('assert')

const check = require('../index');

chai.should();
const correctUrl = 'https://agentslug.com/en';
const redirectUrl = 'http://agentslug.com';
const notFoundUrl = 'https://agentslug.com/404-link';
const invalidUrl = 'invalidurl';

const propertiesRequired = [
  'httpCode',
  'httpCodeLang',
  'bodySize',
  'headers',
  'body',
  'status',
  'redirectsCount',
  'effectiveUrl',
  'totalTime'
];

describe('index', () => {
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
          result.headers.should.be.an('object');
          // non regression - not full body is gathered
          result.body.length.should.be.equal(result.bodySize);

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
          result.headers.should.be.an('object');

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
          result.redirectsCount.should.be.equal(2);
          result.headers.should.be.an('object');

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
          propertiesRequired.forEach(property => {
            result.should.have.property(property);
          });
          result.httpCode.should.be.a('number');
          result.httpCodeLang.should.be.a('string');
          result.status.should.be.equal(false);
          result.headers.should.be.an('object');
          return done();
        })
    });
  });

  describe('Downtime test', function () {
    it(`should test ${notFoundUrl} and fail`, function (done) {
      this.timeout(4000);
      check({
        url: notFoundUrl,
      })
        .then(result => {
          result.status.should.be.equal(false);
          done();
        })
    });
  });

  describe('Error handling', () => {
    it('should reject on invalid url', () => {
      assert.rejects(() => {
        return check({
          url: invalidUrl,
        });
      });
    });
    it('should reject on missing url', () => {
      assert.rejects(() => {
        return check({});
      });
    });

    it('should reject on wrong type', () => {
      assert.rejects(() => {
        return check({
          url: 'https://example.com',
          redirectsLimit: 'yes'
        });
      });

      assert.rejects(() => {
        return check({
          url: 'https://example.com',
          timeOut: 'yes'
        });
      });

      assert.rejects(() => {
        return check({
          url: 'https://example.com',
          keyword: true
        });
      });

      assert.rejects(() => {
        return check({
          url: true,
        });
      });
    });
  });
});
