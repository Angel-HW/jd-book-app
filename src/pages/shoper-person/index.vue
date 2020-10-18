<template>
  <div>
    <el-header style="height: 100px">
      <div class="user">
        <div class="img-con">
            <img v-show="!userInfo.userImage" src="../../assets/default.png">
            <img v-show="userInfo.userImage" :src="userInfo.userImage" >
        </div>
        <div class="text-con">{{userInfo.userName}}</div>
      </div>
    </el-header>
    <el-container>
      <div class="box">
        <div>
          <img src="../../assets/u1210.png" alt="">
          <div>门店：{{userInfo.storeName}}</div>
        </div>
        <div>
          <img src="../../assets/u1151.png" alt="">
          <div>邀请码：{{userInfo.inviteCode}}</div>
        </div>
        <div>
          <img src="../../assets/u295.png" alt="">
          <div>{{userInfo.address}}</div>
        </div>
      </div>
    </el-container>
    <el-footer>
      <!-- 修改密码 -->
      <div class="box" @click="changePassword">
        <img src="../../assets/u666.png" alt="">
        <div>修改密码</div>
        <img src="../../assets/右.png" alt="">
      </div>
      <!-- 退出登录 -->
      <div class="box" @click="toLogin">
        <img src="../../assets/u675.png" alt="">
        <div>退出登录</div>
        <img src="../../assets/右.png" alt="">
      </div>
    </el-footer>
  </div>
</template>

<script>
import req from '@/api/shoper-person.js'

export default {
  name: 'shoper-person',
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUserData()
  },
  methods: {
    toLogin () {
      this.$confirm('是否确认退出登录').then(()=> {
        sessionStorage.clear('userInfo')
        sessionStorage.clear('roleInfo')
        sessionStorage.clear('selectComm')
        this.$router.push('/login')
      })
    },
    getUserData () {
      req('getUser', {
      }).then(data => {
        console.log(data)
        this.userInfo = data.data
      })
    },
    changePassword () {
      this.$router.push('/change-password')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: rgb(240, 92, 58);
  .user {
    width: 100%;
    display: flex;
    .img-con {
      flex: 1;
      display: flex;
      align-items: center;
      img {
        width: 70px;
        height: 70px;
        position: relative;
        left: 38%;
        border-radius: 50%;
      }
    }
    .text-con {
      flex: 2;
      line-height: 105px;
      font-size: 22px;
    }
  }
}

.el-container {
  height: 150px;
  background-color: rgb(242, 242, 242);
  margin-bottom: 15px;
  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    div {
      width: 90%;
      display: flex;
      padding-left: 5px;
      box-sizing: border-box;
      img {
        width: 25px;
        height: 25px;
      }
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