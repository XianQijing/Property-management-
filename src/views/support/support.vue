<template>
  <div class="support">
    <div>
      <!-- <nav-header/> -->
      <div class="card row">
        <div class="col-md-12">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            text-color="#666"
            active-text-color="#FF9494">
            <el-menu-item index="1">房产与客户</el-menu-item>
            <el-menu-item index="2">服务报表</el-menu-item>
            <el-menu-item index="3">收入报表</el-menu-item>
            <el-menu-item index="4">停车收费</el-menu-item>
          </el-menu>
          <!-- 房产与客户 -->
          <HouseAndCust v-if="tabNum === '1'"/>
          <!-- 服务报表 -->
          <ServiceReport v-if="tabNum === '2'"/>
          <!-- 收入报表 -->
          <LncomAnalysis v-if="tabNum === '3'"/>
          <!-- 广告位 -->
          <AdvertisePosition v-if="tabNum === '4'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBar from '@/components/NavBar'
import HouseAndCust from './houseAndCust'
import ServiceReport from './ServiceReport'
import AdvertisePosition from './AdvertisePosition'
import LncomAnalysis from './LncomAnalysis'
export default {
  name:'support',
  data(){
    return{
      activeIndex: '1',
      tabNum: '1'
    }
  },
  components: {
    NavHeader,
    NavBar,
    HouseAndCust,
    AdvertisePosition,
    LncomAnalysis,
    ServiceReport
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key)
      this.tabNum = key
    },
    changePosition() {
      // console.log(this.position)
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  }
}

</script>

<style scoped>
.support {
  height: 100%;
  overflow: hidden;
}
.el-menu {
  margin-bottom: 10px;
}
.el-tabs {
  background: #fff;
}
.support .navHeader {
  height: 67px;
}
.support .card {
  height: 100%;
  background: #F0F0F0;
}
.el-menu--horizontal>.el-menu-item {
  height: 50px;
  line-height: 50px;
  border-right: 1px solid #eee;
  border-bottom: 6px solid rgba(255,148,148,1);
}
.container {
		width: 88%;
		position: relative;
		left: 6%;
		background-color: #eeeeee;
		padding: 0;
    min-width: 1000px;
    height: 100%;
	}
  .col-md-12 {
    height: 100%;
    padding: 0;
  }

.support {
	background: #eeeeee;
	}

.card {
  margin: 0;
  background-color: white;
  width: 99%;
  margin: 10px 10px 0 10px;
  border: 0;
}

.main1 {
    margin: 10vh 10vw;
    border: 1px solid #eeeeee;
    border-top: 2px solid #00BFB4;
}

.main1 ul {
    padding: 0;
    background: #F1F1F1;
    margin: 0;
}
.main1 li{
    display: inline-block;
    padding: 15px 20px 15px 20px;
    color: #999999;
}

#main div {
    position: relative;
    background: white
}

</style>
