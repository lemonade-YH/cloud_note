<template>
    <div class="wrapper">
      <div class="inner">
        <div class="inner-left">
          <a href="/index">
            云笔记
          </a>
        </div>
        <div class="inner-right">
          <el-button @click="write_node">写笔记</el-button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "headers",
        data(){
          return{

          }
        },
        methods:{
          write_node(){
            if(this.$store.state.userInfo.username)
            {
              this.$router.push('write_note')
            }else {
              this.$message.warning('登录后才能写笔记哦。')
            }
          }
        }
    }
</script>

<style scoped lang="scss">
.wrapper{
  height: 50px;
  background-color: #409eff;
  .inner{
    width: 1170px;
    height: 50px;
    background-color: #409eff;
    margin: 0 auto;
    .inner-left{
      float: left;
      height: 50px;
      line-height: 50px;
      font-size: 30px;
      font-weight: 500;
      a{
        text-decoration: none;
        color: #fff;
      }
    }
    .inner-right{
      float: right;
      margin-top: 5px;
    }
  }
}
</style>
