// js/core.js

angular.module('app', [
  'utils.service',
  'utils.directive',
  'itemsList.component',
  'itemEditor.component',
  'actionBubble.component',
  'ngAnimate',
  'ngRoute'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.
    when('/items', {
      templateUrl: 'views/items.html',
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
