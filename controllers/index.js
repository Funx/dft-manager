var express = require('express')
  , router = express.Router()

router.use('/item', require('./item'))
router.use('/items', require('./items'))

router.get('*', function(req, res) {
  console.log("get *")
  res.sendFile(__base + '/public/index.html')
})

module.exports = router
