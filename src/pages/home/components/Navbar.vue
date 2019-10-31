<template>
  <div class="xu-navbar">
    <div class="logo-wrapper">
      <div class="logo"><img src="../../../assets/company_logo.jpg" alt=""></div>
<!--      <div class="logo-character"><span>智慧消防管理系统</span></div>-->
    </div>
      <div class="navbar-wrapper-left">
        <ul class="nav-items-wrapper">
          <li><router-link to="/main" tag="li" class="x-nav-item" active-class="link-active" exact><span class='fa fa-home'></span>&nbsp;首页</router-link></li>
          <li><router-link to="/main/info-input" tag="li" class="x-nav-item" active-class="link-active" exact><span class='fa fa-edit'></span>&nbsp;信息录入</router-link></li>
        </ul>
      </div>
      <div class="navbar-wrapper-right x-float-right">
        <ul class="nav-items-wrapper">
          <li><router-link to="/" tag="li" class="x-nav-item"><span class='fa fa-arrow-left'></span>&nbsp;退出</router-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
  .xu-navbar{
    background-color:#304981;
    color: #ffffff;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 5px 20px;
    z-index: 10;
    /*outline: 1px solid red;*/
  }
  .xu-navbar::before {
    display: inline-block;
    clear: both;
  }
  .logo-wrapper {
    height: 36px;
    width: 90px;
    display: inline-block;
    vertical-align: 1px;
  }
  .logo-wrapper  img {
    height: 36px;
    width: 90px;
  }
  .logo {
    display: inline-block;
  }
  .logo-character {
    display: inline-block;
    font-size: 36px;
    line-height: 1;
    margin-left: 14px;
  }
  .navbar-wrapper-left,
  .navbar-wrapper-right{
    font-size: 20px;
    font-weight: 900;
    line-height: 1;
    display: inline-block;
    color: #dde2ea;
  }
  .nav-items-wrapper {
    height: 36px;
    /*background-color: #019b4c;*/
    padding-top: 5px;
  }
  .nav-items-wrapper > li {
    display: inline-block;
    cursor: pointer;
  }
  .x-nav-item {
    display: inline-block;
    margin: 0 10px;
    padding: 6px 12px;
    /*background-color: #019b4c;*/
  }
  .x-nav-item:hover {
    color: #ffffff;
    text-decoration: none;
  }
  .link-active {
    color: #ffffff;
    border-bottom: 2px solid #ffffff;
  }
</style>
