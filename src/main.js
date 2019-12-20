// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuelidate from "vuelidate";

import App from './App'
import common from '../static/commonJS'
import BaiduMap from 'vue-baidu-map'
import swal from "sweetalert";
import './plugins/ShareCSS.css'
import './plugins/XuCSS.css'
import Http from "@/service/Http";
import store from "@/store/store";

Vue.config.productionTip = false;
Vue.prototype.$f = common;
Vue.prototype.$Http = Http;

Vue.use(Vuelidate);
Vue.use(BaiduMap,{
  ak:'HMsRLrPGidU6hIisM4HYgx0APRKhpm6p'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
