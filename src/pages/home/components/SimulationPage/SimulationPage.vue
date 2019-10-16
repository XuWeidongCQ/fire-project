<template>
    <div class="container wrapper">
      <div class="row">
        <div class="col-lg-3 col-sm-12 col-md-12">
          <div class="xu-widget p-3 border">
            <button class="btn btn-info" id="btn-humidity-simulation">湿度模拟</button>
            <hr>
            <p>当湿度超过40%RH时，会触发报警</p>
          </div>
          <div class="xu-widget p-3 border">
            <button class="btn btn-danger" id="btn-fire-simulation">火灾模拟</button>
            <hr>
            <p>当周围温度升高到600℃时，会触发警报。同时灭火装置会开启，导致环境温度大幅度下降，装置内压强也大幅下降</p>
          </div>
        </div>
        <div class="col-lg-9 col-sm-12 col-md-12">
          <div class="xu-widget border" id="simulation-temperature" style="height: 250px">

          </div>
          <div class="xu-widget border" id="simulation-humidity" style="height: 250px">

          </div>
          <div class="xu-widget border" id="simulation-stress" style="height: 250px">

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
</template>

<script>
    export default {
        name: "SimulationPage"
    }
</script>

<style scoped>
  .wrapper{
    margin-top: 60px;
  }
</style>
