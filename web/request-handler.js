var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //remove http:// and https:// subString
  //
  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, '/public/index.html');
    } else if (/www\.\S*\.\S*/.test(res.url)) {
      var isArchived = archive.isURLArchived(req.url);
      if (isArchived) {
        httpHelpers.serveAssets(res, '../archives/sites' + req.url); //missing /?
      } else {
        var inList = archive.isUrlInList(req.url);
        if (!inList) {
          archive.addUrlToList(req.url);
        }
        httpHelpers.serveAssets(res, '/public/loading.html');
      }
    } else if (/\S*\.\S*/.test(req.url)) {
      httpHelpers.serveAssets(res, '/public/' + req.url);
    }
  }
  // use regExp
  // check for
  // res.end(archive.paths.list);
};
