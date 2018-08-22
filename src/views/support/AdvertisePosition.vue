<template>
  <!-- 广告位 -->
  <div class="AdvertisePosition container">
    <DecisionCommonHeader :isArea="isArea" @time="getTime" @dateTime="getDate"/>
    <div class="charts">
      <div class="title">
        <div class="tableTab">
          <el-button size="small" v-for="(item, index) in tableList" :key="index" :class="{actived:index == num2}" @click="tableTab(index)">{{ item }}</el-button>
        </div>
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
      <div v-show="isChartShow" id="main1" style="width: 100%;height:500px;background: #fff;margin: 0 auto;"></div>
      <div v-show="!isChartShow" class="changeTable">
        <div class="daochu">
          <el-button size="small" type="info" disabled>批量导出</el-button>
          <el-button size="small" type="info" disabled>全部导出</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-if="tableData[0].owner_name" prop="owner_name" label="姓名"></el-table-column>
          <el-table-column v-if="tableData[0].pay_item_name" prop="pay_item_name" label="手机号"></el-table-column>
          <el-table-column v-if="tableData[0].pay_price" prop="pay_price" label="金额"></el-table-column>
          <el-table-column v-if="tableData[0].pay_time" prop="pay_time" label="合计"></el-table-column>
          <el-table-column v-if="tableData[0].should_price" prop="should_price" label="合计"></el-table-column>
          <el-table-column v-if="tableData[0].should_time" prop="should_time" label="租金"></el-table-column>
          <el-table-column v-if="tableData[0].total" prop="total" label="总计"></el-table-column>
          
          <el-table-column v-if="tableData[0].pay_item_type_name" prop="pay_item_type_name" label="时间"></el-table-column>
        </el-table>
        <div class="fenye">
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="house.currentPage"
            :page-sizes="house.pageArr"
            :page-size="house.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="house.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DecisionCommonHeader from './DecisionCommonHeader'
import url from '../../assets/Req.js'
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')
export default {
  name: 'AdvertisePosition',
  data () {
    return {
      num: 0,
      num2: 0,
      isChartShow: false,
      color: ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA'],
      Data: {},
      tableList: ['停车收费', '车辆次数'],
      tableData: [
        {
          owner_name: ''
        }
      ],
      house: {
        currentPage: 1,
        pageArr: [1, 2, 3, 4, 5],
        pageSize: 5,
        total: 3,
      },
      isArea: false,
      howTime: 0,
      howDate: ''
    }
  },
  mounted () {
    // GET /report/incomeAnalysis  收入分析
    // GET /report/utilities  水电分析
    // GET /report/receivable  应收费情况表
    this.getData('incomeAnalysisTable')
  },
  methods: {
    getDate (data) {
      this.howDate = data
      this.tableTab(this.num2, '更改日期')
    },
    getTime (data) {
      this.howTime = data
      this.tableTab(this.num2)
    },
    sizeChange (val) {
      this.house.pageSize = val
      this.tableTab(this.num2)
    },
    currentChange (val) {
      this.house.currentPage = val
      this.tableTab(this.num2)
    },
    handleSelectionChange () {},
    // 调用接口
    getData (data) {
      var params = {}
      if (this.isChartShow === true) {
        params = {
          howTime: this.howTime,
          time: this.howDate,
          building: ''
        }
      } else {
        params = {
          howTime: this.howTime,
          pageNo: this.house.currentPage,
          pageSize: this.house.pageSize
        }
      }
      this.$ajax.get(url + 'report/' + data, { params: params }).then(res => {
        // console.log(res.data)
        this.Data = []
        if (this.isChartShow === true) {
          this.Data = res.data
          if (data === 'utilities') {
            this.chartsTwo()
          } else {
            this.charts()
          }
        } else {
          this.tableData = res.data.dataTable
          this.house.total = res.data.total
          // this.house.pageArr = [1, 2, 3, 4, 5, res.data.total]
        }
      })
    },
    tableTab (index, changetab) {
      this.num2 = index
      if (!changetab) {
        this.howDate = ''
      }
      if (this.isChartShow === false) {
        if (this.num2 === 0) {
          this.getData('incomeAnalysisTable')
        }
        if (this.num2 === 1) {
          this.getData('utilitiesTable')
        }
      } else {
        if (this.num2 === 0) {
          this.isArea = false
          this.getData('incomeAnalysis')
        }
        if (this.num2 === 1) {
          this.isArea = true
          this.getData('utilities')
        }
      }
    },
    // 表格和柱状图切换
    tab (index) {
      this.num = index
      if (index === 0) {
        this.isChartShow = false
      } else {
        this.isChartShow = true
      }
      this.tableTab(this.num2, '更改日期')
    },
    // 收入分析
    charts () {
      let arr = []
      this.Data.forEach(v => {
        if (v.total) {
          v.name = v.pay_item_name
          v.value = v.total
        }
        arr.push(v.name)
      })
      var myChart = echarts.init(document.getElementById('main1'));
      myChart.setOption({
        color: ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA'],
        title : {
          text: '收入分析',
          // subtext: '纯属虚构',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: 'plain',
          left: '35%',
          bottom: '15%',
          // orient: 'vertical',
          data: arr,
          formatter: '{name}'
        },
        grid: {
          top: '20%',
          left: '18%',
          height: '60%',
          width: '64%',
          containLabel: true
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '40%'],
            data: this.Data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              position: 'inside',
              formatter: '{d}%'
            }
          }
        ]
      }, true)
    },
    // 水电分析
    chartsTwo () {
      var myChart2 = echarts.init(document.getElementById('main1'))
      var seriesArr = []
      this.Data.series.forEach(v => {
        var oneOfSeries = {
          name: v.name,
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: '20',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 6
          },
          lineStyle: {
            width: 6
          },
          data: v.data
        }
        seriesArr.push(oneOfSeries)
      })
      myChart2.setOption({
        color: ['#32D2C9', '#F8A20F', '#72A0FF'],
        tooltip: {
          trigger: this.Data.tooltip.trigger
        },
        legend: {
          type: 'plain',
          data: this.Data.legend.data
        },
        grid: {
          top: '20%',
          left: '18%',
          height: '60%',
          width: '64%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: true
          },
          data: this.Data.xAxis.data,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: seriesArr
      }, true)
    },
  },
  components: {
    DecisionCommonHeader
  }
}
</script>

<style scoped>
.AdvertisePosition{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  min-width: 1270px;
  height: 100%;
}
.changeTable {
  width: 95%;
  /* height: 300px; */
  /* overflow-y: scroll; */
  margin: 30px auto 0;
}
.el-table {
  max-height: 450px;
  overflow-y: auto;
  padding-top: 15px;
}
.fenye button {
    background-color: white;
    border: 1px solid #32a8ee;
    color: #32a8ee;
    width: 2em;
}
.fenye {
    float: right;
    padding: 20px 0;
}
.fenye input {
    width: 3em;
    height: 2em;
    border: 1px solid #eeeeee;
    background-color: white;
    border-radius: 5px;
}
.tableTab {
  float: left;
  padding-left: 38px;
}
.tableTab button:hover {
  background: #FF9494;
  color: #fff;
  border-color: #FF9494;
}
.tableTab .actived {
  background: #FF9494;
  color: #fff;
  border-color: #FF9494;
}
button {
  outline: none;
}
.charts {
  /* height: 100%;
  overflow: auto; */
}
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
.tab button {
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
  border-color:#FF9494;
}
</style>
