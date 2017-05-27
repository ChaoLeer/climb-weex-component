<template>
  <div>
    <wx-list :height="130" :lineHeight="130" color="#9966cc" :config="listConfig"></wx-list>
  </div>
</template>

<script>
var navigator = weex.requireModule('navigator')
var modal = weex.requireModule('modal')

export default {
  data() {
    return {
      listConfig: {
        router: true,
        list: [{
          inner: 'button',
          path: '/button'
        }, {
          inner: 'actionsheet',
          path: '/actionsheet'
        }, {
          inner: 'picker',
          path: '/picker'
        }, {
          inner: '日期选择',
          path: '/datepicker'
        }, {
          inner: '时间选择',
          path: '/timepicker'
        }, {
          inner: '地域选择',
          path: '/pickerarea'
        }]
      }
    }
  },
  methods: {
    navJump() {
      // modal.toast({message: false, duration: 2})
      if (weex.config.env.platform.toLowerCase() == 'web') {
        // console.info(window)
        modal.toast({ message: true, duration: 2 })
      } else {
        modal.toast({ message: '2', duration: 2 })
      }
      // navigator.push({
      //   url: 'http://192.168.1.116:8080/dist/foo.js',
      //   animated: "true"
      // }, event => {
      //   modal.toast({ message: 'callback: ' + event })
      // })
    }
  }
}
</script>

<style scoped>
.catalog {
  background-color: #fefefe;
}

.cover {
  background-color: #111;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.catalog-menu {
  border-style: solid;
  border-bottom-width: 1px;
  border-color: #efefef;
}

.catalog-menu-txt {
  color: #787878;
  font-size: 36px;
  line-height: 162px;
  padding-left: 26px;
}
</style>