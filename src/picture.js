'use strict';
var gallery = require('./gallery.js');
var Picture = function(data, container, template, imageNumber) {
  this.element = template.cloneNode(true);
  this.data = data;
  this.element.querySelector('.picture-likes').textContent = data.likes;
  this.element.querySelector('.picture-comments').textContent = data.comments;
  var imgPicture = this.element.querySelector('img');
  var img = new Image(182, 182);
  img.src = data.url;
  var self = this;
  img.onload = function() {
    imgPicture.src = img.src;
  };
  img.onerror = function() {
    self.element.classList.add('picture-load-failure');
  };
  this.element.addEventListener('click', function(event) {
    event.preventDefault();
    gallery.show(imageNumber);
  });
};

Picture.prototype.remove = function() {
  this.element.removeEventListener('click', this, false);
};

module.exports = Picture;
