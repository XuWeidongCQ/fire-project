<template>
    <div class="xu-modal-backdrop" v-if="shown" @click.self="close">
        <div class="xu-modal" :class="{fadeIn:shown}">
          <div class="xu-modal-header" v-if="headerShown">
            <div class="modal-title-wrapper">
              <slot name="header"><div>这是模态框标题</div></slot>
            </div>
            <div class="close-icon" @click="close">×</div>
          </div>
          <div class="xu-modal-content">
            <slot name="content" >
              <div>这是模态框内容</div>
            </slot>
          </div>
          <div  class="xu-modal-footer" v-if="footerShown">
            <slot name="footer">
              <div>这是模态框尾部</div>
            </slot>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "xu-modal",
    props:{
      shown:{
        type:Boolean,
        default:false
      },
      footerShown:{
        type: Boolean,
        default: false
      },
      headerShown:{
        type:Boolean,
        default:false
      }
    },
    data:function(){
      return {

      }
    },
    methods:{
      close:function () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .xu-modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .xu-modal {
    border-radius: 5px;
    border: 1px solid #162557;
    position: relative;
    background-color: #2e3848;
    margin-top: 100px;
  }
  .xu-modal-header {
    padding: 10px 15px 5px 15px;
    border-bottom: 1px solid #162557;
  }
  .modal-title-wrapper {
    height: 20px;
    line-height: 20px;
    font-size: 17px;
    color: #f7f7f7;
    display: inline-block;
  }
  .close-icon {
    float: right;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    color: #a4abbd;
    margin-left: 30px;
    cursor: pointer;
  }
  .close-icon:hover {
    color: #ced5e7;
  }
  .xu-modal-content {
    padding: 10px 15px 5px 15px;
  }
  .xu-modal-footer {
    padding: 10px 15px 10px 15px;
    border-top: 1px solid #eaedf1;
  }
</style>
