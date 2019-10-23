<template>
  <div class="login-wrapper">
    <div class="xu-login-container animated fadeInDown">
      <div class="row">
        <div class="col-lg-6 col-sm-12 text-center">
          <h2 class="font-weight-bold">欢迎登录智慧消防管理系统</h2>
          <img src="../../assets/cqu-logo_nobg.jpg" style="height: 150px;width: 210px">
          <img src="../../assets/company_logo.jpg" style="height: 150px;width: 210px">
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="xu-widget bg-light rounded pt-5 pb-5 mt-0">
            <form role="form">
              <div class="form-group">
                <label for="username">请输入用户名：</label>
                <input id="username" type="text" class="form-control" placeholder="用户名" v-model="username">
              </div>
              <div class="form-group">
                <label for="password">请输入密码：</label>
                <input id="password" type="password" class="form-control" placeholder="密码" v-model="password">
              </div>
              <button type="button" class="btn btn-success btn-block" @click="login">登录</button>
              <a href="#"><small>忘记密码？</small></a>
              <p class="text-muted text-center"><small>还没有账号？</small></p>
              <a class="btn btn-block btn-link" href="#">创建一个账户</a>
            </form>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-12 text-center">
          <small class="text-muted">重庆大学微系统研究中心©2019</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { loginFailureToastr } from "@/plugins/toastrInfos";

  export default {
      name: "Login",
      data:function () {
        return {
          username:'',
          password:'',
        }
      },
      methods:{
          login:function () {
            if (this.username === 'es' && this.password === '206206'){
              this.$router.push('/main')
            } else {
              this.$toastr.Add(loginFailureToastr)
            }
          }
      }
    }
</script>

<style scoped>
  .xu-login-container{
    max-width: 900px;
    margin: 0 auto;
    padding: 200px 20px 20px 20px;
  }

  .xu-widget{
    padding: 2px 20px;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .login-wrapper{
    background: url('../../assets/background-small.jpg'),no-repeat;
    background-size: cover;
    height: 100vh;
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translateY(-20px);
      -ms-transform: translateY(-20px);
      transform: translateY(-20px);
    }

    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
  }

  .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
  }

  .animated{
    animation-duration: 1s;
    animation-fill-mode: both;
  }

</style>
