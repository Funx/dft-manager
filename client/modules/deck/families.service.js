angular.module('families.service', [])

.factory('Families', [
  '$cacheFactory',
  'slugifyFilter',
  'Deck',
  function($cacheFactory, slugify, Deck){

    var families = $cacheFactory('families');
    console.log(families);

    var getFamilies = function(done) {

      Deck.get(function(data){
        data = _.unique(
          data.map(function(card){
            return slugify(card.category);
          })
        )
        .reduce(function(categories, categoryName, index, categoryNames){
          categories[categoryName] = {
            slug: categoryName,
            hue: Math.round(360 / categoryNames.length * index)
          };
          return categories;
        }, {});
        done(data);

      });
    }

    getFamilies(function(data){
      families.put('data', data);
    })

    return {
      get: function(familyName){
        familyName = slugify(familyName)
        return families.get('data') ? (families.get('data')[familyName] || families.get('data')[""]) : { hue: 0 }
      }
    };
  }
])
