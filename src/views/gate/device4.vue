<template>
  <div class="deviceBox">
    <div class="leftBox">
      <div style="font-size: 20px;float: left;width: 100%;text-align: center;">
        上限位
        <div class="circleBox" style="margin-left: 32%;background-color: #C0C0C0"></div>
      </div>
      <div style="font-size: 20px;float: left;width: 100%;margin-left: -1%;text-align: center;">上&nbsp;升</div>
      <div class="imageBox"></div>
      <div style="background-color: white;float: left;width: 100%;height: 45px;padding: 3% 1%;text-align: center;">当前开度
        <div style="border: 1px solid #D1D1D1;margin-top: 2%;color:#2B2D97;font-size: 20px;">0.0</div>
      </div>
      <div class="imageBox2"></div>
      <div style="font-size: 20px;float: left;width: 100%;margin-left: -1%;text-align: center;">下&nbsp;降</div>
      <div style="margin-top:36%;font-size: 20px;float: left;width: 100%;text-align: center;">
        下限位
        <div class="circleBox" style="margin-left: 32%;background-color: #C0C0C0"></div>
      </div>
      <div class="control gateInfo" :style="{backgroundColor:isAction===1?'#00FF00':'#FF0000'}">{{ actionText }}</div>
    </div>
    <div  class="rightBox">
      <div class="titleBox">{{ title }}</div>
      <div class="btnBox">
        <div class="info" v-for="(item,index) in array" :key="index"  :style="{marginLeft:(index===0)?'13%':'0%'}">
          {{ item }}
          <div class="circleBox">
            <div class="circleSon" :style="{backgroundColor:array3[index]===1?'#FF0000':'#C0C0C0'}"></div>
          </div>
        </div>
      </div>
      <div class="detailBox" v-if="false">
        <div class="detail" v-for="(item,index) in detailArray" :key="index">
        <el-col :span="8" style="margin-top: 5px;font-size: 16px;">{{ item.type }}</el-col>
        <el-col :span="12" style="margin-top: 5px;font-size: 20px;color:#2B2D97;text-align: center;">{{ item.value }}</el-col>
        <el-col :span="4" style="margin-top: 8px;font-size: 16px;text-align: center;">{{ item.unit }}</el-col>
      </div>
    </div>
    <div class="runTimeBox">
      <div class="detail" style="margin: 0;margin-bottom: 10px;">
        <el-col :span="6" style="margin-top: 6px;font-size: 16px;">{{ runTimeObj.title }}</el-col>
        <el-col :span="4" style="margin-top: 8px;font-size: 18px;color:#2B2D97;text-align: center;">{{ runTimeObj.day }}</el-col>
        <el-col :span="1" style="margin-top: 6px;font-size: 16px;">天</el-col>
        <el-col :span="2" style="margin-top: 8px;font-size: 18px;color:#2B2D97;text-align: center;">{{ runTimeObj.hour }}</el-col>
        <el-col :span="3" style="margin-top: 6px;font-size: 16px;text-align: center;">小时</el-col>
        <el-col :span="2" style="margin-top: 8px;font-size: 18px;color:#2B2D97;text-align: center;">{{ runTimeObj.minute }}</el-col>
        <el-col :span="3" style="margin-top: 6px;font-size: 16px;text-align: center;">分钟</el-col>
        <el-col :span="2" style="margin-top: 8px;font-size: 18px;color:#2B2D97;text-align: center;">{{ runTimeObj.seconds }}</el-col>
        <el-col :span="1" style="margin-top: 6px;font-size: 16px;text-align: center;">秒</el-col>
        </div>
      </div>
      <div class="controlBox">
        <div class="control" @click="changeStatus(1)" :style="{backgroundColor:(status===1)?'#00FF00':'#C0C0C0'}">上升</div>
        <div class="control" @click="changeStatus(2)" :style="{backgroundColor:(status===2)?'#00FF00':'#C0C0C0',marginLeft:'1%'}">下降</div>
        <div class="control" @click="changeStatus(0)" :style="{backgroundColor:(status===0)?'#FF0000':'#C0C0C0',marginLeft:'1%'}" >停止</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCtrl, getStatus, queryLastInfo } from '@/api/gate/gate'

export default {
  name: "device-4",
  props: {
    deviceId: String
  },
  data() {
    return {
      title: '1号自排闸',
      array:['停止','故障','就地','远控'],
      array3:[0,0,0,0],
      dialogVisible:false,
      detailArray:[
        {'type':'A相电压：','value':0.0,'unit':'V'},
        {'type':'B相电压：','value':0.0,'unit':'V'},
        {'type':'C相电压：','value':0.0,'unit':'V'},
        {'type':'A相电流：','value':0.0,'unit':'A'},
        {'type':'B相电流：','value':0.0,'unit':'A'},
        {'type':'C相电流：','value':0.0,'unit':'A'},
        {'type':'设备功率：','value':0.0,'unit':'KW'},
        {'type':'总耗电量：','value':0.0,'unit':'KW/h'},
      ],
      runTimeObj:{
        title:'运行时间:',
        day:'0000',
        hour:'00',
        minute:'00',
        seconds:'00',
      },
      status:0,
      isAction:1,
      actionText:'',
      minute:10,
      obj:{},
    }
  },
  watch: {
    //监听文件url改变时重新赋值
    deviceId(newVal, oldVal) {
      //console.log('imgPath changed from', oldVal, 'to', newVal);
      this.deviceId = newVal
      //console.error(newVal)
      if (newVal === '893f70b39c2541d89f06edad12bcc863'){
        this.title = '2号自排闸';
      } else if(newVal === 'afb35f6927964c81a6751b863ae1998b') {
        this.title = '3号自排闸';
      } else if(newVal === '14749b2c6ca74f56b29a507495ae68a3') {
        this.title = '4号自排闸';
      } else if(newVal === '1cdc8b7fb90b488099f2dca53dd1b268') {
        this.title = '左岸自排闸';
      }else if(newVal === '14749b2c6ca74f56b29a507495ae68a4') {
        this.title = '5号自排闸';
      }else if(newVal === '14749b2c6ca74f56b29a507495ae68a5') {
        this.title = '6号自排闸';
      }else if(newVal === '14749b2c6ca74f56b29a507495ae68a6') {
        this.title = '7号自排闸';
      }else if(newVal === '14749b2c6ca74f56b29a507495ae68a7') {
        this.title = '8号自排闸';
      }else if(newVal === 'c5fcabe7e9104e14af6975fd8d8c2625') {
        this.title = '1号防洪闸';
      }else if(newVal === 'c5fcabe7e9104e14af6975fd8d8c2626') {
        this.title = '2号防洪闸';
      }else if(newVal === 'c5fcabe7e9104e14af6975fd8d8c2627') {
        this.title = '3号防洪闸';
      }else if(newVal === 'c5fcabe7e9104e14af6975fd8d8c2628') {
        this.title = '4号防洪闸';
      } else if(newVal === 'c5fcabe7e9104e14af6975fd8d8c2624') {
        this.title = '右岸自排闸';
      } else{
        this.title = '1号自排闸';
      }
      this.getInfo(this.deviceId);
    }
  },
  mounted() {
    //this.deviceId = '2d6d051613bb4762ac822b05f1a1337b'
    this.getInfo('2d6d051613bb4762ac822b05f1a1337b');
    // this.getTime();
  },
  methods:{
    getInfo(deviceId){
      queryLastInfo(deviceId).then(response => {
        let obj = response.data;
        this.setDevice(obj);
      });
      getStatus(deviceId).then(response => {
        let obj = response.data;
        this.setStatus(obj)
      })
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
      // 故障
      // 就地
      // 远控
      let array = [0,0,0,0];
      if (obj.v1){
        array[0] = parseInt(obj.v1)
      }
      if (obj.v4){
        array[1] = parseInt(obj.v4)
      }
      if (obj.v5){
        array[2] = parseInt(obj.v5)
      }
      if (obj.v6){
        array[3] = parseInt(obj.v6)
      }
      this.array3.splice(0, this.array3.length, ...array);
    },
    changeStatus(val){
      this.status = val;
      this.dialogVisible = true;
      if (val){
        if (val === 1){
          this.actionText='上升';
        }else {
          this.actionText='下降';
        }
        this.isAction=1;
      }else {
        this.actionText='停止';
        this.isAction=0;
      }
      this.$confirm('此操作将'+this.actionText+'闸门, 是否继续?', '提示', {
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
  float: left;
  background-color: #F0F0F0;
  border: 1px solid #D1D1D1;
  padding: 5px 5px;
  width: 100%;
  height: 100%;
}
.leftBox{
  width: 25%;
  height: 100%;
  border: 1px solid #D1D1D1;
  padding: 10px 5px;
  background-color: #F0F0F0;
  float: left;
}
.rightBox{
  width: 73%;
  height: 100%;
  border: 1px solid #D1D1D1;
  padding: 10px 5px;
  background-color: #F0F0F0;
  float: left;
  margin-left: 5px;
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
  margin:8px 8px
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
  width: 32.6%;
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
.imageBox{
  background-image: url("../../assets/arrow_1.gif");
  width: 100%;
  height: 120px;
  background-repeat: no-repeat;
  float: left;
  margin-left: 21%;
}
.imageBox2{
  background-image: url("../../assets/arrow_2.gif");
  width: 100%;
  height: 120px;
  background-repeat: no-repeat;
  float: left;
  margin-left: 24%;
  margin-top: 8%;
}
.gateInfo{
  width: 100%;
  margin-top: 10%;
}
</style>
