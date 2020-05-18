import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);

import {Lazyload} from 'vant';
Vue.use(Lazyload);

import "./main.less";
import "./app.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
