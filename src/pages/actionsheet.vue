<template>
  <wx-panel title="actionsheet">
    <wx-button @onClick="btn" type="success" size="small" value="open"></wx-button>
    <wx-actionsheet v-if="states"  :lists="actionList" @actionSelect="actionHandle"></wx-actionsheet>
  </wx-panel>
</template>

<script>
  const modal = weex.requireModule('modal')
  export default {
    data () {
      return {
        states: false,
        actionList: [{
          label: '删除',
          value: 'delete'
        }, {
          label: '确认',
          value: 'ok'
        }, {
          label: '取消',
          value: 'concel',
          devide: true
        }]
      }
    },
    components: {
    },
    methods: {
      actionHandle: function (key) {
        this.states = false
        modal.toast({ message: key, duration: 1 })
      },
      btn: function () {
        this.states = true
        // modal.toast({ message: this.states, duration: 1 })
      },
      actionCoverHandler: function () {
        this.states = false
      }
    }
  }
</script>
<style scoped>
</style>