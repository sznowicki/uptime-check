const check = require('./index');

const main = async () => {
  try {
    console.log('Bad SSL');
    const badSSL = await check({
      url: 'https://expired.badssl.com',
      keyword: 'agentslugdsfdsfsfsdfd',
      redirectsLimit: 2
    })

    console.log(badSSL.status, badSSL.httpCode);

    const result = await check({
      url: 'https://agentslug.com',
      keyword: 'agent',
      redirectsLimit: 2
    });

    console.log(result.status, result.httpCode);

  } catch (error) {

  }
};

main();
