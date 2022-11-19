import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
// 引用element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// use
Vue.use(mavonEditor);
Vue.config.productionTip = false;
/* eslint-disable no-new */
const vue = new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app');

export default vue
