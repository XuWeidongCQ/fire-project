<template>
  <div class="xubox">
    <div class="xubox-title">
      <span>新建项目</span>
    </div>
    <div class="xubox-content">
      <form>
        <div class="x-form-group">
          <label for="project-name">项目（客户）名称:</label>
          <input id='project-name' type="text" class="x-form-control" v-model="project.name"
                 @input="$v.project.name.$touch()">
          <p class="input-invalid" v-if="$v.project.name.$invalid">项目名称不能为空</p>
        </div>
        <div class="x-form-group">
          <label for="project-province">项目所在城市:</label>
          <input id='project-province' type="text" class="x-form-control" v-model="project.province"
                 @input="$v.project.province.$touch()">
          <p class="input-invalid" v-if="$v.project.province.$invalid">项目所在城市不能为空</p>
        </div>
        <div class="x-form-group">
          <label for="project-location">项目位置:</label>
          <input id='project-location' type="text" class="x-form-control" v-model="project.location"
                 @input="$v.project.location.$touch()">
          <p class="input-invalid" v-if="$v.project.location.$invalid">项目位置不能为空</p>
        </div>
        <div class="x-form-group">
          <label for="finish-date">完工日期:</label>
          <input id='finish-date' type="date" class="x-form-control" v-model="project.projectFinishDate"
                 @input="$v.project.projectFinishDate.$touch()">
          <p class="input-invalid" v-if="$v.project.projectFinishDate.$invalid">完工日期不能为空</p>
        </div>
        <div class="x-form-group">
          <label for="project-lng">经度（请在地图中选择地点）:</label>
          <input id='project-lng' type="text" class="x-form-control" v-model="project.longitude"
                 @input="$v.project.longitude.$touch()"
                 readonly>
          <p class="input-invalid" v-if="$v.project.longitude.$invalid">项目经度不能为空</p>
        </div>
        <div class="x-form-group">
          <label for="project-lat">纬度（请在地图中选择地点）:</label>
          <input id='project-lat' type="text" class="x-form-control" v-model="project.latitude"
                 @input="$v.project.latitude.$touch()"
                 readonly>
          <p class="input-invalid" v-if="$v.project.latitude.$invalid">项目纬度不能为空</p>
        </div>
        <div class="x-form-group">
          <label for="project-remark">项目备注信息:</label>
          <textarea id='project-remark' class="x-form-control" v-model="project.remark"></textarea>
        </div>
        <div class="x-form-group">
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
  import { configToastr } from "@/plugins/toastrInfos";

  export default {
    name: "AddNewProjectForm",
    props:{
      project:{
        type:Object
      },
    },
    validations:{
      project:{
        name: {required},
        province: {required},
        location: {required},
        projectFinishDate: {required},
        longitude: {required},
        latitude: {required},
      }
    },
    methods:{
      reset: function () {
        for (let key in this.project) {
          this.project[key] = ''
        }
        this.project['province'] = '重庆';
        this.project['projectFinishDate'] = this.$f.getDate().YYYYMMDD
      },
      //新建一个项目
      postOneProject:function () {
        const dataForSubmit = {
          projectName:this.project.name,
          location:this.project.location,
          longitude:this.project.longitude,
          latitude:this.project.latitude,
          projectFinishDate:this.project.projectFinishDate,
          remark:this.project.remark
        };
        console.log('提交的数据为:',dataForSubmit);
        this.$axios.post(this.api.postOneProject,this.$qs.stringify({object:JSON.stringify(dataForSubmit)}))
          .then(res => {
            const { code,msg } = res.data;
            if (code === 200){
              this.$toastr.Add(configToastr('添加成功-',msg,'success'));
              this.reset();
              this.$emit('addProjectSuccess')
            } else {
              this.$toastr.Add(configToastr('添加失败-',msg,'warning'));
            }
          })
          .catch(error => {
            this.$toastr.Add(configToastr('无法连接到服务器','error'));
          })

      }
    }

  }
</script>

<style scoped>
  .x-form-group {
    margin-bottom: 15px;
    font-size: 14px;
    color: #e0e3e9;
  }
  .x-form-group label {
    margin-bottom: 7px;
  }
  .x-form-control {
    display: block;
    color: #3a4460;
    font-size: 14px;
    padding: 3px 6px;
    width: 100%;
  }
</style>
