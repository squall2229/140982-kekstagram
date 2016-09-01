'use strict';
var gallery = require('./gallery.js');
var Picture = function(data, container, template, imageNumber) {
  var self = this;
  self.element = template.cloneNode(true);
  var pictureLike = self.element.querySelector('.picture-likes');
  var pictureComment = self.element.querySelector('.picture-comments');
  self.data = data;
  pictureLike.textContent = data.likes;
  pictureComment.textContent = data.comments;
  var imgPicture = self.element.querySelector('img');
  var img = new Image(182, 182);
  img.src = data.url;
  img.onload = function() {
    imgPicture.src = img.src;
  };
  img.onerror = function() {
    self.element.classList.add('picture-load-failure');
  };

  self.element.onclick = function(evt) {
    evt.preventDefault();
    gallery.show(imageNumber);
  };
};

Picture.prototype.remove = function() {
  this.element.onclick = null;
};

module.exports = Picture;
