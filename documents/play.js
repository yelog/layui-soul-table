import Vue from 'vue';
import Element from 'element-ui';
import App from './play/index.vue';
import 'element-ui/lib/theme-chalk/base.css';

Vue.use(Element);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
