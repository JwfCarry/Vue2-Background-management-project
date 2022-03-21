<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",
  computed: {
    ...mapState({
      tags: "tabsList",
    }),
  },
  methods: {
    changeMenu(tag) {
      this.$router.push({ name: tag.name });
    },
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      this.$store.commit("closeTag", tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tag[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>