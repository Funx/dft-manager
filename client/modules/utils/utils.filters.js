angular.module('utils.filters', [])

.filter('slugify',[
  'removeDiacritics',
  (removeDiacritics) => {
    return (str) => {
      str = str || ''
      return removeDiacritics.seo(str)
    }
  }
])

.filter('removeDiacritics',[
  'removeDiacritics',
  (removeDiacritics) => {
    return (str, replace) => {
      return removeDiacritics.replace(str, replace)
    }
  }
])
