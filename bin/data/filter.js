'use strict';

module.exports = function(list, filterID) {
  var filteredList = [];
  switch (filterID) {
    default:
      return list;
      break;
      
    case 'new':
      filteredList = list.filter(function(item) {
        var threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return item['created'] >  threeDaysAgo.valueOf();
      }).sort(function(a, b) {
        return a['created'] < b['created'];
      })
      break;

    case 'discussed':
      filteredList = list.sort(function(a, b) {
        return a['comments'] > b['comments'];
      })
      break;

  }
  return filteredList;
};
