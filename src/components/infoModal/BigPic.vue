<template>
  <Modal
    v-model="State"
    :width="530"
    title="背景图"
    :styles="{top: '20px'}"
    @on-cancel="CloseBtn">
    <img class="big-img" :src="Img" alt="">
    <div slot="footer">
      <Button type="error" @click="CloseBtn">关闭</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'ThirdModal',
    data () {
      return{
        State: this.modalShow,
        Img: this.InitData,
      }
    },
    props: {
      modalShow: Boolean,
      InitData: String
    },
    watch: {
      modalShow(val){
        this.State = val;
      },
      InitData(val){
        this.Img = val;
      }
    },
    methods: {
      CloseBtn(){
        this.$emit('CloseModal',this.modalState);
      }
    }
  }
</script>

<style lang="less" scoped>
  .big-img{
    width: 500px;
    display: inline-block;
  }
</style>
