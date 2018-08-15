<template>
  <div class="houseAndCust container">
    <div class="row">
      <div class="col-md-4">
        <span>选择时间：
          <input class="btn btn-default" type="button" value="近一个月">
          <input class="btn btn-default" type="button" value="上个月">
          <input class="btn btn-default" type="button" value="近半年">
        </span>
      </div>
      <div class="col-md-8">
        <span>日期：
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <span>选择区域：
          <el-select v-model="form.tim" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
    </div>
    <div style="border:10px solid #eeeeee"></div>
    <div class="row" style="margin:20px 0">
      <div id="img">
        <button class="biaoge"><img id="biaoge" src="../../assets/biaoge.png"></button>
        <button class="tubiao"><img id="tubiao" src="../../assets/biaoge.png"></button>
      </div>
      <div class="col-md-12">
        <div id="vis">
          <div id="chart1" style="height:50vh;margin:50px auto;width: 50vw"></div>
          <div>
            <table class="table">
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import url from '../../assets/Req.js'
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  //引入折线图
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend')
export default {
  name: 'houseAndCust',
  data(){
    return{
      form: {
        time: []
      },
      options: [
        {
          label: '12313',
          value: '123123'
        }
      ],
      chartxia: [
        [12,22,66,11,48,13],
        [12,22,66,11,88,66]
      ]
    }
  },
  mounted(){
    this.initNullPrevEchats()
    var img = document.getElementById('img')
    var imglist = img.children
    var vis = document.getElementById('vis')
    var vislist = vis.children
    for (var i = 0; i < imglist.length; i++){
      imglist[i].index = i;
      imglist[i].onclick = function() {
          for (var m = 0; m <imglist.length; m++){
              imglist[m].className = "";
              vislist[m].style.display = none
          }
          this.className = "active"
          
      }
  }
  },
  methods: {
    initNullPrevEchats(){
      var myChart1 = echarts.init(document.getElementById('chart1'));
      myChart1.setOption({
        //百分比
        title: {
          text: '空置率'
        },
        tooltip: {formatter: '{b}:\n{c}%'},
        legend: {data: ['空置资源', '已租资源'],},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: ['1', '2', '3', '4', '5', '6'],
          name: '月'
        },
        yAxis: {
          type:'value',
          name: '空置率%'
        },
        series: [
          {
            name: '空置资源',
            type: 'bar',
            stack: '广告',
            data: [12,22,66,11,88,66],
            itemStyle:{color: '#F9A400',}
          },
          {
            name: '已租资源',
            type: 'bar',
            stack: '总量',
            stack: '广告',
            data: [12,22,66,11,88,66],
            itemStyle:{color: '#CECECE',},
            barWidth: 50
          }
      ]
      })
        //      this.$ajax.get(url + 'report/yearRentNull/0', '').then((res) => {
 				// console.log(res)
        //          this.chartxia=res.data.data;
        //          var myChart1 = echarts.init(document.getElementById('chart1'));
        //          myChart1.setOption({
        //              series: [
        //                  {data: this.chartxia[1],},
        //                  {data: this.chartxia[0],},
        //              ]
        //          })
        //      })
         },
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
}
span{
  line-height: 500%;
}
.row {
  padding: 0 30px 0 30px;
}
.biaoge{
  width:60px;
  height:30px;
  background:rgba(255,255,255,1);
  border: 1px solid #DBDBDB;
  border-radius:5px 0px 0px 5px;
  color: #DBDBDB
}
.tubiao{
  width:59px;
  height:30px;
  background:rgba(153,114,231,1);
  border: 1px solid #DBDBDB;
  border-radius:0px 5px 5px 0px;
}
img {
  color: #DBDBDB
}
</style>
