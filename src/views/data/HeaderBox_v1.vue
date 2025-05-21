<template>
  <div class="headerBox">
    <div class="timeBox">
      <el-button type="default" size="mini"
                 class="backBtn" @click="goBack()"
      >返回
      </el-button>
    </div>
    <div class="titleBox">
      <div class="timeInfo">{{ timeInfo }}</div>
      <div class="titleInfo">闸泵站智慧管理平台</div>
      <div class="userInfo">
        <i class="el-icon-user-solid"></i>
        欢迎您，<span style="font-size: 14px;">{{ userInfo }}</span>
      </div>
    </div>
    <div class="infoBox">
      <div class="logBox">
        <el-button type="default" icon="el-icon-full-screen" size="mini"
                   style="background-color: #28255A;border: none; color: white; font-size: 14px;width: 60px;"
                   @click="getFull()"
        >全屏
        </el-button>
        <el-button type="default" size="mini"
                   style="background-color: #28255A;  border: none; color: white; font-size: 14px;" @click="logout()"
        >退出
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderBox',
  data() {
    return {
      timeInfo: '',
      timer: null,
      userInfo: 'admin'
    }
  },
  created() {
    let item = window.sessionStorage.getItem('timeInfo');
    if (item){
      this.timeInfo = item;
    }
    this.getTimeInfo()
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
        this.timeInfo = this.getTime() + ' ' + this.getWeek();
        window.sessionStorage.setItem("timeInfo",this.timeInfo);
        // console.log(this.timeInfo)
      }, 1000)
    },
    getTime() {
      const now = new Date()
      const year = now.getFullYear()
      const month = ('0' + (now.getMonth() + 1)).slice(-2)
      const day = ('0' + now.getDate()).slice(-2)
      const hours = ('0' + now.getHours()).slice(-2)
      const minutes = ('0' + now.getMinutes()).slice(-2)
      const seconds = ('0' + now.getSeconds()).slice(-2)

      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

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
    }
  }
}
</script>


<style scoped lang="scss">
.timeBox {
  float: left;
  width: 15%;
  height: 100%;
}

.titleBox {
  float: left;
  width: 70%;
  height: 100%;
}

.infoBox {
  float: left;
  width: 15%;
  height: 100%;
}



.backBtn {
  background-color: #28255A;
  border: 2px solid #3582AA;
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
.titleInfo {
  width: 60%;
  padding: 10px 10px;
  margin-top: 15px;
  border: 5px;
  font-weight: bold;
  font-size: 20px;
  color: white;
  text-align: center;
  float: left;
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
  //background-image: url("../../assets/u001.png");
  //background-repeat: no-repeat;
}
</style>
