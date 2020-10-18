<template>
  <div>
    <el-container>
      <div class="box" v-for="(item, index) in driverList" :key="index">
        <div>
          <img src="../../assets/u1210.png" alt="">
          <div>{{item.userName}}</div>
        </div>
        <div>
          <img src="../../assets/u1151.png" alt="">
          <div>{{item.phone}}</div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import req from '@/api/shoper-driver.js'

export default {
  data () {
    return {
      driverList: []
    }
  },
  mounted () {
    this.getDriverData()
  },
  methods: {
    getDriverData () {
      req('getDriver', {
      }).then(data => {
        console.log(data)
        //  this.driverList = data.data.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 90px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    div {
      width: 70%;
      display: flex;
      padding-left: 5px;
      box-sizing: border-box;
    }
  }
}
</style>