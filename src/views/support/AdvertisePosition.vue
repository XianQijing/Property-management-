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
          <el-table-column prop="ownername" label="姓名" width="120"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="total" label="合计"></el-table-column>
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
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
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
      tableData: [],
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
    // this.chartsTwo()
  },
  methods: {
    getDate (data) {
      this.howDate = data
      // console.log(this.howDate)
      this.tableTab(this.num2, '更改日期')
    },
    getTime (data) {
      this.howTime = data
      this.tableTab(this.num2)
    },
    sizeChange (val) {
      this.house.pageSize = val
      if (this.num2 === 0) {
        // this.getData('contractValueTable')
      }
    },
    currentChange (val) {
      this.house.currentPage = val
      if (this.num2 === 0) {
        // this.getData('contractValueTable')
      }
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
          // if (data === 'rentOrNull') {
          //   this.chartsTwo()
          // } else {
            this.chartsTwo()
          // }
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
          // this.getData('contractValueTable')
        }
      } else {
        if (this.num2 === 0) {
          // this.color = ['#F9A400']
          // this.isArea = false
          // this.getData('contractValue')
          this.chartsTwo()
        }
        if (this.num2 === 1) {
          // this.color = ['#FF9494']
          // this.isArea = true
          // this.getData('payRanking')
          this.chartsTwo()
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
        if (this.num2 === 0) {
          // this.color = ['#F9A400']
          // this.getData('contractValue')
        }
        if (this.num2 === 1) {
          // this.color = ['#FF9494']
          // this.getData('payRanking')
        }
      }
    },
    chartsTwo () {
      var myChart2 = echarts.init(document.getElementById('main1'));
      myChart2.setOption({
        color: ['#32D2C9', '#F8A20F', '#72A0FF'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
          data: ['周一','周二','周三','周四','周五','周六','周日'],
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
        series: [
          {
            name:'邮件营销',
            type:'line',
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
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
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
            data:[220, 182, 191, 234, 290, 330, 310]
          }
        ]
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
}
</style>
