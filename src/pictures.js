'use strict';
var review = require('./review');
var load = require('./load');

(function() {
  window.CallbackRegistry = {};
  var picturesUrl = '/api/pictures';
  var pictures = null;
  var picturesContainer = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template');
  var elementToClone = templateElement.content.querySelector('.picture');
  var hiddenFilters = document.querySelector('.filters');

  var picturesCallback = function(data) {
    pictures = data;
    pictures.forEach(function(picture) {
      review(picture, picturesContainer, elementToClone);
    });

    hiddenFilters.classList.remove('hidden');
  };

  hiddenFilters.classList.add('hidden');
  load(picturesUrl, picturesCallback);

}());
