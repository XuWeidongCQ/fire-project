
const min = function (array) {
  if (Array.isArray(array)) {
    let min = array[0];
    for (let i=1;i<array.length;i++){
      if (array[i] < min){
        min = array[i]
      }
    }
    return min
  } else {
    return -1
  }
};

const max = function (array) {
  if (Array.isArray(array)) {
    let max = array[0];
    for (let i=1;i<array.length;i++){
      if (array[i] > max){
        max = array[i]
      }
    }
    return max
  } else {
    return -1
  }
};

const getDate = function () {
  let now;
  if (arguments[0]){
    now = new Date(arguments[0]);
  }else {
    now = new Date()
  }
  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth()+1;
  let nowDay = now.getDate();

  let nowHour = now.getHours();
  let nowMinute = now.getMinutes();
  let nowSecond = now.getSeconds();

  return {
    YYYYMMDD:nowYear+'-'+nowMonth+'-'+nowDay,
    HHMMSS:nowHour+':'+nowMinute+':'+nowSecond,
    YYYYMMDDHHMMSS:nowYear+'-'+nowMonth+'-'+nowDay+' '+nowHour+':'+nowMinute+':'+nowSecond
  }
};

const sum = function (array) {
  if (Array.isArray(array)){
    let sum = array[0];
    for (let i=1;i<array.length;i++){
      sum = sum + array[i]
    }
    return sum;
  } else {
    return -1
  }
};

const forEachObject = function (obj,fn) {
  //property就是对象中的键
  if (JSON.stringify(obj) !== '{}'){
    for (let property in obj){
      if (obj.hasOwnProperty(property)){
        fn(property,obj[property])
      }
    }
  }
};

export default {
  min,
  max,
  sum,
  getDate,
  forEachObject
}


