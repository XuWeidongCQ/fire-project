
const INFO_INPUT_PAGE_API = {
  //删除一个项目
  delOneProject:{
    method:'post',
    url:'/caracara/info/project',
  },

  //添加一台设备
  addOneDev:{
    method: 'post',
    url:'/caracara/info/device',
  },

  //获取一个项目中所有设备
  getAllDevInOneProject:{
    method:'get',
    url:'/caracara/info/device/project/id'
  },

  //删除一台设备
  delOneDev:{
    method:'post',
    url:'/caracara/info/device'
  },

  //修改一台设备
  editOneDev:{
    method:'put',
    url:'/caracara/info/device',
  },

  //修改一个项目
  editOneProject:{
    method:'put',
    url:'/caracara/info/project'
  }
};

export default INFO_INPUT_PAGE_API
