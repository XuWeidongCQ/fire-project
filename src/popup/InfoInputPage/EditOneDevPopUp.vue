<template>
  <div v-if="modalShown">
    <xu-modal
      :shown="modalShown"
      @close="closeEditOneDevPopUp"
      :footer-shown="true"
      :header-shown="true">
      <div slot="header">
        <span>'{{ project.projectName }}'项目--修改的设备uuid为:{{ device.uuid }}</span>
      </div>
      <div slot="content">
        <form>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-simple-number">设备编号：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-simple-number' type="text" v-model="formData.simpleNumber"
                     @input="$v.formData.simpleNumber.$touch()">
              <p class="input-invalid" v-if="$v.formData.simpleNumber.$invalid">*不能为空</p>
            </div>
          </div>

          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <span>是否启用：</span>
            </div>
            <div class="input-wrapper">
              <label>
                <input type="radio" v-model="formData.isEnable" :value="true">
                <span>启用</span>
              </label>
              <label>
                <input type="radio" v-model="formData.isEnable" :value="false">
                <span>禁用</span>
              </label>
            </div>
          </div>

          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <span>设备类型：</span>
            </div>
            <div class="input-wrapper">
              <label>
                <input type="radio" v-model="formData.type" :value='1'>
                <span>储压</span>
              </label>
              <label>
                <input type="radio" v-model="formData.type" :value='2'>
                <span>非储压</span>
              </label>
              <label>
                <input type="radio" v-model="formData.type" :value='0'>
                <span>未知</span>
              </label>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <span>通信技术：</span>
            </div>
            <div class="input-wrapper">
              <label>
                <input type="radio" v-model="formData.communication" :value='2'>
                <span>NB-IoT</span>
              </label>
              <label>
                <input type="radio" v-model="formData.communication" :value='1'>
                <span>Zig-bee</span>
              </label>
              <label>
                <input type="radio" v-model="formData.communication" :value='0'>
                <span>未知</span>
              </label>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-communication-cycle">发送周期（分钟）：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-communication-cycle' type="number" v-model="formData.cycle" placeholder="以分钟为单位"
                     @input="$v.formData.cycle.touch()">
              <p class="input-invalid" v-if="$v.formData.cycle.$invalid">*不能为空</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-location">安装位置：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-location' type="text" v-model="formData.location"
                     @input="$v.formData.location.$touch()">
              <p class="input-invalid" v-if="$v.formData.location.$invalid">*不能为空</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-prod-date">生产日期：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-prod-date' type="date" v-model="formData.productionDate"
                     @input="$v.formData.productionDate.$touch()">
              <p class="input-invalid" v-if="$v.formData.productionDate.$invalid">*不能为空</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-sale-date">销售日期：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-sale-date' type="date" v-model="formData.salesDate"
                     @input="$v.formData.salesDate.$touch()">
              <p class="input-invalid" v-if="$v.formData.salesDate.$invalid">*不能为空</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-use-period">使用年限（年）：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-use-period' type="number" v-model="formData.serviceLife"
                     @input="$v.formData.serviceLife.$touch()">
              <p class="input-invalid" v-if="$v.formData.serviceLife.$invalid">*不能为空</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-remark">备注：</label>
            </div>
            <div class="input-wrapper">
              <textarea id='dev-remark' v-model="formData.remark"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-warning" @click="reset">重置</button>
        <button type="button" class="btn btn-success x-float-right"
                @click="editDevice"
                :disabled="$v.$invalid">修改</button>
      </div>
    </xu-modal>
  </div>
</template>

<script>
  import XuModal from "@/XuComponent/XuModal";
  import { required } from 'vuelidate/lib/validators';

  export default {
    name: "EditOneDevPopUp",
    components:{
      XuModal
    },
    props:{
      modalShown:{
        type: Boolean,
        default:true,
      },
      project:{
        type:Object
      },
      device:{
        type:Object
      }
    },
    data:function () {
      return {
        formData:{
          simpleNumber:'',
          isEnable:true,
          type:1,
          communication:2,
          location:'',
          cycle:10,
          productionDate:'',
          salesDate:'',
          serviceLife:3,
          remark:''
        }
      }
    },
    validations:{
      formData: {
        simpleNumber: { required },
        location: { required },
        cycle : { required },
        productionDate: { required },
        salesDate: { required },
        serviceLife: { required }
      }
    },
    methods:{
      closeEditOneDevPopUp:function(){
        this.$emit('close')
      },
      valueInit:function () {
        for(let key in this.formData){
          this.formData[key] = this.device[key]
        }
      },
      reset:function () {
        this.valueInit()
      },
      editDevice:function () {
        const dataForEdit = this.formData;
        dataForEdit['uuid'] = this.device.uuid;
        dataForEdit['projectId'] = this.project.projectId;
        this.$Http.editOneDev(dataForEdit)
          .then(res => {
            const { code,msg } = res;
            if (code === 200){
              this.$emit('editOneDevSuccess',this.formData);//修改成功后向父级传递
            }
          })
      }
    },
    mounted() {
      this.valueInit()
    }
  }
</script>

<style scoped>
  .x-form-control {
    margin-bottom: 15px;
    color: #e0e3e9;
    font-size: 14px;
  }
  .input-explain-wrapper {
    width: 150px;
    float: left;
    height: 30px;
    line-height: 30px;
    text-align: right;
    margin-right: 10px;
  }
  .input-wrapper input[type=text],
  .input-wrapper input[type=number],
  .input-wrapper input[type=date]{
    height: 30px;
  }
  .input-wrapper {
    display: inline-block;
    min-width: 200px;
    height: 30px;
    line-height: 30px;
  }
</style>
