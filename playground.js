const check = require('./index');

check({
  url: 'https://expired.badssl.com',
  keyword: 'agentslugdsfdsfsfsdfd',
  redirectsLimit: 2
})
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
