const { Curl } = require('node-libcurl');

const makeCall = () => new Promise((resolve, reject) => {
  const curl = new Curl();

  curl.setOpt('URL', 'https://example.com');

  curl.on('error', () => reject());

  curl.on('end', () => {
    console.log('END END END, now resolve');
    resolve()
  });

  curl.perform();
});


describe('Promisified curl call test', () => {
  it('should resolve', (done) => {
    makeCall()
      .then(() => {
        console.warn('TEST DONE');
        done();
      })
      .catch(() => {
        console.warn('TEST CATCHED ERROR');
        done();
      })
  });

  it('should resolve (async/await way)', async () => {
    await makeCall();
  });
});