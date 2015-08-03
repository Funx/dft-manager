var express = require('express')
  , router = express.Router()

router.use('/item', require('controllers/itemCtrl'))
router.use('/items', require('controllers/itemsCtrl'))

router.get('*', (req, res) => {
  console.log("get *")
  res.sendFile(__base + '/public/index.html')
})

module.exports = router
