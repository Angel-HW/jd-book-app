<template>
  <div>
    <!-- <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div> -->

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form ref="form" :model="formData" inline label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="formData.userAcct"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="formData.confirmUserPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="formData.idCard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.mail"></el-input>
      </el-form-item>
      <el-form-item label="邀请码">
        <el-input v-model="formData.inviteCode"></el-input>
      </el-form-item>
      <el-form-item label="图片上传" class="upImg" prop="imagePath">
        <i-file v-model="formData.imagePath"></i-file>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="registerData">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        <div>
          <router-link to="/login">返回登录</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import req from '@/api/register.js'
import axios from 'axios'
const qs = require('qs')
import IFile from '@/components/common/i-file.vue'


export default {
  name: 'register',
  components: {
    IFile
  },
  data () {
    return {
      formData: {},
      // formRules: {
      //   userAcct: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      //   userPassword: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      //   confirmUserPassword: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      //   phone: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      //   userName: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      //   sex: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      //   idCard: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      //   mail: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      //   imagePath: [
      //     {required: true, message: '请输入活动名称', trigger: 'change'}
      //   ],
      // }
    }
  },
  methods: {
    registerData () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.formData.confirmUserPassword !== this.formData.userPassword) {
            this.$message.info('两次输入的密码不一致')
            return
          } else {
            axios({
              method: 'post',
              url: 'http://309m2t0120.wicp.vip/app/register/clientRegister',
              data: qs.stringify(this.formData),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;'
              }
            }).then(data => {
              console.log(data)
              if (data.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: data.data.msg
                })
                // this.getHeader(data.data.data.access_token)
                // sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
                setTimeout(() => {
                  this.$router.push({path: '/login'})
                })
              } else {
                this.$message({
                  type: 'error',
                  message: data.data.msg
                })
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
  .upImg {
    /deep/ .el-form-item__content {
      width: 202px;
    }
  }
}

.register-btn {
  width: 150px;
  height: 40px;
  margin-top: 20px;
}
</style>
