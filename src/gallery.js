'use strict';
var Gallery = function(pictures) {
  var self = this;
  this.pictures = pictures;
  this.activePicture = null;
  var elementGallery = document.querySelector('.gallery-overlay');
  var elementClose = document.querySelector('.gallery-overlay-close');
  var elementPhoto = document.querySelector('.gallery-overlay-image');
  var elementLikes = document.querySelector('.likes-count');
  var elementComments = document.querySelector('.-count');
};
Gallery.prototype.setPictures = function(pictures) {
  self.pictures = pictures;
};
Gallery.prototype.show = function(number) {
  elementClose.onclick = function() {
    hide();
  };
  elementPhoto.onclick = function() {
    setActivePicture(number);
  };
  elementGallery.classList.remove('invisible');
    setActivePicture(number);
};
Gallery.prototype.hide = function() {
  elementGallery.classList.add('invisible');
  elementGallery.onclick = null;
  elementClose.onclick = null;
  elementPhoto.onclick = null;
};
Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number;
  elementPhoto.src = pictures[number];
  elementLikes.textContent = data.likes;
  elementComments.textContent = data.comments;
};
module.exports = new Gallery();
