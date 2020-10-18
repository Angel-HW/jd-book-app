<template>
  <div>
    <el-header style="height: 100px">
      <div>
        <img v-show="!userInfo.userImage" src="../../assets/default.png">
        <img v-show="userInfo.userImage" :src="userInfo.userImage" >
        <p style="margin: 0">{{userInfo.userName}}</p>
      </div>
    </el-header>
    <el-container>
      <div class="box">
        <div>
          <img src="../../assets/u1210.png" alt="">
          <div>{{userInfo.userName}}</div>
        </div>
        <div>
          <img src="../../assets/u1151.png" alt="">
          <div>{{userInfo.phone}}</div>
        </div>
      </div>
    </el-container>
    <el-footer>
      <!-- 修改密码 -->
      <div class="box" @click="toChangePasswordPage()">
        <img src="../../assets/u666.png" alt="">
        <div>修改密码</div>
        <img src="../../assets/右.png" alt="">
      </div>
      <!-- 退出登录 -->
      <div class="box" @click="toLoginPage()">
        <img src="../../assets/u675.png" alt="">
        <div>退出登录</div>
        <img src="../../assets/右.png" alt="">
      </div>
    </el-footer>
  </div>
</template>

<script>
import req from '@/api/driver-person.js'

export default {
  data () {
    return {
      userInfo: []
    }
  },
  mounted () {
    this.getDriverUserData()
  },
  methods: {
    getDriverUserData () {
      req('getUser', {
      }).then(data => {
        console.log(data)
        this.userInfo = data.data
      })
    },
    toChangePasswordPage () {
      this.$router.push('/change-password')
    },
    toLoginPage () {
      this.$confirm('是否确认退出登录').then(()=> {
        sessionStorage.clear('userInfo')
        sessionStorage.clear('roleInfo')
        sessionStorage.clear('selectComm')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  background-color: rgb(240, 92, 58);;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
  p {
    text-align: center;
  }
}
.el-container {
  height: 90px;
  background-color: rgb(242, 242, 242);
  margin-bottom: 15px;
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
.el-footer {
  padding: 0;
  .box {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: rgb(242, 242, 242);
    margin-bottom: 15px;
    padding-left: 45px;
    box-sizing: border-box;
    div {
      padding-left: 10px;
    }
    img:last-child {
      position: absolute;
      right: 30px;
    }
  }
}
</style>
