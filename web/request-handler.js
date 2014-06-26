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
    } else if (/www\.\S*\.\S*/) {
      var isArchived = archive.isURLArchived(res.url);
      if (isArchived) {
        httpHelpers.serveAssets(res, '../archives/sites' + res.url);
      } else {
        var inList = archive.isUrlInList(res.url);
        if (inList) {

        }

      }


    }
  }
  // use regExp
  // check for
  // res.end(archive.paths.list);
};
