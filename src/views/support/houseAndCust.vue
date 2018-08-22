<template>
  <!-- 空置率 -->
  <div class="houseAndCust container">
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
          <el-table-column v-if="tableData[0].ownername !== undefined" prop="ownername" label="姓名"></el-table-column>
          <el-table-column v-if="tableData[0].owner_name !== undefined" prop="owner_name" label="姓名"></el-table-column>
          <el-table-column v-if="tableData[0].phone !== undefined" prop="phone" label="手机号"></el-table-column>
          <el-table-column v-if="tableData[0].payprice !== undefined" prop="payprice" label="金额"></el-table-column>
          <el-table-column v-if="tableData[0].total !== undefined" prop="total" label="合计"></el-table-column>

          <el-table-column v-if="tableData[0].namec !== undefined" prop="namec" label="姓名"></el-table-column>
          <el-table-column v-if="tableData[0].count !== undefined" prop="count" label="数值"></el-table-column>
          <el-table-column v-if="tableData[0].nul !== undefined" prop="nul" label="合计"></el-table-column>
          <el-table-column v-if="tableData[0].rent !== undefined" prop="rent" label="租金"></el-table-column>

          <el-table-column v-if="tableData[0].addRent !== undefined" prop="addRent" label="数值"></el-table-column>
          <el-table-column v-if="tableData[0].exitRent !== undefined" prop="exitRent" label="数值"></el-table-column>
          <el-table-column v-if="tableData[0].nowRent !== undefined" prop="nowRent" label="数值"></el-table-column>
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
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')
export default {
  name: 'houseAndCust',
  data () {
    return {
      num: 0,
      num2: 0,
      isChartShow: false,
      color: ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA'],
      Data: {},
      tableList: ['合同签约额度表', '历史缴费表', '合约状态表', '房屋状态表'],
      tableData: [
        {
          ownername: ''
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
    this.getData('contractValueTable')
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
      this.tableTab(this.num2, '更改日期')
    },
    currentChange (val) {
      this.house.currentPage = val
      this.tableTab(this.num2, '更改日期')
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
        this.Data = []
        if (this.isChartShow === true) {
          this.Data = res.data
          if (data === 'rentOrNull') {
            this.chartsTwo()
          } else if (data === 'contractStatus') {
            this.chartsThree()
          } else {
            this.charts()
          }
        } else {
          this.tableData = res.data.dataTable
          this.house.total = res.data.total
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
          this.isArea = false
          this.getData('contractValueTable')
        }
        if (this.num2 === 1) {
          this.isArea = true
          this.getData('payRankingTable')
        }
        if (this.num2 === 2) {
          this.isArea = true
          this.getData('contractStatusTable')
        }
        if (this.num2 === 3) {
          this.isArea = true
          this.getData('rentOrNullTable')
        }
      } else {
        if (this.num2 === 0) {
          this.isArea = false
          this.color = ['#F9A400']
          this.getData('contractValue')
        }
        if (this.num2 === 1) {
          this.isArea = true
          this.color = ['#FF9494']
          this.getData('payRanking')
        }
        if (this.num2 === 2) {
          this.isArea = true
          this.getData('contractStatus')
        }
        if (this.num2 === 3) {
          this.color = ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA']
          this.isArea = true
          this.getData('rentOrNull')
        }
      }
    },
    // 表格和柱状图切换
    tab (index) {
      this.num = index
      if (index === 0) {
        this.isChartShow = false
        this.tableTab(this.num2, '切换图表')
      } else {
        this.isChartShow = true
        this.tableTab(this.num2, '切换图表')
      }
    },
    // 空置率
    charts () {
      var myChart = echarts.init(document.getElementById('main1'));
      myChart.setOption({
        color: this.color,
        legend: {
          type: 'plain',
          right: '10%',
          bottom: '30%',
          orient: 'vertical',
        },
        tooltip : {
          show: false,
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '18%',
          height: '60%',
          width: '64%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : this.Data.x,
            axisTick: {
              alignWithLabel: true,
              show: false,
              interval: 0,
            },
            axisLabel: {
              interval: 0,
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '空置率(%)',
            nameGap: 30,
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        series : [
          {
            name:'空置房屋',
            type:'bar',
            barWidth: '51px',
            data: this.Data.y,
            label: {
              show: true,
            }
          }
        ]
      }, true)
    },
    chartsTwo () {
      var myChart2 = echarts.init(document.getElementById('main1'));
      myChart2.setOption({
        // color: ['#F9A400'],
        color: this.color,
        legend: {
          type: 'plain',
          right: '10%',
          bottom: '30%',
          orient: 'vertical',
        },
        tooltip : {
          show: false,
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '18%',
          height: '60%',
          width: '64%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : this.Data.x,
            axisTick: {
              alignWithLabel: true,
              show: false,
              interval: 0,
            },
            axisLabel: {
              interval: 0,
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '空置率(%)',
            nameGap: 30,
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        series : [
          {
            name:'空置房屋',
            type:'bar',
            stack: '总量',
            barWidth: '20px',
            // data: this.Data.y,
            data: this.Data.yNull,
            label: {
              show: true,
              position: 'insideTop'
            }
          },
          {
            name:'空置',
            type:'bar',
            stack: '总量',
            barWidth: '20px',
            data: this.Data.yRent,
            label: {
              show: true,
              position: 'insideTop'
            }
          }
        ]
      }, true)
    },
    chartsThree () {
      var myChart2 = echarts.init(document.getElementById('main1'));
      myChart2.setOption({
        // color: ['#F9A400'],
        // color: this.color,
        legend: {
          type: 'plain',
          right: '10%',
          bottom: '30%',
          orient: 'vertical',
        },
        tooltip : {
          show: false,
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '18%',
          height: '60%',
          width: '64%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : this.Data.x,
            axisTick: {
              alignWithLabel: true,
              show: false,
              interval: 0,
            },
            axisLabel: {
              interval: 0,
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '空置率(%)',
            nameGap: 30,
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        series : [
          {
            name:'空置房屋',
            type:'bar',
            stack: '总量',
            barWidth: '20px',
            data: this.Data.y,
            label: {
              show: true,
              // position: 'insideTop'
            },
            itemStyle: { 
              normal: { 
                color: function(params) { 
                　//首先定义一个数组 
                  var colorList = ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA']
                  return colorList[params.dataIndex] 
                }
              }
            }
          }
        ]
      }, true)
    }
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
  overflow: hidden;
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
