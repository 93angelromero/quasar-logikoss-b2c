<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Logikoss
        </q-toolbar-title>
        <notifications v-if="isLoggedIn"></notifications>
        <q-btn
          v-if="!isLoggedIn"
          label="Iniciar Sesión"
          color="primary"
          :to="{ name: 'Login' }"
        />
        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          MENU
        </q-item-label>

        <!-- auth -->
        <q-item
          v-if="!isLoggedIn"
          clickable
          :to="{ name: 'Login' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="arrow_right_alt" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Iniciar sesión</q-item-label>
            <q-item-label caption>
              Inicia sesión en tu cuenta
            </q-item-label>
          </q-item-section>
        </q-item>

        <!-- fin auth -->

        <!-- home -->
        <q-item
          v-if="isLoggedIn"
          clickable
          :to="{ name: 'Dashboard' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Inicio</q-item-label>
            <q-item-label caption>
              Ir a inicio
            </q-item-label>
          </q-item-section>
        </q-item>

        <!-- fin home -->

        <!-- Usuarios -->
        <q-item
          v-if="isLoggedIn"
          clickable
          :to="{ name: 'Users' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="supervisor_account" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption>
              Usuarios
            </q-item-label>
          </q-item-section>
        </q-item>

        <!-- Facturas -->
        <q-item
          v-if="isLoggedIn"
          clickable
          :to="{ name: 'Invoices' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="note" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Facturas</q-item-label>
            <q-item-label caption>
              Facturas
            </q-item-label>
          </q-item-section>
        </q-item>

        <!-- logout -->
        <q-item
          v-if="isLoggedIn"
          clickable
          @click="logout"
        >
          <q-item-section
            avatar
          >
            <q-icon name="exit_to_app" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cerrar sesión</q-item-label>
            <q-item-label caption>
              Cierra sesión
            </q-item-label>
          </q-item-section>
        </q-item>

        <!-- fin logout -->

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Notifications from 'components/Notifications'

export default {
  name: 'MainLayout',
  components: { Notifications },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('auth/logout')
      } catch (e) {
      } finally {
        await this.$router.push({ name: 'Home' })
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn'
    })
  }
}
</script>
