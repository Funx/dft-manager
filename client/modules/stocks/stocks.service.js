angular.module('stocks.controller', [])

.factory('Stocks', [
  '$http'
  ,function($http){
    let baseUrl = '/deck/'

    return {
      get: (query) => {
        if(query.name) {
          return $http.get(baseUrl + query.name)
        } else {
          return $http.get(baseUrl)
        }
      }
      ,addItems: (items, name = 'watching') => {
        $http.post(baseUrl + 'addItems/' + name, items)
      }
      ,removeItems: (items, name = 'all') => {
        $http.post(baseUrl + 'removeItems/' + name, items)
      }
    }
  }
])
