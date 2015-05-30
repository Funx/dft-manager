// js/core.js

angular.module('dftm', [
	'dftm.plugins',
	'dftm.items',
	'dftm.item',
	'dftm.actionBubble',
  'dftm.utils',
	'dftm.editor'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.
    when('/items', {
      templateUrl: 'modules/items/items.html',
    })
    .otherwise({
      redirectTo: '/items'
    });

  if(window.history && window.history.pushState){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
}])
