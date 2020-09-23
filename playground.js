const check = require('./index');

const main = async () => {
  try {
    console.log('Bad SSL');
    await check({
      url: 'https://expired.badssl.com',
      keyword: 'agentslugdsfdsfsfsdfd',
      redirectsLimit: 2
    })

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
