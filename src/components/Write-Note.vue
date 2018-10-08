<template>
    <div class="write_node">
      <div class="outer">
        <h3>标题</h3>
        <div class="title_content">
          <input type="text" v-model="formData.title" placeholder="测试标题">
        </div>
        <h3>内容</h3>
        <quill-editor
          v-model="formData.content"
          ref="myQuillEditor"
          :options="editorOption"
          @change="handleChange"
          class="rich_text"
        >
        </quill-editor>
        <p>标签:</p>
        <div class="category">
          <radio :options="categories" v-model="formData.category"></radio>
        </div>
        <el-button @click="handleSubmit" type="primary">发布笔记</el-button>
      </div>
    </div>
</template>
<script>
  import 'quill/dist/quill.snow.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import radio from '@/components/Radios'
  Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        name: "write--node",
        components: {quillEditor,radio},
        data(){
          return{
            formData:{
              content:'',
              contentText:'',
              title:'',
              category:''
            },
            categories:[],
            // 富文本框参数设置
            editorOption: {
              modules: {
                ImageExtend: {
                  loading: true,
                  name: 'img',
                  action: 'https://www.qiniu.com',
                  response: (res) => {
                    return res.info
                  }
                },
                toolbar: {
                  container: container,
                  handlers: {
                    'image': function () {
                      QuillWatch.emit(this.quill.id)
                    }
                  }
                }
              }
            }
          }
        },
        methods:{
          handleChange({quill,html,text}){
            this.formData.contentText = text;
            this.formData.contentText  = this.formData.contentText.substring(0,50)+'...'
          },
          getCategoryData(){
            this.$axios.get('/category').then(res=>{
              if(res.code == 200){
                this.categories = res.data
              }
            })
          },
          handleSubmit(){
            this.$axios.post('/article',this.formData).then(res=>{
              if(res.code == 200){
                this.$message.success(res.msg)
                setTimeout(()=>{
                  this.$router.push('/index')
                },1000)
              }else if(res.code == 403){
                this.$message.error('登录状态失效，请重新登录后写笔记!');
                setTimeout(()=>{
                  this.$router.push('/index');
                },1000)
              }
            }).catch(err=>{
              console.log(err)
            })
          }
        },
      created(){
          this.getCategoryData();
      }
    }
</script>

<style scoped lang="scss">
.write_node{
  .outer{
    width: 1122px;
    height: 610px;
    background-color: #fff;
    padding: 8px 24px;
    margin: 30px auto 0;
    h3{
      margin-top: 6px;
    }
    .title_content{
      margin-top: 10px;
      input{
        width: 1108px;
        height: 40px;
        padding: 0 6px;
        border: 1px solid #eee;
      }
    }
    .rich_text{
      margin-top: 10px;
    }
    p{
      margin-top: 10px;
      color:#409eff;
      font-weight: 600;
      font-size: 14px;
    }
    .category{
      margin-top: 10px;
    }
    /deep/ .el-button{
      margin-top: 10px;
    }
  }
}
</style>
<style>
  .ql-container{
    min-height: 299px;
  }
</style>
