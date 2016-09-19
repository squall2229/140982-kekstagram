'use strict';
var Picture = require('./picture');
var load = require('./load');
var gallery = require('./gallery');

var Pictures = function() {
  this.picturesUrl = '/api/pictures';
  this.pictures;
  this.picturesContainer = document.querySelector('.pictures');
  this.templateElement = document.querySelector('#picture-template');
  this.elementToClone = this.templateElement.content.querySelector('.picture');
  this.hiddenFilters = document.querySelector('.filters');
  this.page = 0;
  this.PAGESIZE = 12;
  this.scrollTimeout;
  this.currentFilter = localStorage.getItem('filter') || 'popular';
  this.hasMorePages = true;

  this.hiddenFilters.classList.add('hidden');
  load(this.picturesUrl, {from: 0, to: this.PAGESIZE, filter: this.currentFilter}, this.picturesCallback.bind(this));
  document.getElementById('filter-' + this.currentFilter).click();
  window.addEventListener('scroll', this.handlerScrollPictures.bind(this));
  this.hiddenFilters.addEventListener('change', this.handlerChangeFilter.bind(this), true);
};

Pictures.prototype.loadPicturesNextPage = function() {
  this.page = this.page + 1;
  load(this.picturesUrl, {from: this.page * this.PAGESIZE, to: this.page * this.PAGESIZE + this.PAGESIZE, filter: this.currentFilter}, this.picturesCallback.bind(this));
};

Pictures.prototype.isTopReached = function() {
  var lastImage = this.picturesContainer.querySelector('.picture:last-child');
  if (lastImage === null) {
    return false;
  }
  var positionImage = lastImage.getBoundingClientRect();
  return positionImage.top - window.innerHeight - 100 <= 0;
};

Pictures.prototype.handlerScrollPictures = function() {
  if (this.isTopReached() && this.hasMorePages) {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(this.loadPicturesNextPage.bind(this), 100);
  }
};

Pictures.prototype.handlerChangeFilter = function(evt) {
  if (evt.target.tagName.toLowerCase() === 'input') {
    this.hasMorePages = true;
    var elementValue = evt.target.value;
    localStorage.setItem('filter', elementValue);
    this.currentFilter = elementValue;
    this.page = 0;
    window.addEventListener('scroll', this.handlerScrollPictures.bind(this));
    load(this.picturesUrl, {from: 0, to: this.PAGESIZE, filter: elementValue}, this.picturesCallback.bind(this));
  }
};

Pictures.prototype.picturesCallback = function(data) {
  var checkNumberPage = true;
  if (this.page === 0) {
    this.picturesContainer.innerHTML = '';
    checkNumberPage = false;
  }
  if (data.length === 0 || data.length < this.PAGESIZE) {
    window.removeEventListener('scroll', this.handlerScrollPictures);
    this.hasMorePages = false;
  }
  this.pictures = data;
  this.pictures.forEach(function(picture, index) {
    var pictureNumber = this.PAGESIZE * this.page + index;
    var newPicture = new Picture(picture, this.picturesContainer, this.elementToClone, pictureNumber);
    this.picturesContainer.appendChild(newPicture.element);
  }.bind(this));
  gallery.setPictures(this.pictures, checkNumberPage);
  this.handlerScrollPictures();
  this.hiddenFilters.classList.remove('hidden');
};

module.exports = function(){
    return new Pictures();
};
