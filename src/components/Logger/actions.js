export function appendLogs (logs = []) {
  return prev => [...prev, ...logs]
}
