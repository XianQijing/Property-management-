<template>
  <!-- 租赁分析 -->
  <div class="houseAndCust container">
    <DecisionCommonHeader/>
    <div class="charts">
      <div class="title">
        <h3>租赁分析</h3>
        <div class="tab">
          <button class="left" :class="{active:0 == num}" @click="tab(0)">
            <img v-if="num === 1" src="../../assets/img/icon_1.png" alt="">
            <img v-if="num === 0" src="../../assets/img/icon_3.png" alt="">
          </button>
          <button class="right" :class="{active:1 == num}" @click="tab(1)">
            <img v-if="num === 0" src="../../assets/img/icon_2.png" alt="">
            <img v-if="num === 1" src="../../assets/img/icon_4.png" alt="">
          </button>
        </div>
      </div>
      <div id="main2" style="width: 100%;height:500px;background: #fff;margin: 0 auto;"></div>
    </div>
  </div>
</template>

<script>
import DecisionCommonHeader from './DecisionCommonHeader'
import url from '../../assets/Req.js'
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
//引入折线图
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')
export default {
  name: 'houseAndCust',
  data () {
    return {
      num: 0,
      color: ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA'],
      Data: {}
    }
  },
  mounted () {
    // console.log(this.title)
    // payRanking
    // this.$ajax.get(url + 'report/contractValue', {
    //   params: {
    //     howTime: '0',
    //     // time: '',
    //     // building: ''
    //   }
    // }).then(res => {
    //   // console.log(res.data)
    //   this.Data = res.data
    //   this.charts()
    // })
  },
  methods: {
    tab (index) {
      this.num = index
    },
    // 租赁分析
    charts () {
      var myChart = echarts.init(document.getElementById('main2'));
      var option = {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
          }]
      };

      myChart.setOption(option)
    },
  },
  components: {
    DecisionCommonHeader
  },
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.houseAndCust{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  min-width: 1270px;
  height: 100%;
}
.charts {}
.title {
  overflow: hidden;
  padding: 35px 0 0;
}
h3 {
  float: left;
  font-size: 24px;
  padding-left: 100px;
}
.tab {
  overflow: hidden;
  float: right;
  margin-right: 100px;
}
button {
  width: 60px;
  height: 30px;
  background: #fff;
  border: 1px solid #dbdbdb;
  float: left;
  padding: 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  cursor: pointer;
  outline: none;
}
img {
  width: 30px;
}
.tab .left {
  border-radius:5px 0px 0px 5px;
}
.tab .right {
  border-radius:0px 5px 5px 0px;
  border-left: 0
}
.title .tab .active {
  background:#FF9494;
}
</style>
