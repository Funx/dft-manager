module.exports = function makeStatic(func) {
  // returns a function wich apply the first argument as 'this'
  return function () {
    var args = Array.prototype.slice.call(arguments);
    func.apply(args.shift(), args)
  }
}
