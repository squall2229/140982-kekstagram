'use strict';

var load = function(url, callback) { // + object
  var xhr = new XMLHttpRequest();
  //var param = '?from=' + object.from + '&to=' + object.to + '&filter=' + object.filter;
  xhr.open('GET', url, true); // + param

  xhr.onload = function() {
    var jsonData = JSON.parse(xhr.responseText);
    callback(jsonData);
  };

  xhr.send();
};
module.exports = load;
