import {Observable as O} from 'rx'
import io from 'socket.io-client'

export function makeSocketDriver (url) {
  const socket = io.connect(url)
  return (output$) => {
    output$.subscribe(
      ({name, message}) => socket.emit(name, message),
      err => console.error(err),
    )

    return {
      select: (name) =>
        O.fromEventPattern(
            (h) => socket.on(name, h),
            (h) => socket.removeListener(name, h))
          .shareReplay(1),
    }
  }
}
export default makeSocketDriver
