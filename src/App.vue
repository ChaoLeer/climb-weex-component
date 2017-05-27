<template>
  <div class="app">
    <!--<wx-button @onClick="jump('/')" type="info" size="middle" value="返回首页"></wx-button>-->
    <wx-list :config="listConfig" @listClick="listHandle"></wx-list>
    <!--<wx-button @onClick="open" type="success" size="small" value="打开"></wx-button>-->
    <scroller style="flex-direction: column;">
      <router-view append="node"></router-view>
    </scroller>
    <!--<wx-actionsheet v-if="states" :lists="actionList" @actionSelect="actionHandle"></wx-actionsheet>-->
  </div>
</template>

<script>
const modal = weex.requireModule('modal')
export default {
  data() {
    let vm = this
    let flag = false
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
      }],
      listConfig: {
        list: [{
          inner: '首页',
          bgColor: '#9966cc',
          color: '#fff',
          callback: function (item, index) {
            let msg = item
            Vue.set(item, 'color', flag ? '#f00' : '#0ff')
            vm.jump('/')
            modal.toast({ message: msg, duration: 2 })
            flag = !flag
          }
        }]
      }
    }
  },
  created() {
    // let vm = this
    // vm.listConfig = {
    //   list: [{
    //     inner: '首页',
    //     callback: function (item, index) {
    //       let msg = item
    //       vm.jump('/datepicker')
    //       modal.toast({ message: msg, duration: 2 })
    //     }
    //   }]
    // }
  },
  methods: {
    listHandle(item) {
      modal.toast({ message: JSON.stringify(item), duration: 2 })
    },
    open() {
      this.states = true
    },
    actionHandle(val) {
      modal.toast({ message: val, duration: 2 })
      this.states = false
    }
  }
}
</script>

<style scoped>

</style>