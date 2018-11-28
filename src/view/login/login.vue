<style lang="less">
@import './login.less';

</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import md5 from 'js-md5'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit({ userName, password }) {
      let param = {
        'logName': userName,
        // 'smsCode': this.vcode,
        'userToken': md5(password)
        // 'isUseSmsCode': 1,
      }
      // this._ajaxSubmit('userLogin.do', param, (res) => {
      //     if(res.errorCode == '0000') {
      //         console.log('登陆成功')
      //         localStorage.setItem('userToken', md5(password))
      //         this.$router.push({ path: '/Home' });
      //     }
      // })
      localStorage.setItem('userToken', 'login')
      this.$router.push({ path: '/Home' });
    }
  },
}

</script>
<style>
</style>
