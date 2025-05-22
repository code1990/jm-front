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
          <el-submenu index="9"   v-if="checked4">
            <template slot="title">
              <div style="font-weight: bold;font-size: 18px;">
                <i class="el-icon-location"></i>
                <span>视频总览</span>
              </div>
            </template>
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              @node-click="handleNodeClick"
              @check-change="checkNodeChange"
              :default-expanded-keys="[0, 10]"
              :default-checked-keys="checkArray"
              :props="defaultProps" style="margin-left: 5%;"></el-tree>
<!--            <el-menu-item index="9-1">-->
<!--              <div style="margin-left: 30px;font-size: 16px;">闸门视频</div>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="9-2">-->
<!--              <div style="margin-left: 30px;font-size: 16px;">泵站视频</div>-->
<!--            </el-menu-item>-->
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
import { getCameraTree } from '@/api/history/alarm'

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
        checked10:true,
        checked11:true,
        opened:[],
        checkArray:[1],
        stationList:[{name:'马梪站'}],
        gateList:[{name:'马梪站'}],
        treeData: [ {
          id: 0,
          label: '泵站视频',
          children: [{
            id: 1,
            label: '内江视频1'
          }, {
            id: 2,
            label: '外江视频2'
          }, {
            id: 3,
            label: '室内视频'
          }]
        }, {
          id: 10,
          label: '闸门视频',
          children: [{
            id: 4,
            label: '内江视频1'
          }, {
            id: 5,
            label: '外江视频2'
          }, {
            id: 6,
            label: '室内视频'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
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
      getCameraTree().then(response =>{
        //console.error(response.data);
        this.treeData=response.data;
      });
    },
    methods: {
      checkNodeChange(node,data,value){
        let val = node.id;
        if (data){
          val = "1_"+val;
        }else{
          val = "0_"+val;
        }
        this.sendMsgToParent(val);
        // console.error(node)
        // console.error(data)
        // console.error(value)
      },
      handleNodeClick(node,data,value){
        // let val = node.id;
        // if (data){
        //   val = "1_"+data.id;
        // }else{
        //   val = "0_"+data.id;
        // }
        // if (!data.checked){
        //   this.checkArray.push(data.id);
        // }
        // console.error(this.checkArray)
        // console.log(value)
        // console.error(node)
        // console.error(node)
        // console.error(data.checked)
        // this.sendMsgToParent(val);
      },
        handleOpen(key, keyPath) {
          console.error(key, keyPath);
          this.$emit('child-msg', key)
        },
        handleClose(key, keyPath) {
          console.error(key, keyPath);
        },
        sendMsgToParent(val) { //1.子组件通过子定义事件child-msg的方式将msg传给父组件
          this.$emit('child-msg', val)
        },

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
</style>
