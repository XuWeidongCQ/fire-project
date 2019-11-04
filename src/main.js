// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from "vuelidate";
import common from '../static/commonJS'
import BaiduMap from 'vue-baidu-map'
import VueToastr from "vue-toastr";
import axios  from 'axios';
import qs from 'qs'
import swal from "sweetalert";
import './plugins/ShareCSS.css'
import './plugins/ShareAnimation.css'
import api from "@/plugins/api";
// import '@/plugins/axiosConfig';
import Http from "@/service/Http";

Vue.config.productionTip = false;
Vue.prototype.$f = common;
Vue.prototype.$axios = axios;
Vue.prototype.api = api;
Vue.prototype.$qs = qs;
Vue.prototype.$Http = Http;

Vue.use(Vuelidate);
Vue.use(VueToastr,{});
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
