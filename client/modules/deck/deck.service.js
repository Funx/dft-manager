angular.module('deck.service', [])

.factory('Deck', [
  '$resource',
  function($resource){
    return $resource('api/items', {});
  }
])
