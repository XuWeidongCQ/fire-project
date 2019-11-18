<template>
    <div>
      <div class="wrapper value-control"
           :class="{'switch-on':selectValue === val1,'switch-off':selectValue === val2}">
        <span class="toggle-circle"
              @click="changeValue"
              :class="{'go-on':selectValue === val1,'go-off':selectValue === val2}">
        </span>
        <span>{{ selectValue }}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "XuSwitch",
    props:['presentValue','val1','val2'],//当前显示的值,真值和假值
    data:function () {
      return {
        selectValue:'',//组件内部选择的值
        emitValue:false,//向上传递的布尔值
      }
    },
    methods:{
      changeValue:function () {
        if (this.selectValue === this.val1){//选择假值上传
          this.selectValue = this.val2;
          this.emitValue = false
        } else {//选择真值上传
          this.selectValue = this.val1;
          this.emitValue = true
        }
        // console.log(this.emitValue);
        this.$emit('afterGetSelectValue',this.emitValue)
      }
    },
    created(){
      this.selectValue = this.presentValue
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .wrapper {
    /*width: 52px;*/
    height: 20px;
    border-radius: 11px;
    position: relative;
    line-height: 20px;
    display: inline-block;
  }
  .value-control {
    font-size: 12px;
    color: #f7f7f7;
  }
  .switch-on {
    background-color: #1aa6ff;
    transition: background-color 0.2s ease 0s;
    padding-left: 20px;
    padding-right: 8px;
  }

  .switch-off {
    background-color: #cccccc;
    transition: background-color 0.2s ease 0s;
    padding-right: 20px;
    padding-left: 8px;
  }

  .toggle-circle {
    position: absolute;
    display: inline-block;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #eeeeee;
  }
  .go-on {
    left: 2px;
    top: 2px;
    transform: translateX(0px);
    transition: transform 0.2s ease 0s;
  }
  .go-off {
    top: 2px;
    transform: translateX(26px);
    transition: transform 0.2s ease 0s;
  }
</style>
