angular.module('dftm.logsSniffer', [
   'logsSniffer.controller'
  ,'logsSniffer.service'
])

.config([
  '$routeSegmentProvider',
  function($routeSegmentProvider){

    var editorSegmentConfig = {
      templateUrl: '/modules/logsSniffer/logsSniffer.html',
      controller: 'LogsSnifferCtrl',
      controllerAs: 'sniffer'
    }

    $routeSegmentProvider
      .segment('sniffer', editorSegmentConfig)
  }
])
