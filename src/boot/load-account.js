import Vue from 'vue'

const accountId = localStorage.getItem('accountId')

if (accountId) {
  Vue.prototype.$http.defaults.headers.common['x-account-id'] = `${accountId}`
}
