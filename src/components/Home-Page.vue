<template>
    <div class="wrapper">
      <div class="inner">
        <div class="inner-left">
          <div class="inner-left-title">13亿人都会用的云笔记</div>
        </div>
        <div class="inner-right">
          <div class="unlogged-status" v-if="!userInfo.username">
            <div class="inner-right-input">
              <input type="text" v-model="formData.email" placeholder="邮箱">
            </div>
            <div class="inner-right-input">
              <input type="password" v-model="formData.password" placeholder="密码">
            </div>
            <el-button type="primary" @click="skipToLogin">登录</el-button>
            <el-button @click="skipToRegister">注册</el-button>
          </div>
          <div class="logged-status" v-else>
            <div class="head-portrait">
              <img :src="userInfo.avatar" alt="">
            </div>
            <p>用户：{{userInfo.username}}</p>
            <p>邮箱: {{userInfo.email}}</p>
            <el-button type="warning" @click="logOut">退出登录</el-button>
          </div>
        </div>
      </div>
      <div class="inner-content">
        <a class="inner-content-outer" href="#">
        <div class="inner-content-msg">
          <div class="head-portrait">
            <img src="../../static/猪.jpg" alt="">
          </div>
          <div class="intro">
            <div class="name">
              <span class="name-id">yh</span>
              <h2>哒哒哒</h2>
            </div>
            <div class="look-nums">
              <span>浏览:8</span>
              <span>回复:0</span>
              <span>分类:</span>
            </div>
          </div>
        </div>
        <div class="inner-content-desc">
          <p>哒哒哒。。。。</p>
        </div>
        </a>
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
        name: "home--page",
        data(){
          return{
            formData:{
              email:'',
              password:''
            },
            islogged:false
          }
        },
        computed:{
          ...mapState(['userInfo'])
        },
        methods:{
          skipToRegister(){
            this.$router.push('register')
          },
          skipToLogin(){
            this.$axios.post('/login',this.formData).then(res=>{
              if(res.code == 200){
                this.$message.success(res.msg)
                setTimeout(()=>{
                  this.$store.commit('ACCOUNT_INFOR',res.userData)
                },1000)
              }else {
                this.$message.error(res.msg)
              }
            }).catch(err=>{
              console.log(err)
            })
          },
          logOut(){
            this.$axios.get('/logout').then(res=>{
              let Params = {
                avatar:'',
                email:'',
                username:''
              }
              if(res.code == 200){
                this.$message.success(res.msg)
                this.$store.commit('ACCOUNT_INFOR',Params)
                this.$router.push('/index')
              }else {
                this.$store.commit('ACCOUNT_INFOR',Params)
                this.$message.error('登录信息过期，请重新登录')
              }
            }).catch(err=>{
              console.log(err)
            })
          }
        }
    }
</script>

<style scoped lang="scss">
.wrapper{
  .inner{
    width: 1170px;
    margin: 0 auto;
    .inner-left{
      float: left;
      width: 750px;
      height: 340px;
      margin-top: 50px;
      background-image: url("../../static/banner.jpg");
      background-size: 100% 100%;
      position: relative;
      overflow: hidden;
      border-radius: 3px;
      .inner-left-title{
        width: 750px;
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        font-size: 20px;
        padding-left: 30px;
      }
    }
    .inner-right{
      float: right;
      width: 300px;
      height: 290px;
      margin-top:50px;
      background-color: #fff;
      border-radius: 6px;
      padding: 21px 30px;
      .logged-status{
        .head-portrait{
          text-align: center;
          img{
            width: 150px;
            height: 150px;
          }
        }
        p{
          text-align: center;
          margin-top: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #aaa;
        }
      }
    .inner-right-input{
      width: 300px;
      height: 43px;
      margin-top: 30px;
      border: 1px solid #eee;
      border-radius: 3px;
      line-height: 45px;
      input{
        width: 270px;
        height: 15px;
        outline: none;
        margin-left: 15px;
        border: none;
      }
      input::-webkit-input-placeholder{
        font-size: 13px;
      }
    }

      /deep/ .el-button{
        width: 100%;
        margin-left: 0px;
        margin-top: 30px;
      }
    }
  }
  .inner:after{
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }
  .inner-content{
    width: 710px;
    height: 141px;
    padding: 2px 20px;
    margin-top: 30px;
    background-color: #fff;
    margin-left: 88px;
    a{
      display: block;
      height: 101px;
      margin-top: 20px;
      padding-bottom: 20px;
      text-decoration: none;
      color: #000;
      .inner-content-msg{
        .head-portrait{
          float: left;
          img{
            width: 70px;
            height: 70px;
          }
        }
        .intro{
          float: left;
          height: 80px;
          margin-left: 15px;
          .name{
            .name-id{
              display: inline-block;
              height: 24px;
              padding-right:8px;
              border-right: 1px solid #000;
              font-weight: 600;
              color: #409eff;
              font-size: 16px;
            }
            h2{
              display: inline-block;
              width: 54px;
              height: 24px;
              margin-left: 15px;
              line-height: 24px;
              font-size: 18px;
            }
          }
          .look-nums{
            width: 608px;
            height: 21px;
            margin-top: 15px;
            padding: 4px 8px;
            border-radius: 3px;
            background-color: #bbb;
            span{
              display: inline-block;
              margin-right: 30px;
              font-size: 14px;
              opacity: 0.8;
              font-weight: 600;
            }
          }
        }
      }
      .inner-content-desc{
      }
    }
  }
}
</style>
