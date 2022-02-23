const tokenKey = 'token'

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
  const value = uni.getStorageSync(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

export function setStorage(key, data) {
  return uni.setStorageSync(key, JSON.stringify(data))
}

export function removeStorage(TokenKey) {
  return uni.removeStorageSync(TokenKey)
}

export function getAllStorage() {
  const all = {}
  for (let i = 0; i < uni.length; i++) {
    const key = uni.key(i)
    const val = getStorage(key)
    all[key] = val
  }
  return all
}

export function clearStorage() {
  return uni.clearStorage()
}
