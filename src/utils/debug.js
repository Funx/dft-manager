export const logFnArgs = (name, fn) => (...args) => {
  if (!fn) fn = name
  const result = fn(...args)

  console.log(`${name} called with:`, args)
  console.log(`${name} returns:`, result)
  return result
}
