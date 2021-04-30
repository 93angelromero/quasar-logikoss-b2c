<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <h4>Dashboard</h4>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      cards: []
    }
  },
  async created () {
  },
  methods: {},
  computed: {
    ...mapGetters({
      token: 'auth/token'
    })
  }
}
</script>
