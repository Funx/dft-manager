// scripts/services/todos.js
angular.module('items.service', [])

// super simple service
// each function returns a promise object
.factory('Items', ['$http','$rootScope', function($http, $rootScope) {

  return {

    get: () => {
      return $http.get('/api/items')
    },

    create: (itemData, done) => {
      itemData.recipe = itemData.recipe || []

      $http.post('/api/items', itemData)
      .success((data) => {
        this.list = data.list.map((item) => {
          item.category = item.category || ''
          item.className = item.category.toSlug()
          return item
        })
        this.lastEdit = data.lastEdit
        if(done) return done(data.lastEdit)
      })

      .error((data) => {
        console.log('Error: ' + data)
        if(done) return done(data)
      })

    },

    delete: (id, done) => {
      $http.delete('/api/items/' + id)

      .success((data) => {
        this.list = data.map((item) => {
          item.category = item.category || ''
          item.className = item.category.toSlug()
          return item
        })
        if(!done) done = () => {}
        return done(data)
      })

      .error((data) => {
        console.log('Error: ' + data)
        // if(!done) done = () => {}
        return done(data)
      })

    },

    init: (done) => {
      $http.get('/api/items')
      .success((data) => {
        this.list = data
        return this.list
      })

      .error((data) => {
        console.log('Error: ' + data)
      })



    },
    list: [],
    lastEdit: {}
  }
}])
