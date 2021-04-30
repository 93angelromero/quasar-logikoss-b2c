<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <q-input
            v-model="email"
            label="Email"
            type="email"
          />
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col">
          <q-btn
            color="primary"
            class="full-width"
            label="Recuperar contraseña"
            :loading="submitting"
            @click="recoverPassword"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import swal from 'sweetalert2'
import get from 'lodash/get'

export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      submitting: false
    }
  },
  methods: {
    async recoverPassword () {
      this.submitting = true
      try {
        const response = await this.$http.post(`${process.env.API_URL}/forgot-password`, {
          email: this.email
        })
        await swal.fire({
          icon: 'success',
          title: get(response, 'response.data.message', 'Se ha enviado un correo electrónico para restablecer su contraseña.')
        })
        await this.$router.push({ name: 'Login' })
      } catch (e) {
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
