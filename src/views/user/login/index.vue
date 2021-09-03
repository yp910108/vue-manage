<template>
  <div class="container">
    <div class="box">
      <h2 class="sys-name">基础后台管理系统</h2>
      <div class="form-wrapper">
        <div class="title-wrapper">欢迎登录</div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="account">
            <i-icon icon="user" />
            <el-input
              v-model.trim="form.account"
              type="text"
              placeholder="请输入用户名称"
              @keyup.enter.native="login"
            />
          </el-form-item>
          <el-form-item prop="password">
            <i-icon icon="password" />
            <el-input
              v-model.trim="form.password"
              type="password"
              placeholder="请输入登录密码"
              @keyup.enter.native="login"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" class="btn-login" :loading="loading" @click="login">登 录</el-button>
      </div>
    </div>
    <div class="copyright">{{ COPYRIGHT }}<br />技术支持电话：{{ CONTACT }}</div>
  </div>
</template>
<script>
import { timeFix } from '@/utils'
import { CONTACT, COPYRIGHT } from '@/constants/common'

const form = {
  account: undefined,
  password: undefined
}

export default {
  name: 'UserWrapper',
  data() {
    return {
      CONTACT,
      COPYRIGHT,
      form: { ...form },
      rules: {
        account: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    validate() {
      let pass = false
      this.$refs.form.validate((valid) => {
        pass = valid
      })
      return pass
    },
    async login() {
      if (!this.validate()) return
      this.loading = true
      try {
        await this.$store.dispatch('user/login')
        this.loading = false
        const { query } = this.$route
        this.$router.push(query.redirect || '/')
        setTimeout(() => {
          this.$notify({
            type: 'success',
            title: '欢迎',
            message: `${timeFix()}，欢迎回来`
          })
        }, 500)
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.container ::v-deep {
  position: relative;
  min-height: 100%;
  @include bg('~@/assets/login-bg.svg');
  user-select: none;
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -225px;
    width: 500px;
    height: 411px;
    .sys-name {
      position: absolute;
      left: 0;
      top: -45px;
      margin: 0;
      width: 100%;
      line-height: 1;
      text-align: center;
      font-weight: 700;
      font-size: 45px;
      color: #222;
    }
    .form-wrapper {
      padding: 50px;
      .title-wrapper {
        line-height: 1;
        text-align: center;
        font-weight: 400;
        font-size: 30px;
        color: #222;
      }
    }
    .el-form {
      margin-top: 30px;
      .el-form-item {
        input {
          padding: 0 15px 0 31px;
          font-size: 16px;
        }
        .i__icon__wrapper {
          position: absolute;
          z-index: 1;
          left: 12px;
          top: 12px;
          width: 14px;
          height: 14px;
          color: rgba(0, 0, 0, 0.25);
        }
        .el-input__inner {
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .btn-login {
      margin-top: 5px;
      padding: 9px 20px;
      width: 100%;
      height: 40px;
      font-size: 16px;
    }
  }
  .copyright {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    padding: 10px 0;
    line-height: 1.5;
    text-align: center;
    font-weight: 500;
    color: #00000073;
  }
}
</style>
