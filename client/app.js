// js/core.js

angular.module('dftm', [
	//utils
	'dftm.plugins',
	'dftm.ui',
	'dftm.utils',
	'dftm.formating',

	//components
	'dftm.item',
	'dftm.actionBubble',
	'dftm.richContextMenu',

	//partials
	'dftm.query',

	//views

	'dftm.items',
	'dftm.editor',
	'dftm.prices',

	// new
	'dftm.isotope',
	'dftm.sidebar',
	'dftm.deck',
	'dftm.floatingActionButton',
	'dftm.amazingQuery'
])

.config([
	'$routeSegmentProvider',
	'$routeProvider',
	'$locationProvider',
	function($routeSegmentProvider, $routeProvider, $locationProvider){
	  $routeProvider.otherwise({
	    redirectTo: '/'
	  });

		$routeSegmentProvider
			.when('/', 'fullSet')
			.when('/create', 'create')
			.when('/edit/:id', 'edit')


	  if(window.history && window.history.pushState){
	    $locationProvider.html5Mode({
	      enabled: true,
	      requireBase: false
	    });
	  }
}])
