export function NOTIFICATIONS_SUCCESS (state, { notifications, page }) {
  if (page === undefined || page === 1) {
    state.notifications = []
  }

  state.status = 'ready'
  state.notifications = state.notifications.concat(notifications)
}

export function LAST_NOTIFICATIONS_SUCCESS (state, { notifications }) {
  state.lastNotifications = notifications
}

export function TOTAL_NOTIFICATIONS_SUCCESS (state, { notifications }) {
  state.totalPendingNotifications = notifications
}

export function NOTIFICATIONS_REQUEST (state) {
  state.status = 'loading...'
}

export function NOTIFICATIONS_ERROR (state) {
  state.status = 'error'
}

export function MARK_AS_READ_NOTIFICATION_REQUEST (state) {
  state.status = 'loading...'
}

export function MARK_AS_READ_NOTIFICATION_SUCCESS (state) {
  state.status = 'error'
}
