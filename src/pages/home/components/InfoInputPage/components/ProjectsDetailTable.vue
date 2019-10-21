<template>
  <div class="project-details-wrapper">
    <table class="table table-striped text-center">
      <thead class="thead-light thead-font-style">
      <tr>
        <th>项目ID</th>
        <th>项目地址</th>
        <th>产品数量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody class="tbody-font-style">
      <tr v-for="(project,index) in projectInfos" :key="index">
        <th>{{project.projectId}}</th>
        <th>{{project.location}}</th>
        <th>{{project.deviceNumber}}</th>
        <th>
          <button
            :class="{'btn-delete':project.deviceNumber === 0,'btn-disable':project.deviceNumber !== 0}"
            :disabled="project.deviceNumber !== 0"
            @click="deleteOneProject(project.projectId,index)">
            删除
          </button>
          <button class="btn-add-dev" @click="showAddDevModal(project)">添加设备</button>
          <button
            :class="{'btn-search-dev':project.deviceNumber !== 0,'btn-disable':project.deviceNumber === 0}"
            :disabled="project.deviceNumber === 0"
            @click="showDevDetailsModal(project)">
            查看设备
          </button>
        </th>
      </tr>
      </tbody>
    </table>

<!--在一个项目中添加一台设备弹窗-->
    <xu-modal
      :shown="isAddDevModalShown"
      @close="isAddDevModalShown = false"
      :footer-shown="true"
      :header-shown="true">
      <div slot="header">
        <span>添加设备</span>
      </div>
      <div slot="content" class="form-wrapper">
        <form>
          <div class="x-form-control">
            <div class="input-explain-wrapper">
              <label for="dev-id">设备编号：</label>
            </div>
            <div class="input-wrapper">
              <input id='dev-id' type="text" v-model="formData.uuid"
                     @input="$v.formData.uuid.$touch()">
              <p class="input-invalid" v-if="$v.formData.uuid.$invalid">设备编号不能为空且只能数字或字母</p>
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
              <input id='dev-location' type="text" v-model="formData.location">
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

<!--查看一个项目中所有设备弹窗-->
    <xu-modal :shown="isDevDetailsModalShown" @close="isDevDetailsModalShown = false">
      <div slot="content">
        <table class="table table-sm text-center dev-details-table">
          <thead class="thead-light thead-font-style">
          <tr>
            <th>设备编号</th>
            <th>设备类型</th>
            <th>通信技术</th>
            <th>通信周期</th>
            <th>生产日期</th>
            <th>销售日期</th>
            <th>使用年限</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody class="tbody-font-style">
          <tr v-for="(dev,index) in devDetails" :key="index">
            <th>{{dev.uuid}}</th>
            <th>{{dev.type}}</th>
            <th>{{dev.communication}}</th>
            <th>{{dev.cycle}}</th>
            <th>{{dev.productionDate}}</th>
            <th>{{dev.salesDate}}</th>
            <th>{{dev.serviceLife}}</th>
            <th>{{dev.remark}}</th>
            <th><button class="btn-delete" @click="deleteOneDev(dev.uuid)">删除</button></th>
          </tr>
          </tbody>
        </table>
      </div>
    </xu-modal>


  </div>
</template>

<script>
  import XuModal from "@/pages/share_components/XuModal";
  import { alphaNum,required } from 'vuelidate/lib/validators';
  import { deleteSuccessToastr,deleteFailureToastr,addSuccessToastr,addFailureToastr } from "@/plugins/toastrInfos";

  export default {
    name: "ProjectsDetailTable",
    components: {
      XuModal
    },
    data:function(){
      return {
        isAddDevModalShown:false,
        isDevDetailsModalShown:false,
        submitOneDevProject:'', //提交一台设备，其所在的项目
        deleteOneDevProject:'',//删除一台设备，其所在的项目
        formData:{
          uuid:'',
          type:1,
          communication:2,
          location:'',
          cycle:10,
          productionDate:'',
          salesDate:'',
          serviceLife:3,
          remark:''
        },
        devDetails:[//这个数据需要get获取
          { uuid:'1234',type:'储压',communication:'NB-IoT',cycle:10,productionDate:'占位符',salesDate:'占位符',serviceLife:3,remark:'占位符'},
          { uuid:'2342',type:'储压',communication:'NB-IoT',cycle:10,productionDate:'占位符',salesDate:'占位符',serviceLife:3,remark:'占位符'},
          { uuid:'5673',type:'储压',communication:'NB-IoT',cycle:10,productionDate:'占位符',salesDate:'占位符',serviceLife:3,remark:'占位符'},
          { uuid:'2349',type:'储压',communication:'NB-IoT',cycle:10,productionDate:'占位符',salesDate:'占位符',serviceLife:3,remark:'占位符'},
        ]
      }
    },
    validations:{
      formData:{
        uuid:{ alphaNum,required },
      }
    },
    props:{
      projectInfos:{
        type:Array
      }
    },
    methods:{
      test:function () {
        console.log(1);
      },
      showAddDevModal:function (project) {
        this.isAddDevModalShown = true;
        this.submitOneDevProject = project;
        console.log(`选择在项目id为${this.submitOneDevProject.projectId}中添加设备`)
      },
      //查看设备详情
      showDevDetailsModal:function(project){
        this.isDevDetailsModalShown = true;
        this.deleteOneDevProject = project;
        console.log(`选择查看项目id为${this.deleteOneDevProject.projectId}的设备情况`)
        // this.$axios.get()
      },
      reset: function () {
        this.formData.uuid = '';
        this.formData.type = 1;
        this.formData.communication = 2;
        this.formData.cycle = 10;
        this.formData.productionDate = '';
        this.formData.salesDate = '';
        this.formData.serviceLife = 3;
        this.formData.remark = '';
      },
      //删除一个项目
      deleteOneProject:function (projectId,projectIndex) {
        this.projectInfos.splice(projectIndex,1);
        console.log(`选择删除项目id为${projectId}`);
        this.$axios.post(
          this.api.deleteOneProject,
          this.$qs.stringify({object:JSON.stringify({'projectId':projectId})})
        )
          .then(res => {
            const { code,msg} = res.data;
            if (code === 200){
              this.$toastr.Add(deleteSuccessToastr);
            } else {
              this.$toastr.Add(deleteFailureToastr);
            }
          })
          .catch(error => {
            this.$toastr.Add(deleteFailureToastr);
          })
      },
      //提交一台设备的信息
      postOneDev:function () {
        const dataForSubmit = this.formData;
        dataForSubmit['projectId'] = this.submitOneDevProject.projectId;
        dataForSubmit['longitude'] = this.submitOneDevProject.longitude;
        dataForSubmit['latitude'] = this.submitOneDevProject.latitude;
        console.log('提交的数据为:',dataForSubmit);
        this.$axios.post(
          this.api.postOneDev,
          this.$qs.stringify({object:JSON.stringify(dataForSubmit)})
        )
          .then(res => {
            console.log(res);
            const { code,msg} = res.data;
            if (code === 200){
              this.$toastr.Add(addSuccessToastr);
            } else {
              this.$toastr.Add(addFailureToastr);
            }
          })
          .catch(error => {
            this.$toastr.Add(addFailureToastr);
          })
      },
      //删除一台设备的信息
      deleteOneDev:function (uuid) {
        const dataForSubmit = {
          projectId:this.deleteOneDevProject.projectId,
          uuid:uuid,
        };
        console.log(`删除项目${this.deleteOneDevProject.projectId}的设备uuid为${uuid}`)
        // this.$axios.delete()
      }
    }
  }
</script>

<style scoped>

  .btn-delete,
  .btn-search-dev,
  .btn-add-dev {
    color: #f7f7f7;
    border-radius: 3px;
  }
  .btn-delete {
    background-color: #e62229;
  }
  .btn-delete:hover {
    background-color: #ff2229;
  }
  .btn-add-dev {
    background-color: #019b4c;
  }
  .btn-add-dev:hover {
    background-color: #01b54f;
  }
  .btn-search-dev {
    background-color: #3c8beb;
  }
  .btn-search-dev:hover {
    background-color: #3c9eff;
  }
  .btn-disable {
    background-color: #dfdfdf;
    color: #f7f7f7;
    border-radius: 3px;
    cursor: not-allowed;
  }

  .form-wrapper {
    width: 400px;
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
  .dev-details-table {
    width: 900px;
  }
  .project-details-wrapper {
    max-height: 100%;
    overflow-y: auto;
  }
</style>
