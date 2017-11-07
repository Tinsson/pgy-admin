<template>
  <div id="listRole">
    <h1 class="list-title">{{ title }}</h1>
    <div class="operate-box">
      <Button type="primary" icon="plus" size="large" @click="AddShow">添加账号</Button>
      <Button type="warning" icon="ios-reload" size="large" @click="RefreshList">刷新列表</Button>
    </div>
    <div class="data-area">
      <Table :columns="UserCol"
             size="large"
             :data="UserData"
             :loading="loading"></Table>
    </div>
    <Modal
      v-model="AddModal"
      title="添加账号"
      @on-ok="AddOver">
      <Form :model="AddInfo" label-position="right" :label-width="60">
        <FormItem label="账号名">
          <Input v-model="AddInfo.name"></Input>
        </FormItem>
        <FormItem label="昵称">
          <Input v-model="AddInfo.nickname"></Input>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="AddInfo.password"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="AddInfo.phone"></Input>
        </FormItem>
        <FormItem label="微信号">
          <Input v-model="AddInfo.wechat"></Input>
        </FormItem>
        <FormItem label="状态">
          <RadioGroup v-model="AddInfo.is_status">
            <Radio label="已启用"></Radio>
            <Radio label="已禁用"></Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="EditModal"
      title="编辑账号"
      @on-ok="EditOver">
      <Form :model="EditInfo" label-position="right" :label-width="60">
        <FormItem label="账号编号">
          <Input v-model="EditInfo.id" disabled></Input>
        </FormItem>
        <FormItem label="账号名">
          <Input v-model="EditInfo.name"></Input>
        </FormItem>
        <FormItem label="昵称">
          <Input v-model="EditInfo.nickname"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="EditInfo.phone"></Input>
        </FormItem>
        <FormItem label="微信号">
          <Input v-model="EditInfo.wechat"></Input>
        </FormItem>
        <FormItem label="状态">
          <RadioGroup v-model="EditInfo.is_status">
            <Radio label="已启用"></Radio>
            <Radio label="已禁用"></Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <RadioModal
      title="分配部门"
      :modalShow="AssignDepModal"
      :RdoInfo="DeparList"
      :InitDep="InitDep"
      label1="账号编号"
      label2="选择部门"
      @UpOver="Updepart"
      @CloseModal="CloseDep"></RadioModal>
    <CheckboxModal
      title="分配角色"
      :modalShow="AssignRoleModal"
      :CheckInfo="RoleList"
      :InitData="InitRole"
      label1="账号编号"
      label2="选择角色"
      @UpOver="UpRole"
      @CloseModal="CloseRole"></CheckboxModal>
    <CheckboxModal
      title="可视部门"
      :modalShow="SeeDepModal"
      :CheckInfo="SeeDepList"
      :InitData="InitSeeDep"
      label1="账号编号"
      label2="选择部门"
      @UpOver="UpSeeDep"
      @CloseModal="CloseSeeDep"></CheckboxModal>
  </div>
</template>

<script>
  import { getLocal } from '@/util/util'
  import RadioModal from '@/components/listUser/RadioModal'
  import CheckboxModal from '@/components/listUser/CheckboxModal'

  export default {
    name: 'listRole',
    components: {
      RadioModal,
      CheckboxModal
    },
    data () {
      return {
        title: '账号管理',
        DeparList: [],
        RoleList: [],
        SeeDepList: [],
        AssignDepModal: false,
        InitDep: {
          id: '',
          depar_id: ''
        },
        AssignRoleModal: false,
        InitRole:{
          id: '',
          check_id: []
        },
        SeeDepModal: false,
        InitSeeDep:{
            id: '',
            check_id: []
        },
        loading: true,
        //表格数据
        UserCol: [
          {
            title: '账号编号',
            key: 'id'
          },{
            title: '账号名称',
            key: 'admin_name'
          },{
            title: '昵称',
            key: 'nickname'
          },{
            title: '手机号',
            key: 'phone'
          },{
            title: '部门编号',
            key: 'depar_id'
          },{
            title: '微信号',
            key: 'wechat'
          },{
            title: '状态',
            key: 'is_status'
          },{
            title: '最近一次登录时间',
            key: 'recent_logintime'
          },{
            title: '分配角色编号',
            key: 'role'
          },{
            title: '可视部门编号',
            key: 'depar'
          },{
            title: '操作',
            key: 'operation',
            align: 'center',
            width: '280',
            render: (h, params)=>{
              let BtnArr = [];
              if(this.BtnData.length < 4){
                BtnArr = this.RenderBtn(h, params, this.BtnData);
              }else{
                BtnArr = this.RenderBtn(h, params, this.BtnData.slice(0,2));
                let moreBtn = [];
                this.BtnData.slice(2).forEach((val)=>{
                  const btn = h('DropdownItem',[h('Button',{
                    props: {
                      type: val.color
                    },
                    on: {
                      click: ()=>{
                        this[val.class](params.row)
                      }
                    }
                  },val.name)]);
                  moreBtn.push(btn);
                });
                BtnArr.push(h('Dropdown',{
                  attrs:{
                    trigger: 'click'
                  }
                },[
                  h('Button',{
                    props: {
                      type: 'info'
                    }
                  },[
                    '更多 ',
                    h('Icon',{
                      props: {
                        type: 'arrow-down-b'
                      }
                    })
                  ]),
                  h('DropdownMenu',{
                    slot: 'list'
                  }, moreBtn)
                ]));
              }
              return h('div',BtnArr);
            }
          }
        ],
        UserData: [],     //表格数据
        RowUserData: [],  //获取的原始数据
        BtnData: [],      //按钮数据
        EditModal: false,
        //编辑数据
        EditInfo:{
          id: '',
          name: '',
          nickname: '',
          phone: '',
          wechat: '',
          is_status: ''
        },
        AddModal: false,
        //添加数据
        AddInfo: {
          name: '',
          nickname: '',
          password: '',
          phone: '',
          wechat: '',
          is_status: ''
        }
      }
    },
    created(){
      this.InitData();
    },
    methods: {
      //循环渲染按钮
      RenderBtn(h,params,bdata){
        let res = [];
        bdata.forEach((val)=>{
          const btn = h('Button',{
            props: {
              type: val.color
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: ()=>{
                this[val.class](params.row)
              }
            },
          },val.name);
          res.push(btn);
        });
        return res;
      },
      //初始化数据
      InitData(callback = ()=>{}){
        const that = this;
        const auth_id = getLocal('auth_id');
        this.loading = true;
        //列表数据获取
        this.$post('Auth/adminUserList').then((d)=>{
          let info = d.data;
          const auth_id = getLocal('auth_id');
          that.RowUserData = info;
          info.forEach((infoObj)=>{
            infoObj.is_status = infoObj.is_status?'已启用':'已禁用';
          });
          that.UserData = info;
          that.loading = false;
          callback();
        });
        //部门数据获取
        this.$post('Auth/deparList').then((d)=>{
          that.DeparList = d.data;
          that.SeeDepList = [];
          d.data.forEach((val,index)=>{
            let data = {
                id: val.id,
                role_name: val.title
            };
            that.SeeDepList.push(data);
          })
        });
        //角色数据获取
        this.$post('Auth/roleList').then((d)=>{
            that.RoleList = d.data;
        });
        //获取按钮信息
        this.$fetch('Menuauth/listAuthGet',{auth_id}).then((d)=>{
          this.BtnData = d.data.operation;
        })
      },
      //刷新列表
      RefreshList(){
        this.InitData(()=>{
          this.$Message.success('刷新成功');
        });
      },
      //提交信息操作
      UploadData(url,info){

        if(info.is_status) info.is_status = info.is_status === '已启用'?1:0;
        this.$post(url,info).then((d)=>{
          if(d.status === 1){
            this.$Message.success(d.message);
            this.InitData();
          }else{
            this.$Message.error(d.message);
          }
        }).catch((err)=>{
          this.$Message.error('服务器繁忙，请稍后再试！');
        })
      },
      //添加角色
      AddShow(){
        for(let key in this.AddInfo){
            this.AddInfo[key] = '';
        }
        this.AddModal = true;
      },
      //提交添加
      AddOver(){
        this.UploadData('Auth/adminUserAdd',this.AddInfo);
      },
      //编辑操作
      EditOpt(row){
        this.EditModal = true;
        for(let key in this.EditInfo){
          if(key === 'name'){
            this.EditInfo['name'] = row['admin_name'];
          }else{
            this.EditInfo[key] = row[key]
          }
        }
      },
      //提交编辑
      EditOver(){
        this.UploadData('Auth/adminUserUpdate',this.EditInfo);
      },
      //启用禁用
      ChangeStatus(id){
        this.UploadData('Auth/adminUserStatus',{admin_id: id});
      },
      //分配部门
      AssignDep(row){
        this.InitDep.id = row.id;
        this.InitDep.depar_id = row.depar_id;
        this.AssignDepModal = true;
      },
      CloseDep(){
        this.AssignDepModal = false;
      },
      Updepart(info){
        this.AssignDepModal = false;
        let data = {
            admin_id: info.id,
            depar_id: info.depar_id
        };
        this.UploadData('Auth/deparAdminUser',data);
      },
      //分配角色
      AssignRole(row){
        this.InitRole.id = row.id;
        if(row.role !== ''){
          this.InitRole.check_id = row.role.toString().split(',').map((val)=>{
              return parseInt(val);
          });
        }else{
          this.InitRole.check_id = [];
        }
        console.log(this.InitRole.check_id);
        this.AssignRoleModal = true;
      },
      CloseRole(){
        this.AssignRoleModal = false;
      },
      UpRole(info){
        this.AssignRoleModal = false;
        let data = {
          admin_id: info.id,
          role_id: info.check_id.join(',')
        };
        this.UploadData('Auth/roleAllotment',data);
      },
      //可视部门
      SeeDep(row){
        this.InitSeeDep.id = row.id;
        if(row.depar !== ''){
          this.InitSeeDep.check_id = row.depar.toString().split(',').map((val)=>{
            return parseInt(val);
          });
        }else{
          this.InitSeeDep.check_id = [];
        }
        this.SeeDepModal = true;
      },
      CloseSeeDep(){
        this.SeeDepModal = false;
      },
      UpSeeDep(info){
        this.SeeDepModal = false;
        let data = {
          admin_id: info.id,
          depar_id: info.check_id.join(',')
        };
        this.UploadData('Auth/dataScope',data);
      }
    }
  }
</script>


<style lang="less" scoped>
  .list-title{
    font-weight: normal;
  }
  .operate-box{
    padding: 10px 0 20px;
  }

</style>
