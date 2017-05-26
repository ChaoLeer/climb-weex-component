import index from '../pages/index.vue'
import foo from '../foo.vue'
import button from '../pages/button.vue'
import actionsheet from '../pages/actionsheet.vue'
import picker from '../pages/picker.vue'
import pickerarea from '../pages/picker-area.vue'
import timepicker from '../pages/picker-time.vue'
import datepicker from '../pages/picker-date.vue'
const routes = [{
  path: '/',
  component: index
}, {
  path: '/button',
  component: button
}, {
  path: '/actionsheet',
  component: actionsheet
}, {
  path: '/picker',
  component: picker
}, {
  path: '/pickerarea',
  component: pickerarea
}, {
  path: '/timepicker',
  component: timepicker
}, {
  path: '/datepicker',
  component: datepicker
}, {
  path: '/foo',
  component: foo
}]

export default routes