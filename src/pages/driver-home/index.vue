<template>
  <div class="container">
    <div class="box" v-for="(item, index) in driverList" :key="index">
      <div class="box1">
        <div>
          <img src="../../assets/u919.png" alt="">
          <div>{{item.storeId}}</div>
        </div>
        <div>门店：{{item.storeName}}</div>
        <div>地址：{{item.address}}</div>
      </div>
      <div class="box2">
        <div>店长：{{item.userName}}</div>
        <div>手机：{{item.phone}}</div>
      </div>
    </div>
  </div>
</template>


<script>
import req from '@/api/driver-home'
export default {
  data () {
    return {
      driverList: []
    }
  },
  mounted () {
    this.getDriverStoreData()
  },
  methods: {
    getDriverStoreData () {
      req('getDriverStore', {
      }).then(data => {
        console.log(data)
        this.driverList = data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: rgb(242, 242, 242);;
  border-bottom: 1px solid #ddd;
  text-align: center;
  line-height: 50px;
  div {
    font-size: 20px;
  }
}
.container {
  // height: 100px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  box-sizing: border-box;
  .box {
    width: 100%;
    .box1 {
      width: 100%;
      border-bottom: 1px solid #ddd;
      div:first-child {
        width: 70%;
        display: flex;
        margin-bottom: 10px;
        img {
          width: 25px;
          height: 25px;
        }
        div {
          padding-left: 5px;
        }
      }
      div:nth-child(2) {
        padding-left: 20px;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
      div:nth-child(3) {
        padding-left: 20px;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
    }
    .box2 {
      width: 100%;
      margin-bottom: 30px;
      border-bottom: 1px solid #ddd;
      padding-top: 10px;
      box-sizing: border-box;
      div {
        padding-left: 20px;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
    }
  }
}
</style>