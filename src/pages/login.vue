<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="55px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register">我要注册</router-link>
    </div>

    <el-button class="login-btn" type="primary" @click="loginData">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
import req from '@/api/login.js'

import axios from 'axios'
const qs = require('qs')

export default {
  name: 'login',
  data () {
    return {
      formData: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    userType () {
      return this.$store.state.userType
    }
  },
  methods: {
    loginData () {
      this.$router.push({path: '/comm-home'})
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      axios({
        method: 'post',
        url: 'http://309m2t0120.wicp.vip/uaa/auth/form',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        console.log('loginData')
        console.log(data)
        if (data.data.code === 0) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })

          sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

          this.login()

          // this.$router.push({path: '/comm-home'})
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    },
    login () {
      this.$router.push({path: '/comm-home'})
       req('getUser', {
        ...this.formData
      }).then(data => {
        console.log('login')
        console.log(data)
        sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
        if(data.data.role === '3') {
          // 司机
          this.$router.push({path: '/driver-home'})
        } else if(data.data.role === '2') {
          // 店长
          this.$router.push({path: '/shoper-order'})
        } else {
          // 客户
          this.$router.push({path: '/comm-home'})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
}
</style>
