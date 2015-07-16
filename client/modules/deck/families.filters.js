angular.module('families.filters', [])

.filter('hue', [
   'Families',
   'slugifyFilter'
  ,function (Families, slugify) {
    return function(familyName) {
      return Families.get(familyName).hue;
    }
  }
])
