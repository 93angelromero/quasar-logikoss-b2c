export function isLoggedIn (state) {
  return !!state.token
}

export function authStatus (state) {
  return state.status
}

export function token (state) {
  return state.token
}

export function userLogged (state) {
  return state.user
}

export function hasLoginWarnings (state) {
  return state.loginWarnings.length > 0
}

export function loginWarnings (state) {
  return state.loginWarnings
}

export function logicoins (state) {
  return state.user.client.logicoins
}

export function account (state) {
  return state.account
}

export function profile (state) {
  return state.profile
}
