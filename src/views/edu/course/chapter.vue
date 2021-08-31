<template>
  <div class="app-container">
    <h2>发布新课程</h2>
    <el-steps :active="active" process-status="wait" align-center finish-status="success">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 2,
      saveBtnDisabled: false
    }
  },
  created() {
  },
  methods: {
    previous() {
      this.$router.push({ path: '/course/info/1' })
      // if (this.active-- > 0) this.active = 0
    },
    next() {
      this.$router.push({ path: '/course/publish/1' })
      // if (this.active++ > 2) this.active = 0
    }
  }
}
</script>
<style lang="scss" scoped>
  h2{
    text-align: center;
  }
</style>
