<template>
  <wx-panel title="pickerarea">
    <wx-button type="success" size="small" @onClick="btn" value="打开"></wx-button>
    <wx-pickerarea v-if="states" @pickerSelect="getValue" @cancel="pickerCancel" :value="defaultPicker"></wx-pickerarea>
  </wx-panel>
</template>

<script>
const modal = weex.requireModule('modal')
export default {
  data() {
    return {
      states: false,
      defaultPicker: {
        province: {
          name: '陕西省',
          code: 610000
        },
        city: {
          name: '铜川市',
          code: 610200
        },
        area: {
          name: '印台区',
          code: 610203
        }
      }

    }
  },
  methods: {
    pickerHandle: function (key) {
      this.states = false
      modal.toast({ message: key, duration: 1 })
    },
    btn: function () {
      this.states = true
      // modal.toast({ message: this.states, duration: 1 })
    },
    pickerCoverHandler: function () {
      this.states = false
    },
    pickerCancel() {
      this.states = false
    },
    getValue(value) {
      this.states = false
      modal.toast({ message: JSON.stringify(value), duration: 1 })
      console.info(JSON.stringify(value))
    }
  }
}
</script>

<style scoped>

</style>