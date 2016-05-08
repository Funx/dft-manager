import nextTick from 'next-tick'

class _Hook {
  constructor(fn) {
    this.fn = fn
  }

  hook() {
    this.fn.apply(this, arguments)
  }
}

export default Hook
export function Hook(fn) {
  return new _Hook(fn)
}

export function preRenderHook(fn) {
  return new _Hook(
    (...args) => nextTick(() => fn(...args))
  )
}
