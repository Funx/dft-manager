angular.module('deck.controller', [])

.controller('DeckCtrl', [
  '$rootScope',
  '$scope',
  '$timeout',
  'filterFilter',
  'slugifyFilter',
  'Deck',
  'Families',
  'Utils',
  function($rootScope, $scope, $timeout, filter, slugify, Deck, Families, Utils){

    function transformRequest(request){
      return request.split(' ').map(function(request){

        var isKeyValue = /[A-Z0-9!]+[:=]{1}[A-Z0-9!]+/gi;
        var isTest = /(.+)([<>])(.+)/gi;

        if (isKeyValue.test(request)) {
          var keyValue = request.split(/[=:]{1}/gi);
          var request = {};
          if (keyValue[0].charAt(0) == '!') {
            keyValue[0] = keyValue[0].substring(1);
            keyValue[1] = '!' + keyValue[1];
          }
          request[keyValue[0]] = keyValue[1];
          return request;
        }

        if (isTest.test(request)) {
          console.log(isTest.test(request));
          var logicTest = isTest.exec(request);
          console.log(logicTest);
          var operator = logicTest[2];
          return function(element){
            if (operator == '>') {
              return Utils.deepValue(element, logicTest[1]) > logicTest[3];
            } else if (operator == '<') {
              return Utils.deepValue(element, logicTest[1]) < logicTest[3];
            }
          }
        }

        return {
          $: request
        };

      });
    }

    this.yo = 'hey';
    this.deck = Deck.query();
    this.cards = this.deck;

    var ravageur = 'ravageur terre';
    var iterator = 0;

    this.filterCards = function(str){
      this.cards = this.deck;

      var query = transformRequest(this.query);
      query.forEach(function(request){
        this.cards = filter(this.cards, request);
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
