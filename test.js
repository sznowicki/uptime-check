const check = require('./index');

check({
  url: 'http://api.agentslug.com',
  keyword: 'agentslugdsfdsfsfsdfd',
  redirectsLimit: 2
})
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
