// js/core.js

angular.module('app', [
  'utils.service',
  'itemsList.component',
  'itemEditor.component',
  'ngAnimate',
  'ngRoute',
  'ui.bootstrap'
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
