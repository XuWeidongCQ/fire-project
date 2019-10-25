<template>
  <div v-if="modalShown">
    <xu-modal
      :shown="modalShown"
      @close="closeAddOneDevPopUp"
      :footer-shown="true"
      :header-shown="true">
      <div slot="header">
        <span>在“{{ project.projectName }}”中添加设备</span>
      </div>
      <div slot="content" class="form-wrapper">
        <form>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-id">设备uuid：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-id' type="text" v-model="formData.uuid"
                     @input="$v.formData.uuid.$touch()">
              <p class="input-invalid" v-if="$v.formData.uuid.$invalid">*不能为空(芯片上编号)</p>
            </div>
          </div>

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
                <input type="radio" v-model="formData.isEnable" :value=true>
                <span>启用</span>
              </label>
              <label>
                <input type="radio" v-model="formData.isEnable" :value=false>
                <span>不启用</span>
              </label>
            </div>
          </div>

          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <span>设备类型：</span>
            </div>
            <div class="input-wrapper">
              <label>
                <input type="radio" v-model="formData.type" value=1>
                <span>储压</span>
              </label>
              <label>
                <input type="radio" v-model="formData.type" value=2>
                <span>非储压</span>
              </label>
              <label>
                <input type="radio" v-model="formData.type" value=0>
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
                <input type="radio" v-model="formData.communication" value=2>
                <span>NB-IoT</span>
              </label>
              <label>
                <input type="radio" v-model="formData.communication" value=1>
                <span>Zig-bee</span>
              </label>
              <label>
                <input type="radio" v-model="formData.communication" value=0>
                <span>未知</span>
              </label>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-communication-cycle">发送周期（分钟）：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-communication-cycle' type="number" v-model="formData.cycle" placeholder="以分钟为单位">
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
              <input id='dev-prod-date' type="date" v-model="formData.productionDate">
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-sale-date">销售日期：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-sale-date' type="date" v-model="formData.salesDate">
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-use-period">使用年限（年）：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-use-period' type="number" v-model="formData.serviceLife">
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
                @click="postOneDev()"
                :disabled="$v.$invalid">提交</button>
      </div>
    </xu-modal>
  </div>
</template>

<script>
  import XuModal from "@/pages/share_components/XuModal";
  import { required } from 'vuelidate/lib/validators';
  import { configToastr } from "@/plugins/toastrInfos";

  export default {
    name: "AddOneDevPopUp",
    props:{
      modalShown:{
        type: Boolean,
        default:false
      },
      project:{
        type:Object,
      }
    },
    // inject:['project'],
    data:function () {
      return {
        formData:{
          uuid:'',
          simpleNumber:'',
          isEnable:true,
          type:1,
          communication:2,
          location:'',
          cycle:10,
          productionDate:this.$common.getDate().YYYYMMDD,
          salesDate:this.$common.getDate().YYYYMMDD,
          serviceLife:3,
          remark:''
        },
      }
    },
    validations:{
      formData:{
        uuid:{ required },
        simpleNumber: { required },
        location: { required },
      }
    },

    components:{
      XuModal
    },

    methods:{
      //提交一台设备的信息
      postOneDev:function () {
        const dataForSubmit = this.formData;
        dataForSubmit['projectId'] = this.project.projectId;
        dataForSubmit['longitude'] = this.project.longitude;
        dataForSubmit['latitude'] = this.project.latitude;
        console.log('提交的数据为:',dataForSubmit);
        this.$axios.post(
          this.api.postOneDev,
          this.$qs.stringify({object:JSON.stringify(dataForSubmit)})
        )
          .then(res => {
            const { code,msg} = res.data;
            if (code === 200){
              this.$toastr.Add(configToastr('添加设备-',msg,'success'));
              this.$emit('addOneDevSuccess');
            } else {
              this.$toastr.Add(configToastr('添加设备失败-',msg,'warning'));
            }
          })
          .catch(error => {
            this.$toastr.Add(configToastr('无法连接服务器','error'));
          })
      },
      reset: function () {
        this.formData.uuid = '';
        this.formData.simpleNumber = '';
        this.formData.type = 1;
        this.formData.communication = 2;
        this.formData.cycle = 10;
        this.formData.serviceLife = 3;
        this.formData.remark = '';
      },
      closeAddOneDevPopUp:function () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .form-wrapper {
    max-width: 900px;
  }
  .x-form-control {
    margin-bottom: 15px;
    color: #3a4460;
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
