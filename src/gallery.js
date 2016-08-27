'use strict';
var Gallery = function() {
  this.pictures = pictures;
  this.activePicture = activePicture;
  this.elementGallery = document.querySelector('.gallery-overlay');
  this.elementClose = document.querySelector('.gallery-overlay-close');
  this.elementPhoto = document.querySelector('.gallery-overlay-image');
  this.elementLikes = document.querySelector('.likes-count');
  this.elementComments = document.querySelector('.-count');
};
Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};
Gallery.prototype.show = function(number) {
  this.elementClose.onclick = function() {
    hide();
  };
  this.elementPhoto.onclick = function() {
    setActivePicture(number);
  };
  this.elementGallery.classList.remove('hidden');
  setActivePicture(number);
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
