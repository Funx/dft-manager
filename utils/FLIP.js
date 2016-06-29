import {Hook} from 'utils/hook'

export function FLIP (vtree$) {
  return vtree$.map((children) => {
    children = Array.isArray(children)
      ? children
      : [children]

    return children.map(child => {
      child.properties.FLIP = Hook(flipHook)
      return child
    })
  })
}
export default FLIP

function flipHook(node, attr, prevValue, depth = 0) {
  const prevClientRect = prevValue && prevValue.clientRect
  const clientRect = this.clientRect = node.getBoundingClientRect()

  if(!prevClientRect && !depth) {
    return requestAnimationFrame(() => flipHook.apply(this, [...arguments, depth + 1]))
  }

  const areValidClientRect = isValidCLientRect(prevClientRect)
    && isValidCLientRect(clientRect)
  const shouldFlip = areValidClientRect

  if(shouldFlip) {
    node.style.transform = `translate(
        ${prevClientRect.left - clientRect.left}px,
        ${prevClientRect.top - clientRect.top}px
      )`
    node.style.transition = `none`

    requestAnimationFrame(() => {
      node.style.transition = `transform .2s ease-in-out`

      requestAnimationFrame(() => {
        node.style.transform = ''
      })
    })
  }

  function isValidCLientRect(clientRect) {
    return !!(
      clientRect
      && (clientRect.height
      || clientRect.width
      || clientRect.top
      || clientRect.bottom
      || clientRect.right
      || clientRect.left)
    )
  }
}
