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
      // require and require www
    } else if (/\?url=www\.\S*\.\S*/.test(req.url)) {
      req.url = req.url.slice(6);
      archive.isURLArchived(req.url, function (isArchived) {
        console.log(isArchived);
        console.log(req.url);
        if (isArchived) {
          httpHelpers.serveAssets(res, '../archives/sites/' + req.url);
        } else {
          archive.isUrlInList(req.url, function (isInList) {
            if (isInList) {
              archive.addUrlToList(req.url);
            }else {
              httpHelpers.serveAssets(res, '/public/loading.html');
            }
          });
        }
      });
    } else if (/\S*\.(css|js|html)/.test(req.url)) {
      console.log("this is the url you wanted: ", req.url);
      // httpHelpers.serveAssets(res, req.url);
      httpHelpers.serveAssets(res, '/public' + req.url);
    }
  }
  // use regExp
  // check for
  // res.end(archive.paths.list);
};

// (/www\.google\.com/).test(fileText)
