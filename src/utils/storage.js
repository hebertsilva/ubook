const NAME_STORAGE = 'ubook-contacts'

export function setStorage (data) {
  window.localStorage.setItem(window.btoa(NAME_STORAGE), window.btoa(JSON.stringify(data)))
}

export function getStorage () {
  const storage = window.localStorage.getItem(window.btoa(NAME_STORAGE))
  return storage ? JSON.parse(window.atob(storage)) : []
}
