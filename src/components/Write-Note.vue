<template>
    <div class="write_node">
      <div class="outer">
        <h3>标题</h3>
        <div class="title_content">
          <input type="text" placeholder="测试标题">
        </div>
        <h3>内容</h3>
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @change="handleChange"
          class="rich_text"
        >
        </quill-editor>
        <p>标签</p>
        <el-button type="primary">发布笔记</el-button>
      </div>
    </div>
</template>
<script>
  import 'quill/dist/quill.snow.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        name: "write--node",
        components: {quillEditor},
        data(){
          return{
            content: '',
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
            this.content = text;
            this.content = this.content.substring(0,200)+'...'
          }
        }
    }
</script>

<style scoped lang="scss">
.write_node{
  .outer{
    width: 1122px;
    height: 565px;
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
    /deep/ .el-button{
      margin-top: 20px;
    }
  }
}
</style>
<style>
  .ql-container{
    min-height: 299px;
  }
</style>
