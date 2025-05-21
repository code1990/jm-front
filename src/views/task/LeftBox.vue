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
          <el-submenu index="10"  v-if="checked7">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-s-help"></i>
                <span>运维功能</span>
              </div>
            </template>
            <el-menu-item index="10-1"><router-link to="/assign"><div style="margin-left: 30px;font-size: 16px;">任务分配</div></router-link></el-menu-item>
            <el-menu-item index="10-2"><router-link to="/repair"><div style="margin-left: 30px;font-size: 16px;">任务维修</div></router-link></el-menu-item>
            <el-menu-item index="10-3"><router-link to="/operation"><div style="margin-left: 30px;font-size: 16px;">值班登记</div></router-link></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import variables from "@/assets/styles/variables.scss";
import { getUserInfo} from "@/api/system/user";
import {queryStation } from "@/api/station/station";
import { queryGate} from "@/api/gate/gate";

export default {
    name:'SideBar2',
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
        opened:['10'],
        stationList:[{name:'西村站'},{name:'马梪站'}],
        gateList:[{name:'西村站'},{name:'马梪站'}],
      }
    },
    created() {
        // getUserInfo().then(response => {
        //   if (response.rows.length !== 9){
        //     let checkId = response.rows.toString();
        //     this.setMenu(checkId);
        //   }
        // });
        // //泵站
        // queryStation().then(response => {
        //   this.stationList=response.data;
        // });
        // //闸门
        // queryGate().then(response => {
        //   this.gateList=response.data;
        // });

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
.router-link-active {
  color: #56C911;
  //background: rgba(255, 255, 255, 0.8);
}
</style>
