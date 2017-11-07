<template>
  <div id="base-info">
    <h2 class="sub-tit">个人信息</h2>
    <div class="text-part">
      <Table size="large"
             border="true"
             :columns="UserCol"
             :data="ShortInfo"></Table>
      <div class="simple long">
        <div class="state-box">
          <span class="label">工作单位：</span>
          <span class="value">{{ UserData.info.company }}</span>
        </div>
        <div class="state-box">
          <span class="label">公司地址：</span>
          <span class="value">{{ UserData.info.address_company }}</span>
        </div>
        <div class="state-box">
          <span class="label">户籍地址：</span>
          <span class="value">{{ UserData.info.address }}</span>
        </div>
        <div class="state-box">
          <span class="label">认证状态：</span>
          <span class="value">{{ RzInfo }}</span>
        </div>
        <div class="state-box">
          <span class="label">审核状态：</span>
          <span class="value">{{ ShenhInfo }}</span>
        </div>
        <div class="state-box">
          <span class="label">交易状态：</span>
          <span class="value">{{ UserData.loanstatus}}</span>
        </div>
      </div>
    </div>
    <h2 class="sub-tit">银行卡</h2>
    <div class="table-box">
      <Table :columns="BankCard" :data="BankData"></Table>
    </div>
    <h2 class="sub-tit">照片</h2>
    <div class="pic-area">
      <div class="idcard">
        <p class="tips">身份证正反面</p>
        <div class="all-sides">
          <!--<img src="../../../assets/images/idcard.png" alt="">
          <img src="../../../assets/images/idcard.png" alt="">-->
          <img v-for="(item, index) in UserData.idcardimg" :src="item" :key="index" alt="">
        </div>
      </div>
      <div class="face">
        <p class="tips">人脸识别</p>
        <div class="all-img">
          <img v-for="(item, index) in UserData.huoti" :src="item" :key="index" alt="">
        </div>
      </div>
    </div>
    <div class="base-line"></div>
  </div>
</template>

<script>
  import { getLocal } from '@/util/util'

  export default {
    name: 'BaseInfo',
    data () {
      return {
        title: '基本信息',
        CurId: '',
        RzInfo: '',
        ShenhInfo: '',
        //用户数据
        UserData: {
            info: {}
        },
        BankCard: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },{
            title: '序号',
            key: 'id',
            align: 'center'
          },{
            title: '银行卡号',
            key: 'cardno',
            align: 'center'
          },{
            title: '银行名称',
            key: 'bankcode',
            align: 'center'
          },{
            title: '支付途径',
            key: 'channel_id',
            align: 'center'
        }],
        BankData: [],
        UserCol:[{
          title: '姓名',
          width: '100',
          key: 'name',
        },{
          title: '手机号',
          key: 'phone'
        },{
          title: '身份证号',
          key: 'idcard'
        },{
          title: '学历',
          width: '80',
          key: 'education'
        },{
          title: '用户类型',
          width: '100',
          key: 'type'
        },{
          title: '是否黑名单',
          key: 'black'
        }],
        ShortInfo: []
      }
    },
    created(){
      this.CurId = this.$route.query.id;
      this.InitData();
    },
    methods: {
      InitData(){
        const uid = this.CurId;
        this.$fetch('User/getInfo',{uid}).then((d)=>{
          const res = d.data.jiben;
          this.UserData = res;
          this.ShortInfo.push(res.info);
          this.TransBlack(this.ShortInfo[0]);
          this.BankData = res.banklist;
          this.RzInfo = this.StateInfo(res.renz, '，');
          this.ShenhInfo = this.StateInfo(res.shenh, '，');
        });
      },
      //状态信息转换
      StateInfo(arr,divide){
        let res = [];
        arr.forEach(val=>{
            res.push(val.type);
        });
        return res.join(divide);
      },
      TransBlack(obj){
        if(obj.black === 0){
            obj.black = '否'
        }else{
            obj.black = '是'
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  @theme: #1FB5AD;
  #base-info{
    padding: 0 60px 60px;
  }
  .sub-tit{
    padding: 20px 0;
  }
  .text-part{
    display: flex;
    flex-direction: column;
    .simple{
      width: 100%;
      font-size: 14px;
      padding-top: 30px;
      .value{
        display: inline-block;
        width: 830px;
        height: 40px;
      }
      .state-box{
        display: flex;
        flex-direction: row;
      }
      .label{
        width: 90px;
        display: inline-block;
      }
    }
  }
  .pic-area{
    display: flex;
    flex-direction: row;
    .idcard{
      .tips{
        font-size: 16px;
      }
      .all-sides{
        width: 450px;
        img{
          max-width: 210px;
          margin-right: 10px;
        }
      }
    }
    .face{
      .tips{
        font-size: 16px;
      }
      .all-img{
        width: 380px;
        img{
          max-width: 180px;
          margin-right: 10px;
        }
      }

    }
  }
  .base-line{
    width: 100%;
    padding-top: 10px;
    border-bottom: 2px dashed #E3E3E3;
  }
</style>
