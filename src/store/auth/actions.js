import Vue from 'vue'

export function login ({ commit, dispatch }, credentials) {
  return new Promise((resolve, reject) => {
    commit('AUTH_REQUEST')
    Vue.prototype.$http.post(`${process.env.VUE_APP_API_URL}/auth/login`, credentials, { headers: { 'x-app': 'B2C' } })
      .then(response => {
        const token = response.data.access_token
        const warnings = response.data.warnings
        const user = response.data.user
        localStorage.setItem('token', token)
        localStorage.setItem('loginWarnings', JSON.stringify(warnings))
        localStorage.setItem('user', JSON.stringify(user))
        Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`
        commit('auth_success', { token, user, warnings })
        resolve(response.data)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        localStorage.removeItem('loginWarnings')
        localStorage.removeItem('user')
        reject(err)
      })
  })
}

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('AUTH_LOGOUT_REQUEST')
    Vue.prototype.$http.post(`${process.env.VUE_APP_API_URL}/auth/logout`)
      .then(() => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('loginWarnings')
        localStorage.removeItem('user')
        localStorage.removeItem('authConfig')
        delete Vue.prototype.$http.defaults.headers.common.Authorization
        resolve()
      })
      .catch(err => {
        commit('auth_logout_error')
        localStorage.removeItem('token')
        localStorage.removeItem('loginWarnings')
        localStorage.removeItem('user')
        localStorage.removeItem('authConfig')
        delete Vue.prototype.$http.defaults.headers.common.Authorization
        reject(err)
      })
  })
}

export function acceptTerms ({ commit }, termsId) {
  return new Promise((resolve, reject) => {
    commit('user_accept_terms', { id: termsId })
    const token = localStorage.getItem('token')
    Vue.prototype.$http.put(`${process.env.VUE_APP_API_URL}/terms-and-conditions/${termsId}/accept`, {
      headers: {
        'x-app': 'B2C',
        Authorization: 'Bearer ' + token
      }
    })
      .then(resp => {
        const user = JSON.parse(localStorage.getItem('user'))
        user.term_and_condition_id = termsId
        // localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(user))
        resolve(resp.data)
      })
      .catch(reject)
  })
}

export function authConfig ({ commit }) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http.get(`${process.env.VUE_APP_API_URL}/auth/config`)
      .then(response => {
        localStorage.setItem('authConfig', JSON.stringify(response.data))
        commit('auth_config', { config: response.data })
        resolve()
      })
      .catch(err => {
        commit('auth_config_error')
        localStorage.removeItem('authConfig')
        reject(err)
      })
  })
}
