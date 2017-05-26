<template>
  <div class="picker-wrapper" append="node">
    <div class="cover" ref="cover"></div>
    <div class="picker-list-wrapper"  ref="wrapper">
      <div class="picker-title panel">
        <text class="picker-title-txt">{{pickerConfig.title}}</text>
      </div>
      <scroller class="picker-list">
        <div v-for="item in pickerConfig.create" @click="select(item.value)">
          <div class="panel list-bg"  :style="{marginTop: !!item.devide ? '30px':'0'}">
            <text class="text">{{item.label}}</text>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
  const modal = weex.requireModule('modal')
  const animation = weex.requireModule('animation')
  export default {
    data () {
      return {
      }
    },
    props: {
      pickerConfig: {
        default: {}
      }
    },
    methods: {
      select: function (key) {
        this.$emit('pickerSelect', key)
      },
      wrapper () {
        var testEl = this.$refs.wrapper;
        animation.transition(testEl, {
          styles: {
            transform: ' translate(0px, 0px)'
          },
          duration: 200, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        }, function () {
          // modal.toast({ message: 'animation finished.' })
        })
      },
      cover () {
        var testEl = this.$refs.cover;
        animation.transition(testEl, {
          styles: {
            opacity: '.5'
          },
          duration: 200, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        }, function () {
          // modal.toast({ message: 'animation finished.' })
        })
      }
    },
    mounted () {
      this.wrapper()
      this.cover()
    }
  }
</script>
<style scoped>
  .picker-wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 3;
  }
  .picker-title{
    background-color: #eee;
  }
  .picker-title-txt {
    text-align: center;
    font-size: 30px;
    line-height: 100px;
  }
  .panel {
    flex-direction: column;
    justify-content: center;
    border-color: #e5e5e5;
    border-bottom-width: 1px;
    border-style: solid;
    /*border-radius: 15px;*/
  }
  .list-bg{
    background-color: #fff;
  }
  /*.bdr{
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }*/
  .cover{
    background-color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 1;
  }
  .picker-list-wrapper{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
    bottom: 0;
    transform: translate(0px, 500px);
  }
  .picker-list{
    height: 500px;
    overflow-y: auto;
    /*padding-bottom: 30px;*/
    /*padding-left: 15px;
    padding-right: 15px;*/
  }
  .text {
    line-height: 100px;
    font-size: 30px;
    text-align: center;
    color: #008dfc;
  }
</style>