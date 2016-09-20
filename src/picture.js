'use strict';
var gallery = require('./gallery.js');
var Picture = function(data, container, template, imageNumber) {
  this.imageNumber = imageNumber;
  this.data = data;
  this.element = template.cloneNode(true);
  var pictureLike = this.element.querySelector('.picture-likes');
  var pictureComment = this.element.querySelector('.picture-comments');
  this.element.addEventListener('click', this.elementClick.bind(this));
  pictureLike.textContent = data.likes;
  pictureComment.textContent = data.comments;
  var img = new Image(182, 182);
  img.src = data.url;
  img.onload = this.onload.bind(this);
  img.onerror = this.error.bind(this);
};

Picture.prototype.onload = function() {
  var imgPicture = this.element.querySelector('img');
  imgPicture.src = this.data.url;
};

Picture.prototype.error = function() {
  this.element.classList.add('picture-load-failure');
};

Picture.prototype.elementClick = function(evt) {
  evt.preventDefault();
  gallery.show(this.imageNumber);
};

Picture.prototype.remove = function() {
  this.element.removeEventListener('click', this.elementClick);
};

module.exports = Picture;
