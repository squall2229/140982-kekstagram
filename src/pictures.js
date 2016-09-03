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

  hiddenFilters.classList.remove('hidden');
  //load(picturesUrl, {from: 0, to: 12 }, picturesCallback);

  hiddenFilters.addEventListener('change', function(evt) {
    var elementId = evt.target.id;
    load(picturesUrl, {from: 0, to: 12, id: elementId}, picturesCallback);
  }, true);

  /*
  window.addEventListener('scroll', function(evt) {
    load(picturesUrl, {from: 0, to: 12 }, picturesCallback);
  })
 */
};
