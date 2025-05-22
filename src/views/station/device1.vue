<template>
  <div class="deviceBox">
    <div class="titleBox">{{ title }}</div>
<!--    <div class="btnBox">-->
<!--      <div class="info" v-for="(item,index) in array" :key="index">-->
<!--        {{ item }}-->
<!--        <div class="circleBox">-->
<!--          <div class="circleSon" :style="{backgroundColor:array3[index]===1?'#FF0000':'#C0C0C0'}"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="btnBox">
      <div class="info" >
        运行
        <div class="circleBox">
          <div class="circleSon" :style="{backgroundColor:(array3[0]===1)?'#33EE33':'#C0C0C0'}"></div>
        </div>
      </div>
      <div class="info">
        过载
        <div class="circleBox">
          <div class="circleSon" :style="{backgroundColor:(array3[1]===1)?'#F71515':'#C0C0C0'}"></div>
        </div>
      </div>
      <div class="info">
        限位
        <div class="circleBox">
          <div class="circleSon" :style="{backgroundColor:(array3[2]===1)?'#F71515':'#C0C0C0'}"></div>
        </div>
      </div>
      <div class="info">
        电源
        <div class="circleBox">
          <div class="circleSon" :style="{backgroundColor:(array3[3]===1)?'#33EE33':'#C0C0C0'}"></div>
        </div>
      </div>
      <div class="info">
        远控
        <div class="circleBox">
          <div class="circleSon" :style="{backgroundColor:(array3[4]===1)?'#33EE33':'#C0C0C0'}"></div>
        </div>
      </div>
    </div>
    <div class="detailBox" v-if="false">
      <div class="detail" v-for="(item,index) in detailArray" :key="index">
        <el-col :span="6" style="margin-top: 5px;font-size: 16px;">{{ item.type }}</el-col>
        <el-col :span="12" style="margin-top: 5px;font-size: 20px;color:#2B2D97;text-align: center;">{{ item.value }}</el-col>
        <el-col :span="6" style="margin-top: 8px;font-size: 16px;text-align: center;">{{ item.unit }}</el-col>
      </div>
    </div>
    <div class="runTimeBox">
      <div class="detail" >
        <el-col :span="5" style="margin-top: 5px;font-size: 16px;">{{ runTimeObj.title }}</el-col>
        <el-col :span="4" style="margin-top: 5px;font-size: 20px;color:#2B2D97;text-align: center;">{{ runTimeObj.day }}</el-col>
        <el-col :span="1" style="margin-top: 5px;font-size: 16px;">天</el-col>
        <el-col :span="2" style="margin-top: 5px;font-size: 20px;color:#2B2D97;text-align: center;">{{ runTimeObj.hour }}</el-col>
        <el-col :span="3" style="margin-top: 5px;font-size: 16px;text-align: center;">小时</el-col>
        <el-col :span="1" style="margin-top: 5px;font-size: 20px;color:#2B2D97;text-align: center;">{{ runTimeObj.minute }}</el-col>
        <el-col :span="3" style="margin-top: 5px;font-size: 16px;text-align: center;">分钟</el-col>
        <el-col :span="1" style="margin-top: 5px;font-size: 20px;color:#2B2D97;text-align: center;">{{ runTimeObj.seconds }}</el-col>
        <el-col :span="2" style="margin-top: 5px;font-size: 16px;text-align: center;">秒</el-col>
      </div>
    </div>
    <div class="controlBox">
      <div class="control" @click="changeStatus(1)" :style="{backgroundColor:(status===1)?'#00FF00':'#C0C0C0'}">启动</div>
      <div class="control" @click="changeStatus(0)" :style="{backgroundColor:(status===0)?'#FF0000':'#C0C0C0',marginLeft:'2%'}" >停止</div>
    </div>
  </div>
</template>
<script>
import { queryLastInfo } from '@/api/station/station'
import { getCtrl, getStatus } from '@/api/gate/gate'

export default {
  name: "device-1",
  props: {
    deviceId: String
  },
  data() {
    return {
      title: '1号清污机',
      array:['运行','过载','限位','电源','远控'],
      array3:[0,0,0,0,1],
      actionText:'',
      minute:10,
      detailArray:[
        {'type':'A相电压：','value':230.1,'unit':'V'},
        {'type':'B相电压：','value':230.5,'unit':'V'},
        {'type':'C相电压：','value':230.6,'unit':'V'},
        {'type':'A相电流：','value':3.1,'unit':'A'},
        {'type':'B相电流：','value':2.1,'unit':'A'},
        {'type':'C相电流：','value':3.3,'unit':'A'},
        {'type':'设备功率：','value':0.0,'unit':'KW'},
        {'type':'总耗电量：','value':0.0,'unit':'KW/h'},
      ],
      runTimeObj:{
        title:'运行时间：',
        day:'00000',
        hour:'00',
        minute:'00',
        seconds:'00',
      },
      status:1,
      obj:{},
    }
  },
  watch: {
    //监听文件url改变时重新赋值
    deviceId(newVal, oldVal) {
      //console.log('imgPath changed from', oldVal, 'to', newVal);
      this.deviceId = newVal
      //console.error(newVal)
      if (newVal === '8a0cea1d39d4443899a739abd19cee3d'){
        this.title = '2号清污机'
      }else if (newVal === '9e4a3236ca4040d98e9b959347372a25'){
        this.title = '4号清污机'
      }else if (newVal === '932a1813d0894555af2e02fc9c44e04a'){
        this.title = '3号清污机'
      }else {
        this.title = '1号清污机'
      }
      this.getInfo(this.deviceId);
    }
  },
  mounted() {
    //console.error(this.deviceId)
    //"7e68efbe921a42d0821debad06a32da6"
    this.getInfo('7e68efbe921a42d0821debad06a32da6');
    //this.getTime();
  },
  methods:{
    getInfo(deviceId){
      queryLastInfo(deviceId).then(response => {
        let obj = response.data;
        console.log(obj)
        this.setDevice(obj);
        if (obj.runTime){
          //runTime
          const totalSeconds = Math.floor(hours * 3600);

          const days = Math.floor(totalSeconds / (24 * 3600));
          const hoursLeft = Math.floor((totalSeconds % (24 * 3600)) / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          this.runTimeObj.day = days;
          this.runTimeObj.hour = hoursLeft;
          this.runTimeObj.minute = minutes;
          this.runTimeObj.seconds = seconds;
        }
      });

      getStatus(deviceId).then(response => {
        let obj = response.data;
        this.setStatus(obj);
      });
    },
    getTime() {
      setInterval(() => {
        this.minute -= 1
        if (this.minute === 0){
          this.getInfo(this.deviceId);
          //console.error(this.deviceId);
          this.minute = 10;
        }
        // this.loading=false;
        //this.countDown()
      }, 1000)
    },
    setDevice(obj){
      let newArray = [
        {'type':'A相电压：','value':obj.v1,'unit':'V'},
        {'type':'B相电压：','value':obj.v2,'unit':'V'},
        {'type':'C相电压：','value':obj.v3,'unit':'V'},
        {'type':'A相电流：','value':obj.a1,'unit':'A'},
        {'type':'B相电流：','value':obj.a2,'unit':'A'},
        {'type':'C相电流：','value':obj.a3,'unit':'A'},
        {'type':'设备功率：','value':obj.kw,'unit':'KW'},
        {'type':'总耗电量：','value':obj.kwh,'unit':'KW/h'},
      ]
      // this.detailArray = newArray;
      this.detailArray.splice(0, this.detailArray.length, ...newArray);
    },
    setStatus(obj){
      this.runTimeObj.day = obj.v13;
      this.runTimeObj.hour = obj.v12;
      this.runTimeObj.minute = obj.v11;
      this.runTimeObj.seconds = obj.v10;
      //console.error(obj)
      // 停止
      // 运行
      // 故障
      // 就地
      // 远控
      let array = [0,0,0,0,0];
      if (obj.v1 && !parseInt(obj.v1)){//1 true 停止
        array[0] = 1;//运行
      }
      if (obj.v4){//过载
        array[1] = parseInt(obj.v4)
      }
      // if (obj.v5){//限位 无
      //   array[2] = parseInt(obj.v5)
      // }
      //if (obj.v6){//电源 默认上电
        array[3] = 1
      //}
      if (obj.v6){//电源 默认上电
        array[4] = parseInt(obj.v6)
      }
      this.array3.splice(0, this.array3.length, ...array);
      this.array3[4]=1;
    },
    changeStatus(val){
      this.status = val;
      //console.error(this.deviceId+","+val);
      if (val === 0){
        this.actionText = '停止';
      }else {
        this.actionText = '启动';
      }
      this.$confirm('此操作将'+this.actionText+'电机, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass:'del-model',
        type: 'warning'
      }).then(() => {
        getCtrl(this.deviceId,val).then(response => {
          console.log(response.data)
          this.$message({
            type: 'success',
            message: '指令执行成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消执行'
        });
      });
    }
  }
}
</script>
<style scoped>
.deviceBox {
  width: 100%;
  height: 100%;
  border: 1px solid #D1D1D1;
  padding: 10px 5px;
  background-color: #F0F0F0;
}

.titleBox {
  width: 100%;
  border: 1px solid #D1D1D1;
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  float: left;
}


.btnBox{
  background-color: #C0C0C0;
  border: 1px solid #D1D1D1;
  float: left;
  width: 100%;
  margin-top: 5px;
}
.info{
  width: 16.5%;
  float: left;
  text-align: center;
  margin: 5px 5px;
  margin-bottom:0px
}
.circleBox{
  width: 30px;
  height: 30px;
  background-color: #646464;
  border-radius: 15px;
  border: 1px solid black;
  margin:8px 18px
}
.circleSon{
  width: 20px;
  height: 20px;
  background-color: #C0C0C0;
  border-radius: 10px;
  margin:4px 4px
}
.detailBox{
  width: 100%;
  float: left;
}
.detail{
  width: calc( 100% - 0px);
  height: 35px;
  background-color: white;
  margin: 10px 0px;
}
.runTimeBox{
  width: 100%;
  float: left;
}
.controlBox{
  width: 100%;
  float: left;
}
.control{
  width: 48.6%;
  height: 30px;
  float: left;
  background-color: red;
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  color: white;
  border: 1px solid #CACACA;
}
</style>
