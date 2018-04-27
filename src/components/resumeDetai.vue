<template>
  <table>
    <th></th>
    <tr> <td>姓名：</td><td>{{this.resumeList.name}}</td> </tr>
    <tr> <td>年龄：</td><td>{{this.resumeList.age}}</td> </tr>
    <tr> <td>性别：</td><td>{{this.resumeList.man}}</td> </tr>
    <tr> <td>电话：</td><td>{{this.resumeList.phone}}</td> </tr>
    <tr> <td>邮箱：</td><td>{{this.resumeList.email}}</td> </tr>
    <tr> <td>地址：</td><td>{{this.resumeList.address}}</td> </tr>
    <tr> <td>学校：</td><td>{{this.resumeList.school}}</td> </tr>
    <tr> <td>毕业时间：</td><td>{{this.resumeList.endTime}}</td> </tr>
    <tr> <td>技术栈：</td><td>{{this.resumeList.skills}}</td> </tr>
    <tr> <td>实习（工作）经历：</td><td>{{this.resumeList.experience}}</td> </tr>
    <tr> <td>自我介绍：</td><td>{{this.resumeList.introduce}}</td> </tr>
    <tr> <td>获奖经历：</td><td>{{this.resumeList.awards}}</td> </tr>
  </table>
</template>

<script>
export default {
  props: ["resumeList"]
};
</script>

<style>

</style>
