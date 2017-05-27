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
  
        <list class="picker-list-item">
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell v-for="(item, index) in provinceState.data" :key="index" :ref="'province'+index">
            <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'province')">
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
  
        <list class="picker-list-item borderlr">
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell v-for="(item, index) in cityState.data" :key="index" :ref="'city'+index">
            <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'city')">
              <text class="picker-text">{{item.name}}</text>
            </div>
            <!--<div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',backgroundColor: item.current ? '#008dfc' : '#fff'}" @click="getSelectedData(index, 'city')">
                                                                                                                            <text class="picker-text" :style="{color: item.current ? '#fff' : '#008dfc'}">{{item.name}}</text>
                                                                                                                          </div>-->
          </cell>
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell>
            <div class="picker-panel"></div>
          </cell>
        </list>
  
        <list class="picker-list-item">
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell>
            <div class="picker-panel"></div>
          </cell>
          <cell v-for="(item, index) in areaState.data" :key="index" :ref="'area'+index">
            <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'area')">
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
import { province, city, area } from './city-data'
export default {
  data() {
    return {
      current: {
        province: {},
        city: {},
        area: {}
      },
      target: '',
      provinceState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      cityState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      areaState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
    }
  },
  props: {
    value: {
      default: {
        province: {
          name: '北京市',
          code: 110000
        },
        city: {
          name: '市辖区',
          code: 110100
        },
        area: {
          name: '东城区',
          code: 110101
        }
      }
    }
  },
  created() {
  },
  methods: {
    initData() {
      this.provinceState.data = province;
      // this.provinceState.selectedId = 110000; //北京市  省
      // this.cityState.selectedId = 110100;     //市辖区  市
      // this.areaState.selectedId = 110101;     //东城区  区
      let vm = this
      this.provinceState.selectedId = this.value.province.code; //北京市  省
      this.cityState.selectedId =  this.value.city.code;     //市辖区  市
      this.areaState.selectedId =  this.value.area.code;     //东城区  区
      
      this.filterCity(1);
      this.filterArea(1);
      // this['provinceState'].data.forEach(function (item, index) {
      //   if (item.code == vm.provinceState.selectedId) {
      //     Vue.set(item, 'current', true)
      //     console.info(item.current)
      //   } else {
      //     Vue.set(item, 'current', false)
      //   }
      //   item.index = index
      // })
      // this['cityState'].data.forEach(function (item, index) {
      //   if (item.code == vm.cityState.selectedId) {
      //     Vue.set(item, 'current', true)
      //   } else {
      //     Vue.set(item, 'current', false)
      //   }
      //   item.index = index
      // })
      // this['areaState'].data.forEach(function (item, index) {
      //   if (item.code == vm.areaState.selectedId) {
      //     Vue.set(item, 'current', true)
      //   } else {
      //     Vue.set(item, 'current', false)
      //   }
      //   item.index = index
      // })
      // this['provinceState'].data[0].current = true
      // this['provinceState'].data[0].current = true

      // if (this['cityState'].data[0]) {
      //   this['cityState'].data[0].current = true
      // }
      // if (this['areaState'].data[0]) {
      //   this['areaState'].data[0].current = true
      // }
      // this.current.province = this['provinceState'].data[0]
      // this.current.city = this['cityState'].data[0]
      // this.current.area = this['areaState'].data[0]
    },
    filterCity(init) {
      this.cityState.data = city.filter((item, index) => {
        return item.parentId === this.provinceState.selectedId;
      })
      if (!init) {
        this.cityState.selectedId = this.cityState.data[0] && this.cityState.data[0].code;
        this.cityState.index = 0;
        this.cityState.translateY = 0;
      }
    },
    filterArea(init) {
      this.areaState.data = area.filter((item, index) => {
        return item.parentId === this.cityState.selectedId;
      })
      if (!init) {
        this.areaState.selectedId = this.areaState.data[0] && this.areaState.data[0].code;
        this.areaState.translateY = 0;
        this.areaState.index = 0;
      }
    },
    pickerCurrent(init, currentProvince, currentCity, currentArea) {
      // console.info('city' + currentCity)
      let vm = this
      this['provinceState'].data.forEach(function (item, index) {
        if (item.code == vm.provinceState.selectedId && init) {
          Vue.set(item, 'current', true)
          Vue.set(vm['provinceState'], 'index', index)
          console.info(item.current)
        } else {
          Vue.set(item, 'current', false)
        }
        item.index = index
      })
      

      // this['provinceState'].data.forEach(function (item, index) {
      //   item.current = false
      //   item.index = index
      // })
      if (init) {
        let provincel = this.$refs['province' + vm.provinceState.index][0]
        dom.scrollToElement(provincel, { offset: -200 })
        this.current.province = this['provinceState'].data[vm.provinceState.index]
        Vue.set(this['provinceState'].data[vm.provinceState.index], 'current', true)
      } else {
        let provincel = this.$refs['province' + currentProvince][0]
        dom.scrollToElement(provincel, { offset: -200 })
        this.current.province = this['provinceState'].data[currentProvince]
        Vue.set(this['provinceState'].data[currentProvince], 'current', true)
      }

      if (!!this['cityState'].data[0]) {
        // this['cityState'].data.forEach(function (item, index) {
        //   item.current = false
        //   item.index = index
        // })
        this['cityState'].data.forEach(function (item, index) {
          if (item.code == vm.cityState.selectedId && init) {
            Vue.set(item, 'current', true)
            Vue.set(vm['cityState'], 'index', index)
          } else {
            Vue.set(item, 'current', false)
          }
          item.index = index
        })
        if (init) {
          let cityel = this.$refs['city' + vm.cityState.index][0]
          this.current.city = this['cityState'].data[vm.cityState.index]
          dom.scrollToElement(cityel, { offset: -200 })
          Vue.set(this['cityState'].data[vm.cityState.index], 'current', true)
        } else {
          let cityel = this.$refs['city' + currentCity][0]
          this.current.city = this['cityState'].data[currentCity]
          dom.scrollToElement(cityel, { offset: -200 })
          Vue.set(this['cityState'].data[currentCity], 'current', true)
        }
      }
      if (!!this['areaState'].data[0]) {
        // this['areaState'].data.forEach(function (item, index) {
        //   item.current = false
        //   item.index = index
        // })
        this['areaState'].data.forEach(function (item, index) {
          if (item.code == vm.areaState.selectedId && init) {
            Vue.set(item, 'current', true)
            Vue.set(vm['areaState'], 'index', index)
          } else {
            Vue.set(item, 'current', false)
          }
          item.index = index
        })
        if (init) {
          let areael = this.$refs['area' + vm.areaState.index][0]
          dom.scrollToElement(areael, { offset: -200 })
          this.current.area = this['areaState'].data[vm.areaState.index]
          Vue.set(this['areaState'].data[vm.areaState.index], 'current', true)
        } else {
          let areael = this.$refs['area' + currentArea][0]
          dom.scrollToElement(areael, { offset: -200 })
          this.current.area = this['areaState'].data[currentArea]
          Vue.set(this['areaState'].data[currentArea], 'current', true)
        }
      }
    },
    getSelectedData(index, target) {
      // let target = this.target;
      let thisData = this[target + 'State']
      thisData.selectedId = thisData.data[index].code;
      thisData.data.forEach(function (item, index) {
        // item.current = false
        Vue.set(item, 'current', false)
        item.index = index
      })
      thisData.data[index].current = true
      if (target === 'province') {
        this.filterCity(0)
        this.filterArea(0)
        this.current.province = thisData.data[index]
        this.current.city = this['cityState'].data[0]
        this.current.area = this['areaState'].data[0]
        this['cityState'].data.forEach(function (item) {
          item.current = false
        })
        this['areaState'].data.forEach(function (item) {
          item.current = false
        })
        if (this['cityState'].data[0]) {
          this['cityState'].data[0].current = true
        }
        if (this['areaState'].data[0]) {
          this['areaState'].data[0].current = true
        }
        this.pickerCurrent(0, index, 0, 0)
      }
      if (target === 'city') {
        this.filterArea(0);
        this.current.city = thisData.data[index]
        this.current.area = this['areaState'].data[0]
        this['areaState'].data.forEach(function (item) {
          item.current = false
        })
        if (this['areaState'].data[0]) {
          this['areaState'].data[0].current = true
        }
        this.pickerCurrent(0, this.current.province['index'], index, 0)
      }
      if (target === 'area') {
        this.filterArea(0);
        this.current.area = thisData.data[index]
        this.pickerCurrent(0, this.current.province['index'], this.current.city['index'], index)
      }
      // console.info(this.current)
    },
    pickerCancel() {
      this.current.province = {}
      this.current.city = {}
      this.current.area = {}
      this.$emit('cancel')
    },
    pickerOk() {
      this.$emit('pickerSelect', this.current)
      // modal.toast({ message: JSON.stringify(this.current), duration: 1 })
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
    this.initData()
    this.$nextTick(function () {
      this.pickerCurrent(1)
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