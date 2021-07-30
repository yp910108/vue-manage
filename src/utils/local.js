const storage = sessionStorage

export function getLocalToken() {
  const { token } = storage
  return token || ''
}

export function setLocalToken(token) {
  storage.token = token
}

export function removeLocalToken() {
  storage.removeItem('token')
}
