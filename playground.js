const check = require('./index');

const main = async () => {
  try {
    console.log('Bad SSL');
    const badSSL = await check({
      url: 'https://expired.badssl.com',
      keyword: 'agentslugdsfdsfsfsdfd',
      redirectsLimit: 2
    })

    console.log(badSSL.status, badSSL.httpCode, badSSL);

    const result = await check({
      url: 'https://agentslug.com/dsfsdfsd',
      keyword: 'agent',
      redirectsLimit: 2
    });

    console.log(result, result.httpCode);

  } catch (error) {

  }
};

main();
