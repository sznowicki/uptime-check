const {assert} = require('chai');
const HTTPCodesToLang = require('../../lang/http-codes-to-lang');

describe('HTTPCodesToLang', () => {
    describe('.toLang', () => {
        let instance;
        it('should create instance', () => {
            instance = new HTTPCodesToLang(1000);
            assert(typeof instance.definitions === 'object');
            assert(instance.definitions['100'] === 'Continue');
        });

        it('should translate code to lang', () => {
            assert(instance.toLang(404) === 'Not Found');
        });

        it('should return unknown code message', () => {
            assert(instance.toLang(999) === 'Not specified HTTP status');
        });
    });
});
