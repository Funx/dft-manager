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

    var visible = null
    this.yo = 'hey'
    this.deck = Deck.get(() => {
      visible = this.cards
    })
    this.cards = this.deck

    var ravageur = 'ravageur terre'
    var iterator = 0

    this.filterCards = function filterCards (str) {
      this.cards = this.deck

      var query = transformRequest(this.query)
      this.cards = query.reduce((acc, request) => {
        let filtered = filter(acc, request)
        return filtered
      }, this.cards)

      visible = angular.copy(this.cards)
    }

    $scope.$on('selected', (evt, element) => {
      Selection.add(element)
    })
    $scope.$on('unselected', (evt, element) => {
      Selection.remove(element)
    })
    $scope.$on('plzUnselectVisible', () => {
      Selection.remove(visible)
    })
    $scope.$on('plzSelectVisible', () => {
      Selection.add(visible)
    })
    $scope.$on('plzCreate', () => {
      // create a new item
    })
    $scope.$on('plzEdit', () => {
      // edit selected items
    })


  }
])
