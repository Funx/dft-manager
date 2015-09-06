module.exports = {
  maybe: (fn) => function (...args) {
    if (args.length === 0) return
    else {
      for (let arg in args) {
        if (args === null) return
      }
      return fn.apply(this, args)
    }
  }
}
