<template>
  <div class="support">
    <nav-bar/>
    <div class="container">
      <nav-header/>
      <div class="card row">
        <div class="col-md-12">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="房产与客户" name="first">
              <HouseAndCust/>
            </el-tab-pane>

            <el-tab-pane label="租赁分析">
            </el-tab-pane>

            <el-tab-pane label="收入分析">             
            </el-tab-pane>

            <el-tab-pane label="水电报表">
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBar from '@/components/NavBar'
import HouseAndCust from './houseAndCust.vue'
export default {
  name:'support',
  data(){
    return{
      activeName: 'first'
    }
  },
  components: {
    NavHeader,
    NavBar,
    HouseAndCust
  },
  methods: {
    changePosition() {
      console.log(this.position)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
}

</script>

<style scoped>
.support {
  height: 100%;
  overflow: hidden;
}
.support .navHeader {
  height: 67px;
}
.support .card {
  height: 100%;
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
  }

.support {
	background: #eeeeee;
	}

.card {
  margin: 0;
  background-color: white;
  width: 99%;
  margin: 10px 10px 0 5px;
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
