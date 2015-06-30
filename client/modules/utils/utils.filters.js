angular.module('utils.filters', [])

.filter('slugify',[
  'removeDiacritics',
  function(removeDiacritics){
    return function(str){
      return removeDiacritics.seo(str);
    }
  }
])

.filter('removeDiacritics',[
  'removeDiacritics',
  function(removeDiacritics){
    return function(str, replace){
      return removeDiacritics.replace(str, replace);
    }
  }
])
