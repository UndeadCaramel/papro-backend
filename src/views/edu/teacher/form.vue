<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" label-width="30%">
      <el-form-item label="讲师名称">
        <el-col :span="5">
          <el-input v-model="teacher.name" size="5"/>
        </el-col>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-col :span="5">
          <el-input-number v-model="teacher.sort" controls-position="right" min="0" />
        </el-col>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <el-option label="高级讲师" :value="1" />
          <el-option label="首席讲师" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-col :span="5">
          <el-input v-model="teacher.career" />
        </el-col>
      </el-form-item>
      <el-form-item label="讲师简历">
        <el-col :span="11">
          <el-input v-model="teacher.intro" :rows="10" type="textarea" />
        </el-col>
      </el-form-item>
      <el-form-item label="讲师头像">
        <pan-thumb :image="teacher.avatar" />
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">
          更换头像
        </el-button>
        <image-cropper v-show="imagecropperShow" :width="300" :height="300" :ki="imagecropperKey" :url="BASE_API+'/eduoss/uploadAvatar'" field="file" @close="close" @crop-upload-success="cropSuccess" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        <!-- <el-button @click="onCancel">Cancel</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: {
    ImageCropper, PanThumb
  },
  data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      saveBtnDisabled: false,
      // 上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, // 上传组件key值
      BASE_API: process.env.VUE_APP_BASE_API // 获取dev.env.js里面地址
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getTeacher(id)
    }
    // else{ // ---tag1---老版本问题,从列表中进入编辑页后直接选择新增页会保留编辑页中的数据,created只能执行一次,需通过watch监听解决
    //   this.teacher = {}
    // }
  },
  // watch: {// 监听
  //   $route(to, from) { // ---link: tag1---监听路由变化的方式,路由发生变化时执行此方法
  //     if(this.$route.params && this.$route.params.id) {
  //       const id = this.$route.params.id
  //       this.getTeacher(id)
  //     }else{ // 老版本问题,从列表中进入编辑页后直接选择新增页会保留编辑页中的数据,created只能执行一次,需通过watch监听解决
  //       this.teacher = {}
  //     }
  //   }
  // },
  methods: {
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    saveOrUpdate() {
      if (!this.teacher.id) {
        this.addTeacher()
      } else {
        this.updateTeacher()
      }
    },
    getTeacher(id) {
      teacherApi.getData(id).then(response => {
        this.$message({
          message: '获取讲师成功',
          type: 'success'
        })
        this.teacher = response.data.teacher
      }).catch(error => console.log(error))
    },
    addTeacher() {
      this.saveBtnDisabled = true
      teacherApi.addData(this.teacher).then(response => {
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        this.$router.push('/teacher/list')
      }).catch(error => console.log(error)).finally(() => { this.saveBtnDisabled = false })
    },
    updateTeacher() {
      this.saveBtnDisabled = true
      teacherApi.updateData(this.teacher).then(response => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.$router.push('/teacher/list')
      }).catch(error => console.log(error)).finally(() => { this.saveBtnDisabled = false })
    }
  }
}
</script>

