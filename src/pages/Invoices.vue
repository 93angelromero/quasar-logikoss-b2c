<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <h5>Facturas</h5>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-table
            title="Invoices"
            :data="invoices"
            :columns="columns"
            row-key="name"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import swal from 'sweetalert2'
import get from 'lodash/get'

export default {
  name: 'Invoices',
  data () {
    return {
      invoices: [],
      columns: [
        { name: 'code', align: 'center', label: 'SA', field: 'sa' },
        { name: 'folio', align: 'center', label: 'Folio', field: 'folio', sortable: true },
        { name: 'currency', label: 'Currency', field: 'currency.code', sortable: true },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'doc_date', label: 'Doc Date', field: 'doc_date' },
        { name: 'due_date', label: 'Due Date', field: 'due_date' },
        { name: 'payment_date', label: 'Payment Date', field: 'payment_date', sortable: true },
        { name: 'total', label: 'Total', field: 'total', sortable: true }
      ]
    }
  },
  async created () {
    await this.getInvoices()
  },
  methods: {
    async getInvoices () {
      try {
        // https://api-dev.logikoss.com/v1/clients/1/mega-sales?include=currency,sales,files,sales.saleable&page=1&per_page=50
        const response = await this.$http.get(`${process.env.VUE_APP_API_URL}/clients/${this.userLogged.id}/mega-sales?include=currency,sales,files,sales.saleable&page=1&per_page=50`)
        this.invoices = response.data
      } catch (e) {
        swal.fire({
          icon: 'error',
          title: get(e, 'response.data.error', 'Error del servidor, intenta mas tarde')
        })
      }
    },
    addNewInvoice () {
      this.dialogInvoice = true
    },
    closeDialogInvoice () {
      this.dialogInvoice = false
    },
    async parseInvoice () {
      const formData = new FormData()
      formData.append('file', this.invoiceXml)

      const response = await this.$http.post(`${process.env.API_URL}/invoices/parse`, formData)
      this.invoiceDetail = response.data
      this.invoiceMode = true
    },
    cancelSaveInvoice () {
      this.resetInvoiceForm()
    },
    resetInvoiceForm () {
      this.invoiceXml = ''
      this.invoiceDetail = {
        Emisor: {
          Nombre: '',
          Rfc: ''
        },
        Receptor: {
          Nombre: '',
          Rfc: ''
        }
      }
      this.invoiceMode = false
      this.dialogInvoice = false
    },
    async addInvoice () {
      try {
        await this.$http.post(`${process.env.API_URL}/invoices`, this.invoiceDetail)
        this.dialogInvoice = false
        await swal.fire({
          icon: 'success',
          title: 'Tus datos han sido guardados con éxito!'
        })
        this.resetInvoiceForm()
        await this.getInvoices()
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
    userLogged () {
      return this.$store.getters['auth/userLogged']
    }
  }
}
</script>

<style scoped>

</style>
