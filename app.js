import App from './src/App.vue'
import router from './src/router'
// foo.el = '#root'
// export default new Vue(foo);

import mixinsRouter from './src/mixins/route.js'
import './src/components'
Vue.mixin(mixinsRouter)

// App.el = '#root'
// App.route = router

new Vue(Vue.util.extend({
  el: '#root',
  router
}, App))

router.push('/')
