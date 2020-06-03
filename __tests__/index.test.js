const check = require('../index');

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
  const assertStandard = (result, status) => {
    propertiesRequired.forEach(property => {
      expect(typeof result[property]).not.toBe('undefined');
    });
    expect(typeof result.httpCode).toBe('number');
    expect(typeof result.bodySize).toBe('number');
    expect(typeof result.totalTime).toBe('number');
    expect(typeof result.httpCodeLang).toBe('string');
    expect(typeof result.headers).toBe('object');
    // non regression - not full body is gathered
    expect(result.body.length).toBe(result.bodySize);

    expect(result.status).toBe(status);
  };

  describe('Uptime test', () => {
    it(`should test ${correctUrl} and finish with status: true`, async () => {
      const result = await check({
        url: correctUrl,
        keyword: 'agentslug'
      })

      assertStandard(result, true);
    });

    it(`test ${correctUrl} without keyword and finish with status: true`, async () => {
      const result = await check({
        url: correctUrl
      });

      assertStandard(result, true);
    });

    it(`should test ${redirectUrl} with default redirects limit and finish with status: true`, async () => {
      const result = await check({
        url: redirectUrl
      });
      assertStandard(result, true);
    });

    it(`should test ${redirectUrl} with no redirects limit and finish with status: false`, async () => {
      const result = await check({
        url: redirectUrl,
        redirectsLimit: 0,
      });

      assertStandard(result, false);
    });
  });

  describe('Downtime test', () => {
    it(`should test ${notFoundUrl} and fail`, async () => {
      const result = await check({
        url: notFoundUrl,
      });

      assertStandard(result, false);
    });
  });

  describe('Bad SSL', () => {
    it('should fail', async () => {
      const result = await check({
        url: 'https://expired.badssl.com',
      });

      assertStandard(result, false);
      expect(result.errorCode).toBe('CERT_HAS_EXPIRED');
    });
  })

  describe('Error handling', () => {
    it('should reject on invalid url', () => {
      expect(() => {
        return check({
          url: invalidUrl,
        });
      }).rejects.toThrow();
    });
    it('should reject on missing url', () => {
      expect(() => {
        return check({});
      }).rejects.toThrow();
    });

    it('should reject on wrong type', () => {
      expect(() => {
        return check({
          url: 'https://example.com',
          redirectsLimit: 'yes'
        });
      }).rejects.toThrow();

      expect(() => {
        return check({
          url: 'https://example.com',
          timeOut: 'yes'
        });
      }).rejects.toThrow();

      expect(() => {
        return check({
          url: 'https://example.com',
          keyword: true
        });
      }).rejects.toThrow();

      expect(() => {
        return check({
          url: true,
        });
      }).rejects.toThrow();
    });
  });
});
