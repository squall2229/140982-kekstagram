'use strict';
var gallery = require('./gallery.js');
var Picture = function(data, container, template, imageNumber) {
  // props
  this.imageNumber = imageNumber;
  var self = this;
  self.data = data;
  self.element = template.cloneNode(true);
  var pictureLike = self.element.querySelector('.picture-likes');
  var pictureComment = self.element.querySelector('.picture-comments');
  var imgPicture = self.element.querySelector('img');
  // add listener
  self.element.addEventListener('click', this.elementClick.bind(this));
  // render picture
  pictureLike.textContent = data.likes;
  pictureComment.textContent = data.comments;
  var img = new Image(182, 182);
  img.src = data.url;

  img.onload = function() {
    imgPicture.src = img.src;
  };

  img.onerror = function() {
    self.element.classList.add('picture-load-failure');
  };
};

Picture.prototype.elementClick = function(evt) {
  evt.preventDefault();
  gallery.show(this.imageNumber);
};

Picture.prototype.remove = function() {
  this.element.removeEventListener('click', this.elementClick);
};

module.exports = Picture;
