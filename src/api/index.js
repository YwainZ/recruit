const host = 'http://47.94.248.38:6200'

export default {
  getCompany () {
    return host + '/company'
  },
  getUser () {
    return host + '/user'
  }
}
