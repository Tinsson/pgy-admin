<template>
  <div>
    <Modal
      v-model="State"
      :width="1100"
      class="all-modal"
      :styles="{top: '50px'}"
      @on-cancel="CloseBtn">
      <div class="head-area" slot="header">
        <h2 class="big-head">数据详情（{{ EditData.info.name }}）</h2>
      </div>
      <div slot="close">
        <Icon class="close-icon" type="ios-close-outline"></Icon>
      </div>
      <Row class="content">
        <Col class="left-box" :span="16">
          <div class="head-info">
            <div class="avator">
              <img src="../../assets/images/avator.jpg" alt="">
            </div>
            <ul class="third-party">
              <li class="res-box">
                <p class="simple" :class="'type'+AllInfo.jiben.info.tongdun.status">{{AllInfo.jiben.info.tongdun.info}}</p>
                <p class="title">同盾</p>
              </li>
              <li class="res-box">
                <p class="simple" :class="'type'+AllInfo.jiben.info.cajl.status">{{AllInfo.jiben.info.cajl.info}}</p>
                <p class="title">诚安</p>
              </li>
              <li class="res-box">
                <p class="simple" :class="'type'+AllInfo.jiben.info.yunyings.status">{{AllInfo.jiben.info.yunyings.info}}</p>
                <p class="title">运营商</p>
              </li>
              <li class="res-box">
                <p class="simple" :class="'type'+AllInfo.jiben.info.taobao.status">{{AllInfo.jiben.info.taobao.info}}</p>
                <p class="title active" @click="ReportTaobao">淘宝</p>
              </li>
              <li class="res-box">
                <p class="simple" :class="'type'+AllInfo.jiben.info.zhimafen.status">{{AllInfo.jiben.info.zhimafen.info}}</p>
                <p class="title active">芝麻分</p>
              </li>
            </ul>
          </div>
          <div class="info-area">
            <ul>
              <li class="single-line">
                <p class="label">性别</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.sex}}</span>
                  <RadioGroup v-show="IsEdit" v-model="EditData.info.sex">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                  </RadioGroup>
                </p>
              </li>
              <li class="single-line">
                <p class="label">姓名</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.name}}</span>
                  <Input v-show="IsEdit" v-model="EditData.info.name" style="width: 250px"></Input>
                </p>
              </li>
              <li class="single-line">
                <p class="label">手机号</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.phone}}</span>
                  <Input v-show="IsEdit" v-model="EditData.info.phone" style="width: 250px"></Input>
                </p>
              </li>
              <li class="single-line">
                <p class="label">身份证号</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.idcard}}</span>
                  <Input v-show="IsEdit" v-model="EditData.info.idcard" style="width: 250px"></Input>
                </p>
              </li>
              <li class="single-line">
                <p class="label">会员等级</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.type}}</span>
                  <Select v-show="IsEdit" v-model="EditData.info.type" placeholder="请选择会员等级" style="width:250px">
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                    <Option value="E">E</Option>
                    <Option value="W">W</Option>
                  </Select>
                </p>
              </li>
              <li class="single-line">
                <p class="label">生日</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.birth}}</span>
                  <DatePicker type="date"
                              placeholder="选择日期"
                              format="yyyy/MM/dd"
                              v-show="IsEdit"
                              :value="EditData.info.birth"
                              @on-change="PickDate"
                              style="width: 250px"></DatePicker>
                </p>
              </li>
              <li class="single-line">
                <p class="label">户籍地址</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.address}}</span>
                  <Input v-show="IsEdit" v-model="EditData.info.address" style="width: 250px"></Input>
                </p>
              </li>
              <li class="single-line">
                <p class="label">芝麻分</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.zmop}}</span>
                  <Input v-show="IsEdit" v-model="EditData.info.zmop" style="width: 250px"></Input>
                </p>
              </li>
              <li class="single-line">
                <p class="label">学历</p>
                <p class="value">
                  <span v-show="!IsEdit">{{TextArr.edu[EditData.info.education - 1]}}</span>
                  <Select v-show="IsEdit" v-model="EditData.info.education" style="width:250px">
                    <Option :value="1">初中</Option>
                    <Option :value="2">高中</Option>
                    <Option :value="3">大专</Option>
                    <Option :value="4">本科</Option>
                    <Option :value="5">硕士</Option>
                    <Option :value="6">博士</Option>
                    <Option :value="7">博士后</Option>
                  </Select>
                </p>
              </li>
              <div v-for="(item, index) in EditData.info.lianxiren">
                <li class="sigle-line">
                  <p class="label">{{`联系人${index}`}}</p>
                  <p class="value">
                    <span v-show="!IsEdit">{{item.name}}</span>
                    <Input v-show="IsEdit" v-model="item.name" style="width: 250px"></Input>
                  </p>
                </li>
                <li class="sigle-line">
                  <p class="label">{{`联系人${index}手机号`}}</p>
                  <p class="value">
                    <span v-show="!IsEdit">{{item.phone}}</span>
                    <Input v-show="IsEdit" v-model="item.phone" style="width: 250px"></Input>
                  </p>
                </li>
              </div>
              <li class="single-line">
                <p class="label">审核员</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.auditorId}}</span>
                  <Select v-show="IsEdit" v-model="EditData.info.auditorId" style="width:250px">
                    <Option v-for="item in EditData.auditor" :value="item.id" :key="item.id">{{item.admin_name}}</Option>
                  </Select>
                </p>
              </li>
              <li class="single-line">
                <p class="label">催收员</p>
                <p class="value">
                  <span v-show="!IsEdit">{{EditData.info.collectorId}}</span>
                  <Select v-show="IsEdit" v-model="EditData.info.collectorId" style="width:250px">
                    <Option v-for="item in EditData.auditor" :value="item.id" :key="item.id">{{item.admin_name}}</Option>
                  </Select>
                </p>
              </li>
              <li class="single-line">
                <p class="label">居住地址</p>
                <p class="value">
                  <span v-show="!IsEdit">{{ AddressText(ChoseCompany) }}</span>
                  <Cascader :data="AllAreaData"
                            v-show="IsEdit"
                            v-model="ChoseCompany"
                            :style="{width: '300px'}"></Cascader>
                </p>
              </li>
              <li class="single-line">
                <p class="label">居住详细地址</p>
                <p class="value">
                  <span v-show="!IsEdit">{{ DetailsCompany }}</span>
                  <Input v-show="IsEdit" v-model="DetailsCompany" style="width: 300px"></Input>
                </p>
              </li>
              <li class="single-line">
                <p class="label">公司地址</p>
                <p class="value">
                  <span v-show="!IsEdit">{{ AddressText(ChoseLive) }}</span>
                  <Cascader :data="AllAreaData"
                            v-show="IsEdit"
                            v-model="ChoseLive"
                            :style="{width: '300px'}"></Cascader>
                </p>
              </li>
              <li class="single-line">
                <p class="label">公司详细地址</p>
                <p class="value">
                  <span v-show="!IsEdit">{{ DetailsLive }}</span>
                  <Input v-show="IsEdit" v-model="DetailsLive" style="width: 300px"></Input>
                </p>
              </li>
              <li class="single-line">
                <p class="label">身份证正反面</p>
                <p class="idcard-box">
                  <img v-for="item in AllInfo.jiben.idcardimg" :src="item" @click="CheckBigPic(item)" :key="item" alt="">
                </p>
              </li>
              <li class="single-line">
                <p class="label">人脸识别</p>
                <p class="idcard-box">
                  <img v-for="(item, index) in AllInfo.jiben.huoti" :src="item" @click="CheckBigPic(item)" :key="index" alt="">
                </p>
              </li>
            </ul>
          </div>
        </Col>
        <Col class="record-box" :span="8">
          <div class="nav-box">
            <a class="nav-block" :class="{cur: NavData.baseInfo.cur}" @click="NavChange('baseInfo')" href="javascript:;">基本信息</a>
            <a class="nav-block" :class="{cur: NavData.tradeRecord.cur}" @click="NavChange('tradeRecord')" href="javascript:;">交易记录</a>
            <a class="nav-block" :class="{cur: NavData.optRecord.cur}" @click="NavChange('optRecord')" href="javascript:;">操作记录</a>
          </div>
          <div class="base-info" v-show="NavData.baseInfo.cur">
            <p class="info-box">
              <span class="half">审核员：{{AllInfo.jiben.info.auditorId}}</span>
              <span class="half">催收员：{{AllInfo.jiben.info.collectorId}}</span>
            </p>
            <p class="info-box">
              <span class="half">用户ID：{{ID}}</span>
            </p>
            <p v-for="item in AllInfo.jiben.renz" class="info-box">
              {{item.type + '时间'}}：{{item.create_at}}
            </p>
            <p class="info-box">
              <span class="label">备注：</span>
              <span v-show="!NavData.baseInfo.IsRemark" class="value">{{NavData.baseInfo.remark}}</span>
              <Input type="textarea"
                     class="value"
                     v-show="NavData.baseInfo.IsRemark"
                     v-model="NavData.baseInfo.remark"></Input>
            </p>
            <div class="bot-btn">
              <Button :type="DelayBtn.type" size="large" @click="OpenDelay">{{DelayBtn.name}}</Button>
              <Button :type="BlackBtn.type" size="large" @click="AddBlack">{{BlackBtn.name}}</Button>
              <Button type="info" size="large" v-show="!NavData.baseInfo.IsRemark" @click="AddRemark">修改备注</Button>
              <Button type="warning" size="large" v-show="NavData.baseInfo.IsRemark" @click="RemarkOver">保存备注</Button>
            </div>
          </div>
          <div class="trade-record" v-show="NavData.tradeRecord.cur">
            <Tabs>
              <TabPane label="放款">
                <div class="count-box">
                  <p class="count-line">
                    <span class="title">累计笔数</span>
                    <span class="value">{{ AllInfo.loan.jk_count }}</span>
                  </p>
                  <p class="count-line">
                    <span class="title">当前金额（元）</span>
                    <span class="value">{{ AllInfo.loan.jk_this_amount }}</span>
                  </p>
                  <p class="count-line">
                    <span class="title">借款总额（元）</span>
                    <span class="value">{{ AllInfo.loan.jk_all_amount }}</span>
                  </p>
                </div>
                <Card class="card-area" v-for="item in AllInfo.loan.jk_list" :key="item.id">
                  <div class="lend-info">
                    <p class="yq_state">{{ item.yq_status }}</p>
                    <div class="text-line">
                      <div class="msg-area">
                        <p class="tips">金额（元）</p>
                        <p class="value num">{{ item.amount }}</p>
                      </div>
                      <div class="msg-area">
                        <p class="tips">实际还款日：{{ item.pay_date }}</p>
                        <p class="value state" v-if="item.pay_state">
                          <Icon type="checkmark-circled"></Icon>
                          已还款
                        </p>
                        <p class="value state nopay" v-if="!item.pay_state">
                          <Icon type="alert-circled"></Icon>
                          未还款
                        </p>
                      </div>
                    </div>
                    <div class="text-line">
                      <span class="msg-area">借款天数：{{ item.jk_days }}</span>
                      <span class="msg-area">违约金：{{ item.wy_amount }}</span>
                    </div>
                    <div class="text-line">
                      借款日期：{{ item.jk_date }}
                    </div>
                    <div class="text-line">
                      合同还款日：{{ item.hthk_date }}
                    </div>
                    <div class="text-line">
                      借款银行：{{ item.bankcode }}
                    </div>
                    <p class="text-line">
                      银行卡号：{{ item.cardno }}
                    </p>
                  </div>
                </Card>
              </TabPane>
              <TabPane label="展期">
                <div class="count-box">
                  <p class="count-line">
                    <span class="title">累计笔数</span>
                    <span class="value">{{ AllInfo.loan.zq_count }}</span>
                  </p>
                  <p class="count-line">
                    <span class="title">当前展期订单金额（元）</span>
                    <span class="value">{{ AllInfo.loan.zq_this_amount }}</span>
                  </p>
                  <p class="count-line">
                    <span class="title">展期总金额（元）</span>
                    <span class="value">{{ AllInfo.loan.zq_all_amount }}</span>
                  </p>
                </div>
                <Card class="card-area" v-for="item in AllInfo.loan.zq_list" :key="item.id">
                  <div class="lend-info">
                    <p class="yq_state">{{item.yq_status}}</p>
                    <div class="text-line">
                      <div class="msg-area">
                        <p class="tips">延期金额（元）</p>
                        <p class="value num">{{ item.amount }}</p>
                      </div>
                    </div>
                    <div class="text-line">
                      <span class="msg-area">延期费用：{{ item.fee }}元</span>
                      <span class="msg-area">延期时间：{{ item.days }}天</span>
                    </div>
                    <div class="text-line">延期开始日：{{ item.start_date }}</div>
                    <div class="text-line">延期结束日：{{ item.hk_date }}</div>
                    <div class="text-line">延期操作日：{{ item.create_at }}</div>
                  </div>
                </Card>
              </TabPane>
              <TabPane label="还款">
                <div class="count-box">
                  <p class="count-line">
                    <span class="title">累计笔数</span>
                    <span class="value">{{ AllInfo.loan.hk_count }}</span>
                  </p>
                  <p class="count-line">
                    <span class="title">当前金额（元）</span>
                    <span class="value">{{ AllInfo.loan.hk_this_amount.amount }}</span>
                  </p>
                  <p class="count-line">
                    <span class="title">应还金额（元）</span>
                    <span class="value">{{ AllInfo.loan.hk_all_yhamount }}</span>
                  </p>
                  <p class="count-line">
                    <span class="title">违约金（元）</span>
                    <span class="value">{{ AllInfo.loan.hk_all_wyamount }}</span>
                  </p>
                </div>
                <Card class="card-area" v-for="item in AllInfo.loan.hk_list" :key="item.id">
                  <div class="lend-info">
                    <div class="text-line">
                      <div class="msg-area">
                        <p class="tips">还款金额（元）</p>
                        <p class="value num">{{ item.hk_amount }}</p>
                      </div>
                      <div class="msg-area">
                        <p class="tips long">实际还款日：{{ item.pay_date }}</p>
                        <p class="value state">
                          <Icon type="checkmark-circled"></Icon>
                          已还款
                        </p>
                      </div>
                    </div>
                    <div class="text-line">
                      <span class="msg-area">借款金额：{{ item.jk_amount }}元</span>
                      <span class="msg-area">借款天数：{{ item.jk_day }}天</span>
                    </div>
                    <div class="text-line">
                      <span class="msg-area">应还金额：{{ item.hk_amount }}元</span>
                      <span class="msg-area">违约金：{{ item.wy_amount }}元</span>
                    </div>
                    <div class="text-line">合同还款日：{{ item.hthk_date }}</div>
                    <div class="text-line">借款日期：{{ item.jk_date }}</div>
                  </div>
                </Card>
              </TabPane>
            </Tabs>
          </div>
          <div class="opt-record" v-show="NavData.optRecord.cur">
            <Tabs>
              <TabPane label="用户记录">
                <Card class="card-area">
                  <h2 class="user-title">认证数据</h2>
                  <Table :columns="Authorize.Col"
                         :data="Authorize.Data"
                         size="large"></Table>
                </Card>
                <Card class="card-area">
                  <h2 class="user-title">审核数据</h2>
                  <Table :columns="Audit.Col"
                         :data="Audit.Data"
                         size="large"></Table>
                </Card>
              </TabPane>
              <TabPane label="催收记录">
                <Card class="card-area">
                  <h2 class="user-title">催收数据</h2>
                  <Table :columns="Urge.Col"
                         :data="Urge.Data"
                         size="large"></Table>
                </Card>
                <p v-show="Urge.status" class="urge-add">
                  <span class="label">记录：</span>
                  <Input type="textarea" v-model="Urge.content"></Input>
                </p>
                <Button v-show="!Urge.status" type="primary" @click="UrgeAddShow" size="large">添加记录</Button>
                <Button v-show="Urge.status" type="warning" @click="UrgeAddOver" size="large">保存</Button>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
      <div slot="footer" class="footer-area">
        <div class="btn-box">
          <Button type="info" v-show="!IsEdit" @click="EditInfo">修改</Button>
          <Button type="primary" style="margin-left: 0" v-show="IsEdit" @click="SubOpt">保存</Button>
          <Button type="warning" v-show="IsEdit" @click="EditCancel">取消</Button>
          <Button :type="IsPass.type" @click="PassOpt">{{ IsPass.text }}</Button>
          <Button type="warning" v-show="IsPass.status" @click="GiveLimit">授予额度</Button>
          <span v-show="IsPass.status" class="limit-input">
            额度：
            <span v-show="!Limit.status">{{Limit.value}}</span>
            <Input v-show="Limit.status" v-model="Limit.value" style="width: 120px;"></Input>
            <Button v-show="Limit.status" type="success" @click="SubmitLimit">提交额度</Button>
          </span>
        </div>
        <Page :current="CurrentPage"
              :total="TotalPage"
              :page-size="1"
              @on-change="ChangePage"
              simple></Page>
      </div>
      <Spin size="large" fix v-if="loading"></Spin>
    </Modal>
    <BigPic :modalShow="BigPic.modal"
            :InitData="BigPic.img"
            :maxWidth="800"
            @CloseModal="CloseBigPic"></BigPic>
  </div>
</template>

<script>
  import Area from '@/util/area.json'
  import BigPic from '@/components/infoModal/BigPic'

  export default {
    name: 'AuditModal',
    components:{
      BigPic
    },
    data () {
      return{
        loading: true,
        State: this.modalShow,
        ID: this.InitId,
        Unique: this.UniqueId,
        IdArr: this.AllId,
        TextArr: {
          edu:['初中','高中','大专','本科','硕士','博士','博士后']
        },
        AllAreaData: Area, //全国省市区信息集合
        AllInfo:{
          jiben:{
            idcardimg: ["",""],
            huoti: [""],
            info: {
              auditorId: '',
              collectorId: '',
              tongdun: {},
              cajl: {},
              yunyings: {},
              taobao: {},
              zhimafen: {}
            },
            renz: ''
          },
          loan:{
            jk_count: '',
            jk_this_amount: '',
            jk_all_amount: '',
            zq_count: '',
            zq_this_amount: '',
            zq_all_amount: '',
            hk_count: '',
            hk_this_amount: {
              amount: ''
            },
            hk_all_yhamount: '',
            hk_all_wyamount: ''
          }
        },
        EditData: {
          info: {
            name: '',
            phone: '',
            idcard: '',
            education: '',
            company: '',
            address_company: [],
            address_live: [],
            type: '',
            black: '',
            zmop: '',
            allow_delay: '',
            credit_limit: '',
            sex: '',
            nation: '',
            birth: '',
            address: '',
            remark: ''
          },
          lianxiren: [],
          auditor: [],
          collector:[]
        },
        ChoseCompany: [],
        DetailsCompany: '',
        ChoseLive: [],
        DetailsLive: '',
        IsEdit: false,
        IsPass: {
          type: 'success',
          status: false,
          text: '通过'
        },
        Limit: {
          status: false,
          value: ''
        },
        NavData: {
          baseInfo: {
            cur: true,
            IsRemark: false,
            remark: ''
          },
          tradeRecord:{
            cur: false
          },
          optRecord: {
            cur: false
          }
        },
        DelayBtn: {
          type: 'primary',
          name: '开通展期'
        },
        BlackBtn: {
          type: 'error',
          name: '加入黑名单'
        },
        Authorize:{
          Col: [{
            title: '类型',
            key: 'type'
          },{
            title: '状态',
            key: 'status'
          },{
            title: '生成时间',
            key: 'create_at'
          }],
          Data: []
        },
        Audit:{
          Col: [{
            title: '类型',
            key: 'type'
          },{
            title: '状态',
            key: 'status'
          },{
            title: '生成时间',
            key: 'create_at'
          }],
          Data: []
        },
        Urge:{
          status: false,
          content: '',
          Col: [{
            title: '记录',
            key: 'content'
          },{
            title: '生成时间',
            key: 'create_at'
          }],
          Data: []
        },
        BigPic: {
          modal: false,
          img: ''
        }
      }
    },
    props: {
      modalShow: Boolean,
      InitId: [String, Number],
      UniqueId: [String, Number],
      AllId: [Array,String]
    },
    watch: {
      modalShow(val){
        this.State = val;
        if(val){
          this.loading = true;
          this.InitData(this.InitId);
        }
      },
      InitId(val){
        this.ID = val;
      },
      UniqueId(val){
        this.Unique = val;
      },
      AllId(val){
        this.IdArr = val;
      },
      ChoseCompany(){
        this.AddressBack();
      },
      ChoseLive(){
        this.AddressBack();
      },
      DetailsCompany(){
        this.AddressBack();
      },
      DetailsLive(){
        this.AddressBack();
      }
    },
    computed:{
      CurrentPage(){
        let cur = 0;
        if(this.IdArr.length > 0){
          this.IdArr.forEach((val,index)=>{
            if(val === this.UniqueId) cur = index + 1;
          });
        }
        return cur;
      },
      TotalPage(){
        return this.IdArr.length;
      }
    },
    methods: {
      //提交信息操作
      UploadData(url,info){
        return new Promise((resolve)=>{
          this.$post(url,info).then((d)=>{
            if(d.status === 1){
              this.$Message.success(d.message);
              resolve(d.data);
            }else{
              this.$Message.error(d.message);
            }
          }).catch((err)=>{
            this.$Message.error('服务器繁忙，请稍后再试！');
          })
        });
      },
      ResetData(){
        this.EditData = {
          info: {
            name: '',
            phone: '',
            idcard: '',
            education: '',
            company: '',
            address_company: [],
            address_live: [],
            type: '',
            black: '',
            zmop: '',
            allow_delay: '',
            credit_limit: '',
            sex: '',
            nation: '',
            birth: '',
            address: '',
            remark: ''
          },
          rz_info: [],
          lianxiren: [],
          auditor: [],
          collector:[]
        };
        this.ChoseCompany = [];
        this.DetailsCompany = '';
        this.ChoseLive = [];
        this.DetailsLive = '';
        this.IsEdit = false;
        this.Limit.status = false;
      },
      CloseBtn(){
        this.ResetData();
        this.$emit('CloseModal',this.modalState);
      },
      InitData(id){
        this.$fetch('User/editUser',{uid: id}).then(edit=>{
          this.$fetch('User/getInfo',{uid: id}).then(info=>{
            this.EditData = edit.data;
            this.EditData.uid = this.ID;
            this.EditData.info.uid = this.ID;
            this.Limit.value = edit.data.info.credit_limit
            this.NavData.baseInfo.remark = edit.data.info.remark;

            this.AllInfo = info.data;
            this.IsPass.status = (info.data.jiben.info.auth_wechat > 0)?true:false;
            this.IsPass.type = this.IsPass.status?'ghost':'success';
            this.IsPass.text = this.IsPass.status?'已通过':'通过';
            this.StateText(this.AllInfo.loan.jk_list);
            this.StateText(this.AllInfo.loan.hk_list);
            this.Authorize.Data = this.AllInfo.operation.user.authorize;
            this.Audit.Data = this.AllInfo.operation.user.audit;
            this.Urge.Data = this.AllInfo.operation.collection.inputlist;
            this.BindHidden();
            this.loading = false;
          });
        });
      },
      ChangePage(page){
        this.loading = true;
        this.ID = this.IdArr[page - 1];
        this.InitData(this.ID);
      },
      EditInfo(){
        this.IsEdit = true;
      },
      SubOpt(){
        const allinfo = JSON.stringify(this.EditData);
        this.UploadData('User/editUserQuery',{_post: allinfo}).then(()=>{
          this.IsEdit = false;
        });
      },
      EditCancel(){
        this.IsEdit = false;
      },
      PassOpt(){
        const tips = this.IsPass.status?'确认要取消通过该用户的微信认证吗？':'确认通过该用户的微信认证吗？';
        this.$Modal.confirm({
          title: '提示',
          content: `<p class="confirm-text">${tips}</p>`,
          onOk: ()=>{
            this.UploadData('User/wechatOK',{uid: this.ID}).then(()=>{
              this.IsPass.status = !this.IsPass.status;
              this.IsPass.type = this.IsPass.status?'ghost':'success';
              this.IsPass.text = this.IsPass.status?'已通过':'通过';
            });
          }
        })
      },
      GiveLimit(){
        this.Limit.status = true;
      },
      SubmitLimit(){
        const data = {
          uid: this.ID,
          edu: this.Limit.value
        }
        this.UploadData('User/creditLimit',data).then(()=>{
          this.Limit.status = false;
        });
      },
      PickDate(time){
        this.EditData.info.birth = time;
      },
      //转换前端用地址格式
      StdArea(arr){
        if(arr[0] === arr[1]){
          return [arr[0],arr[2]];
        }else{
          return [...arr.slice(0,3)];
        }
      },
      //转换后端用
      BackArea(arr){
        let newArr = [...arr];
        if(arr.length === 2){
          newArr.unshift(arr[0]);
        }
        return newArr;
      },
      //传输所用的地址
      AddressBack(){
        this.EditData.address_company = [...this.BackArea(this.ChoseCompany), this.DetailsCompany];
        this.EditData.address_live = [...this.BackArea(this.ChoseLive), this.DetailsLive];
      },
      AddressText(arr){
        return arr.join(',');
      },
      NavChange(nav){
        Object.keys(this.NavData).forEach(val=>{
          this.NavData[val].cur = (val === nav)?true:false;
        });
      },
      BindHidden(){
        const delay = this.EditData.info.allow_delay;
        const black = this.EditData.info.black;
        this.DelayBtn.type = delay?'default':'primary';
        this.DelayBtn.name = delay?'取消展期':'开通展期';
        this.BlackBtn.type = black?'default':'error';
        this.BlackBtn.name = black?'移除黑名单':'加入黑名单';
      },
      //开通展期
      OpenDelay(){
        this.UploadData('User/allowDelay',{uid: this.ID}).then((d)=>{
          this.EditData.info.allow_delay = d.val;
          this.BindHidden();
        });
      },
      //加入黑名单
      AddBlack(){
        this.UploadData('User/black',{uid: this.ID}).then((d)=>{
          this.EditData.info.black = d.val;
          this.BindHidden();
        })
      },
      AddRemark(){
        this.NavData.baseInfo.IsRemark = true;
      },
      RemarkOver(){
        const data = {
          uid: this.ID,
          remark: this.NavData.baseInfo.remark
        };
        this.UploadData('User/remark',data).then(()=>{
          this.NavData.baseInfo.IsRemark = false;
        });
      },
      StateText(arr){
        arr.forEach(val=>{
          if(val.pay_date === null){
            val.pay_state = 0;
            val.pay_date = '无';
          }else{
            val.pay_state = 1;
          }
        })
      },
      //淘宝报价
      ReportTaobao(){
        this.$fetch('Chart/chartTaobao',{phone: this.EditData.info.phone}).then((d)=>{
          console.log(d);
        })
      },
      //查看大图
      CheckBigPic(img){
        this.BigPic.img = img;
        this.BigPic.modal = true;
      },
      CloseBigPic(){
        this.BigPic.modal = false;
      },
      UrgeAddShow(){
        this.Urge.status = true;
      },
      UrgeAddOver(){
        const data = {
          uid: this.ID,
          content: this.Urge.content
        };
        this.UploadData('User/addCollection',data).then((d)=>{
          this.Urge.status = false;
          this.Urge.Data.push({
            content: this.Urge.content,
            create_at: d.date
          });
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #towardsLeft{
    display: flex;
    flex-direction: row;
  }
  .head-area{
    color: #333;
  }
  .big-head{
    font-size: 26px;
  }
  .close-icon{
    margin-top: 5px;
    font-size: 26px;
    color: #333;
  }
  .content{
    font-size: 14px;
    height: 550px;
    overflow: hidden;
    background-color: #add8f7;
  }
  .footer-area{
    #towardsLeft;
    justify-content: space-between;
  }
  .left-box{
    max-height: 550px;
    overflow: auto;
    background: #FFF;
  }
  .head-info{
    #towardsLeft;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    .avator{
      width: 60px;
      height: 60px;
      margin: 10px 16px;
      img{
        width: 100%;
        border-radius: 50%;
      }
    }
    .third-party{
      width: 620px;
      #towardsLeft;
      justify-content: space-between;
      .res-box{
        width: 120px;
        text-align: center;
        .simple{
          width: 100%;
          padding: 8px 3px;
          margin-bottom: 5px;
          white-space: nowrap;
          color: #fff;
          border-radius: 5px;
          background-color: #919191;
          &.type1{
            background-color: #00a854;
          }
          &.type2{
            background-color: #d73435;
          }
        }
        .title{
          width: 100%;
          padding: 8px 3px;
          color: #333;
          border-radius: 5px;
          background-color: #7EC2F3;
          &.active{
            cursor: pointer;
            position: relative;
            &:after{
              content: '';
              position: absolute;
              transform: translateX(-50%);
              transform-origin: 0 center;
              top: -4px;
              right: -8px;
              height: 12px;
              width: 12px;
              border-radius: 100%;
              background: #ed3f14;
              z-index: 2;
              box-shadow: 0 0 0 1px #fff;
            }
          }
        }
      }
    }
  }
  .info-area{
    padding: 0 30px;
    border-right: 1px solid #eee;
    .single-line{
      padding-top: 10px;
      border-bottom: 1px solid #eee;
      .label{
        font-size: 18px;
        line-height: 25px;
      }
      .value{
        font-size: 12px;
        min-height: 45px;
        line-height: 45px;
        &.long{
          padding: 5px 0;
        }
      }
      .idcard-box{
        width: 100%;
        padding: 10px 0;
        img{
          max-width: 40%;
          margin-right: 10%;
        }
      }
    }
  }
  .record-box{
    max-height: 550px;
    overflow: auto;
  }
  .nav-box{
    width: 100%;
    background: #fff;
    padding: 15px 10px;
    font-size: 16px;
    #towardsLeft;
    justify-content: space-between;
    .nav-block{
      width: 100px;
      padding: 15px 0;
      text-align: center;
      background: #bfbfbf;
      color: #FFF;
      border-radius: 5px;
      &.cur{
        background: #00a2ae;
      }
    }
  }
  .info-box{
    width: 100%;
    padding-bottom: 5px;
    font-size: 14px;
    line-height: 25px;
    #towardsLeft;
    span{
      display: inline-block;
    }
    .half{
      width: 50%;
    }
    .label{
      width: 50px;
    }
    .value{
      width: 280px;
    }
  }
  .limit-input{
    padding-left: 10px;
  }
  .base-info{
    position: relative;
    padding: 5px 15px;
  }
  .trade-record,.opt-record{
    padding: 5px 10px 15px;
  }
  .urge-add{
    padding-bottom: 10px;
  }
  .count-box{
    border: 1px solid #666;
    border-radius: 5px;
    margin-bottom: 10px;
    background: #FFF;
    .count-line{
      border-top: 1px solid #666;
      padding: 5px 0;
      #towardsLeft;
      .title,.value{
        width: 50%;
        text-align: center;
        display: inline-block;
      }
      .value{
        color: #f77249;
        font-size: 16px;
      }
      &:nth-child(1){
        border: none;
      }
    }
  }
  .card-area{
    margin-bottom: 15px;
    overflow: auto;
    .user-title{
      padding-bottom: 10px;
    }
  }
  .lend-info{
    position: relative;
    .yq_state{
      position: absolute;
      right: -8px;
      top: -10px;
      font-size: 20px;
      color: #F00;
    }
    .text-line{
      width: 100%;
      padding-top: 15px;
      display: flex;
      flex-direction: row;
      .msg-area{
        display: inline-block;
        width: 50%;
        font-size: 14px;
        &.remark{
          width: 100%;
          padding-bottom: 20px;
        }
        .value{
          color: #f74c17;
          font-size: 16px;
          &.num{
            font-size: 22px;
          }
          &.state{
            color: #19be6b;
            padding-top: 5px;
            &.nopay{
              color: #f74c17;
            }
          }
        }
      }
    }
  }
</style>
