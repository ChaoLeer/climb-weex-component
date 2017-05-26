<template>
  <div class="catalog">
    <div class="catalog-menu" @click="jump('/')">
      <text class="catalog-menu-txt">首页</text>
    </div>
    <div class="catalog-menu" @click="navJump">
      <text class="catalog-menu-txt">foo</text>
    </div>
    <div class="catalog-menu" @click="jump('/button')">
      <text class="catalog-menu-txt">button</text>
    </div>
    <div class="catalog-menu" @click="jump('/actionsheet')">
      <text class="catalog-menu-txt">actionsheet</text>
    </div>
    <div class="catalog-menu" @click="jump('/picker')">
      <text class="catalog-menu-txt">picker</text>
    </div>
    <div class="catalog-menu" @click="jump('/timepicker')">
      <text class="catalog-menu-txt">timepicker</text>
    </div>
    <div class="catalog-menu" @click="jump('/datepicker')">
      <text class="catalog-menu-txt">datepicker</text>
    </div>
    <div class="catalog-menu" @click="jump('/pickerarea')">
      <text class="catalog-menu-txt">pickerarea</text>
    </div>
    <!--<div class="cover"></div>-->
  </div>
</template>

<script>
var navigator = weex.requireModule('navigator')
var modal = weex.requireModule('modal')

export default {
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