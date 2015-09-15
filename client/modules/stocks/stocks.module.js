angular.module('dftm.stocks', [
   'stocks.controller'
])

.controller('StocksCtrl', [
  '$rootScope',
  '$scope',
  'Stocks',
  'Selection'
  ,function StocksCtrl ($rootScope, $scope, Stocks, Selection) {
    let self = this
    let not = (fn) => (...args) => !fn(...args)
    let {isSelected} = Selection
    let isNotSelected = not(isSelected)

    this.deckNames = ['watching', 'crafting', 'selling']

    this.deckNames.forEach((deckName) => {
      Stocks.get({name: deckName})
        .then((data) => (self[deckName] = data.data[0]))
    })

    $rootScope.$on("plzUnwatch", removeItemsFromStocks)
    $rootScope.$on("plzWatch", addItemsToStocks)

    let removeItemsFromStocks = () => {
      console.log("heho")
      this.deckNames
        .forEach((deckName) =>{
          self[deckName].cards = self[deckName].cards.filter(isNotSelected)
          console.log(self[deckName].cards)
        })
      Selection.empty()
    }

    let addItemsToStocks = () => {
      Selection.get()
        .filter((item) => !item.deck)
        .map(item => (item.deck = 'watching', item))
        .forEach(item => self.watching.cards.push(item))
      Selection.empty()
    }

    let moveBetweenDecks = (originDeckName, destDeckName) => {
      let originDeckCards = self[originDeckName].cards
      let destDeckCards = self[destDeckName].cards
      destDeckCards = destDeckCards
        .concat(originDeckCards
          .filter(isSelected)
          .map((item) => (item.deck = destDeckName, item))
          .map((item) => (Stocks.removeItems([item._id], originDeckName), item))
          .map((item) => (Stocks.addItems([item._id], destDeckName), item))
        )
      originDeckCards = originDeckCards.filter(isNotSelected)

      self[originDeckName].cards = _.unique(originDeckCards)
      self[destDeckName].cards = _.unique(destDeckCards)

    }

    this.moveToDeck = (currDeckName, offset) => {
      // if currIndex = 0 -> set to name.length
      let currIndex = this.deckNames.indexOf(currDeckName) || this.deckNames.length
      let nextIndex = (currIndex + offset) % (this.deckNames.length)
      let nextDeckName = this.deckNames[nextIndex]
      console.log(nextDeckName)
      moveBetweenDecks(currDeckName, nextDeckName)
    }

    this.getDeckPrice = (deckName) => {
      return self[deckName].cards.reduce((acc, card) => acc + card.price)
    }
    this.getDeckCost = (deckName) => {
      return self[deckName].cards.reduce((acc, card) => acc + card.cost)
    }
    this.getDeckBenef = (deckName) => {
      return this.getDeckPrice(deckName) - this.getDeckCost(deckName)
    }
    this.getDeckBenefPercentage = (deckName) => {
      return this.getDeckBenef(deckName) / this.getDeckPrice(deckName)
    }

  }
])

.config([
  '$routeSegmentProvider',
  function($routeSegmentProvider){

    var editorSegmentConfig = {
      templateUrl: '/modules/stocks/stocks.html',
      controller: 'StocksCtrl',
      controllerAs: 'stocks'
    }

    $routeSegmentProvider
      .segment('stocks', editorSegmentConfig)
  }
])
