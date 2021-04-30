<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <q-input
            v-model="password"
            label="Password"
            type="password"
            :error-message="firstError('password')"
            :error="hasError('password')"
          />
          <q-input
            v-model="password_confirmation"
            label="Confirmation Password"
            type="password"
            :error-message="firstError('password_confirmation')"
            :error="hasError('password_confirmation')"
          />
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col">
          <q-btn
            color="primary"
            class="full-width"
            label="Registrar contraseña"
            :loading="submitting"
            @click="register"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import swal from 'sweetalert2'
import get from 'lodash/get'
import FormErrors from 'src/mixins/FormErrors'

export default {
  name: 'InvitationNewUser',
  mixins: [FormErrors],
  data () {
    return {
      password: '',
      password_confirmation: '',
      submitting: false
    }
  },
  methods: {
    async register () {
      const token = this.$route.query.token
      this.submitting = true
      try {
        const response = await this.$http.post(`${process.env.API_URL}/set-password`, {
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: token
        })
        await swal.fire({
          icon: 'success',
          title: get(response, 'response.data.message', 'Tu password ha sido configurado con éxito.')
        })
        await this.$store.dispatch('auth/loginFromToken', response.data.token)
        await this.$router.push({ name: 'Profile' })
      } catch (e) {
        if (get(e, 'response.status', 500) === 400) {
          this.errors = e.response.data.errors
          return
        }

        swal.fire({
          icon: 'error',
          title: get(e, 'response.data.error', 'Error del servidor, intenta mas tarde')
        })
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>

</style>
