<template>
  <div class="xu-navbar">
<!--    <div class="logo-wrapper">-->
<!--      <router-link to="/main">-->
<!--        <img src="../../../assets/company_logo.jpg" alt="">-->
<!--      </router-link>-->
<!--    </div>-->
    <div class="navbar-wrapper-left x-float-left">
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
    <div class="logo-wrapper">
      <div class="logo"><img src="../../../assets/company_logo.jpg" alt=""></div>
      <div class="logo-character"><span>智慧消防管理系统</span></div>
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
    background-color: #019b4c;
    color: #ffffff;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 0 20px;
    z-index: 10;
    /*outline: 1px solid black;*/
    border-bottom: 3px solid #019b4c;
  }
  .xu-navbar::before {
    display: inline-block;
    clear: both;
  }
  .logo-wrapper {
    height: 39px;
    width: 440px;
    /*outline: 1px solid black;*/
    background-color: #019b4c;
    margin-left: 35%;
    padding: 4px 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .logo-wrapper  img {
    height: 36px;
    width: 90px;
    vertical-align: -6px;
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
    margin-top: 15px;
    font-size: 20px;
    line-height: 1;
    /*outline: 1px solid black;*/
    color: #e9e9e9;
  }
  .nav-items-wrapper > li {
    display: inline-block;
    cursor: pointer;
  }
  .x-nav-item {
    display: inline-block;
    margin: 0 15px;
    padding: 2px 8px;
    background-color: #019b4c;
  }
  .x-nav-item:hover {
    color: #ffffff;
    text-decoration: none;
    border-bottom: 2px solid #ffffff;
  }
  .link-active {
    color: #ffffff;
    border-bottom: 2px solid #ffffff;
  }
</style>
