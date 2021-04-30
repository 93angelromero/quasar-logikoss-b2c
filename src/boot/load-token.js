import Vue from 'vue'

const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`
}
