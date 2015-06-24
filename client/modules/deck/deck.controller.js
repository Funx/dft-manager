angular.module('deck.controller', [])

.controller('DeckCtrl', [
  'Deck',
  function(Deck){
    this.yo = 'hey';
    this.cards = Deck.query();
  }
])
