export function appendLogs (logs) {
  return prev => [...prev, ...logs]
}
export function updateDB (logs) {
  return db => logs.reduce(reducer, db)

  function reducer (db, log) {
    // TODO
    return db
  }
}
