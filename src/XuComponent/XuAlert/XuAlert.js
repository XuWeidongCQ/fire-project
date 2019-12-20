
import Vue from 'vue'
import AlertComp from "./AlertComp";

export const XuAlert = function (content,infoStyle='success') {
  const constructor = Vue.extend(AlertComp);
  let inst = new constructor({
    el:document.createElement('div'),
    data(){
      return {
        isShown:true,
        content:content,
        infoStyle:infoStyle
      }
    },
    methods:{
      disappear:function () {
        setTimeout(()=>{
          this.isShown = false;
          document.body.removeChild(inst.$el);
        },2000);
      }
    },
    mounted(){
      this.disappear()
    },
  });
  document.body.appendChild(inst.$el);
};