'use strict';
var pictures = [];
var scripUrl = 'http://localhost:1506/api/pictures?callback=jsonpCallback';
var scriptEl = document.createElement('script');
var jsonpCallback = function(data) {
  pictures = data;
};

var picturesLoad = function(url, callbackData) {
  scriptEl.src = url;
  document.body.appendChild(scriptEl);
  callbackData;
};
picturesLoad(scripUrl, jsonpCallback(pictures));
