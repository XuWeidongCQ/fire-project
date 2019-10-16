// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from "vuelidate";
import common from '../static/commonJS'
import BaiduMap from 'vue-baidu-map'
import axios  from 'axios'
import swal from "sweetalert";
import './plugins/ShareCSS.css'
import './plugins/ShareAnimation.css'
import api from "@/plugins/api";

Vue.config.productionTip = false;
Vue.prototype.common = common;
Vue.prototype.$axios = axios;
Vue.prototype.api = api;

Vue.use(Vuelidate);

Vue.use(BaiduMap,{
  ak:'HMsRLrPGidU6hIisM4HYgx0APRKhpm6p'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
