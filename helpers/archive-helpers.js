var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths= paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites/'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// require in htmlFetch
exports.readListOfUrls = readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, data){
    callback(data);
  });
};

// require in requestHandler, to check if url exists before adding to the sites.txt file
exports.isUrlInList = function(url, callback){
  var sitesList;
  var urlInList = false;
  exports.readListOfUrls(function (data) {
    sitesList = data.toString().split('\n');
    for(var i = 0; i< sitesList.length; i++){
      if(url === sitesList[i]){
        urlInList = true;
      }
    }
    callback(urlInList);
  });


};

// require in requestHandler, if url is not already in the list, add it
exports.addUrlToList = function(url){
  fs.appendFile(exports.paths.list, url, function(err){
    if(err){
      console.log('Error: Archive-helper, line 57', err);
    }
  });
};

exports.blockingIsURLArchived = function (url) {
  return fs.existsSync(exports.paths.archivedSites + url);
};

// require in requestHandler, if url is found, render the page
// require in fetch, if not, download urls
exports.isURLArchived = function(url, callback){
  //do we need to reurn the results of this called function?
  console.log(__dirname +"/"+ url);
  console.log(url);

  fs.exists(exports.paths.archivedSites + url, function(exists){
    console.log(exists);
    callback(exists);
  });
};

// require in htmlFetch
exports.downloadUrls = function(url){
  var sitePath = fs.createWriteStream(path.join(exports.paths.archivedSites, url));
  request('http://' + url).pipe(sitePath);
};
