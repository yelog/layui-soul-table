import Vue from 'vue'
import entry from './App'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import hljs from 'highlight.js'
import routes from './route.config'
import demoBlock from './components/demo-block'
import SideNav from './components/side-nav'
import title from './i18n/title'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/color-brewer.css'
import './assets/styles/common.scss'
import './assets/styles/fonts/style.css'

Vue.use(Element)
Vue.use(VueRouter)
Vue.component('demo-block', demoBlock)
Vue.component('side-nav', SideNav)

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
})

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => { globalEle.$data.$isEle = data }
    }
  }
})


const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})
router.beforeEach(async(to, from, next) => {
  if (layui.tableFilter) {
    layui.tableFilter.destroy([{
      config:{id: 'myTable'}
    },{
      config:{id: 'myTable1'}
    },{
      config:{id: 'myTable2'}
    },{
      config:{id: 'myTable3'}
    },{
      config:{id: 'myTable5'}
    }])
  }
  next()
})

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
  const data = title[route.meta.lang]
  for (const val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val]
      return
    }
  }
  document.title = 'Element'
  ga('send', 'event', 'PageView', route.name)
})
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app')
