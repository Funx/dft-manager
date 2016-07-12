// run crawler on apifier.com <3
// https://www.apifier.com/crawlers/fNCB8pwaPkTMqH8PK

function pageFunction (context) { // eslint-disable-line
  if (!isItemPage(location.href)) return null
  var $img = document.querySelector('.ak-encyclo-detail-illu img') || {}

  return {
    // ---
    id: idFromHref(location.href),
    name: textContent('h1'),
    type: textContent('.ak-encyclo-detail-type span'),
    recipe: getRecipe(),

    // ---
    url: location.href,
    img: $img.src,
    level: textContent('.ak-encyclo-detail-level').replace('Niveau : ', ''),
    dofusId: dofusIdFromHref(location.href),
    description: textContent('.ak-encyclo-detail-right .ak-panel .ak-panel-content'),

    // ---
    latestUpdate: 0,
    outdated: true,
    price: 0,
    favorites: 0,
    crafts: 0,
    stocks: 0,
    sold: 0,
  }

  // utils functions
  function isItemPage (href) {
    return href.match(/encyclopedie\/([a-z]|-)+\/\d+-([a-z]|-)+/)
  }
  function getRecipe () {
    var $ingredients = document.querySelectorAll('.ak-crafts .ak-list-element')
    return map($ingredients, function ($x) {
      return {
        quantity: textContent($x, '.ak-front').replace(' x', ''),
        id: idFromHref($x.querySelector('.ak-title a').href),
      }
    })
  }
  function map (iterable, fn) {
    return [].map.call(iterable, fn)
  }
  function textContent($elm, sel) {
    if (!sel) {
      sel = $elm
      $elm = document
    }
    return $elm.querySelector(sel).textContent.trim() || ''
  }
  function idFromHref (href) {
    var dofusId = dofusIdFromHref(href)
    return dofusId.match(/\d+-(.*)/)[1]// remove the numbers (1556-xyz -> xyz)
  }
  function dofusIdFromHref (href) {
    var hrefChunks = href.split('/')
    return hrefChunks[hrefChunks.length-1]
  }
}
