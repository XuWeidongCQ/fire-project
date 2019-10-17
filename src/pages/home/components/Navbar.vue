<template>
  <div class="xu-navbar">
    <div class="logo-wrapper">
      <router-link to="/main">
        <img src="../../../assets/company_logo.jpg" alt="">
      </router-link>
    </div>
    <div class="navbar-wrapper x-float-left">
      <ul class="nav-items-wrapper">
        <li><router-link to="/main" tag="a" class="x-nav-item" active-class="link-active" exact><span class='fa fa-home'></span>&nbsp;首页</router-link></li>
        <li><span>|</span></li>
        <li><router-link to="/main/info-input" tag="a" class="x-nav-item" active-class="link-active" exact><span class='fa fa-edit'></span>&nbsp;信息录入</router-link></li>
        <li><span>|</span></li>
      </ul>
    </div>
    <div class="navbar-wrapper x-float-right">
      <router-link to="/" tag="a" class="x-nav-item"><span class='fa fa-arrow-left'></span>&nbsp;退出</router-link>
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
    color: #d3d3d3;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 5px 20px;
    z-index: 10;
  }
  .xu-navbar::before {
    display: inline-block;
    clear: both;
  }
  .logo-wrapper {
    height: 46px;
    width: 112px;
    outline: 1px solid black;
    float: left;
  }
  .logo-wrapper  img {
    height: 46px;
    width: 112px;
  }
  .navbar-wrapper {
    font-size: 20px;
    outline: 1px solid black;
    height: 46px;
    padding: 6px 10px;
    line-height: 34px;
    margin-left: 20px;
  }
  .nav-items-wrapper > li {
    display: inline-block;
  }
  .nav-items-wrapper > li > a:hover {

  }
  .nav-items-wrapper > li:not(:first-child) {
    margin-left: 10px;
  }
  .x-nav-item:hover {
    color: #ffffff;
    text-decoration: none;
  }
  .link-active {
    color: #ffffff;
  }
</style>
