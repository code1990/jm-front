<template>
  <div style="width: 100%;height: 100%;background-color: white;float: left;">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="index"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#fff"
          text-color="#337FD0"
          :default-openeds="opened"
          active-text-color="#298AED">
          <el-menu-item index="5" style="width: 100%;" v-if="checked1">
            <router-link to="/index">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-s-home" ></i>
                <span slot="title">首页</span>
              </div>
            </router-link>
          </el-menu-item>
          <el-submenu index="2"    v-if="checked2">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-s-order"></i>
                <span>泵站管理</span>
              </div>
            </template>
            <el-menu-item index="3-1" v-for="(item,index) in stationList" :key="index">
              <router-link :to="'/station/'+item.id">
                <div style="margin-left: 30px;font-size: 16px;">{{ item.name }}</div>
              </router-link>
            </el-menu-item>
<!--            <el-menu-item index="2-1">  <div style="margin-left: 30px;font-size: 16px;">  选项1 </div> </el-menu-item>-->
<!--            <el-menu-item index="2-2">  <div style="margin-left: 30px;font-size: 16px;">  选项1 </div>  </el-menu-item>-->
<!--            <el-menu-item index="2-3">  <div style="margin-left: 30px;font-size: 16px;">  选项1 </div> </el-menu-item>-->
          </el-submenu>
          <el-submenu index="3"    v-if="checked3">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-s-help"></i>
                <span>拦河闸管理</span>
              </div>
            </template>
            <el-menu-item index="3-1" v-for="(item,index) in gateList" :key="index">
              <router-link :to="'/gate/'+item.id">
                <div style="margin-left: 30px;font-size: 16px;">{{ item.name }}</div>
              </router-link>
            </el-menu-item>
<!--            <el-menu-item index="3-2"><div style="margin-left: 30px;font-size: 16px;">选项1</div></el-menu-item>-->
<!--            <el-menu-item index="3-3"><div style="margin-left: 30px;font-size: 16px;">选项1</div></el-menu-item>-->
          </el-submenu>
          <el-submenu index="4"   v-if="checked4">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-location"></i>
                <span>雨情遥测</span>
              </div>
            </template>
            <el-menu-item index="4-1"><router-link to="/rainMap"><div style="margin-left: 30px;font-size: 16px;">降雨量监测</div></router-link></el-menu-item>
            <el-menu-item index="4-2"><router-link to="/rainDay"><div style="margin-left: 30px;font-size: 16px;">雨情日报表</div></router-link></el-menu-item>
            <el-menu-item index="4-3"><router-link to="/rainMonth"><div style="margin-left: 30px;font-size: 16px;">雨情月报表</div></router-link></el-menu-item>
            <el-menu-item index="4-3"><router-link to="/rainYear"><div style="margin-left: 30px;font-size: 16px;">雨情年报表</div></router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="5"  v-if="checked5">
            <router-link to="/point">
            <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
              <i class="el-icon-help"></i>
              <span slot="title">水文信息</span>
            </div>
            </router-link>
          </el-menu-item>
          <el-menu-item index="6"  v-if="checked6">
            <router-link to="/video">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-video-camera"></i>
                <span slot="title">视频总览</span>
              </div>
            </router-link>
          </el-menu-item>

          <el-submenu index="7"  v-if="checked7">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-s-help"></i>
                <span>运行记录</span>
              </div>
            </template>
            <el-menu-item index="7-1"><router-link to="/water1"><div style="margin-left: 30px;font-size: 16px;">电排站运行记录</div></router-link></el-menu-item>
            <el-menu-item index="7-2"><router-link to="/water2"><div style="margin-left: 30px;font-size: 16px;">工作闸运行记录</div></router-link></el-menu-item>
            <el-menu-item index="7-3"><router-link to="/alarm"><div style="margin-left: 30px;font-size: 16px;">故障预警</div></router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="10"  v-if="checked7">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-s-help"></i>
                <span>运维功能</span>
              </div>
            </template>
            <el-menu-item index="10-1"><router-link to="/assign"><div style="margin-left: 30px;font-size: 16px;">任务分配</div></router-link></el-menu-item>
            <el-menu-item index="10-2"><router-link to="/repair"><div style="margin-left: 30px;font-size: 16px;">任务维修</div></router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="8" v-if="checked8">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-user-solid"></i>
                <span>权限管理</span>
              </div>
            </template>
            <el-menu-item index="8-1"><router-link to="/role"><div style="margin-left: 30px;font-size: 16px;">角色管理</div></router-link></el-menu-item>
            <el-menu-item index="8-2"><router-link to="/user"><div style="margin-left: 30px;font-size: 16px;">用户管理</div></router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="9"  v-if="checked9">
            <router-link to="/operation">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-setting"></i>
                <span slot="title">操作日志</span>
              </div>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem2 from "./SidebarItem2";
import variables from "@/assets/styles/variables.scss";
import { getUserInfo} from "@/api/system/user";
import {queryStation } from "@/api/station/station";
import { queryGate} from "@/api/gate/gate";

export default {
    name:'SideBar2',
    components: { SidebarItem2, Logo },
    props:{
      active:{
        type:String,
        default: '1'
      }
    },
    data(){
      return{
        color:'#5090D1',
        index:'1',
        checked1:true,
        checked2:true,
        checked3:true,
        checked4:true,
        checked5:true,
        checked6:true,
        checked7:true,
        checked8:true,
        checked9:true,
        opened:[],
        stationList:[{name:'西村站'},{name:'马梪站'}],
        gateList:[{name:'西村站'},{name:'马梪站'}],
      }
    },
    created() {
        getUserInfo().then(response => {
          if (response.rows.length !== 9){
            let checkId = response.rows.toString();
            this.setMenu(checkId);
          }
        });
        //泵站
        queryStation().then(response => {
          this.stationList=response.data;
        });
        //闸门
        queryGate().then(response => {
          this.gateList=response.data;
        });

    },
    mounted() {
      this.index=this.$props.active
      this.opened=[this.$props.active]
      console.log(this.$props.active)
    },
    methods: {
        handleOpen(key, keyPath) {
          console.error(key, keyPath);
          this.$emit('child-msg', key)
        },
        handleClose(key, keyPath) {
          console.error(key, keyPath);
        },
        sendMsgToParent() { //1.子组件通过子定义事件child-msg的方式将msg传给父组件
          this.$emit('child-msg', this.msg)
        },
        setMenu(checkId){
          for(let i=1;i<10;i++){
            if (checkId.indexOf(i+"")===-1){
              if (i === 1){
                this.checked1 = false;
              }
              if (i === 2){
                this.checked2 = false;
              }
              if (i === 3){
                this.checked3 = false;
              }
              if (i === 4){
                this.checked4 = false;
              }
              if (i === 5){
                this.checked5 = false;
              }
              if (i === 6){
                this.checked6 = false;
              }
              if (i === 7){
                this.checked7 = false;
              }
              if (i === 8){
                this.checked8 = false;
              }
              if (i === 9){
                this.checked9 = false;
              }
            }
          }
        }
      },
      computed: {
          ...mapState(["settings"]),
          ...mapGetters(["sidebarRouters", "sidebar"]),
          activeMenu() {
              const route = this.$route;
              const { meta, path } = route;
              // if set path, the sidebar will highlight the path you set
              if (meta.activeMenu) {
                  return meta.activeMenu;
              }
              return path;
          },
          showLogo() {
              return false;
          },
          variables() {
              return variables;
          },
          isCollapse() {
              return !this.sidebar.opened;
          }
      }
};
</script>
<style scoped lang="scss">
//.theme-picker{
//  background-color: white;
//  color: black;
//}
//::v-deep .el-scrollbar__wrap {
//  overflow-x: hidden;
//}
//::v-deep .el-menu-item:hover {
//  color: red;
//}
//::v-deep .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
//  background:transparent !important;
//  color: #fff;
//  border-bottom: 1px solid #fff !important;
//}
//设置鼠标悬停时el-submenu的样式
::v-deep.el-submenu .el-submenu__title:hover{
  //border-left: #33A2EF solid 6px !important;
  background-color: #207EDE !important;
  color: white !important;
  i {
    color: white;
  }
}

::v-deep .el-menu-item:hover{
  background-color: #207EDE !important;
  color: white !important;
  i {
    color: white !important;
  }
}
a:hover{
  color: white !important;
}
.el-icon-my-export{
  background: url('~@/assets/m1.png') center no-repeat;
  /* background-size: cover;*/
}
.el-icon-my-export:before{
  content: "替";
  font-size: 16px;
  visibility: hidden;
}


.el-icon-my-export{
  font-size: 16px;
}
.el-icon-my-export:before{
  content: "\e611";
}
</style>
