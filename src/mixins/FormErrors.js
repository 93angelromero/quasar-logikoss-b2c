export default {
  data () {
    return {
      errors: {}
    }
  },
  methods: {
    hasError (field) {
      return Object.keys(this.errors).includes(field)
    },
    firstError (field) {
      return this.hasError(field) ? this.errors[field] : ''
    }
  }
}
