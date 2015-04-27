// js/core.js

angular.module('app', [
  'itemsList.ctrl',
  'ngAnimate',
  'ngRoute'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.
    when('/items', {
      templateUrl: 'views/items.html',
    }).
    // when('/items/:itemId', {
    //   templateUrl: 'partials/phone-detail.html',
    //   controller: 'PhoneDetailCtrl'
    // }).
    otherwise({
      redirectTo: '/items'
    });

  if(window.history && window.history.pushState){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
}])
