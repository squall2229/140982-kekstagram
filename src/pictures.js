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
  var currentFilter = localStorage.getItem('filter') || 'popular';

  var loadPicturesNextPage = function() {
    page = page + 1;
    load(picturesUrl, {from: page * PAGESIZE, to: page * PAGESIZE + PAGESIZE, filter: currentFilter}, picturesCallback);
  };

  var isTopReached = function() {
    var lastImage = picturesContainer.querySelector('.picture:last-child');
    if (lastImage === null) {
      return false;
    }
    var positionImage = lastImage.getBoundingClientRect();
    return positionImage.top - window.innerHeight - 100 <= 0;
  };

  var handlerScrollPictures = function() {
    if (isTopReached()) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(loadPicturesNextPage, 100);
    }
  };

  var handlerChangeFilter = function(evt) {
    if (evt.target.tagName.toLowerCase() === 'input') {
      var elementValue = evt.target.value;
      localStorage.setItem('filter', elementValue);
      currentFilter = elementValue;
      page = 0;
      window.addEventListener('scroll', handlerScrollPictures);
      load(picturesUrl, {from: 0, to: PAGESIZE, filter: elementValue}, picturesCallback);
    }
  };

  var picturesCallback = function(data) {
    var checkNumberPage = true;
    if (page === 0) {
      picturesContainer.innerHTML = '';
      checkNumberPage = true;
    }
    if (data.length === 0 || data.length < PAGESIZE) {
      window.removeEventListener('scroll', handlerScrollPictures);
    }
    pictures = data;
    pictures.forEach(function(picture, index) {
      var pictureNumber = PAGESIZE * page + index;
      var newPicture = new Picture(picture, picturesContainer, elementToClone, pictureNumber);
      picturesContainer.appendChild(newPicture.element);
    });
    gallery.setPictures(pictures, checkNumberPage);
    //handlerScrollPictures();
    hiddenFilters.classList.remove('hidden');
  };

  hiddenFilters.classList.add('hidden');
  load(picturesUrl, {from: 0, to: PAGESIZE}, picturesCallback);
  hiddenFilters.addEventListener('change', handlerChangeFilter, true);
  window.addEventListener('scroll', handlerScrollPictures);
  document.getElementById('filter-' + currentFilter).click();
};
