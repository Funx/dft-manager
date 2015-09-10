angular.module('dftm.stocks', [
   'stocks.controller'
])

.controller('StocksCtrl', [
  '$scope',
  'Stocks',
  function StocksCtrl ($scope, Stocks) {
    let self = this
    console.log(this)
    Stocks.get()
      .then((decks) => (console.log('hey'),self.decks = decks))
  }
])

.config([
  '$routeSegmentProvider',
  function($routeSegmentProvider){

    var editorSegmentConfig = {
      templateUrl: '/modules/stocks/stocks.html',
      controller: 'StocksCtrl',
      controllerAs: 'stocks'
    }

    $routeSegmentProvider
      .segment('stocks', editorSegmentConfig)
  }
])
