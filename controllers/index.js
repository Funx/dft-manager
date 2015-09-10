var express = require('express')
  , router = express.Router()
  , Item = require('models/item')


router.use('/item', require('controllers/itemCtrl'))
router.use('/items', require('controllers/itemsCtrl'))
router.use('/deck', require('controllers/deckCtrl'))


router.get('*', (req, res) => {
  console.log("get *")
  res.sendFile(__base + '/public/index.html')
})

module.exports = router
