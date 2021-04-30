export function AUTH_SUCCESS (state, { token }) {
  state.token = token
}

export function AUTH_REQUEST (state) {
  state.status = 'Cargando...'
}

export function AUTH_ERROR (state) {
  state.status = 'Error, intente mas tarde'
}

export function LOGOUT (state) {
  state.status = ''
  state.token = ''
}

export function AUTH_LOGOUT_REQUEST (state) {
  state.status = 'loading'
}

export function GET_PROFILE_REQUEST (state) {
  state.status = 'loading'
}

export function GET_PROFILE (state, { profile }) {
  state.profile = profile
}

export function AUTH_LOGOUT_ERROR (state) {
  state.status = ''
  state.token = ''
}

export function CHANGE_ACCOUNT (state, { account }) {
  state.account = account
}
