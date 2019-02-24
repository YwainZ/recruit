import api from './index'
import axios from 'axios'

let headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + localStorage.getItem('token')
}
export default {
  getCompany () {
    return axios.get(api.getCompany(), {params: {size: 9}}, {headers: headers})
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
  sendCode (phone) {
    return axios.get(api.sendCode(), {params: {phone: phone}}, {headers: headers})
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
  deliveryReusme (body) {
    return axios.post(api.deliveryReusme(), JSON.stringify(body), {headers: headers})
  },
  getMessage () {
    return axios.get(api.getMessage(), {headers: headers})
  },
  findJob (key) {
    return axios.get(api.findJob(), {params: {key: key}}, {headers: headers})
  },
  readMessage (info) {
    return axios.post(api.readMessage(), JSON.stringify(info), {headers: headers})
  },
  receiveResume () {
    return axios.get(api.receiveResume(), {headers: headers})
  },
  publishJob (jobinfo) {
    return axios.post(api.publishJob(), JSON.stringify(jobinfo), {headers: headers})
  },
  checkJob () {
    return axios.get(api.checkJob(), {headers: headers})
  },
  deletejob (id) {
    return axios.delete(api.deletejob(), {params: {id: id}}, {headers: headers})
  },
  hrRegister (hrInfo) {
    return axios.post(api.hrRegister(), JSON.stringify(hrInfo), {headers: headers})
  },
  recommendCandidate () {
    return axios.get(api.recommendCandidate(), {headers: headers})
  },
  recommendJob () {
    return axios.get(api.recommendJob(), {headers: headers})
  },
  getRecommandJob () {
    return axios.get(api.getRecommandJob(), {headers: headers})
  },
  // 添加公司
  addCompany (companyInfo) {
    return axios.post(api.getCompany(), JSON.stringify(companyInfo), {headers: headers})
  }
}
