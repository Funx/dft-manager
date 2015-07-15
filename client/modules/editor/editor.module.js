angular.module('dftm.editor', [
  'editor.controller'
])

.config([
  '$routeSegmentProvider',
  function($routeSegmentProvider){

    var editorSegmentConfig = {
      templateUrl: 'modules/editor/editor.html',
      controller: 'EditorCtrl',
      controllerAs: 'deck',
      dependencies: ['id']
    }

    $routeSegmentProvider
      .segment('edit', editorSegmentConfig)
      .segment('create', editorSegmentConfig)
  }
])
