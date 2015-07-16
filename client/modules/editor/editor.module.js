angular.module('dftm.editor', [
   'editor.controller'
  ,'editor.service'
])

.config([
  '$routeSegmentProvider',
  function($routeSegmentProvider){

    var editorSegmentConfig = {
      templateUrl: 'modules/editor/editor.html',
      controller: 'EditorCtrl',
      controllerAs: 'editor',
      dependencies: ['id']
    }

    $routeSegmentProvider
      .segment('edit', editorSegmentConfig)
      .segment('create', editorSegmentConfig)
  }
])
