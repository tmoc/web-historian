var cronJob = require('cron').CronJob;
var fetch = require('./htmlfetcher.js').fetch;

module.exports = job = new cronJob('05 * * * * *', function(){
  fetch();
}, null, true, "America/Los_Angeles");

