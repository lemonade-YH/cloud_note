<template>
    <div class="wrapper">
      <h2>新用户注册</h2>
      <div class="input-box">
        <input type="text" v-model="formData.username" placeholder="用户名">
      </div>
      <div class="input-box">
        <input type="text" v-model="formData.email" placeholder="邮箱">
      </div>
      <div class="input-box">
        <input type="password" v-model="formData.password" placeholder="密码">
      </div>
      <el-button type="primary" @click="signIn">注册</el-button>
    </div>
</template>

<script>
    export default {
        name: "register",
        data(){
          return{
            formData:{
              username:'',
              email:'',
              password:''
            }
          }
        },
       methods:{
         signIn(){
           if(this.formData.password&&this.formData.password.length >= 5){
             this.$axios.post('/user',this.formData).then(res=>{
               if(res.code == 200){
                 this.$message.success(res.msg)
                 setTimeout(()=>{
                   this.$router.push('/index')
                 },1000)
               }else{
                 this.$message.error(res.msg)
               }
             }).catch(err=>{
               console.log(err)
             })
           }else{
             this.$message.error('密码不得小于5位')
           }
         }
       }
    }
</script>

<style scoped lang="scss">
.wrapper {
  width: 714px;
  height: 326px;
  margin: 100px auto 0;
  padding: 30px 0 50px;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  h2 {
    font-weight: 500;
  }
  .input-box {
    margin-top: 30px;
    input {
      width: 360px;
      height: 15px;
      padding: 14px;
      border: 1px solid #eee;
      outline: none;
      border-radius: 3px;
    }
    input::-webkit-input-placeholder{
      font-size: 13px;
    }
  }
  /deep/ .el-button {
    width: 390px;
    margin-top: 30px;
  }
}
</style>
