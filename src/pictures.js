'use strict';
var Picture = require('./picture');
var load = require('./load');
var gallery = require('./gallery');

module.exports = function() {
  var picturesUrl = '/api/pictures';
  var pictures;
  var picturesContainer = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template');
  var elementToClone = templateElement.content.querySelector('.picture');
  var hiddenFilters = document.querySelector('.filters');

  var picturesCallback = function(data) {
    pictures = data;
    pictures.forEach(function(picture, index) {
      var newPicture = new Picture(picture, picturesContainer, elementToClone, index);
      picturesContainer.appendChild(newPicture.element);
    });
    gallery.setPictures(pictures);
    hiddenFilters.classList.remove('hidden');
  };

  hiddenFilters.classList.add('hidden');
  load(picturesUrl, picturesCallback); // + object
};
