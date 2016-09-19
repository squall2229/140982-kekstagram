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
  var hasMorePages = true;

  var loadPicturesNextPage = function() {};
  var isTopReached = function() {};
  var handlerScrollPictures = function() {};
  var handlerChangeFilter = function() {};

  loadPicturesNextPage.prototype.loadPage = function() {
    page = page + 1;
    load(picturesUrl, {from: page * PAGESIZE, to: page * PAGESIZE + PAGESIZE, filter: currentFilter}, picturesCallback);
  };

  isTopReached.prototype.position = function() {
    var lastImage = picturesContainer.querySelector('.picture:last-child');
    if (lastImage === null) {
      return false;
    }
    var positionImage = lastImage.getBoundingClientRect();
    return positionImage.top - window.innerHeight - 100 <= 0;
  }

  handlerScrollPictures.prototype.scroll = function() {
    if (new isTopReached().position() && hasMorePages) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(new loadPicturesNextPage().loadPage(), 100);
    }
  };

  handlerChangeFilter.prototype.filter = function(evt) {
    if (evt.target.tagName.toLowerCase() === 'input') {
      hasMorePages = true;
      var elementValue = evt.target.value;
      localStorage.setItem('filter', elementValue);
      currentFilter = elementValue;
      page = 0;
      window.addEventListener('scroll', new handlerScrollPictures().scroll());
      load(picturesUrl, {from: 0, to: PAGESIZE, filter: elementValue}, picturesCallback);
    }
  };

  var picturesCallback = function(data) {
    var checkNumberPage = true;
    if (page === 0) {
      picturesContainer.innerHTML = '';
      checkNumberPage = false;
    }
    if (data.length === 0 || data.length < PAGESIZE) {
      window.removeEventListener('scroll', handlerScrollPictures);
      hasMorePages = false;
    }
    pictures = data;
    pictures.forEach(function(picture, index) {
      var pictureNumber = PAGESIZE * page + index;
      var newPicture = new Picture(picture, picturesContainer, elementToClone, pictureNumber);
      picturesContainer.appendChild(newPicture.element);
    });
    gallery.setPictures(pictures, checkNumberPage);
    handlerScrollPictures();
    hiddenFilters.classList.remove('hidden');
  };

  hiddenFilters.classList.add('hidden');
  load(picturesUrl, {from: 0, to: PAGESIZE, filter: currentFilter}, picturesCallback);
  hiddenFilters.addEventListener('change', new handlerChangeFilter().filter, true);
  window.addEventListener('scroll', new handlerScrollPictures().scroll());
  document.getElementById('filter-' + currentFilter).click();
};
