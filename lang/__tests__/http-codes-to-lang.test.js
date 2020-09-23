const HTTPCodesToLang = require('../http-codes-to-lang');

describe('HTTPCodesToLang', () => {
  describe('.toLang', () => {
    let instance;
    it('should create instance', () => {
      instance = new HTTPCodesToLang(1000);
      expect(typeof instance.definitions).toBe('object');
      expect(instance.definitions['100']).toBe('Continue');
    });

    it('should translate code to lang', () => {
      expect(instance.toLang(404)).toBe('Not Found');
    });

    it('should return unknown code message', () => {
      expect(instance.toLang(999)).toBe('Not specified HTTP status');
    });
  });
});
