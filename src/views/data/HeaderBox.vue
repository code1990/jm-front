<template>
  <div class="headerBox">
    <div class="titleBox">
      <div class="titleInfo">{{ title }}</div>
    </div>
    <div class="menu">
      <div class="menuBox" v-if="checked1">
        <router-link to="/index">
          <div class="tipBox" >首页</div>
        </router-link>
      </div>
      <div class="menuBox" v-if="checked0" style="margin-left: -2.2%">
        <router-link to="/data">
          <div class="tipBox" >数据大屏</div>
        </router-link>
      </div>
      <div class="menuBox" v-if="checked2"  style="margin-left: 1%">
        <router-link :to="{path:'/station/'+siteId}">
          <div class="tipBox" style="margin-left: -30%">泵站管理</div>
        </router-link>
      </div>
      <div class="menuBox" v-if="checked3"   style="margin-left: 1.6%">
        <router-link :to="{path:'/gate/'+gateId}">
          <div class="tipBox" style="margin-left: -34%">拦河闸管理</div>
        </router-link>
      </div>
      <div class="menuBox" v-if="checked4" style="margin-left: 1%">
        <router-link to="/rainMap">
          <div class="tipBox" style="margin-left: -30%">水雨情</div>
        </router-link>
      </div>
<!--      <div class="menuBox" v-if="checked5">-->
<!--        <router-link to="/point">-->
<!--          <div class="tipBox" style="margin-left: -30%">水文信息</div>-->
<!--        </router-link>-->
<!--      </div>-->
      <div class="menuBox" v-if="checked6">
        <router-link to="/video">
          <div class="tipBox" style="margin-left: -28%">视频总览</div>
        </router-link>
      </div>
      <div class="menuBox" v-if="checked7">
        <router-link to="/water1">
          <div class="tipBox" style="margin-left: -28%">运行记录</div>
        </router-link>
      </div>
      <div class="menuBox" v-if="checked10">
        <router-link to="/assign">
          <div class="tipBox" style="margin-left: -28%">运维功能</div>
        </router-link>
      </div>
      <div class="menuBox" v-if="checked8">
        <router-link to="/role">
          <div class="tipBox" style="margin-left: -28%">权限管理</div>
        </router-link>
      </div>
      <div class="menuBox" v-if="checked9" style="width: 8%;">
        <router-link to="/operation">
          <div class="tipBox" style="margin-left: -28%">操作日志</div>
        </router-link>
      </div>
    </div>
    <div class="tipRight">
      <div class="timeBox" >
        <div style="margin-top: 3%;color: white;font-size: 12px;margin-left: 1%;float: left;">{{ dayInfo }}</div>
        <div style="margin-top: 3%;color: white;font-size: 12px;margin-left: 1%;float: left;">{{ timeInfo }}</div>
        <div style="margin-top: 3%;color: white;font-size: 11px;margin-left: 1%;float: left;">{{weekInfo}}</div>
        <!--        <el-button type="default" size="mini"-->
        <!--                   class="backBtn" v-if="timeInfo && name" @click="goBack()"-->
        <!--        >返回-->
        <!--        </el-button>-->
      </div>
      <div class="infoBox" >
        <div style="margin-top: 3%;color: white;">

          <div style="float: left;width: 16px;height: 16px;border-radius: 8px;cursor: pointer;background-color: white;"><i class="el-icon-refresh-left" style="color: black;line-height: 16px;margin-left: 2px;" @click="refresh()"></i></div>
          <div style="float: left;margin-left: 5px;"><span>刷新</span></div>

          <div style="float: left;margin-left: 20px;">
            <div style="float: left;cursor: pointer;" @click="getFull()"><img :src="refUrl" style="width: 18px;height: 16px;" alt="#"/></div>
            <!--          <div>-->
            <!--            欢迎您，<span style="font-size: 14px;">{{ userInfo }}</span>-->
            <!--          </div>-->
            <div style="float: left;margin-left: 5px;"><span>全屏</span></div>
          </div>
          <div style="float: left;margin-left: 20px;">
            <div style="float: left;margin-right: 5px;margin-top:-2px;"><i class="el-icon-user-solid" style="font-size: 18px;"></i></div>
            <div style="float: left;">
              欢迎您，<span style="font-size: 15px;">{{ userInfo }}</span>
            </div>
          </div>
          <div style="float: left;margin-left: 20px;" @click="logout()">
            <div style="  border: none; color: white; font-size: 13px;cursor: pointer">退出</div>
          </div>
          <!--        <el-button type="default" size="mini"-->
          <!--                   style="background-color: #4376B8;  border: none; color: white; font-size: 14px;" @click="logout()"-->
          <!--        >退出-->
          <!--        </el-button>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/system/user'
import {queryStation } from "@/api/station/station";
import { queryGate} from "@/api/gate/gate";
export default {
  name: 'HeaderBox',
  props: {
    name: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      dayInfo:'',
      timeInfo: '',
      weekInfo:'',
      timer: null,
      userInfo: 'admin',
      title: process.env.VUE_APP_TITLE,
      refUrl:require("../../assets/refresh.png"),
      checked0:true,
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
      siteId:null,
      gateId:null,
    }
  },
  created() {
    let dayInfo = window.sessionStorage.getItem('dayInfo');
    if (dayInfo){
      this.dayInfo = dayInfo;
    }
    let timeInfo = window.sessionStorage.getItem('timeInfo');
    if (timeInfo){
      this.timeInfo = timeInfo;
    }
    let weekInfo = window.sessionStorage.getItem('weekInfo');
    if (weekInfo){
      this.weekInfo = weekInfo;
    }
    //泵站
    queryStation().then(response => {
      this.siteId=response.data[0].id;
    });
    //闸门
    queryGate().then(response => {
      this.gateId=response.data[0].id;
    });
    this.getTimeInfo();
    getUserInfo().then(response => {
      if (response.rows.length !== 10){
        let checkId = response.rows.toString();
        for(let i=1;i<=10;i++){
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
            if (i === 10){
              this.checked10 = false;
            }
          }
        }
      }
    });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    goBack(){
      this.$router.push('/');
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/login'
        })
      }).catch(() => {
      })
    },
    getFull() {
      const obj = document.getElementById('app')
      obj.requestFullscreen()
    },
    getTimeInfo() {
      this.timer = setInterval(() => {
        this.dayInfo = this.getDay()
        this.timeInfo = this.getTime()
        this.weekInfo = this.getWeek()
        window.sessionStorage.setItem("dayInfo",this.dayInfo);
        window.sessionStorage.setItem("timeInfo",this.timeInfo);
        window.sessionStorage.setItem("weekInfo",this.weekInfo);
        //console.log(this.timeInfo)
      }, 1000)
    },
    getDay() {
      const now = new Date()
      const year = now.getFullYear()
      const month = ('0' + (now.getMonth() + 1)).slice(-2)
      const day = ('0' + now.getDate()).slice(-2)
      // const hours = ('0' + now.getHours()).slice(-2)
      // const minutes = ('0' + now.getMinutes()).slice(-2)
      // const seconds = ('0' + now.getSeconds()).slice(-2)

      return year + '-' + month + '-' + day

    },
    getTime(){
      const now = new Date()
      // const year = now.getFullYear()
      // const month = ('0' + (now.getMonth() + 1)).slice(-2)
      // const day = ('0' + now.getDate()).slice(-2)
      const hours = ('0' + now.getHours()).slice(-2)
      const minutes = ('0' + now.getMinutes()).slice(-2)
      const seconds = ('0' + now.getSeconds()).slice(-2)

      return hours + ':' + minutes + ':' + seconds
    },
    getWeek() {
      const weekDay = new Array(7)
      weekDay[0] = '星期日'
      weekDay[1] = '星期一'
      weekDay[2] = '星期二'
      weekDay[3] = '星期三'
      weekDay[4] = '星期四'
      weekDay[5] = '星期五'
      weekDay[6] = '星期六'
      return weekDay[new Date().getDay()]
    },
    goTarget(href) {
      window.open(href, '_blank')
    },
    refresh(){
      window.location.reload()
    }
  }
}
</script>


<style scoped lang="scss">


.titleBox {
  float: left;
  width: 70%;
  height: 100%;
}




.backBtn {
  background-color: #28255A;
  //border: 2px solid #3582AA;
  color: white;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 20px;
}

.logBox {
  margin-top: 20px;
  float: right;
  margin-right: 20px;
}
.timeInfo{
  margin-top: 4%;
  color: white;
  float: left;
  width: 20%;
}

.userInfo{
  margin-top: 4%;
  color: white;
  float: left;
  width: 20%;
}
.headerBox{
  width: 100%;
  float: left;
  border-bottom: 1px solid white;
  //background-image: url("../../assets/u001.png");
  //background-repeat: no-repeat;
}
.timeBox {
  float: left;
  width: 60%;
  height: 50%;
  margin-left: 40%;
}

.titleBox {
  float: left;
  width: 24%;
  height: 100%;
}

.infoBox {
  float: left;
  width: 80%;
  height: 50%;
  font-size: 12px;
  margin-left: 20%;
}
.menu{
  float: left;
  height: 100%;
  width: 50%;
}
.tipRight{
  float: left;
  height: 100%;
  width: 26%;
}
.menuBox {
  width: 9%;
  float: left;
  color: white;
  text-align: center;
  line-height: 60px;
}
.titleInfo {
  width: 370px;
  //background-color: #196ABC;
  //background:repeating-linear-gradient(to right,#3D70B2,#3D70B2,#3D70B2);
  padding: 13px 10px;
  //margin-left: 26%;
  //margin-top: 5px;
  border: 5px;
  font-weight: bold;
  font-size: 22px;
  color: white;
  text-align: center;
}
.backBtn{
  margin-top: -9%;
  color: white;
  //background-color: #196ABC;
  float: right;
}
.refreshBtn{
  font-size: 10px;
  line-height: 16px;
  width: 16px;
  height: 16px;
}
>>> .el-icon-refresh-left:before{
  margin-left: 10px;
  left: 10px;
}
</style>
