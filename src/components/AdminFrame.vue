<template>
  <div id="admin" class="layout">
    <Row type="flex">
      <Col span="3" class="layout-menu-left">
      <Menu theme="dark"
            :active-name="currentpath"
            :open-names="openname"
            :accordion="true"
            width="auto">
        <div class="layout-logo-left">
          <img class="logo" src="../assets/images/icon.png" alt="">
          欣荣钱包
        </div>
        <div class="user-panel">
          <div class="pull-left">
            <img class="avator" :src="Avator" alt="">
          </div>
          <div class="pull-left">
            <p class="text">{{ username }}</p>
            <p class="state"><i class="icon-state"></i>online</p>
          </div>
        </div>
        <Submenu v-for="item in authView" :name="item.path">
          <template slot="title">
            <Icon :type="item.meta.icon"></Icon>
            {{item.name}}
          </template>
          <router-link v-for="child in item.children" :to="item.path+'/'+child.path">
            <MenuItem :name="item.path+'/'+child.path">{{child.name}}</MenuItem>
          </router-link>
        </Submenu>
      </Menu>
      </Col>
      <Col span="21" class="layout-menu-right" :style="{minHeight: RightHeight}">
      <div class="layout-header">
        <p class="login-out" @click="loginOut">
          <Icon type="power"></Icon>
          退出登录
        </p>
      </div>
      <div class="layout-content" :style="{minHeight: contentHeight}">
        <div class="layout-content-main">
          <router-view></router-view>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { delLocal,getLocal,saveLocal } from '@/util/util'

  export default {
    name: 'app',
    data () {
      const height = window.innerHeight;
      return {
        Avator: '/static/images/avator.jpg',
        NowPath: '/index',
        RightHeight: `${height}px`,
        contentHeight: `${height - 100}px`,
        currentpath: '',
        openname: ['/auth']
      }
    },
    created(){
      //设置当前路由
      this.currentpath = getLocal('path');
      this.NowPath = this.currentpath;
      //设置打开的导航组件
      this.openname[0] = '/'+this.currentpath.split('/')[1];
    },
    mounted(){
      //调整页面高度
      window.onresize = () => {
        this.RightHeight = `${window.innerHeight}px`;
        this.contentHeight = `${window.innerHeight - 100}px`;
      }
    },
    methods: {
      loginOut(){
          //确认退出登录
          this.$Modal.confirm({
            title: '温馨提示',
            content: '<p class="confirm-text">确认退出登录吗？</p>',
            onOk: ()=>{
              delLocal('username');
              delLocal('token');
              delLocal('authview');
              saveLocal('path','/login');
              this.$router.push({path:"/"});
            }
          })
      }
    },
    watch: {
      '$route'(){
        const path = this.$route.path;
        this.NowPath = path;
      },
      RightHeight(val){
          //防抖
          if(!this.timer){
              this.RightHeight = val;
              this.timer = true;
              let that = this;
              setTimeout(function(){
                  that.timer = false;
              },400)
          }
      }
    },
    computed: {
      ...mapState(['username','authView'])
    }
  }
</script>

<style lang="less" scoped>
  /*html{
    min-height: 100%;
  }*/
  .layout{
    background: #f5f7f9;
    position: relative;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 840px;
    margin: 15px;
    //overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    .login-out{
      width: 120px;
      height: 60px;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      line-height: 60px;
      float: right;
      &:hover{
        color: #FFF;
        background: #333;
      }
    }
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: #FFF;
    text-align: center;
    border-radius: 3px;
    margin: 15px auto;
    display: flex;
    justify-content: center;
    .logo{
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
  }
  /*右边用户信息*/
  .user-panel{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    background-color: #283238;
    .pull-left{
      display: inline-block;
      padding-right: 10%;
      color: #FFF;
      .avator{
        width: 45px;
        border-radius: 50%;
        margin-right: 3px;
      }
      .text{
        font-size: 16px;
      }
      .state{
        font-size: 14px;
        .icon-state{
          width: 12px;
          height: 12px;
          margin-right: 5px;
          vertical-align: middle;
          border-radius: 50%;
          display: inline-block;
          background-color: #3c763d;
        }
      }
    }
  }
</style>
