angular.module('deck.service', [])

.factory('Deck', [
  '$resource'
  ,'slugifyFilter'
  ,function($resource, slugify) {
    // return {
    //   get: () => {
    //     return [{
    //       _id: 1
    //       ,name: 'truc'
    //       ,price: 1000
    //       ,recipe: []
    //       ,category: 'lol'
    //     }, {
    //       _id: 2
    //       ,name: 'chose'
    //       ,price: 1200
    //       ,recipe: []
    //       ,category: 'lol'
    //     }, {
    //       _id: 3
    //       ,name: 'lalalala'
    //       ,price: 15000
    //       ,recipe: []
    //       ,category: 'truchose'
    //     }]
    //   }
    // }
    return $resource('/api/items', {}, {
      get: {
        method: 'GET'
        ,isArray: true
        ,cache: true
      }
    })
  }
])
