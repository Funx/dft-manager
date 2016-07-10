export const logFnArgs = (name, fn) => (...args) => {
  if (!fn) fn = name
  const result = fn(...args)

  console.log(`${name} called with:`, args)
  console.log(`${name} returns:`, result)
  return result
}

export const timeStart = (label) => (x) => (console.time(label), x)
export const timeEnd = (label) => (x) => (console.timeEnd(label), x)
export const monitorFn = (label, fn) => (...args) => {
  timeStart(label)()
  const result = fn(...args)
  timeEnd(label)()

  return result
}
