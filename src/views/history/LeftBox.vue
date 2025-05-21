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
          <el-submenu index="7"  v-if="checked7">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-s-help"></i>
                <span>运行记录</span>
              </div>
            </template>
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              @node-click="handleNodeClick"
              @check-change="checkNodeChange"
              :default-expanded-keys="[0, 10]"
              :default-checked-keys="[1]"
              :props="defaultProps" style="margin-left: 20%;"></el-tree>
<!--            <el-menu-item index="7-1"><router-link to="/water1"><div style="margin-left: 30px;font-size: 16px;">电排站运行记录</div></router-link></el-menu-item>-->
<!--            <el-menu-item index="7-2"><router-link to="/water2"><div style="margin-left: 30px;font-size: 16px;">自排闸运行记录</div></router-link></el-menu-item>-->
            <el-menu-item index="7-3"><router-link to="/alarm"><div style="margin-left: 30px;font-size: 16px;">故障预警</div></router-link></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
        opened:[],
        stationList:[{name:'西村站'},{name:'马梪站'}],
        gateList:[{name:'西村站'},{name:'马梪站'}],
        treeData: [ {
          id: 0,
          label: '泵站运行记录',
          children: [
            {
              id: 1,
              label: '水泵机1'
            },
            {
              id: 2,
              label: '水泵机2'
            },
            {
              id: 3,
              label: '水泵机3'
            },
            {
              id: 4,
              label: '水泵机4'
            },
            {
              id: 5,
              label: '清污机1'
            },
            {
              id: 6,
              label: '清污机2'
            },
            {
              id: 7,
              label: '清污机3'
            },
            {
              id: 8,
              label: '清污机4'
            },
            {
              id: 9,
              label: '皮带机1'
            },
            {
              id: 10,
              label: '皮带机2'
            },
          ]
        }, {
          id: 11,
          label: '闸门运行记录',
          children: [{
            id: 12,
            label: '1号自排闸'
          }, {
            id: 13,
            label: '2号自排闸'
          }, {
            id: 14,
            label: '3号自排闸'
          }, {
            id: 15,
            label: '4号自排闸'
          }, {
            id: 16,
            label: '左岸自排闸'
          }, {
            id: 17,
            label: '右岸自排闸'
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
    },
    methods: {
      checkNodeChange(node,data,value){
        let id = node.id;
        console.log(id)
        if (data){
          if (id>10){
            this.$router.push("/water2")
          }else{
            this.$router.push("/water1")
          }
          this.sendMsgToParent(id);
        }
        // console.log(data)
        // console.log(node)
        // console.log(value)
        // if (data)
      },
      handleNodeClick(node,data,value){
        // console.error(node)
        // console.error(data)
        // console.error(value)
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
        // setMenu(checkId){
        //   for(let i=1;i<10;i++){
        //     if (checkId.indexOf(i+"")===-1){
        //       if (i === 1){
        //         this.checked1 = false;
        //       }
        //       if (i === 2){
        //         this.checked2 = false;
        //       }
        //       if (i === 3){
        //         this.checked3 = false;
        //       }
        //       if (i === 4){
        //         this.checked4 = false;
        //       }
        //       if (i === 5){
        //         this.checked5 = false;
        //       }
        //       if (i === 6){
        //         this.checked6 = false;
        //       }
        //       if (i === 7){
        //         this.checked7 = false;
        //       }
        //       if (i === 8){
        //         this.checked8 = false;
        //       }
        //       if (i === 9){
        //         this.checked9 = false;
        //       }
        //     }
        //   }
        // }
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
