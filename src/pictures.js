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
  var page = 0;
  var PAGESIZE = 12;

  var picturesScroll = function() {
    page = page + 1;
    load(picturesUrl, {from: page * PAGESIZE, to: page * PAGESIZE + PAGESIZE}, picturesCallback);
  };

  var isBottomReached = function() {
    var lastImage = picturesContainer.querySelector('.picture:last-child');
    var positionImage = lastImage.getBoundingClientRect();
    return positionImage.top - window.innerHeight - 100 <= 0;
  };

  var isNextPageAvailable = function(data, pagelist) {
    return pagelist < Math.round(data.length / PAGESIZE);
  };

  var picturesCallback = function(data) {
    pictures = data;
    if (page === 0) {
      picturesContainer.innerHTML = '';
    }
    if (data.length === 0) {
      window.removeEventListener('scroll', picturesScroll);
    }
    pictures.forEach(function(picture, index) {
      var newPicture = new Picture(picture, picturesContainer, elementToClone, index);
      picturesContainer.appendChild(newPicture.element);
    });
    gallery.setPictures(pictures);
    hiddenFilters.classList.remove('hidden');
  };

  hiddenFilters.classList.remove('hidden');
  load(picturesUrl, {from: 0, to: PAGESIZE }, picturesCallback);
  hiddenFilters.addEventListener('change', function(evt) {
    if (event.target.tagName.toLowerCase() === 'input') {
      page = 0;
      var elementValue = evt.target.value;
      load(picturesUrl, {from: 0, to: PAGESIZE, filter: elementValue}, picturesCallback);
    }
  }, true);

  window.addEventListener('scroll', function() {
    if (isBottomReached() && isNextPageAvailable(pictures, page)) {
      clearTimeout(scrollTimeout);
      var scrollTimeout = setTimeout(picturesScroll, 100);
    }
  });
};
