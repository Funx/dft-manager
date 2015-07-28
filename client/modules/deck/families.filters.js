angular.module('families.filters', [])

.filter('hue', [
   'Families',
   'slugifyFilter'
  ,(Families, slugify) => {
    return (familyName) => {
      return Families.get(familyName).hue
    }
  }
])
