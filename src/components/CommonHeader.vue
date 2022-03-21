<template>
  <header>
    <div class="l-content">
      <el-button
        @click="changeMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑功能 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabsList"
          :key="item.name"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <p>欢迎您，管理员！</p>
      <el-dropdown trigger="hover" szie="mini">
        <span>
          <img class="user" src="../assets/images/jwfimg.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {};
  },
  methods: {
    changeMenu() {
      this.$store.commit("isCollapse");
    },
    logOut() {
      //登出功能
      this.$store.commit("clear");
      this.$store.commit("clearMenu");
      this.$router.push({
        name: "login",
      });
    },
  },
  computed: {
    ...mapState({ tabsList: "tabsList" }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  display: flex;
  align-items: center;
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  p {
    font-size: 18px;
    font-style: italic;
  }
}
</style>