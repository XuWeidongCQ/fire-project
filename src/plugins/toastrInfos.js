
export const configToastr = function (msgPrefix='',msg,type,timeOut,position) {
  return {
    msg:msgPrefix + msg,
    timeout:timeOut || 3000,
    position:position || 'toast-bottom-center',
    type:type || 'success',
    progressbar:false,
    closeOnHover:false,
  }
};

export const deleteSuccessToastr = {
  msg:'删除成功',
  timeout:3000,
  position:'toast-bottom-center',
  type:'success',
  progressbar:false,
  closeOnHover:true,
};

export const deleteFailureToastr = {
  msg:'删除失败',
  timeout:3000,
  position:'toast-bottom-center',
  type:'error',
  progressbar:false,
  closeOnHover:false,
};

export const addSuccessToastr = {
  msg:'添加成功',
  timeout:3000,
  position:'toast-bottom-center',
  type:'success',
  progressbar:false,
  closeOnHover:false,
};

export const addFailureToastr = {
  msg:'添加失败',
  timeout:3000,
  position:'toast-bottom-center',
  type:'error',
  progressbar:false,
  closeOnHover:false,
};

export const editSuccessToastr = {
  msg:'修改成功',
  timeout:3000,
  position:'toast-bottom-center',
  type:'success',
  progressbar:false,
  closeOnHover:false,
};

export const editFailureToastr = {
  msg:'修改失败',
  timeout:3000,
  position:'toast-bottom-center',
  type:'error',
  progressbar:false,
  closeOnHover:false,
};

export const loginFailureToastr = {
  msg:'账号或者密码错误',
  timeout:2000,
  position:'toast-top-center',
  type:'error',
  progressbar:false,
  closeOnHover:false,
};
