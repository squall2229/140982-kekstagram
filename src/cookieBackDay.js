'use strict';
module.exports = function cookieBackDay() {
  var now = new Date(); // текущее время
  var birthday = new Date();// день рождение текущего года
  birthday.setMonth(11, 9);
  var year = now.getFullYear(); // год текущего времени
  var ONE_DAY = 1000 * 3600 * 24;

  if (now < birthday) {
    birthday.setFullYear(year - 1);  // если ДР больше текущей даты, то вычитаем один из текущего года
  }
  return Math.round((now - birthday) / ONE_DAY); // считаем результат
};
