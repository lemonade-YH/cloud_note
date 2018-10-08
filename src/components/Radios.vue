<template>
    <div>
      <label v-for="item in options" class="label-style">
        <input type="radio" v-model="categoryValue" :value="item._id" class="input-style">
        <span>{{item.name}}</span>
      </label>
    </div>
</template>

<script>
    export default {
      props:{
        options:Array,
        value:String
      },
        name: "radios",
      data(){
        return{
          categoryValue:this.value,
        }
      },
      watch:{
        value(val){
          this.categoryValue = val
        },
        categoryValue(val){
          //子向父传值
          this.$emit("input",val)
          this.$emit("change",val)
        }
      }
    }
</script>

<style scoped lang="scss">
  .label-style{
    span{
      color: #00B7FF;
      font-size: 14px;
      font-weight: 600;
      display: inline-block;
      width: 60px;
      height: 30px;
      border: 1px solid #aaa;
      border-radius: 3px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
    .input-style{
      display: none;
    }
  }
  .input-style:checked + span{
    color: #fff;
    background-color: #00B7FF;
  }
</style>
