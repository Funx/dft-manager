angular.module('floatingActionButton.controller', [])

.controller('FloatingActionButtonCtrl', [
  '$rootScope',
  function($rootScope){
    this.actions = {
      create: {
        icon: '',
        expression: '"Ajouter 1 objet"',
        action: function () {
          $rootScope.$broadcast('create');
        }
      },
      edit: {
        icon: '',
        expression: '"Editer " + fab.selectedItemsLength + " objets"',
        action: function () {
          $rootScope.$broadcast('edit');
        }
      },
      craft: {
        icon: '',
        expression: '"Crafter les " + fab.selectedItemsLength + " objets sélectionnés"',
        action: function () {
          $rootScope.$broadcast('craft');
        }
      },
      sell: {
        icon: '',
        expression: '"Vendre les " + fab.selectedItemsLength + " objets sélectionnés"',
        action: function () {
          $rootScope.$broadcast('sell');
        }
      },
      delete: {
        icon: '',
        expression: '"Supprimer la sélection (" + fab.selectedItemsLength + " objets)"',
        action: function () {
          $rootScope.$broadcast('delete');
        }
      },
      selectAll: {
        icon: '',
        expression: '"Tout sélectionner"',
        action: function () {
          $rootScope.$broadcast('selectAll');
        }
      },
      unselectAll: {
        icon: '',
        expression: '"Tout désélectionner"',
        action: function () {
          $rootScope.$broadcast('unselectAll');
        }
      }
    }

    this.selectedItemsLength = 10;

    this.availableActions = ['create', 'edit', 'selectAll', 'unselectAll', 'delete', 'craft'];

  }
])
