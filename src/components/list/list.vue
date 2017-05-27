<template>
  <div class="list-wrapper">
    <template v-if="config.router">
      <div v-if="config.router" class="list-item" :style="{height: height + 'px',backgroundColor: item.bgColor || bgColor,paddingLeft: indent+'px'}" v-for="item in config.list" @click="jump(item.path)">
        <slot>
          <text class="list-item-txt" :style="{fontSize: size+'px',color: item.color || color, lineHeight: lineHeight+'px'}">{{item.inner}}</text>
        </slot>
      </div>
    </template>
    <template v-else>
      <div class="list-item" :style="{height: height + 'px',backgroundColor: item.bgColor || bgColor,paddingLeft: indent+'px'}" v-for="(item,index) in config.list" @click="item.callback(item,index)">
        <slot>
          <text class="list-item-txt" :style="{fontSize: size+'px',color: item.color || color, lineHeight: lineHeight+'px'}">{{item.inner}}</text>
        </slot>
      </div>
    </template>
  </div>
</template>

<script>
var navigator = weex.requireModule('navigator')
var modal = weex.requireModule('modal')

export default {
  props: {
    config: {
      default: {
        router: false,
        list: []
      }
    },
    height: {
      default: 80
    },
    lineHeight: {
      default: 80
    },
    size: {
      default: 30
    },
    color: {
      default: '#797979'
    },
    indent: {
      default: 16
    },
    bgColor: {
      default: '#fefefe'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.list-wrapper {
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

.list-item {
  border-style: solid;
  border-bottom-width: 1px;
  border-color: #efefef;
}

.list-item-txt {
  /*color: #787878;*/
  /*font-size: 36px;*/
  /*line-height: 162px;*/
  /*padding-left: 26px;*/
}
</style>