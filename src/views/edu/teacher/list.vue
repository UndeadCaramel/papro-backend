<template>
  <div class="app-container">
    <el-form ref="form" :model="teacherQuery" :inline="true">
      <el-form-item label="讲师名称">
        <el-input v-model="teacherQuery.name" placeholder="讲师名称" />
      </el-form-item>
      <el-form-item label="讲师职称">
        <el-select v-model="teacherQuery.level" placeholder="讲师职称">
          <el-option label="" value="" />
          <el-option label="高级讲师" :value="1" />
          <el-option label="首席讲师" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="teacherQuery.begin" type="datetime" placeholder="开始时间" />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="teacherQuery.end" type="datetime" placeholder="结束时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="讲师姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="讲师资历"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.career }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序"  align="center">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column  label="头衔"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.level | statusFilter">{{ scope.row.level | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="text" size="mini" icon="el-" >查看</el-button>
          </router-link> -->
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          </router-link>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align:center">
      <el-pagination :total="total" :current-page="current" :page-size="limit" layout="total, prev, pager, next, jumper" background @current-change="getList" />
    </div>
  </div>
</template>

<script>
import teacher from '@/api/teacher'

export default {
  filters: {
    statusFilter(level) {
      const statusMap = ['', '高级讲师', '首席讲师']
      return statusMap[level]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      current: 1,
      limit: 5,
      teacherQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.current = page
      this.listLoading = true
      teacher.getPageList(this.current, this.limit, this.teacherQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
      }).catch(error => console.log(error))
    },
    resetData() {
      this.teacherQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该讲师,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.removeDataById(id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }).catch(error => console.log(error))
      }).catch(() => {
        this.$message({
          message: '已取消删除',
          type: 'info'
        })
      })
    }

  }
}
</script>
