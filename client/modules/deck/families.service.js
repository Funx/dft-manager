angular.module('families.service', [])

.factory('Families', [
  '$cacheFactory',
  'slugifyFilter',
  'Deck',
  function FamiliesFactory ($cacheFactory, slugify, Deck) {

    var families = $cacheFactory('families')

    var getFamilies = (done) => {

      Deck.get().$promise
        .then(rawData => done(processFamilies(rawData)))

      function processFamilies (rawData) {
        // gets all categories
        return _.unique(rawData.map(card => slugify(card.category)))
          // attributes a hue to each family
          .reduce((categories, categoryName, index, categoryNames) => {
            categories[categoryName] = {
              slug: categoryName,
              hue: Math.round(360 / categoryNames.length * index)
            }
            return categories
          }, {})
      }
    }

    getFamilies((data) => {
      families.put('data', data)
    })

    return {
      get: (familyName) => {
        familyName = slugify(familyName)
        return families.get('data') ? (families.get('data')[familyName] || families.get('data')[""]) : { hue: 0 }
      }
    }
  }
])
