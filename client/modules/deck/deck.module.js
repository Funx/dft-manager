angular.module('dftm.deck', [
  'dftm.card',

  'deck.controller',
  'deck.service',
  'families.service',
  'selection.service',
  'fullSet.controller'
])

.config([
  '$routeSegmentProvider',
  function($routeSegmentProvider){
    $routeSegmentProvider
      .segment('fullSet',{
        templateUrl: 'modules/deck/deck.html',
        controller: 'FullSetCtrl',
        controllerAs: 'deck'
      })
  }
])
