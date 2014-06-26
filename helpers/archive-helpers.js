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

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
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
exports.readListOfUrls = function(){
  var sitesList;
  fs.readFile(this.paths.list, function(err, file){
    //turn sites.txt to string
    //use split(/n) to turn that sting into an array
    sitesList = file.toString().split('\n');
  });
  //return Array
  return sitesList;
};

// require in requestHandler, to check if url exists before adding to the sites.txt file
exports.isUrlInList = function(url){
  var sitesList = this.readListOfUrls();
  for(var i = 0; i< siteList.length; i++){
    if(url === siteList[i]){
      return true;
    }
  }
  return false;
};

// require in requestHandler, if url is not already in the list, add it
exports.addUrlToList = function(url){
  fs.appendFile(this.paths.list, '\n'+ url, function(err){
    if(err){
      console.log('Error: ', err);
    }
  });
};

// require in requestHandler, if url is found, render the page
// require in fetch, if not, download urls
exports.isURLArchived = function(url){
  //do we need to reurn the results of this called function?
  var urlExists = false;
  fs.exists(this.path.archivedSites + url, function(exists){
    if(exists){
      urlExists = true;
    }
  });
  return urlExists;
};

// require in htmlFetch
exports.downloadUrls = function(url){
  var sitePath = fs.createWriteStream(this.path.archivedSites + url);
  request('http://' + url).pipe(sitePath);
};
