const { Curl } = require('node-libcurl');

const makeCall = () => new Promise((resolve, reject) => {
  const curl = new Curl();

  curl.setOpt('URL', 'http://localhost');
  curl.setOpt('CONNECTTIMEOUT', 1);
  curl.setOpt('TIMEOUT', 1);

  curl.on('error', () => reject());

  curl.on('end', () => {
    console.log('END END END, now resolve');
    resolve()
  });

  curl.perform();
});


describe('Promisified curl call test', () => {
  it('should success, pure curl', (done) => {
    const curl = new Curl();

    curl.setOpt('URL', 'https://example.com');

    curl.on('error', () => {
      throw new Error('PURE ERROR')
    });

    curl.on('end', () => {
      console.log('PURE DONE');
      done()
    });

    curl.perform();
  });

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
    console.warn('ASYNC/AWAIT DONE');
  });
});