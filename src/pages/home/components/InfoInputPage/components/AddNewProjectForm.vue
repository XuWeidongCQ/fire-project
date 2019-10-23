<template>
  <div class="xubox">
    <div class="xubox-title">
      <span>新建项目</span>
    </div>
    <div class="xubox-content">
      <form>
        <div class="form-group">
          <label for="project-name">项目（客户）名称:</label>
          <input id='project-name' type="text" class="form-control" v-model="project.name"
                 @input="$v.project.name.$touch()">
          <p class="input-invalid" v-if="$v.project.name.$invalid">项目名称不能为空</p>
        </div>
        <div class="form-group">
          <label for="project-province">项目所在城市:</label>
          <input id='project-province' type="text" class="form-control" v-model="project.province"
                 @input="$v.project.province.$touch()">
          <p class="input-invalid" v-if="$v.project.province.$invalid">项目所在城市不能为空</p>
        </div>
        <div class="form-group">
          <label for="project-location">项目位置:</label>
          <input id='project-location' type="text" class="form-control" v-model="project.location"
                 @input="$v.project.location.$touch()">
          <p class="input-invalid" v-if="$v.project.location.$invalid">项目位置不能为空</p>
        </div>
        <div class="form-group">
          <label for="project-lng">经度（请在地图中选择地点）:</label>
          <input id='project-lng' type="text" class="form-control" v-model="project.longitude"
                 @input="$v.project.longitude.$touch()"
                 readonly>
          <p class="input-invalid" v-if="$v.project.longitude.$invalid">项目经度不能为空</p>
        </div>
        <div class="form-group">
          <label for="project-lat">纬度（请在地图中选择地点）:</label>
          <input id='project-lat' type="text" class="form-control" v-model="project.latitude"
                 @input="$v.project.latitude.$touch()"
                 readonly>
          <p class="input-invalid" v-if="$v.project.latitude.$invalid">项目纬度不能为空</p>
        </div>
        <div class="form-group">
          <label for="project-remark">项目备注信息:</label>
          <textarea id='project-remark' class="form-control" v-model="project.remark"></textarea>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-warning" @click="reset">重置</button>
          <button type="button" class="btn btn-success x-float-right"
                  @click="postOneProject"
                  :disabled="$v.$invalid">提交</button>
        </div>
      </form>
    </div>
  </div>


</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import { addFailureToastr,addSuccessToastr} from "@/plugins/toastrInfos";

  export default {
    name: "AddNewProjectForm",
    props:{
      project:{
        type:Object
      },
      refreshProjectsDetailTable:{
        type: Number
      },
    },
    validations:{
      project:{
        name: {required},
        province: {required},
        location: {required},
        longitude: {required},
        latitude: {required},
      }
    },
    methods:{
      reset: function () {
        for (let key in this.project) {
          this.project[key] = ''
        }
      },
      //新建一个项目
      postOneProject:function () {
        const dataForSubmit = {
          location:this.project.name,
          longitude:this.project.longitude,
          latitude:this.project.latitude,
          remark:this.project.remark
        };
        console.log('提交的数据为:',dataForSubmit);
        this.$axios.post(this.api.postOneProject,this.$qs.stringify({object:JSON.stringify(dataForSubmit)}))
          .then(res => {
            const { code,msg} = res.data;
            if (code === 200){
              this.$toastr.Add(addSuccessToastr);
              this.$emit('addProjectSuccess')
            } else {
              this.$toastr.Add(addFailureToastr);
            }
          })
          .catch(error => {
            this.$toastr.Add(addFailureToastr);
          })

      }
    }

  }
</script>

<style scoped>

</style>
