angular.module('families.service', [])

.factory('Families', [
  '$cacheFactory',
  'slugifyFilter',
  'Deck',
  function($cacheFactory, slugify, Deck){

    var families = $cacheFactory('families')
    console.log(families)

    var getFamilies = (done) => {

      Deck.get((data) => {
        data = _.unique(
          data.map((card) => slugify(card.category))
        )
        .reduce((categories, categoryName, index, categoryNames) => {
          categories[categoryName] = {
            slug: categoryName,
            hue: Math.round(360 / categoryNames.length * index)
          }
          return categories
        }, {})
        done(data)

      })
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
