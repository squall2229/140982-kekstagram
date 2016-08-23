'use strict';
var browserCookies = require('browser-cookies');
var cookieBackDay = require('./cookieBackDay');
var cookieModule = function() {
  var formFilter = document.querySelector('#upload-filter');

  cookieBackDay();

  formFilter.onsubmit = function() {
    var cookieday = cookieBackDay();  // записываем результат функции в переменную
    var inputFilter = document.querySelector('input[name="upload-filter"]:checked');

    if (inputFilter) {
      browserCookies.set('upload-filter', inputFilter.value, {expires: cookieday});
    }
  };
  var inputFilter = browserCookies.get('upload-filter');
  var inputCheck = document.querySelector('#' + 'upload-filter-' + inputFilter);
  var image = formFilter.querySelector('img');
  if(inputCheck) {
    inputCheck.setAttribute('checked', 'checked');
    image.classList.add('filter-' + inputFilter);
  }
};
module.exports = cookieModule;
