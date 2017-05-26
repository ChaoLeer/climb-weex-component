<template>
  <div class="actionsheet">
    <div class="action-cover" ref="cover"></div>
    <div class="action-list" ref="wrapper">
      <div v-for="item in lists" @click="select(item.value)">
        <div class="action-panel"  :style="{marginTop: !!item.devide ? '30px':'0'}">
          <text class="action-text">{{item.label}}</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // const modal = weex.requireModule('modal')
  const animation = weex.requireModule('animation')
  export default {
    data () {
      return {
      }
    },
    props: {
      lists: {
        default: []
      }
    },
    methods: {
      select: function (key) {
        this.$emit('actionSelect', key)
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
  .action-cover{
    background-color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 1;
  }
  .actionsheet{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    flex: 1;
    z-index: 3;
  }
  .action-panel {
    height: 90px;
    flex-direction: column;
    justify-content: center;
    border-color: #e5e5e5;
    border-bottom-width: 1px;
    border-style: solid;
    background-color: #fff;
    /*border-radius: 15px;*/
  }
  /*.bdr{
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }*/
  .action-text {
    font-size: 30px;
    text-align: center;
    color: #008dfc;
  }
  .action-list{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
    bottom: 0;
    transform: translate(0px, 500px);
    /*padding-bottom: 30px;*/
    /*padding-left: 15px;
    padding-right: 15px;*/
  }
</style>