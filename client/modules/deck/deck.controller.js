angular.module('deck.controller', [])

.controller('DeckCtrl', [
  '$rootScope',
  '$scope',
  'filterFilter',
  'slugifyFilter',
  'Deck',
  'Selection',
  'Utils',
  function($rootScope, $scope, filter, slugify, Deck, Selection, Utils){

    // map through the amazing query request
    var transformRequest = function transformRequest (request) {
      return request.split(' ').map((request) => {
        var isKeyValue = /[A-Z0-9!]+[:=]{1}[A-Z0-9!]+/gi
        var isTest = /(.+)([<>])(.+)/gi

        if (isKeyValue.test(request)) {
          var keyValue = request.split(/[=:]{1}/gi)
          var request = {}
          if (keyValue[0].charAt(0) == '!') {
            keyValue[0] = keyValue[0].substring(1)
            keyValue[1] = '!' + keyValue[1]
          }
          request[keyValue[0]] = keyValue[1]
          return request
        }

        if (isTest.test(request)) {
          var logicTest = isTest.exec(request)
          var operator = logicTest[2]
          return (element) => {
            if (operator == '>') {
              return Utils.deepValue(element, logicTest[1]) > logicTest[3]
            } else if (operator == '<') {
              return Utils.deepValue(element, logicTest[1]) < logicTest[3]
            }
          }
        }

        return {
          $: request
        }

      })
    }

    this.yo = 'hey'
    this.deck = Deck.get(() => {
      console.log('hey')
    })
    console.log(this.deck)
    this.cards = this.deck

    var ravageur = 'ravageur terre'
    var iterator = 0

    this.filterCards = function filterCards (str) {
      this.cards = this.deck

      var query = transformRequest(this.query)
      query.forEach((request) => {
        this.cards = filter(this.cards, request)
      })

    }

    $scope.$on('selected', (evt, element) => {
      Selection.add(element)
    })
    $scope.$on('unselected', (evt, element) => {
      Selection.remove(element)
    })
    $scope.$on('plzUnselectVisible', () => {
      Selection.remove(this.cards)
    })
    $scope.$on('plzSelectVisible', () => {
      console.log(this.cards.length)
      Selection.add(this.cards)
    })
    $scope.$on('plzCreate', () => {
      // create a new item
    })
    $scope.$on('plzEdit', () => {
      // edit selected items
    })


  }
])
