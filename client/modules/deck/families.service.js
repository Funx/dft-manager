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
            return slugify(card.category) || 'base';
          })
        )
        .reduce(function(categories, categoryName, index, categoryNames){
          categories[categoryName] = {
            slug: categoryName,
            hue: Math.round(360 / categoryNames.length * index)
          };
          return categories;
        }, {});

        console.log('families:',data);
        done(data);

      });
    }

    getFamilies(function(data){
      console.log('cache:',families);
      families.put('data', data);
    })

    return {
      get: function(familyName){
        if (typeof familyName === 'undefined'){
          return families.get('data');
        } else {
          return families.get('data') ? families.get('data')[familyName] : {};
        }
      }
    };
  }
])
