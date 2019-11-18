import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    mapCenter:null,//地图中心
    infoWindowCenter:{},//信息窗口弹出位置
    infoWindowShown:false,//是否显示信息窗口
  },
  mutations:{
    changeMapCenter:function (state,newCenter) {
      state.mapCenter = newCenter
    },
    changeInfoCenter:function (state,newCenter) {
      state.infoWindowCenter = newCenter
    },
    changeWindowShown:function (state,isShown) {
      state.infoWindowShown = isShown
    }
  }
});

export default store;
