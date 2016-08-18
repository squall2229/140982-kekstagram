'use strict';
(function() {
  window.CallbackRegistry = {};
  var picturesUrl = '/api/pictures';
  var pictures = null;
  var picturesCallback = function(data) {
    pictures = data;
  };
  var loadJsonp = function(url, callback) {
    if (typeof callback === 'function' && typeof url === 'string') {
      var callbackName = 'cb' + String(Math.random()).slice(-6);
      window.CallbackRegistry[callbackName] = callback;
      url += '?callback=CallbackRegistry.' + callbackName;
      var scriptElement = document.createElement('script');
      scriptElement.src = url;
      document.body.appendChild(scriptElement);
    }
  };
  loadJsonp(picturesUrl, picturesCallback);
}());
