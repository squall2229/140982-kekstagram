'use strict';
var Picture = require('./picture');
var load = require('./load');
var gallery = require('./gallery');

module.exports = function() {
  window.CallbackRegistry = {};
  var picturesUrl = '/api/pictures';
  var pictures = null;
  var picturesContainer = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template');
  var elementToClone = templateElement.content.querySelector('.picture');
  var hiddenFilters = document.querySelector('.filters');

  var picturesCallback = function(data) {
    pictures = data;
    pictures.forEach(function(picture, index) {
      var newpicture = new Picture(picture, picturesContainer, elementToClone, index);
      picturesContainer.appendChild(newpicture.element);
    });
    gallery.setPictures(pictures);
    hiddenFilters.classList.remove('hidden');
  };
  hiddenFilters.classList.add('hidden');
  load(picturesUrl, picturesCallback);
};
