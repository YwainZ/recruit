import api from './index'
import axios from 'axios'

let headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + localStorage.getItem('token')
}
export default {
  getCompany () {
    return axios.get(api.getCompany(), {headers: headers})
  },
  userRegister (info) {
    return axios.post(api.userRegister(), JSON.stringify(info), {headers: headers})
  },
  getComName () {
    return axios.get(api.getComName(), {headers: headers})
  },
  userLogin (info) {
    return axios.post(api.userLogin(), JSON.stringify(info), {headers: headers})
  },
  getUserInfo () {
    return axios.get(api.getUserInfo(), {headers: headers})
  },
  getCode (phone) {
    return axios.get(api.getCodeAd(), {params: {phone: phone}}, {headers: headers})
  },
  logout () {
    return axios.get(api.logout(), {headers: headers})
  },
  sendResume (resumeInfo) {
    return axios.post(api.sendResume(), JSON.stringify(resumeInfo), {headers: headers})
  },
  deliveryList () {
    return axios.get(api.deliveryList(), {headers: headers})
  },
  putUserInfo (userInfo) {
    return axios.put(api.putUserInfo(), JSON.stringify(userInfo), {headers: headers})
  },
  changePhone (phone) {
    return axios.put(api.changePhone(), JSON.stringify(phone), {headers: headers})
  },
  changePass (password) {
    return axios.put(api.changePass(), JSON.stringify(password), {headers: headers})
  },
  changeEmail (email) {
    return axios.put(api.changeEmail(), JSON.stringify(email), {headers: headers})
  },
  getCompanyDetail (id) {
    return axios.get(api.getCompanyDetail(id), {headers: headers})
  },
  getResume (userId) {
    return axios.get(api.getResume(), {params: {userId: userId}}, {headers: headers})
  },
  getJobDetail (id) {
    return axios.get(api.getJobDetail(id), {headers: headers})
  },
  deliveryReusme (recruiteId, title) {
    return axios.get(api.deliveryReusme(recruiteId), {params: {title: title}}, {headers: headers})
  },
  getMessage () {
    return axios.get(api.getMessage(), {headers: headers})
  },
  findJob (key) {
    return axios.get(api.findJob(), {params: {key: key}}, {headers: headers})
  }
}
