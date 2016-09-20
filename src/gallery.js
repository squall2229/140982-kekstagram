'use strict';
var Gallery = function() {
  this.pictures = [];
  this.activePicture = 0;
  this.elementGallery = document.querySelector('.gallery-overlay');
  this.elementClose = document.querySelector('.gallery-overlay-close');
  this.elementPhoto = document.querySelector('.gallery-overlay-image');
  this.elementLikes = document.querySelector('.likes-count');
  this.elementComments = document.querySelector('.comments-count');
  this.hide = this.hide.bind(this);
  this.setPicture = this.setPicture.bind(this);
};

Gallery.prototype.setPictures = function(pictures, check) {
  if (check) {
    this.pictures = this.pictures.concat(pictures);
  } else {
    this.pictures = pictures;
  }
};

Gallery.prototype.setPicture = function() {
  this.setActivePicture(this.activePicture + 1);
};

Gallery.prototype.show = function(number) {
  this.elementClose.addEventListener('click', this.hide);
  this.elementPhoto.addEventListener('click', this.setPicture);

  this.elementGallery.classList.remove('invisible');
  this.setActivePicture(number);
};

Gallery.prototype.hide = function() {
  this.elementGallery.classList.add('invisible');
  this.elementClose.removeEventListener('click', this.hide);
  this.elementPhoto.removeEventListener('click', this.setPicture);
};

Gallery.prototype.setActivePicture = function(number) {
  if ( number >= this.pictures.length ) {
    number = 0;
  }
  this.activePicture = number;
  this.elementPhoto.src = this.pictures[number].url;
  this.elementLikes.textContent = this.pictures[number].likes;
  this.elementComments.textContent = this.pictures[number].comments;
};

module.exports = new Gallery();
