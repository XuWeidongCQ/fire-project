
const getLocation = 'http://api.map.baidu.com/geocoder';
const ak = 'HMsRLrPGidU6hIisM4HYgx0APRKhpm6p';
const BaseURL = 'http://zhxf.yuhualab.com:8080';
const testURL = 'http://172.20.29.63:8080';

export default {
  postOneProject:BaseURL + '/caracara/info/project',
  deleteOneProject:BaseURL + '/caracara/info/project/delete',
  getAllProjects:BaseURL + '/caracara/info/project',
  postOneDev:BaseURL + '/caracara/info/device',
  deleteOneDev:BaseURL + '/caracara/info/device',
  getAllDevInOneProject:BaseURL + '/caracara/info/device/project/id',
  testPostOneProject:testURL + '/caracara/info/project',
  testDeleteOneDev:testURL + '/caracara/info/device',

  getOnlineOfflineDevNum:BaseURL + '/caracara/info/device/count/line',
  getUsedUsingDevNum:BaseURL + '/caracara/info/device/count/state',
}
