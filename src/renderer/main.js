import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
// 引用element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {ipcRenderer} from 'electron'




Vue.use(ElementUI);
Vue.$ipc = ipcRenderer;
Vue.config.productionTip = false;
/* eslint-disable no-new */
const vue = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');

export default vue
