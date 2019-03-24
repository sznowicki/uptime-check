const check = require('./index');

check({
  url: 'https://agentslug.com',
  redirectsLimit: 2
})
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });