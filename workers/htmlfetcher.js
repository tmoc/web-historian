// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archiveHelpers = require('../helpers/archive-helpers.js');

//I am a function
exports.fetch =function(){

  // read list of urls
  var sitesList;
  archiveHelpers.readListOfUrls(function (data) {
    sitesList = data.toString().split('\n');
    console.log('sitesList: ', sitesList);

    for(var i = 0; i < sitesList.length; i++){
      var isArchived = archiveHelpers.blockingIsURLArchived(sitesList[i]);
      if(!isArchived) {
        archiveHelpers.downloadUrls(sitesList[i]);
      }

    }
  });

//run?
// fetch();
};
