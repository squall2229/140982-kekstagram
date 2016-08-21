'use strict';
module.exports = function(data, container, template) {
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
  container.appendChild(element);
  return element;
};
