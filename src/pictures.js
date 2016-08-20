'use strict';
(function() {
  window.CallbackRegistry = {};
  var picturesUrl = '/api/pictures';
  var pictures = null;
  var picturesContainer = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template');
  var elementToClone = templateElement.content.querySelector('.picture');
  var picturesCallback = function(data) {
    pictures = data;
    var hiddenFilters = document.querySelector('.filters');
    hiddenFilters.classList.add('hidden');
    pictures.forEach(function(picture, i) {
      loadImages(picture, picturesContainer, i);
    });
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

  var loadImages = function(data, container, i) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.picture-likes').textContent = data.likes;
    element.querySelector('.picture-comments').textContent = data.comments;
    var imgPicture = element.querySelector('img');
    var img = new Image(182, 182);
    i = i + 1;
    img.src = 'photos/' + i + '.jpg';
    img.onload = function() {
      imgPicture.src = img.src;
    };
    img.onerror = function() {
      element.classList.add('picture-load-failure');
    };
    container.appendChild(element);
    return element;
  };
}());
