<template>
  <q-page>
    <div class="q-pa-md">
      <div v-if="config.type === 'single'" class="row">
        <div class="col-md-6 offset-md-3">
          <inputs-builder
            :inputs="config.inputs"
            :data.sync="input"
          ></inputs-builder>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-md-8 offset-md-2">
          <q-stepper
            v-model="pass"
            ref="stepper"
            color="primary"
            animated
          >
            <q-step
              v-for="(step, index) in config.steps" :key="index"
              :name="step.page"
              :title="step.title"
              :done="step > 1"
            >
              <inputs-builder
                :inputs="step.inputs"
                :data.sync="input"
              ></inputs-builder>
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation class="text-right">
                <div class="row">
                  <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" v-if="pass > 1">
                    <q-btn flat color="primary" @click="$refs.stepper.previous()" label="Back" class="full-width"  />
                  </div>
                  <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" v-if="pass === config.steps.length">
                    <q-btn @click="config.onFinish(input)" label="Finish" class="full-width" />
                  </div>
                  <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" v-else>
                    <q-btn @click="$refs.stepper.next()" color="primary" label="Continue" class="full-width" />
                  </div>
                </div>
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import InputsBuilder from 'components/BuilderForm/InputsBuilder'
export default {
  name: 'FormBuilder',
  components: { InputsBuilder },
  data () {
    return {
      pass: 1
    }
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    input: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
