<template>
  <div class="app">
    <wx-button @onClick="jump('/')" type="info" size="middle" value="返回首页"></wx-button>
    <wx-button @onClick="open" type="success" size="small" value="打开"></wx-button>
    <scroller style="padding-top: 88px;flex-direction: column;">
      <router-view   append="node"></router-view>
    </scroller>
    <wx-actionsheet v-if="states"  :lists="actionList" @actionSelect="actionHandle"></wx-actionsheet>
  </div>
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
    methods: {
      open () {
        this.states = true
      },
      actionHandle (val) {
        modal.toast({message: val, duration: 2})
        this.states = false
      }
    }
  }
</script>

<style scoped>
  .app{
  }
</style>