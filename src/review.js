'use strict';
var gallery = require('./gallery.js');
var picturesRender = function(data, container, template, imageNumber) {
  var element = template.cloneNode(true);
  element.querySelector('.picture-likes').textContent = data.likes;
  element.querySelector('.picture-comments').textContent = data.comments;
  var imgPicture = element.querySelector('img');
  var img = new Image(182, 182);
  img.src = data.url;
  img.onload = function() {
    imgPicture.src = img.src;
  };
  img.onerror = function() {
    element.classList.add('picture-load-failure');
  };
  element.addEventListener('click', function(event) {
    event.preventDefault();
    gallery.show(imageNumber);
  });
  container.appendChild(element);
  return element;
};
module.exports = picturesRender;
