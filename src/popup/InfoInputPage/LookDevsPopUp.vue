<template>
  <div v-if="modalShown">
    <xu-modal
      :shown="modalShown"
      :header-shown="true"
      @close="closeLookDevsPopUp">
      <div slot="header">
        <span>‘{{ project.projectName }}’项目的设备详情</span>
      </div>
      <div slot="content">
        <table class="table table-sm text-center x-table-hover border-bottom dev-details-table">
          <thead class="thead-light thead-font-style">
          <tr>
            <th>设备uuid</th>
            <th>设备编号</th>
            <th>是否启用</th>
            <th>设备类型</th>
            <th>安装位置</th>
            <th>通信技术</th>
            <th>通信周期/分钟</th>
            <th>生产日期</th>
            <th>销售日期</th>
            <th>使用年限/年</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody class="tbody-font-style">
          <tr v-for="(dev,index) in presentDevDetails" :key="index">
            <td>{{dev.uuid}}</td>
            <td>{{dev.simpleNumber}}</td>
            <td>
              <xu-switch :val1="'启用'"
                         :val2="'禁用'"
                         :present-value="dev.isEnable | fixIsEnable"
                          @afterGetSelectValue="changeEnable($event,project.projectId,dev,index)">
              </xu-switch>
<!--              <span :class="{'online-badge':dev.isEnable === true,'offline-badge':dev.isEnable === false}">-->
<!--                {{dev.isEnable | fixIsEnable }}-->
<!--              </span>-->
            </td>
            <td>{{dev.type | fixDevType }}</td>
            <td>{{dev.location}}</td>
            <td>{{dev.communication | fixDevCommunication }}</td>
            <td>{{dev.cycle}}</td>
            <td>{{dev.productionDate}}</td>
            <td>{{dev.salesDate}}</td>
            <td>{{dev.serviceLife}}</td>
            <td>{{dev.remark}}</td>
            <td>
              <button class="btn-delete" @click="deleteOneDev(dev.uuid,index)">
                <span class="fa fa-trash"></span>
              </button>
              <button class="btn-edit" @click="showEditDevPopUp(dev,index)">
                <span class="fa fa-edit"></span>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <xu-page-nav
          :max-page="maxPage"
          :is-shown="isPageNavShown"
          @selectedPage="getSelectedPage"
          class="x-float-right"></xu-page-nav>
      </div>
    </xu-modal>

    <edit-one-dev-pop-up
      v-if="isEditOneDevShown"
      :project="project"
      :device="device"
      @editOneDevSuccess = 'editOneDevSuccess'
      @close="isEditOneDevShown = false">
    </edit-one-dev-pop-up>
  </div>
</template>

<script>
  import XuModal from "@/pages/share_components/XuModal";
  import EditOneDevPopUp from "@/popup/InfoInputPage/EditOneDevPopUp";
  import XuPageNav from "@/pages/share_components/XuPageNav";
  import XuSwitch from "@/pages/share_components/XuSwitch";
  import { configToastr } from "@/plugins/toastrInfos";

  export default {
    name: "LookDevsPopUp",
    components:{
      EditOneDevPopUp,
      XuModal,
      XuPageNav,
      XuSwitch
    },
    props:{
      modalShown:{
        type: Boolean,
        default:true
      },
      project:{
        type:Object
      }
    },
    data:function () {
      return {
        onePageNumber:10,//一页显示的数目
        isEditOneDevShown:false,
        isPageNavShown:false,//是否显示分页器
        maxPage:1,//最大分页数
        presentDevDetails:[],//当前用来显示的设备信息
        device:null,//被选中的设备
        deviceIndex:0,//被选中的设备在devDetails中的索引
        devDetails:[//这个数据需要get获取
          // { uuid:'1234',type:'储压',communication:'NB-IoT',cycle:10,productionDate:'占位符',salesDate:'占位符',serviceLife:3,remark:'占位符'},
        ]
      }
    },

    created(){
      this.getAllDevInOneProject()
    },

    methods:{
      closeLookDevsPopUp:function () {
        this.$emit('close')
      },
      //显示修改设备弹窗
      showEditDevPopUp:function(dev,index){
        this.isEditOneDevShown = true;
        this.device = dev;
        this.deviceIndex = index; //向子组件传递要修改的设备索引
        console.log(`修改项目id为${this.project.projectId}里面的设备uuid为${this.device.uuid}`);
      },
      //编辑设备成功
      editOneDevSuccess:function(formData){
        this.isEditOneDevShown = false;//修改成功后关闭弹窗
        this.presentDevDetails.splice(this.deviceIndex,1,formData)
      },
      //使用开关按钮选择值后
      changeEnable:function(event,projectId,device,deviceIndex){
        this.$Http.editOneDev({
          projectId:projectId,
          uuid:device.uuid,
          isEnable:event
        })
          .then(res => {
            const { code,msg } = res.data;
            if (code === 200){
              device.isEnable = event;
              this.presentDevDetails.splice(deviceIndex,1,device);
              this.$toastr.Add(configToastr('修改设备-',msg,'success'))
            } else {
              this.$toastr.Add(configToastr('修改设备失败-',msg,'warning'))
            }
          })
          .catch(error => {
            this.$toastr.Add(configToastr('无法连接服务器','','error'))
          })
      },
      //获取所有设备
      getAllDevInOneProject:function(){
        console.log(`查看项目id为${this.project.projectId}的设备详情`);
        this.$Http.getAllDevInOneProject({params:{projectId: this.project.projectId}})
          .then(res => {
            const {code,msg} = res.data;
            // console.log(msg);
            if (code === 200){
              msg.forEach(dev => {
                const { uuid,simpleNumber,type,location,communication,cycle,productionDate,salesDate,serviceLife,remark,isEnable } = dev;
                this.devDetails.push({ uuid,simpleNumber,type,location,communication,cycle,productionDate,salesDate,serviceLife,remark,isEnable})
              });
              this.initPageNav()
            }
          })
      },
      //初始化分页器信息
      initPageNav:function(){
        this.maxPage = Math.ceil(this.devDetails.length / this.onePageNumber);
        // console.log(this.maxPage);
        if (this.maxPage > 1){//如果超过1页
          this.presentDevDetails = this.devDetails.slice(0,this.onePageNumber);
          this.isPageNavShown = true
        } else {
          this.isPageNavShown = false;
          this.presentDevDetails = this.devDetails
        }
      },
      //分页器选择特定页
      getSelectedPage:function(page){
        // console.log('选择的页码为:',page);
        if (page === this.maxPage){
          this.presentDevDetails = this.devDetails.slice((page - 1) * 10);
        } else {
          this.presentDevDetails = this.devDetails.slice((page - 1) * 10,page * 10);
        }
      },
      //删除一个设备
      deleteOneDev:function (uuid,index) {
        console.log(`准备删除设备id为${uuid}的设备`);
        this.$Http.delOneDev({data:{
            projectId:this.project.projectId,
            uuid:uuid
          }})
          .then(res => {
            // console.log(res);
            const { code,msg } = res.data;
            if (code === 200) {
              this.presentDevDetails.splice(index,1);
              this.$toastr.Add(configToastr('删除设备-',msg,'success'));
              this.$emit('deleteOneDevSuccess');
            } else {
              this.$toastr.Add(configToastr('删除设备失败-',msg,'warning'));
            }
          })
          .catch(error => {
            this.$toastr.Add(configToastr('无法连接服务器','','error'));
          })
      }
    },

    filters:{
      fixDevType:function (value) {
        switch (value) {
          case 0:
            return '未知';
          case 1:
            return '储压';
          case 2:
            return '非储压';
          default:
            return '未知'
        }
      },
      fixDevCommunication:function (value) {
        switch (value) {
          case 0:
            return '未知';
          case 1:
            return 'zigBee';
          case 2:
            return 'NB-IOT';
          default:
            return '未知'
        }
      },
      fixIsEnable:function (value) {
        switch (value) {
          case false:
            return '禁用';
          case true:
            return '启用';
          default:
            return '禁用';
        }
      }
    }
  }
</script>

<style scoped>
  .dev-details-table {
    width: 1200px;
  }
</style>
