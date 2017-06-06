<template>
  <wx-panel title="cascade">
    <wx-button type="success" size="small" @onClick="btn" value="打开"></wx-button>
    <wx-cascade v-if="states" @pickerSelect="getValue" mainKey="code" :datas="datas" :level="3"></wx-cascade>
  </wx-panel>
</template>

<script>
const modal = weex.requireModule('modal')
import { province, city, area } from '../components/picker/city-data'
export default {
  data() {
    return {
      states: false,
      pickerList: {
        title: 'cascade',
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
      },
      defaultPicker: [{
        name: '陕西省',
        code: 610000
      }, {
        name: '铜川市',
        code: 610200
      }, {
        name: '印台区',
        code: 610203
      }],
      datas: [
        province,
        city,
        area
      ]
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