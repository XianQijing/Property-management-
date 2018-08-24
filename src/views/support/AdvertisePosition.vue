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
          <button id="batchExport" @click="exportExcel" disabled>批量导出</button>
          <button id="allExport" @click="exportExcelAll">全部导出</button>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="car_no" label="车牌"></el-table-column>
          <el-table-column prop="input_time" label="入场时间"></el-table-column>
          <el-table-column prop="out_time" label="出场时间"></el-table-column>
          <el-table-column prop="reality" label="实收"></el-table-column>
          <el-table-column prop="receivable" label="应收"></el-table-column>
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
      tableList: ['车辆次数'],
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
      howDate: '',
      tableExportData: []
    }
  },
  mounted () {
    // GET /report/carPass 折线
    this.getData('carPassTable')
  },
  methods: {
    exportExcelAll () {
      this.house.currentPage = 1
      this.house.pageSize = 999
      this.tableTab(this.num2, 'exportExcelAll')
    },
    // 批量导出
    exportExcel () {
      //要导出的json数据
      // console.log(this.tableExportData)
      //列标题
      if (this.num2 === 0) {
        var str = `<tr>
          <td>出场时间</td>
          <td>入场时间</td>
          <td>车牌</td>
          <td>实收</td>
          <td>应收</td>
        </tr>`
      }
      //循环遍历，每行加入tr标签，每个单元格加td标签
      for(let i = 0 ; i < this.tableExportData.length; i++ ){
        str += '<tr>'
        for(let item in this.tableExportData[i]){
          //增加\t为了不让表格显示科学计数法或者其他格式
          // console.log(this.tableExportData[i][item])
          str += `<td>${ this.tableExportData[i][item] + '\t'}</td>`;    
        }
        str += '</tr>'
      }
      // Worksheet名
      var worksheet = 'Sheet1'
      var uri = 'data:application/vnd.ms-excel;base64,'

      // 下载的表格模板数据
      var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${ worksheet }</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${ str }</table></body></html>`
      // 下载模板
      window.location.href = uri + base64(template)
    },
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
    handleSelectionChange (val) {
      if (val.length > 0) {
        document.getElementById('batchExport').style.background = '#409EFF'
        document.getElementById('batchExport').disabled = false
        // console.log(document.getElementById('batchExport'))
      } else {
        document.getElementById('batchExport').style.background = '#D9D9D9'
        document.getElementById('batchExport').disabled = true
      }
      this.tableExportData = val
    },
    // 调用接口
    getData (data, val) {
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
          time: this.howDate,
          pageNo: this.house.currentPage,
          pageSize: this.house.pageSize
        }
      }
      this.$ajax.get(url + 'report/' + data, { params: params }).then(res => {
        // console.log(res.data)
        this.Data = []
        if (this.isChartShow === true) {
          this.Data = res.data
          if (res.data.series) {
            this.chartsTwo()
          } else {
            this.$message({
              type: 'info',
              message: '没有数据'
            })
          }
        } else {
           if (val === 'exportExcelAll') {
            this.tableExportData = res.data.dataTable
            this.exportExcel()
          } else {
            this.tableData = res.data.dataTable
            this.house.total = res.data.total
          }
          // this.house.pageArr = [1, 2, 3, 4, 5, res.data.total]
        }
      })
    },
    tableTab (index, changetab) {
      this.num2 = index
      this.house.currentPage = 1
      if (!changetab) {
        this.howDate = ''
      }
      if (this.isChartShow === false) {
         if (changetab === 'exportExcelAll') {
          if (this.num2 === 0) {
            this.getData('carPassTable', 'exportExcelAll')
          }
        } else {
          if (this.num2 === 0) {
            this.getData('carPassTable')
          }
        }
      } else {
        if (this.num2 === 0) {
          this.isArea = false
          this.getData('carPass')
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
    // 车辆次数
    chartsTwo () {
      var myChart2 = echarts.init(document.getElementById('main1'))
      var seriesArr = []
      this.Data.series.forEach(v => {
        var oneOfSeries = {
          name: v.name,
          type: 'line',
          symbol: 'circle',
          symbolSize: '16',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 4
          },
          lineStyle: {
            width: 4
          },
          data: v.data
        }
        seriesArr.push(oneOfSeries)
      })
      // console.log(seriesArr)
      myChart2.setOption({
        color: ['#87e5da', '#92a4c0', '#f4adad', '#e58cdb', '#d0efb5', '#eb7878', '#2f3e75', '#f3e595', '#eda1c1', '#fab2ac', '#bee4d2', '#d7f8f7'],
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
// 输出base64编码
function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
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
.daochu button {
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  border: 0;
  padding: 9px 15px;
  line-height: 1;
  background-color: #409EFF;
  border-color: #409EFF;
  cursor: pointer;
}
.daochu button:disabled {
  background-color: #D9D9D9;
  border-color: #D9D9D9;
  cursor: not-allowed;
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
