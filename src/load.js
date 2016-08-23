'use strict';
module.exports = function(url, callback) {
  if (typeof callback === 'function' && typeof url === 'string') {
    var callbackName = 'cb' + String(Math.random()).slice(-6);
    window.CallbackRegistry[callbackName] = callback;
    url += '?callback=CallbackRegistry.' + callbackName;
    var scriptElement = document.createElement('script');
    scriptElement.src = url;
    document.body.appendChild(scriptElement);
  }
};