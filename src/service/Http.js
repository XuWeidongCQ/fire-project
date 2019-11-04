
import axios from 'axios'
import homePageApi from './homePageApi'
import infoInputPageApi from './infoInputPageApi'

let axiosInst = axios.create({
  baseURL:'http://zhxf.yuhualab.com:8080'
});

// let allApi = {};
let Http = {};//存放所有请求api的方法
const allApi = Object.assign({},homePageApi,infoInputPageApi);

for (let key in allApi){
  let method = allApi[key]['method'];
  let url = allApi[key]['url'];

  switch (method) {
    case 'get':
      Http[key] = function(config={}) {
        return axiosInst[method](url,config)
      };
      break;
    case 'delete':
      Http[key] = function(config={}) {
        return axiosInst[method](url,config)
      };
      break;
    case 'post':
      Http[key] = function (data=[],config={}) {
        return axiosInst[method](url,data,config)
      };
      break;
    case 'put':
      Http[key] = function (data=[],config={}) {
        return axiosInst[method](url,data,config)
      };
      break;
    default:
      Http[key] = null;
  }
}

export default Http
