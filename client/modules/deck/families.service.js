angular.module('families.service', [])

.factory('Families', [
  'Deck',
  function(Deck){

    var families = null;

    var getFamilies = function(done) {

      Deck.get(function(data){
        data = _.unique(
          data.map(function(card){
            return card.categorySlug;
          })
        )
        .reduce(function(categories, categoryName, index, categoryNames){
          categories[categoryName] = {
            slug: categoryName,
            hue: Math.round(360 / categoryNames.length * index)
          };
          return categories;
        }, {});


        families = data;
        done(data);

      });
    }

    return {
      get: function(done){
        if(families){
          done(families);
        } else {
          getFamilies(done);
        }

      }
    }
  }
])
