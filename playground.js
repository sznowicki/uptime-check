const check = require('./index');

const main = async () => {
  try {
    const badSSL = await check({
      url: 'https://expired.badssl.com',
      keyword: 'agentslugdsfdsfsfsdfd',
      redirectsLimit: 2
    });

    console.log(badSSL);

    const result = await check({
      url: 'https://agentslug.com/dsfsdfsd',
      keyword: 'agent',
      redirectsLimit: 2
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

main();
