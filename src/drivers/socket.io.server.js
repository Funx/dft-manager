import {Observable as O} from 'rx'
import socket from 'socket.io'

export function makeSocketDriver (server) {
  const io = socket(server)
  const connection$ = listen(io, 'connection')
    .map(socket => ({socket, name: 'connection'}))
  const disconnection$ = listen(io, 'disconnect')
    .map(socket => ({socket, name: 'disconnect'}))
  const subscribers$ = connection$
    .startWith([])
    .scan((acc, {socket}) => [...acc, socket])
    .combineLatest(
      disconnection$.startWith(null),
      (xs, {socket}) => xs.filter(x => x != socket))
    .shareReplay(1)

  return function socketDriver (sink$) {
    sink$.subscribe(({socket, broadcast, name, message}) => {
      if(socket && !broadcast) return socket.emit(name, message)
      if(socket && broadcast) return socket.broadcast.emit(name, message)
      if(!socket && !broadcast) return io.emit(name, message)
    })

    return {
      connection: () => connection$,
      disconnection: () => disconnection$,
      subscribers: () => subscribers$,
      listen: (name) => connection$.flatMap(({socket}) =>
        listen(socket, name)
          .takeUntil(listen(socket, 'disconnect'))
          .map(x => ({socket, name, message: x}))
      ),
    }
  }
}
export default makeSocketDriver

function listen (socket, name) {
  return O.fromEventPattern(
      (h) => socket.on(name, h),
      (h) => socket.removeListener(name, h))
    .shareReplay(1)
}
