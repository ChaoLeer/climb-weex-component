<template>
  <wx-panel title="日期选择">
    <wx-button @onClick="openDate" size="small" value="打开"></wx-button>
    <wx-pickerdate v-if="dateState" @pickerSelect="getData" @cancel="pickerCancel"></wx-pickerdate>
  </wx-panel>
</template>
<script>
const modal = weex.requireModule('modal')
export default {
  data() {
    return {
      dateState: false
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
      this.dateState = false
      console.info(val)
    },
    openDate() {
      this.dateState = true
    },
    pickerCancel() {
      this.dateState = false
    }
  }
}
</script>
