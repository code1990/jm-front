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
          <el-submenu index="3"    v-if="checked3">
            <template slot="title">
              <div style="margin-left: 20px;font-weight: bold;font-size: 18px;">
                <i class="el-icon-s-help"></i>
                <span>拦河闸管理</span>
              </div>
            </template>
            <el-menu-item index="3-1" v-for="(item,index) in gateList" :key="index">
                <div style="margin-left: 30px;font-size: 16px;" @click="sendMsgToParent(index)" :class="{'active':val === index}">{{ item.name }}</div>
            </el-menu-item>
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
import { queryStation, getDict, queryLast } from '@/api/station/station'
import { queryGate} from "@/api/gate/gate";

export default {
    name:'LeftBox',
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
        val:0,
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
        urlList:[],
        gateList:[
          {"name":"1号自排闸","value":"2d6d051613bb4762ac822b05f1a1337b"},
          {"name":"2号自排闸","value":"893f70b39c2541d89f06edad12bcc863"},
          {"name":"3号自排闸","value":"afb35f6927964c81a6751b863ae1998b"},
          {"name":"4号自排闸","value":"14749b2c6ca74f56b29a507495ae68a3"},
          {"name":"5号自排闸","value":"14749b2c6ca74f56b29a507495ae68a4"},
          {"name":"6号自排闸","value":"14749b2c6ca74f56b29a507495ae68a5"},
          {"name":"7号自排闸","value":"14749b2c6ca74f56b29a507495ae68a6"},
          {"name":"8号自排闸","value":"14749b2c6ca74f56b29a507495ae68a7"},
          {"name":"1号防洪闸","value":"c5fcabe7e9104e14af6975fd8d8c2625"},
          {"name":"2号防洪闸","value":"c5fcabe7e9104e14af6975fd8d8c2626"},
          {"name":"3号防洪闸","value":"c5fcabe7e9104e14af6975fd8d8c2627"},
          {"name":"4号防洪闸","value":"c5fcabe7e9104e14af6975fd8d8c2628"},
          {"name":"左岸自排闸","value":"1cdc8b7fb90b488099f2dca53dd1b268"},
          {"name":"右岸自排闸","value":"c5fcabe7e9104e14af6975fd8d8c2624"},
        ],
      }
    },
    mounted() {
      this.index=this.$props.active
      this.opened=[this.$props.active]
      //console.error(this.$props.active)
    },
    methods: {
        sendMsgToParent(val) { //1.子组件通过子定义事件child-msg的方式将msg传给父组件
          this.val =val;
          this.$emit('child-msg', val);
        },
        swapInfo(item){
          console.log(item.value)
        },
        handleOpen(key, keyPath) {
          console.error(key, keyPath);
          this.$emit('child-msg', key)
        },
        handleClose(key, keyPath) {
          console.error(key, keyPath);
        },

      },
};
</script>
<style scoped lang="scss">

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
.active {
  color: #56C911;
  //background: #E5ECF5;
}
</style>
