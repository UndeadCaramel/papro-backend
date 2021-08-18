import request from '@/utils/request'

export default {
  getSubjectList(params) {
    return request({
      url: '/eduservice/edu-subject/querySubject',
      method: 'get',
      params
    })
  }
}
