const host = 'http://192.168.199.147:6200'

export default {
  getCompany () {
    return host + '/company'
  },
  userRegister () {
    return host + '/user'
  },
  getComName () {
    return host + '/company/noPage'
  },
  userLogin () {
    return host + '/user/login'
  },
  getUserInfo () {
    return host + '/user'
  },
  getCodeAd () {
    return host + '/common/code'
  },
  logout () {
    return host + '/user/logout'
  }
}
