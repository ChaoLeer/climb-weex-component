<template>
  <wx-panel title="时间选择">
    <wx-button @onClick="openTime" size="small" value="打开"></wx-button>
    <wx-pickertime v-if="timeState" @pickerSelect="getData" @cancel="pickerCancel"></wx-pickertime>
  </wx-panel>
</template>
<script>
const modal = weex.requireModule('modal')
export default {
  data() {
    return {
      timeState: false
    }
  },
  computed: {
    platform: () => {
      // console.info( weex.config.env.platform.toLowerCase())
      return weex.config.env.platform.toLowerCase() == 'web'
    }
  },
  methods: {
    getData(val) {
      modal.toast({ message: val, duration: 2 })
      this.timeState = false
      console.info(val)
    },
    openTime() {
      this.timeState = true
    },
    pickerCancel() {
      this.timeState = false
    }
  }
}
</script>
