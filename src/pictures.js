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
  var scrollTimeout;

  var scrollPicturesNextPage = function() {
    page = page + 1;
    load(picturesUrl, {from: page * PAGESIZE, to: page * PAGESIZE + PAGESIZE}, picturesCallback);
  };

  var isBottomReached = function() {
    var lastImage = picturesContainer.querySelector('.picture:last-child');
    var positionImage = lastImage.getBoundingClientRect();
    return positionImage.top - window.innerHeight - 100 <= 0;
  };

  var picturesChange = function() {
    if (isBottomReached()) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(scrollPicturesNextPage, 100);// в общую область видимости засунуть DONE
    }
  };

  var filterPicturesShow = function(evt) {
    if (evt.target.tagName.toLowerCase() === 'input') {
      var elementValue = evt.target.value;
      page = 0;
      window.addEventListener('scroll', picturesChange);
      load(picturesUrl, {from: 0, to: PAGESIZE, filter: elementValue}, picturesCallback);
    }
  };

  var picturesCallback = function(data) {
    var checkFilter = false;
    if (page === 0) {
      picturesContainer.innerHTML = '';
      checkFilter = true;
    }
    if (data.length === 0 || data.length < PAGESIZE) {
      window.removeEventListener('scroll', picturesChange);
    }
    pictures = data;
    pictures.forEach(function(picture, index) {
      var newPicture = new Picture(picture, picturesContainer, elementToClone, index);
      picturesContainer.appendChild(newPicture.element);
    });
    gallery.setPictures(pictures, checkFilter);
    hiddenFilters.classList.remove('hidden');
  };

  hiddenFilters.classList.add('hidden');
  load(picturesUrl, {from: 0, to: PAGESIZE}, picturesCallback);
  hiddenFilters.addEventListener('change', filterPicturesShow, true);
  window.addEventListener('scroll', picturesChange);
};
