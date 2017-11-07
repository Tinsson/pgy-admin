<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  },
  created(){
      this.$store.commit('INIT_DATA');
  }
}
</script>

<style>
  /*全局样式*/
  #app{
    height: auto;
    min-height: 100%;
  }
  .confirm-text{
    font-size: 18px;
  }
  /*标记样式*/
  .ivu-table .table-tag-row td{
    background-color: #ff6600!important;
    color: #fff!important;
  }
</style>
