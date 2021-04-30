import Vue from 'vue'

export function showNextInQueue ({ commit, getters }) {
  if (getters.isProcessing) {
    const result = getters.topQueueNotification

    commit({
      type: 'dequeueNotification'
    })

    if (result) {
      commit({
        type: 'setCurrentNotification',
        notification: result
      })
    }

    if (getters.notificationAreEmpty) {
      commit({
        type: 'setProcessNotificationQueue',
        processQueue: false
      })
    }
  }
}

export function processQueue ({ commit, getters }) {
  if (getters.isProcessing) {
    return false
  }
  commit({
    type: 'setProcessNotificationQueue',
    processQueue: true
  })

  const result = getters.topQueueNotification

  if (result) {
    commit({
      type: 'dequeueNotification'
    })

    commit({
      type: 'setCurrentNotification',
      notification: result
    })
  }
}

export function addNotificationToQueue ({ commit }, { notification }) {
  commit({
    type: 'enqueueNotification',
    notification
  })
}

export function getNotifications ({ commit }, page) {
  return new Promise((resolve, reject) => {
    commit('NOTIFICATIONS_REQUEST')
    Vue.prototype.$http.get(`${process.env.VUE_APP_API_URL}/users/me/notifications`, {
      params: {
        page
      }
    })
      .then(response => response.data.data)
      .then(notifications => {
        commit('NOTIFICATIONS_SUCCESS', { notifications, page })
        resolve(notifications)
      })
      .catch(err => {
        commit('NOTIFICATIONS_ERROR')
        reject(err)
      })
  })
}

export function getLastNotifications ({ commit }) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http.get(`${process.env.API_URL}/last-notifications`)
      .then(response => response.data)
      .then(notifications => {
        commit('LAST_NOTIFICATIONS_SUCCESS', { notifications })
        resolve(notifications)
      })
      .catch(err => {
        commit('NOTIFICATIONS_ERROR')
        reject(err)
      })
  })
}

export function getTotalPendingNotifications ({ commit }) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http.get(`${process.env.API_URL}/total-pending-notifications`)
      .then(response => response.data)
      .then(notifications => {
        commit('TOTAL_NOTIFICATIONS_SUCCESS', { notifications })
        resolve(notifications)
      })
      .catch(err => {
        commit('NOTIFICATIONS_ERROR')
        reject(err)
      })
  })
}

export function markAsReadNotification ({ commit, dispatch }, notificationId, page = 1) {
  return new Promise((resolve, reject) => {
    commit('MARK_AS_READ_NOTIFICATION_REQUEST')
    Vue.prototype.$http.put(`${process.env.API_URL}/notifications/${notificationId}`)
      .then(() => {
        commit('MARK_AS_READ_NOTIFICATION_SUCCESS')
        return Promise.all([
          dispatch('getNotifications', page),
          dispatch('getLastNotifications'),
          dispatch('getTotalPendingNotifications')
        ])
      })
      .then(() => resolve())
      .catch(reject)
  })
}
