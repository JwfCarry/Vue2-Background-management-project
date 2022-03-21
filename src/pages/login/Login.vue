<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login_container"
  >
    <!-- 界面标题 -->
    <h3 class="login_title">系统登录</h3>
    <!-- 用户名框区域 -->
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        auto-complete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <!-- 密码框区域 -->
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <!-- 登录按钮 -->
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login()" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { getMenu } from "../../api/data";
//使用mock 来模拟服务端返回的token数据
// import Mock from "mockjs";
export default {
  name: "Login",
  data() {
    return {
      form: {}, //存储了账号密码数据
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //点登录 登录成功后的事件函数
    login() {
      //调用getMenu 登录接口
      getMenu(this.form).then(({ data: res }) => {
        console.log(res);
        if (res.code === 20000) {
          //登录成功
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({
            name: "home",
          });
        } else {
          this.$message.warning(res.data.message); //登录失败  弹出警示框
        }
      });
      // const token = Mock.random.guid(); //mock模拟服务端返回的token数据
      // this.$store.commit("setToken", token); //调用函数 将mock返回的token数据保存 同时也保存到cookie中
      // this.$router.push({
      //   name: "home",
      // }); //登录成功后跳转主页
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}

.login_submit {
  margin: 10px auto 0 auto;
}
</style>