<template>
  <div class="bottomBox">
<!--    <div class="menuBox" v-for="(item,index) in titleList" :key="index" @click="swapMenu(index)">-->


<!--    </div>-->
    <div class="menuBox" v-if="checked1">
<!--      <router-link to="/index">-->
        <img :src="image1"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -22%">首页</div>
<!--      </router-link>-->
    </div>
    <div class="menuBox" v-if="checked0">
      <router-link to="/data">
        <img :src="image2"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -26%">数据大屏</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked2">
      <router-link to="/station/1">
        <img :src="image3"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -30%">泵站管理</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked3">
      <router-link to="/gate/1">
        <img :src="image4"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -34%">拦河闸管理</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked4">
      <router-link to="/rainDay">
        <img :src="image5"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -30%">雨情遥测</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked5">
      <router-link to="/point">
        <img :src="image6"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -30%">水文信息</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked6">
      <router-link to="/video">
        <img :src="image7"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -28%">视频总览</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked7">
      <router-link to="/water1">
        <img :src="image8"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -28%">运行记录</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked7">
      <router-link to="/assign">
        <img :src="image8"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -28%">运维功能</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked8">
      <router-link to="/role">
        <img :src="image9"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -28%">权限管理</div>
      </router-link>
    </div>
    <div class="menuBox" v-if="checked9">
      <router-link to="/operation">
        <img :src="image9"  class="imageBox"/>
        <div class="tipBox" style="margin-left: -28%">操作日志</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/system/user'

export default {
  name: 'BottomBox',
  data() {
    return {
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
      image0: require('../../assets/u2_04.gif'),
      image1: require('../../assets/u2_04.gif'),
      image2: require('../../assets/u2_05.gif'),
      image3: require('../../assets/u2_07.gif'),
      image4: require('../../assets/u2_09.gif'),
      image5: require('../../assets/u2_11.gif'),
      image6: require('../../assets/u2_23.gif'),
      image7: require('../../assets/u2_16.gif'),
      image8: require('../../assets/u2_20.gif'),
      image9: require('../../assets/u2_18.gif'),
    }
  },
  created() {
    getUserInfo().then(response => {
      if (response.rows.length !== 9){
        let checkId = response.rows.toString();
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
    });
  },
  methods:{
    swapMenu(val){
      if (val === 1){
        this.$router.push('/data');
      }else if (val == 2){
        this.$router.push('/manage');
      }
      console.log(val);
      console.error(val)
    }
  }
}
</script>

<style scoped lang="scss">
.bottomBox {
  width: 100%;
  float: left;
}

.menuBox {
  width: 9%;
  float: left;
}
.imageBox{
  width: 35px;
  height: 35px;
  float: left;
  cursor: pointer;
}
.tipBox{
  font-size: 14px;
  color: white;
  float: left;
  margin-left: -20%;
  margin-top: 35px;
  cursor: pointer;
}
</style>
