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
        <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 3,
      saveBtnDisabled: false
    }
  },
  created() {
  },
  methods: {
    previous() {
      this.$router.push({ path: '/course/chapter/1' })
      if (this.active-- > 0) this.active = 0
    },
    publish() {
      this.$router.push({ path: '/course/list' })
    }
  }
}
</script>
<style lang="scss" scoped>
  h2{
    text-align: center;
  }
</style>
