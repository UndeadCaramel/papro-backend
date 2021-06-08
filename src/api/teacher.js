import request from '@/utils/request'

export default {
  getList(params) {
    return request({
      url: '/serviceedu/edu-teacher/findAll',
      method: 'get',
      params
    })
  },
  getPageList(page, limit, teacherQuery) {
    return request({
      url: `/serviceedu/edu-teacher/pageTeacherCondition/${page}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  removeDataById(id) {
    return request({
      url: `/serviceedu/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  addData(teacher){
    return request({
      url: `/serviceedu/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  getData(id){
    return request({
      url: `/serviceedu/edu-teacher/getTeacher/${id}`,
      method: 'get',
    })
  },
  updateData(teacher){
    return request({
      url: `/serviceedu/edu-teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  },


}
