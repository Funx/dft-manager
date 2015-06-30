angular.module('deck.service', [])

.factory('Deck', [
  '$resource',
  'slugifyFilter',
  function($resource, slugify){
    return $resource('api/items', {}, {
      get: {
        method: 'GET',
        isArray: true,
        cache: true,
        transformResponse: [angular.fromJson, function(data) {
          return data.map(function(card) {
            card.categorySlug = slugify(card.category);
            return card;
          });
        }]
      }
    });
  }
])
