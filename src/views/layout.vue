<template>
    <div>
     <Headers></Headers>
      <router-view></router-view>
    </div>
</template>

<script>
    import Headers from '@/components/Headers'
    export default {
        name: "layout",
      components:{
          Headers
      }
    }
</script>

<style scoped>

</style>
