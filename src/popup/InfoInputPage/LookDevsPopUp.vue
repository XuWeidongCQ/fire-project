<template>
  <div v-if="modalShown">
    <xu-modal
      :shown="modalShown"
      @close="closeLookDevsPopUp">
      <div slot="content">
        <table class="table table-sm text-center  border-bottom dev-details-table">
          <thead class="thead-light thead-font-style">
          <tr>
            <th>设备uuid</th>
            <th>设备编号</th>
            <th>设备类型</th>
            <th>安装位置</th>
            <th>通信技术</th>
            <th>通信周期/分钟</th>
            <th>生产日期</th>
            <th>销售日期</th>
            <th>使用年限/年</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody class="tbody-font-style">
          <tr v-for="(dev,index) in devDetails" :key="index">
            <th>{{dev.uuid}}</th>
            <th>{{dev.simpleNumber}}</th>
            <th>{{dev.type | fixDevType }}</th>
            <th>{{dev.location}}</th>
            <th>{{dev.communication | fixDevCommunication }}</th>
            <th>{{dev.cycle}}</th>
            <th>{{dev.productionDate}}</th>
            <th>{{dev.salesDate}}</th>
            <th>{{dev.serviceLife}}</th>
            <th>
              <button class="btn-delete" @click.self="deleteOneDev(dev.uuid,index)">删除</button>
              <button class="btn-edit">修改</button>
            </th>
          </tr>
          </tbody>
        </table>
      </div>
    </xu-modal>
  </div>
</template>

<script>
  import XuModal from "@/pages/share_components/XuModal";
  import { deleteSuccessToastr,deleteFailureToastr } from "@/plugins/toastrInfos";

  export default {
    name: "LookDevsPopUp",
    components:{
      XuModal
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
    // inject:['project'],
    data:function () {
      return {
        devDetails:[//这个数据需要get获取
          // { uuid:'1234',type:'储压',communication:'NB-IoT',cycle:10,productionDate:'占位符',salesDate:'占位符',serviceLife:3,remark:'占位符'},
        ]
      }
    },

    created(){
      console.log(`查看项目id为${this.project.projectId}的设备详情`);
      this.$axios.get(this.api.getAllDevInOneProject + '?projectId=' + this.project.projectId)
        .then(res => {
          const {code,msg} = res.data;
          // console.log(msg);
          if (code === 200){
            msg.forEach(dev => {
              const { uuid,simpleNumber,type,location,communication,cycle,productionDate,salesDate,serviceLife} = dev;
              this.devDetails.push({ uuid,simpleNumber,type,location,communication,cycle,productionDate,salesDate,serviceLife})
            })
          }

        })
    },

    methods:{
      closeLookDevsPopUp:function () {
        this.$emit('close')
      },
      //删除一个设备
      deleteOneDev:function (uuid,index) {
        console.log(`准备删除设备id为${uuid}的设备`);
        this.$axios.delete(
          this.api.deleteOneDev,
          {data:{
              projectId:this.project.projectId,
              uuid:uuid
            }
          })
          .then(res => {
            // console.log(res);
            const { code,msg } = res.data;
            if (code === 200) {
              this.devDetails.splice(index,1);
              this.$toastr.Add(deleteSuccessToastr);
              this.$emit('deleteOneDevSuccess');
            } else {
              this.$toastr.Add(deleteFailureToastr);
            }
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
      }
    }
  }
</script>

<style scoped>
  .dev-details-table {
    max-width: 1200px;
  }
</style>
