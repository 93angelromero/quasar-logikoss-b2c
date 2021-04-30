<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <h5>Notificaciones</h5>
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col">
          <q-infinite-scroll @load="getItemsScrollHandler" :offset="250">
            <q-card class="my-card bg-white text-black q-mt-md" v-for="(item, index) in notifications" :key="index">
              <q-card-section>
                <div class="text-black text-weight-bold">{{ item.data.title }}
                  <span
                    v-if="item.read_at"
                    class="text-weight-thin float-right"
                  >
                    Leído: {{ item.read_at }}
                  </span>
                </div>
                <div>{{ item.data.text }}</div>
              </q-card-section>

              <q-separator v-if="!item.read_at"/>

              <q-card-actions align="right">
                <q-btn
                  outline
                  round
                  color="blue"
                  icon="check"
                  size="sm"
                  v-if="!item.read_at"
                  @click="markAsRead(item.id)"
                >
                  <q-tooltip>Marcar como leída</q-tooltip>
                </q-btn>
              </q-card-actions>
            </q-card>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </div>
      </div>
      <div class="row q-mt-md" v-if="notifications.length === 0">
        <div class="col">
          <p class="text-center">No hay notificaciones.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import swal from 'sweetalert2'
import get from 'lodash/get'
import Pusher from 'pusher-js'
export default {
  name: 'ShowNotifications',
  async created () {
    await this.listenNotifications()
  },
  methods: {
    async listenNotifications () {
      const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
        cluster: process.env.PUSHER_APP_CLUSTER
      })

      const channel = pusher.subscribe(`User.${this.user.id}`)
      channel.bind('Notification', async () => {
        await Promise.all([
          this.$store.dispatch('notifications/getNotifications', 1),
          this.$store.dispatch('notifications/getTotalPendingNotifications')
        ])
      })
    },
    async getItemsScrollHandler (index, done) {
      try {
        const notifications = await this.$store.dispatch('notifications/getNotifications', parseInt(index))
        done(notifications.length === 0)
      } catch (e) {
        this.$q.notify({
          type: 'negative',
          message: 'Error al cargasr notificaciones, intenta mas tarde'
        })
      }
    },
    async markAsRead (notificationId) {
      try {
        await this.$store.dispatch('notifications/markAsReadNotification', notificationId)
      } catch (e) {
        swal.fire({
          icon: 'error',
          title: get(e, 'response.data.message', 'Error del servidor, intenta mas tarde'),
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      token: 'auth/token',
      user: 'auth/profile',
      notifications: 'notifications/notifications'
    })
  }
}
</script>
