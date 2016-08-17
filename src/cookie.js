'use strict';
(function() {
  var browserCookies = require('browser-cookies');
  var formFilter = document.querySelector('#upload-filter');

  function cookieBackDay() {
    var now = new Date(); // текущее время
    var birthday = new Date();// день рождение текущего года
    birthday.setMonth(11, 9);
    var year = now.getFullYear(); // год текущего времени
    var ONE_DAY = 1000 * 3600 * 24;

    if (now < birthday) {
      birthday.setFullYear(year - 1);  // если ДР больше текущей даты, то вычитаем один из текущего года
    }
    return Math.round((now - birthday) / ONE_DAY); // считаем результат
  }

  formFilter.onsubmit = function() {
    var cookieday = cookieBackDay();  // записываем результат функции в переменную
    var inputFilter = document.querySelector('input[name="upload-filter"]:checked');

    if (inputFilter) {
      browserCookies.set('upload-filter', inputFilter.value, {expires: cookieday});
      alert(browserCookies.get('upload-filter', 'inputFilter.value'))
    }
  };
  var inputFilter = browserCookies.get('upload-filter', 'inputFilter.value');
  var inputCheck = document.querySelector('#' + inputFilter);
  inputCheck.setAttribute('checked', 'checked')

})();
