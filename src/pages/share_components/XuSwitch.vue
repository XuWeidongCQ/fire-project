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
    width: 52px;
    height: 20px;
    border-radius: 9px;
    border: 1px solid #304981;
    position: relative;
  }
  .wrapper::before,
  .wrapper::after{
    content: '';
    display: inline-block;
    width: 5px;
  }
  .value-control {
    font-size: 12px;
    color: #f7f7f7;
  }
  .switch-on {
    background-color: #1aa6ff;
    text-align: right;
    transition: background-color 0.2s ease 0s;
  }

  .switch-off {
    background-color: #ff9224;
    text-align: left;
    transition: background-color 0.2s ease 0s;
  }

  .toggle-circle {
    position: absolute;
    left: 0;
    display: inline-block;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #ffffff;
  }
  .go-on {
    transform: translateX(0px);
    transition: transform 0.2s ease 0s;
  }
  .go-off {
    transform: translateX(34px);
    transition: transform 0.2s ease 0s;
  }
</style>
