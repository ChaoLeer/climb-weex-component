<template>
  <wx-panel title="picker">
    <wx-button type="success" size="large" @onClick="btn" value="打开picker"></wx-button>
    <wx-picker v-if="states" :pickerConfig="pickerList" @pickerSelect="pickerHandle"></wx-picker>
  </wx-panel>
</template>

<script>
const modal = weex.requireModule('modal')
export default {
  data() {
    return {
      states: false,
      pickerList: {
        title: 'picker',
        info: '欢迎使用picker',
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
    }
  }
}
</script>

<style scoped>

</style>