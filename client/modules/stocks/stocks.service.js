angular.module('stocks.controller', [])

.factory('Stocks', [
  '$http'
  ,function($http){
    let baseUrl = '/deck'

    return {
      get: () => $http.get(baseUrl)
      ,addItems: (name = 'watching', items) => {
      }
      ,removeItems: (name, items) => {

      }
    }
  }
])
