// js/core.js

angular.module('dftm', [
	//utils
	'dftm.plugins',
	'dftm.ui',
	'dftm.utils',

	//components
	'dftm.item',
	'dftm.actionBubble',
	'dftm.richContextMenu',

	//views
	'dftm.items',
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
