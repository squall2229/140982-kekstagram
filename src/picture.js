'use strict';
var gallery = require('./gallery');
var picture = document.querySelector('.picture');

picture.addEventlistener('click', function() {
  gallery.show (number);
  gallery.setActivePicture(number);
})
