angular.module('collection.service', [])

.factory('Collection', [
  function CollectionService () {

    var FastSet = require("collections/fast-set")

    console.log(FastSet)
    return FastSet
  }
])
