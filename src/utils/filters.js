export function isEmpty (obj) {
  for (const prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }

  return JSON.stringify(obj) === JSON.stringify({})
}

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
