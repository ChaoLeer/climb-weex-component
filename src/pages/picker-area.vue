<template>
  <wx-panel title="pickerarea">
    <wx-button type="success" size="small" @onClick="btn" value="打开"></wx-button>
    <wx-pickerarea v-if="states" @pickerSelect="getValue" @cancel="pickerCancel"></wx-pickerarea>
  </wx-panel>
</template>

<script>
const modal = weex.requireModule('modal')
export default {
  data() {
    return {
      states: false,
      pickerList: {
        title: 'pickerarea',
        create: [{
          label: '陕西',
          value: '1'
        }, {
          label: '北京',
          value: '2'
        }, {
          label: '重庆',
          value: '3'
        }, {
          label: '山西',
          value: '4'
        }, {
          label: '广州',
          value: '5'
        }, {
          label: '湖南',
          value: '6'
        }, {
          label: '湖北',
          value: '7'
        }, {
          label: '新疆',
          value: '8'
        }]
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