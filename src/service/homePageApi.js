
const HOME_PAGE_API = {

  //获取所有项目的信息
  getAllProjectsInfos:{
    method:'get',
    url:'/caracara/info/project'
  },

  //获取所有在线和离线的设备数量
  getOnlineAndOfflineDevNum:{
    method:'get',
    url:'/caracara/info/device/count/line'
  },

  //获取所有有效和失效的设备数量
  getUsingAndUsedDevNum:{
    method: 'get',
    url:'/caracara/info/device/count/state'
  },

  //获取一个项目中所有设备的最新传感器数据
  getSensorDataInOneProject:{
    method:'get',
    url:'/caracara/info/device/project'
  },

  //获取一台设备的历史传感器数据
  getSensorDataInOneDev:{
    method:'get',
    url:'/caracara/data/device/uuid'
  }
};

export default HOME_PAGE_API
