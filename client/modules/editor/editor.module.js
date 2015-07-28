angular.module('dftm.editor', [
   'editor.controller'
  ,'editor.service'
])

.config([
  '$routeSegmentProvider',
  function($routeSegmentProvider){

    var editorSegmentConfig = {
      templateUrl: '/modules/editor/editor.html',
      controller: 'EditorCtrl',
      controllerAs: 'editor'
    }

    $routeSegmentProvider
      .segment('edit', editorSegmentConfig)
      .segment('create', editorSegmentConfig)
  }
])
