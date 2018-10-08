<template>
    <div class="wrapper" v-if="content.author">
      <div class="above-content">
        <div class="above-left">
          <img :src="content.author.avatar">
        </div>
        <div class="above-right">
          <h3 v-text="content.author.username">袁航</h3>
          <p v-text="content.title"></p>
          <div class="createtime">
            <span v-text="content.createTime">2018年10月8号</span>
            <span class="read">阅读:0</span>
          </div>
        </div>
      </div>
      <div class="main-content" v-html="content.content">
      </div>
    </div>
</template>

<script>
    export default {
      name: "content-detail",
      data(){
        return{
          content:{}
        }
      },
      methods:{
        getContentData(){
          let id = this.$route.query.id
          this.$axios.get(`/article/${id}`).then(res=>{
            this.content = res.data
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      created(){
        this.getContentData()
      }
    }
</script>

<style scoped lang="scss">
  .wrapper{
    width: 600px;
    margin: 0 auto;
    .above-content{
      display: flex;
      .above-left{
        img{
          width: 100px;
          height: 100px;
        }
      }
      .above-right{
        margin: 20px 0 0 20px;
        color: #00B7FF;
        h3{
          padding-bottom: 10px;
        }
        p{
          padding-bottom: 10px;
        }
        .createtime{
          .read{
            padding-left: 10px;
          }
        }
      }
      .above-content:after{
        content: '';
        display: block;
        clear: both;
      }
    }
    .main-content{
      margin-top: 20px;
    }
  }
</style>
