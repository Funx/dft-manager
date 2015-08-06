/* ===================== //
// public static Item.searchByName
// query: String
// limit: Number?
// done: callBack function([Item])
// ===================== */
module.exports = function searchItemByName (query, limit, done) {
  let Item = this.model('Item')

  if (!done) {
    done = limit
    limit = 50
  }

  Item.find({
    'name': {
      '$regex': query,
      '$options': 'i'
    }
  })
  .limit(limit)
  .exec((err, items) => {
    if(err) throw err
    done(null, items)
  })
}
