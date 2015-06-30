angular.module('deck.controller', [])

.controller('DeckCtrl', [
  '$rootScope',
  '$scope',
  '$timeout',
  'filterFilter',
  'Deck',
  'Families',
  function($rootScope, $scope, $timeout, filter, Deck, Families){

    function makeid(length){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    this.yo = 'hey';
    this.deck = Deck.query();
    this.cards = this.deck;

    var ravageur = 'ravageur terre';
    var iterator = 0;

    this.filterCards = function(str){
      var query = this.query.split(' ');
      this.cards = this.deck;

      query.forEach(function(word){
        this.cards = filter(this.cards, word);
      }.bind(this));

    }

    $scope.$watch(function(){
      return this.cards.length;
    }.bind(this), function(){
      $timeout(function(){
        $rootScope.$broadcast('iso-init', {name:null, params:null});
      })
    });

  }
])
