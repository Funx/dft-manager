angular.module('utils.liveEventBinding.service', [])

.factory('liveEventBinding', [
  () => {
    console.log("registered")

    return (eventType, elementQuerySelector, cb, capturing) => {
      console.log('executed')
      document.addEventListener('eventType', (event) => {
        console.log('event called', event)
        var qs = document.querySelectorAll(elementQuerySelector)
        if (qs) {
          var el = event.target, index = -1
          while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) {
            el = el.parentElement
          }
          if (index > -1) {
            cb.call(event, el)
          }
        }
      }, capturing)
    }
  }
])
