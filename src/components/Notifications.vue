<template>
  <q-btn round dense flat color="white" class="q-mr-md" icon="notifications">
    <q-badge color="red" text-color="white" floating>
      {{ this.totalPendingNotifications.total }}
    </q-badge>
    <q-menu
    >
      <q-list style="min-width: 100px">
        <div>
          <q-item style="max-width: 420px" v-for="msg in lastNotifications" :key="msg.id" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ msg.data.message }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item :to="{ name: 'Notifications' }" class="text-center">
            Ver todas
          </q-item>
        </div>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'
import Pusher from 'pusher-js'

export default {
  name: 'Notifications',
  async created () {
    await Promise.all([
      this.$store.dispatch('notifications/getLastNotifications'),
      this.$store.dispatch('notifications/getTotalPendingNotifications')
    ])
    await this.listenNotifications()
  },
  methods: {
    async listenNotifications () {
      const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
        cluster: process.env.PUSHER_APP_CLUSTER
      })

      const channel = pusher.subscribe(`App.User.${this.user.id}`)
      channel.bind('Notification', async (data) => {
        this.$q.notify({
          message: data.message,
          icon: 'announcement',
          position: 'top-right',
          group: new Date().getTime()
        })

        await Promise.all([
          this.$store.dispatch('notifications/getLastNotifications'),
          this.$store.dispatch('notifications/getTotalPendingNotifications')
        ])
      })
    }
  },
  computed: {
    pendingNotifications () {
      return this.notifications.filter(notification => !notification.read_at)
    },
    ...mapGetters({
      user: 'auth/profile',
      lastNotifications: 'notifications/lastNotifications',
      totalPendingNotifications: 'notifications/totalPendingNotifications'
    })
  }
}
</script>

<style scoped>

</style>
