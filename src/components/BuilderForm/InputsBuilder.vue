<template>
  <div class="q-pa-md">
    <div class="row">
      <div v-for="(input, index) in inputs" :key="index" :class="getColumns(input.column)">
        <q-card class="q-mr-md q-mt-md">
          <q-card-section>
            <div class="text-h6">{{ input.card_title }}</div>
          </q-card-section>
          <q-card-section v-if="input.options.length > 0">
            <div class="row">
              <div v-for="(option,index) in input.options" :key="index" :class="getColumns(option.column)">
                <div v-if="option.type === 'input'">
                  <q-input
                    v-model="data[option.propertyName]"
                    :label="option.label"
                    :type="option.typeInput"
                    :input-class="option.class"
                    :mask="option.mask"
                    @input="option.onInput"
                    :default="option.default"
                    :clearable="option.clearable"
                    :rules="option.rules"
                    :disable="option.disable"
                    :readonly="option.readonly"
                  />
                </div>
                <div v-if="option.type === 'select'">
                  <q-select
                    v-model="data[option.propertyName]"
                    :class="option.class"
                    :options="option.answers"
                    :label="option.label"
                    :rules="option.rules"
                    :clearable="option.clearable"
                    :autocomplete="option.autocomplete"
                    :multiple="option.multiple"
                    :counter="option.counter"
                    :value="option.options.value"
                    :option-disable="option.optionDisable"
                    :use-chips="option.chips"
                    :disable="option.disable"
                    :readonly="option.readonly"
                    :emit-value="option.emitValue"
                    :map-options="option.mapOptions"
                    @change="option.onChange"
                  />
                </div>
                <div v-if="option.type === 'radio'">
                  <q-radio
                    v-model="data[option.propertyName]"
                    :label="option.label"
                    :val="option.val"
                    :disable="option.disable"
                    :color="option.color"
                    @change="option.onChange"
                  />
                </div>
                <div v-if="option.type === 'checkbox'">
                  <q-checkbox
                    v-model="data[option.propertyName]"
                    :label="option.label"
                    :disable="option.disable"
                    :color="option.color"
                    @change="option.onChange"
                  />
                </div>
                <div v-if="option.type === 'datePicker'">
                  <q-input v-model="data[option.propertyName]" filled :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="data[option.propertyName]" :locale="localeConfig" :mask="option.mask">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div v-if="option.type === 'timePicker'">
                  <q-input filled v-model="data[option.propertyName]" :mask="option.mask" :rules="option.rules">
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="data[option.propertyName]">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div v-if="option.type === 'range'">
                  <p>{{ option.text }}</p>
                  <q-range
                    v-model="data[option.propertyName]"
                    :name="option.name"
                    :label="option.label"
                    :vertical="option.vertical"
                    :markers="option.markers"
                    :step="option.step"
                    :min="option.min"
                    :max="option.max"
                    :disable="option.disable"
                    :readonly="option.readonly"
                    :color="option.color"
                    @change="option.onChange"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="input.type === 'input'">
            <q-input
              v-model="data[input.propertyName]"
              :label="input.label"
              :type="input.typeInput"
              :input-class="input.class"
              :mask="input.mask"
              @input="input.onInput"
              :default="input.default"
              :clearable="input.clearable"
              :rules="input.rules"
              :disable="input.disable"
              :readonly="input.readonly"
            />
          </q-card-section>
          <q-card-section v-if="input.type === 'select'">
            <q-select
              v-model="data[input.propertyName]"
              :class="input.class"
              :options="input.answers"
              :label="input.label"
              :rules="input.rules"
              :clearable="input.clearable"
              :autocomplete="input.autocomplete"
              :multiple="input.multiple"
              :counter="input.counter"
              :value="input.options.value"
              :option-disable="input.optionDisable"
              :use-chips="input.chips"
              :disable="input.disable"
              :readonly="input.readonly"
              :emit-value="input.emitValue"
              :map-options="input.mapOptions"
              @change="input.onChange"
            />
          </q-card-section>
          <q-card-section v-if="input.type === 'radio'">
            <q-radio
              v-model="data[input.propertyName]"
              :label="input.label"
              :val="input.val"
              :disable="input.disable"
              :color="input.color"
              @change="input.onChange"
            />
          </q-card-section>
          <q-card-section v-if="input.type === 'checkbox'">
            <q-checkbox
              v-model="data[input.propertyName]"
              :label="input.label"
              :disable="input.disable"
              :color="input.color"
              @change="input.onChange"
            />
          </q-card-section>
          <q-card-section v-if="input.type === 'datePicker'">
            <q-input filled v-model="data[input.propertyName]" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="data[input.propertyName]" :locale="localeConfig" :mask="input.mask">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>
          <q-card-section v-if="input.type === 'timePicker'">
            <q-input filled v-model="data[input.propertyName]" :mask="input.mask" :rules="input.rules">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="data[input.propertyName]">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>
          <q-card-section v-if="input.type === 'range'">
            <p>{{ input.text }}</p>
            <q-range
              v-model="data[input.propertyName]"
              :name="input.name"
              :label="input.label"
              :vertical="input.vertical"
              :markers="input.markers"
              :step="input.step"
              :min="input.min"
              :max="input.max"
              :disable="input.disable"
              :readonly="input.readonly"
              :color="input.color"
              @change="input.onChange"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputsBuilder',
  props: {
    inputs: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      localeConfig: {
        days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'],
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        firstDayOfWeek: 1
      }
    }
  },
  methods: {
    getColumns (column) {
      return `col col-sm-12 col-xs-12 col-md-${column} col-lg-${column} col-xl-${column}`
    }
  }
}
</script>

<style scoped>

</style>
