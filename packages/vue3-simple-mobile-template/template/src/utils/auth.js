const tokenKey = 'token'
const localStorage = window.localStorage

export function getToken() {
  return getStorage(tokenKey)
}

export function setToken(data) {
  return setStorage(tokenKey, data)
}

export function removeToken() {
  return removeStorage(tokenKey)
}

export function getStorage(key) {
  if (typeof key !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return
  }
}

export function setStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data))
}

export function removeStorage(TokenKey) {
  return localStorage.removeItem(TokenKey)
}

export function getAllStorage() {
  const all = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const val = getStorage(key)
    all[key] = val
  }
  return all
}

export function clearStorage() {
  return localStorage.clear()
}
