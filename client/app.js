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
	'dftm.collection',
	'dftm.isotope',
	'dftm.sidebar',
	'dftm.deck',
	'dftm.floatingActionButton',
	'dftm.amazingQuery',
	'dftm.selection',
	'dftm.stocks'
])

.config([
	'$routeSegmentProvider',
	'$routeProvider',
	'$locationProvider',
	function($routeSegmentProvider, $routeProvider, $locationProvider){
	  $routeProvider.otherwise({
	    redirectTo: '/all-in'
	  })

		$routeSegmentProvider
			.when('/all-in', 'fullSet')
			.when('/all-in/:query', 'fullSet')
			.when('/create', 'create')
			.when('/edit', 'edit')
			.when('/edit/:id', 'edit')
			.when('/stocks/', 'stocks')


	  if(window.history && window.history.pushState){
	    $locationProvider.html5Mode({
	      enabled: true,
	      requireBase: false
	    })
	  }
}])

.run([
	'$rootScope'
	,function ($rootScope) {
		$rootScope.$on("$routeChangeStart", (event, next, current) => {
			console.log('$routeChangeStart')
	    if (true) {
				console.log('$restorestate')
	      $rootScope.$broadcast('restorestate') //let everything know we need to restore state
	      sessionStorage.restorestate = true
			}
		})

		//let everthing know that we need to save state now.
		window.onbeforeunload = (event) => {
			window.confirm('yo')
			sessionStorage.restorestate = true
		  $rootScope.$broadcast('savestate')
		}
	}])
