angular.module('floatingActionButton.controller', [])

.controller('FloatingActionButtonCtrl', [
  '$rootScope'
  ,'$location'
  ,'Selection'
  ,function($rootScope, $location, Selection){
    this.actions = {
      create: {
        icon: '',
        expression: '"Ajouter 1 objet"',
        action: () => {
          $rootScope.$broadcast('plzCreate')
          $location.path( "/create" )
        }
      }
      ,edit: {
        icon: ''
        ,expression: '"Editer " + fab.getSelectionLength() + " objets"'
        ,action: () => {
          $rootScope.$broadcast('plzEdit')
          $location.path( "/edit/selection" )
        }
      }
      ,craft: {
        icon: ''
        ,expression: '"Crafter les " + fab.getSelectionLength() + " objets sélectionnés"'
        ,action: () => {
          $rootScope.$broadcast('plzCraft')
        }
      }
      ,sell: {
        icon: ''
        ,expression: '"Vendre les " + fab.getSelectionLength() + " objets sélectionnés"'
        ,action: () => {
          $rootScope.$broadcast('plzSell')
        }
      }
      ,delete: {
        icon: ''
        ,expression: '"Supprimer la sélection (" + fab.getSelectionLength() + " objets)"'
        ,action: () => {
          $rootScope.$broadcast('plzDelete')
        }
      }
      ,selectVisible: {
        icon: ''
        ,expression: '"Ajouter visible à la sélection"'
        ,action: () => {
          $rootScope.$broadcast('plzSelectVisible')
        }
      }
      ,unselectVisible: {
        icon: ''
        ,expression: '"Soustraire visible à la sélection"'
        ,action: () => {
          $rootScope.$broadcast('plzUnselectVisible')
        }
      }
      ,unselectAll: {
        icon: ''
        ,expression: '"Vider la sélection"'
        ,action: () => {
          Selection.empty()
        }
      }
    }

    this.getSelectionLength = Selection.getLength

    this.getAvailableActions = function getAvailableActions () {
      if (!Selection.getLength()) {
        return ['create', 'selectVisible']
      }
      return ['craft', 'edit', 'create', 'delete', 'unselectVisible', 'selectVisible', ]
    }

  }
])
