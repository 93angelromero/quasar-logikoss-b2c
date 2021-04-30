<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <div v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <div class="text-center q-pt-lg">
            <div class="col text-h4 ellipsis">
              Log in
            </div>
          </div>
          <q-form
            class="q-gutter-md q-mt-md"
          >
            <q-input
              v-model="credentials.email"
              label="Email"
              type="email"
              :error-message="firstError('email')"
              :error="hasError('email')" />
            <q-input
              v-model="credentials.password"
              label="Contraseña"
              type="password" />

            <div class="q-mt-md">
              <p>
                ¿Olvidaste tu contraseña? <q-btn :to="{ name: 'ForgotPassword' }" label="Recuperar contraseña" flat color="primary" />
              </p>
              <p>
                ¿No tienes cuenta? <q-btn :to="{ name: 'Register' }" label="Registrate aquí" flat color="primary" />
              </p>
              <q-btn
                color="primary"
                class="full-width"
                label="Iniciar sesión"
                :loading="submitting"
                @click="login"/>
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import get from 'lodash/get'
import FormErrors from 'src/mixins/FormErrors'
import swal from 'sweetalert2'

export default {
  name: 'PageLogin',
  mixins: [FormErrors],
  data () {
    return {
      errors: {},
      submitting: false,
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      this.submitting = true

      try {
        await this.$store.dispatch('auth/login', this.credentials)
        await this.$router.push({ name: 'Dashboard' })
      } catch (e) {
        if (get(e, 'response.status', 500) === 400) {
          this.errors = e.response.data.errors
          return
        }

        swal.fire({
          icon: 'error',
          title: get(e, 'response.data.message', 'Error del servidor, intenta mas tarde'),
          showConfirmButton: false,
          timer: 1500
        })
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
