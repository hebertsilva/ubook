export function parseContact (data) {
  data.firstChar = data.name.charAt(0).toUpperCase()
  data.id = Math.random().toString(36).substr(2, 9)

  return data
}

export function removeContact (data, id) {
  return data.filter((el) => {
    return el.id !== id
  })
}
