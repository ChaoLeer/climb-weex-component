<template>
  <div class="picker-wrapper" append="node">
    <div class="picker-cover" ref="cover"></div>
    <div class="picker-list-wrapper" ref="wrapper">
      <div class="picker-title picker-panel">
        <text @click="pickerCancel" class="picker-control">取消</text>
        <text class="picker-title-txt">请选择</text>
        <text @click="pickerOk" class="picker-control">确定</text>
      </div>
      <div class="picker-list">
        <list class="picker-list-item" v-for="(col, colIndex) in dataState">
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell v-for="(item, index) in col.data" :key="index" :ref="'col'+colIndex+'item'+index">
            <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, colIndex)">
              <text class="picker-text">{{item.name}}</text>
            </div>
          </cell>
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell>
            <div class="picker-panel"></div>
          </cell>
        </list>
      </div>
    </div>
  </div>
</template>
<script>
const dom = weex.requireModule('dom')
const modal = weex.requireModule('modal')
const animation = weex.requireModule('animation')
var stateName = function (i) {
  return 'col' + i + 'State'
}
// import { province, city, area } from '../picker/city-data.js'
export default {
  data() {
    return {
      current: {
      },
      target: '',
      dataState: []
    }
  },
  props: {
    level: {
      // 级联层数
      default: 3
    },
    mainKey: {
      default: 'id'
    },
    datas: {
      // 数据，传进来数组，数组长度需与level保持一致，直接控制级联层级
      default: function () {
        return []
      }
    },
    value: {
      default: function () {
        return []
      }
    }
  },
  created() {
    let vm = this
    vm.initData()
  },
  methods: {
    initData() {
      let vm = this
      for (let i = 0; i < vm.level; i++) {
        vm.dataState.push({ data: [] })
      }
      if (vm.value.length == 0) {
        vm.dataState[0]['selectedId'] = vm.datas[0][0][vm.mainKey]
        for (let i = 0; i < vm.level; i++) {
          // todo 此处使用Vue.set在Android不能正常运行
          // Vue.set(vm.dataState[i], 'selectedId', code)
          if (i == 0) {
            // todo 此处使用Vue.set在Android不能正常运行
            // Vue.set(vm.dataState[i], 'data', vm.datas[i])
            vm.dataState[i]['data'] = vm.datas[i]

            // vm.dataState[i]['data'][0].current = true
          } else {
            vm.filterData(vm.dataState[i], vm.datas[i], vm.dataState[i - 1].selectedId, 0)
          }
          vm.dataState[i]['data'].forEach(function (item, index) {
            item.index = index
            if (index == 0) {
              item.current = true
              vm.current[i] = item
            } else {
              item.current = false
            }
          })
          // vm.current[i] = vm.dataState[i]['data'][0]
        }
      } else {
        for (let i = 0; i < vm.level; i++) {
          let code = vm.value[i][vm.mainKey]
          // todo 此处使用Vue.set在Android不能正常运行
          // Vue.set(vm.dataState[i], 'selectedId', code)
          vm.dataState[i]['selectedId'] = vm.value[i][vm.mainKey]
          if (i == 0) {
            // todo 此处使用Vue.set在Android不能正常运行
            // Vue.set(vm.dataState[i], 'data', vm.datas[i])
            vm.dataState[i]['data'] = vm.datas[i]

            // vm.dataState[i]['data'][0].current = true
          } else {
            vm.filterData(vm.dataState[i], vm.datas[i], vm.dataState[i - 1].selectedId, 1)
          }
          vm.dataState[i]['data'].forEach(function (item, index) {
            item.index = index
            if (item[vm.mainKey] == vm.value[i][vm.mainKey]) {
              item.current = true
              vm.current[i] = item
            } else {
              item.current = false
            }
          })
          // vm.current[i] = vm.dataState[i]['data'][0]
        }
      }
    },
    filterData(_con, _data, _id, _init) {
      // 接收 数据源 匹配id
      let vm = this
      _con['data'] = _data.filter((item, index) => {
        return item.parentId == _id;
      })
      if (_con['data'][0] && !_init) {
        _con['selectedId'] = _con['data'][0][vm.mainKey]
        _con['data'].forEach(function (item) {
          item.current = false
        })
        _con['data'][0].current = true
      }
    },
    pickerCurrent(init, current) {
      let vm = this
      let el = []
      for (let i = 0; i < vm.level; i++) {
        dom.scrollToElement(vm.$refs['col' + i + 'item' + current[i]][0], { offset: -200 })
      }
    },
    getSelectedData(index, target) {
      let vm = this
      let thisData = this['dataState'][target]
      thisData.selectedId = thisData.data[index][vm.mainKey];
      vm.current[target] = thisData.data[index]
      for (let i = target; i < vm.level; i++) {
        if ((i + 1) == vm.level) {
          vm.filterData(vm.dataState[i], vm.datas[i], vm.dataState[i - 1]['selectedId'], 0)
          break;
        }
        vm.filterData(vm.dataState[i + 1], vm.datas[i + 1], vm.dataState[i]['selectedId'], 0)
        if (!!vm.dataState[i + 1]['data'][0]) {
          vm.current[i + 1] = vm.dataState[i + 1]['data'][0]
        } else {
          for (let j = i + 1; j < vm.level; j++) {
            vm.current[j] = {}
            vm.dataState[j]['data'] = []
          }
          break;
        }
      }
      thisData['data'].forEach(function (item, index) {
        item['current'] = false
        item.index = index
      })
      thisData.data[index]['current'] = true
      let _cur = []
      for (let p in vm.current) {
        if (!vm.current[p]['index']) {
          _cur.push(0)
        } else {
          _cur.push(vm.current[p]['index'])
        }
      }
      vm.pickerCurrent(1, _cur)
    },
    pickerCancel() {
      this.current.province = {}
      this.current.city = {}
      this.current.area = {}
      this.$emit('cancel')
    },
    pickerOk() {
      this.$emit('pickerSelect', this.current)
    },
    wrapper() {
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
    cover() {
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
  mounted: function () {
    let vm = this
    this.wrapper()
    this.cover()
    this.$nextTick(function () {
      let _curr = []
      for (let p in vm.current) {
        _curr.push(vm.current[p]['index'])
      }
      this.pickerCurrent(1, _curr)
    })
  }
}

</script>
<style scoped>
.picker-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;
}

.picker-cover {
  background-color: #000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  z-index: 1;
}

.picker-title {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
}

.picker-title-txt {
  text-align: center;
  font-size: 30px;
  line-height: 100px;
}

.picker-control {
  padding-left: 15px;
  padding-right: 15px;
  color: #008dfc;
  font-size: 30px;
}

.picker-list-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  bottom: 0;
  background-color: #fff;
  transform: translate(0px, 500px);
}

.picker-list {
  height: 500px;
  overflow-y: auto;
  flex-direction: row;
  align-items: center;
  /*padding-bottom: 30px;*/
  /*padding-left: 15px;
    padding-right: 15px;*/
}

.picker-list-item {
  flex: 1;
  height: 500px;
}

.borderlr {
  border-right-width: 1px;
  border-left-width: 1px;
  border-color: #e5e5e5;
  border-style: solid;
}

.picker-panel {
  height: 100px;
  /*border-color: #e5e5e5;
  border-bottom-width: 1px;
  border-style: solid;*/
  /*border-radius: 15px;*/
}

.list-bg {
  background-color: #fff;
}

.picker-text {
  line-height: 100px;
  font-size: 30px;
  text-align: center;
  color: #008dfc;
  white-space: nowrap;
}
</style>