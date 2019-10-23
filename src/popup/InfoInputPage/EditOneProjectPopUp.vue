<template>
  <div v-if="modalShown">
    <xu-modal
      :shown="modalShown"
      @close="closeEditOneDevPopUp"
      :footer-shown="true"
      :header-shown="true">
      <div slot="header">
        <span>修改设备</span>
      </div>
      <div slot="content">
        <form>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="name">项目名称：</label>
            </div>
            <div class="input-wrapper">
              <input id='name' type="text" v-model="formData.projectName"
                     @input="$v.formData.projectName.$touch()">
              <p class="input-invalid" v-if="$v.formData.projectName.$invalid">*项目名称不能为空</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="location">项目地点：</label>
            </div>
            <div class="input-wrapper">
              <input id='location' type="text" v-model="formData.location"
                     @input="$v.formData.location.$touch()">
              <p class="input-invalid" v-if="$v.formData.location.$invalid">*项目地点不能为空</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="longitude">经度：</label>
            </div>
            <div class="input-wrapper">
              <input id='longitude' type="text" v-model="formData.longitude"
                     @input="$v.formData.longitude.$touch()">
              <p class="input-invalid" v-if="$v.formData.longitude.$invalid">*经度不能为空(中国范围为73-135)</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="latitude">纬度：</label>
            </div>
            <div class="input-wrapper">
              <input id='latitude' type="text" v-model="formData.latitude"
                     @input="$v.formData.latitude.$touch()">
              <p class="input-invalid" v-if="$v.formData.latitude.$invalid">*纬度不能为空(中国大陆范围为4-53)</p>
            </div>
          </div>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="remark">备注：</label>
            </div>
            <div class="input-wrapper">
              <textarea id='remark' v-model="formData.remark"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-warning" @click="reset">重置</button>
        <button type="button" class="btn btn-success x-float-right"
                @click="editProject"
                :disabled="$v.$invalid">修改</button>
      </div>
    </xu-modal>
  </div>
</template>

<script>
  import XuModal from "@/pages/share_components/XuModal";
  import { required } from 'vuelidate/lib/validators';
  import { editSuccessToastr,editFailureToastr } from "@/plugins/toastrInfos";

  export default {
    name: "EditOneProjectPopUp",
    components:{
      XuModal
    },
    props:{
      modalShown:{
        type: Boolean,
        default:true
      },
      project:{
        type: Object
      }
    },
    // inject:['project'],
    data:function () {
      return {
        formData:{
          projectName:'',
          location:'',
          longitude:'',
          latitude:'',
          remark:''
        }
      }
    },
    validations:{
      formData:{
        projectName:{ required },
        location: { required },
        longitude: { required },
        latitude : { required }
      }
    },
    created(){
    },
    methods:{
      closeEditOneDevPopUp:function () {
        this.$emit('close')
      },
      initValue:function(){
        this.formData.projectName = this.project.projectName;
        this.formData.location = this.project.location;
        this.formData.longitude = this.project.longitude;
        this.formData.latitude = this.project.latitude;
        this.formData.remark = this.project.remark;
      },
      editProject:function(){
        const dataForEdit = this.formData;
        dataForEdit['projectId'] = this.project.projectId;
        console.log('提交的修改信息：',dataForEdit);
        this.$axios.put(this.api.editOneProject,dataForEdit)
          .then(res => {
            const { code,msg } = res.data;
            if (code === 200 ){
              this.$toastr.Add(editSuccessToastr);
              this.$emit('editOneProjectSuccess')
            }
          })
          .catch(error => {
              this.$toastr.Add(editFailureToastr);
          })
      },
      reset:function () {
        this.formData.projectName = this.project.projectName;
        this.formData.location = this.project.location;
        this.formData.longitude = this.project.longitude;
        this.formData.latitude = this.project.latitude;
        this.formData.remark = this.project.remark;
      }
    },
    mounted() {
      this.initValue()
    }

  }
</script>

<style scoped>
  .x-form-control {
    margin-bottom: 15px;
    color: #3a4460;
    font-size: 14px;
  }
  .input-explain-wrapper {
    width: 100px;
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
