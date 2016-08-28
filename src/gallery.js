'use strict';
var Gallery = function(pictures) {
  var self = this;
  this.pictures = pictures;
  this.activePicture = null;
  this.elementGallery = document.querySelector('.gallery-overlay');
  this.elementClose = document.querySelector('.gallery-overlay-close');
  this.elementPhoto = document.querySelector('.gallery-overlay-image');
  this.elementLikes = document.querySelector('.likes-count');
  this.elementComments = document.querySelector('.comments-count');
};
Gallery.prototype.setPictures = function(pictures) {
  self.pictures = pictures;
};
Gallery.prototype.show = function(number) {
  elementClose.onclick = function() {
    this.hide();
  };
  elementPhoto.onclick = function() {
    this.setActivePicture(number);
  };
  elementGallery.classList.remove('invisible');
    this.setActivePicture(number);
};
Gallery.prototype.hide = function() {
  this.elementGallery.classList.add('invisible');
  this.elementGallery.onclick = null;
  this.elementClose.onclick = null;
  this.elementPhoto.onclick = null;
};
Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number;
  this.elementPhoto.src = pictures[number];
  this.elementLikes.textContent = data.likes;
  this.elementComments.textContent = data.comments;
};
module.exports = new Gallery();
