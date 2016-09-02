'use strict';
var Gallery = function() {
  this.activePicture = null;
  this.elementGallery = document.querySelector('.gallery-overlay');
  this.elementClose = document.querySelector('.gallery-overlay-close');
  this.elementPhoto = document.querySelector('.gallery-overlay-image');
  this.elementLikes = document.querySelector('.likes-count');
  this.elementComments = document.querySelector('.comments-count');
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

Gallery.prototype.show = function(number) {
  var self = this;
  this.elementClose.onclick = function() {
    self.hide();
  };
  this.elementPhoto.onclick = function() {
    self.setActivePicture(self.activePicture + 1);
  };
  this.elementGallery.classList.remove('invisible');
  this.setActivePicture(number);
};

Gallery.prototype.hide = function() {
  this.elementGallery.classList.add('invisible');
  this.elementClose.onclick = null;
  this.elementPhoto.onclick = null;
};

Gallery.prototype.setActivePicture = function(number) {
  if ( number > this.pictures.length ) {
    number = 0;
  }
  this.activePicture = number;
  this.elementPhoto.src = this.pictures[number].url;
  this.elementLikes.textContent = this.pictures[number].likes;
  this.elementComments.textContent = this.pictures[number].comments;
};


module.exports = new Gallery();
