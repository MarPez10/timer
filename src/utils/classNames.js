export const classNames = (...args) => {
  const classesList = []
  args.forEach((arg) => {
    if (!arg) return

    const argType = typeof arg

    if (argType === 'string' || argType === 'number') classesList.push(arg)
    else if (Array.isArray(arg)) classesList.push(classNames(...arg))
    else if (argType === 'object') Object.entries(arg).forEach(([key, value]) => !!value && classesList.push(key))
  })

  return classesList.join(' ')
}
