import {range, pipe} from 'ramda'
import {calcCosts} from '../../pages/Dashboard/calcCosts'

export function appendLogs (logs = []) {
  return prev => [...prev, ...logs]
}
