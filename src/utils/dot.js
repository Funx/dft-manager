export const dot = (classNames) => {
  if (typeof classNames === 'string') {
    return classNames
      .split(' ')
      .map(className => `.${className}`)
      .join(' ')
  }
  if (Array.isArray(classNames)) {
    return classNames
      .map(className => `.${className}`)
      .join(' ')
  }
  return `${classNames}`
}

export default dot
