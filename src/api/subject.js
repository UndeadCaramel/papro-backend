import request from '@/utils/request'

export default {
  getSubjectList(params) {
    return request({
      url: '/eduservice/edu-subject/findAll',
      method: 'get',
      params
    })
  },
  addSubject(file) {
    return request({
      url: '/eduservice/edu-subject/addSubject',
      method: 'post',
      data: file
    })
  }
}
