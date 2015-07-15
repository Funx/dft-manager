angular.module('floatingActionButton.controller', [])

.controller('FloatingActionButtonCtrl', [
  '$rootScope',
  '$location',
  function($rootScope, $location){
    this.actions = {
      create: {
        icon: '',
        expression: '"Ajouter 1 objet"',
        action: function () {
          $rootScope.$broadcast('plzCreate');
          $location.path( "/create" );
        }
      },
      edit: {
        icon: '',
        expression: '"Editer " + fab.selectedItemsLength + " objets"',
        action: function () {
          $rootScope.$broadcast('plzEdit');
          $location.path( "/edit/selection" );
        }
      },
      craft: {
        icon: '',
        expression: '"Crafter les " + fab.selectedItemsLength + " objets sélectionnés"',
        action: function () {
          $rootScope.$broadcast('plzCraft');
        }
      },
      sell: {
        icon: '',
        expression: '"Vendre les " + fab.selectedItemsLength + " objets sélectionnés"',
        action: function () {
          $rootScope.$broadcast('plzSell');
        }
      },
      delete: {
        icon: '',
        expression: '"Supprimer la sélection (" + fab.selectedItemsLength + " objets)"',
        action: function () {
          $rootScope.$broadcast('plzDelete');
        }
      },
      selectVisible: {
        icon: '',
        expression: '"Sélectionner tous les éléments visibles"',
        action: function () {
          $rootScope.$broadcast('plzSelectAll');
        }
      },
      unselectVisible: {
        icon: '',
        expression: '"Désélectionner les éléments visibles"',
        action: function () {
          $rootScope.$broadcast('plzUnselectVisible');
        }
      }
    }

    this.selectedItemsLength = 10;

    this.availableActions = ['create', 'edit', 'selectVisible', 'unselectVisible', 'delete', 'craft'];

  }
])
