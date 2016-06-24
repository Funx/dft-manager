export function splitLogs (str = '') {
  return str.trim()
    .split(/\r?\n/) // line breaks
    .map(x => x.trim())
    .filter(x => !!x)
}

export function parseLog (str = '') {
  return {}
}

export function parseLogs (str) {
  return splitLogs(str).map(parseLog)
}
