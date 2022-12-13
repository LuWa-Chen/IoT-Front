import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view'
import * as echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import 'echarts-liquidfill'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui';

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.prototype.axios = axios

Vue.use(dataV)

Vue.use(VueRouter)

Vue.use(ElementUi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
