<template>
  <div class="houseAndCust container">
    <DecisionCommonHeader/>
  </div>
</template>

<script>
import DecisionCommonHeader from './DecisionCommonHeader'
// import url from '../../assets/Req.js'
// var echarts = require('echarts/lib/echarts');
// // 引入柱状图
// require('echarts/lib/chart/bar');
// //引入折线图
// require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// require('echarts/lib/component/legend')
export default {
  name: 'houseAndCust',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
    DecisionCommonHeader
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
</style>
