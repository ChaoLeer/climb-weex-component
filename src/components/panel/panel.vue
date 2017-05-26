<template>
  <div class="panel">
    <div class="panel-heading">
      <text class="panel-title">{{title}}</text>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // imgUrl: 'drawable://testimg'
      }
    },
    props: {
      title: {
        default: ''
      }
    }
  }
</script>

<style scoped>
  /*.panel{
    margin-top: 26px;
  }*/
  .panel{
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: #cacaca;
    height: auto;
  }
  .panel-heading{
    height: 80px;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #cacaca;
  }
  .panel-title{
    color: #787878;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 30px;
    line-height: 80px;
  }
  .panel-body{
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
</style>