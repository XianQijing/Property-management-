<template>
  <!-- 空置率 -->
  <div class="houseAndCust container">
    <DecisionCommonHeader :isArea="isArea" @time="getTime" @dateTime="getDate"/>
    <div class="charts">
      <div class="title">
        <div class="tableTab">
          <el-button size="small" v-for="(item, index) in tableList" :key="index" :class="{actived:index == num2}" @click="tableTab1(index)">{{ item }}</el-button>
        </div>
        <div class="tab">
          <button class="left" :class="{active:0 == num}" @click="tab(0)">
            <img v-if="num === 1" src="static/icon_1.png" alt="">
            <img v-if="num === 0" src="static/icon_3.png" alt="">
          </button>
          <button class="right" :class="{active:1 == num}" @click="tab(1)">
            <img v-if="num === 0" src="../../assets/img/icon_2.png" alt="">
            <img v-if="num === 1" src="../../assets/img/icon_4.png" alt="">
          </button>
        </div>
      </div>
      <div v-show="isChartShow" id="main1" style="width: 100%;height:600px;background: #fff;margin: 0 auto;"></div>
      <div v-show="!isChartShow" class="changeTable">
        <div class="daochu">
          <button id="batchExport" @click="exportExcel" disabled>批量导出</button>
          <button id="allExport" @click="exportExcelAll">全部导出</button>
        </div>
        <el-table v-if="num2 === 0" ref="multipleTable" id="table" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="ownername" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <!-- <el-table-column prop="payprice" label="签约额度"></el-table-column> -->
          <el-table-column prop="total" label="签约额度"></el-table-column>
        </el-table>

        <el-table v-if="num2 === 1" ref="multipleTable" id="table" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="owner_name" label="名字"></el-table-column>
          <el-table-column prop="payprice" label="签约额度"></el-table-column>
        </el-table>
        
        <el-table v-if="num2 === 2" ref="multipleTable" id="table" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="addRent" label="续租人数"></el-table-column>
          <el-table-column prop="exitRent" label="退租人数"></el-table-column>
          <el-table-column prop="nowRent" label="在租人数"></el-table-column>
        </el-table>

        <el-table v-if="num2 === 3" ref="multipleTable" id="table" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="namec" label="楼宇名"></el-table-column>
          <el-table-column prop="count" label="小计"></el-table-column>
          <el-table-column prop="nul" label="空置数量"></el-table-column>
          <el-table-column prop="rent" label="出租数量"></el-table-column>
        </el-table>

        <el-table v-if="num2 === 4" ref="multipleTable" id="table" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="owner_name" label="用户名"></el-table-column>
          <el-table-column prop="days" label="帐龄(天数)"></el-table-column>
        </el-table>

        <el-table v-if="num2 === 5" ref="multipleTable" id="table" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="owner_name" label="用户名"></el-table-column>
          <el-table-column prop="should_time" label="应付时间"></el-table-column>
          <el-table-column prop="should_price" label="应付款（￥）"></el-table-column>
          <el-table-column prop="pay_time" label="实付款时间"></el-table-column>
          <el-table-column prop="pay_price" label="实收款（￥）"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>

        <el-table v-if="num2 === 6" ref="multipleTable" id="table" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="owner_name" label="用户名"></el-table-column>
          <el-table-column prop="should_time" label="应付时间"></el-table-column>
          <el-table-column prop="should_price" label="应付款（￥）"></el-table-column>
          <el-table-column prop="pay_time" label="实付款时间"></el-table-column>
          <el-table-column prop="pay_price" label="实收款（￥）"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
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
// 87e5da 92a4c0 f4adad e58cdb d0efb5 eb7878 2f3e75 f3e595 eda1c1 fab2ac bee4d2 d7f8f7
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
      color: ['#87e5da', '#92a4c0', '#f4adad', '#e58cdb', '#d0efb5', '#eb7878', '#2f3e75', '#f3e595', '#eda1c1', '#fab2ac', '#bee4d2', '#d7f8f7'],
      Data: {},
      tableList: ['合同签约额度表', '历史缴费表', '合约状态表', '房屋状态表', '欠款账龄', '租金分析', '物业费分析'],
      tableData: [
        {
          ownername: ''
        }
      ],
      house: {
        currentPage: 1,
        pageArr:  [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 3,
      },
      isArea: false,
      howTime: 0,
      howDate: '',
      tableExportData: []
    }
  },
  mounted () {
    this.getData('contractValueTable')
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
        var str = '<tr><td>签约额度</td><td>电话</td><td>姓名</td></tr>'
      }
      if (this.num2 === 1) {
        var str = '<tr><td>名字</td><td>签约金额</td></tr>'
      }
      if (this.num2 === 2) {
        var str = '<tr><td>续租人数</td><td>退租人数</td><td>在租人数</td></tr>'
      }
      if (this.num2 === 3) {
        var str = '<tr><td>楼宇名</td><td>空置数量</td><td>小计</td><td>出租数量</td></tr>'
      }
      if (this.num2 === 4) {
        var str = '<tr><td>帐龄(天数)</td><td>用户名</td></tr>'
      }
      if (this.num2 === 5) {
        var str = '<tr><td>实收款（￥）</td><td>用户名</td><td>应付款（￥）</td><td>应付时间</td><td>实付款时间</td><td>备注</td></tr>'
      }
      if (this.num2 === 6) {
        var str = '<tr><td>实收款（￥）</td><td>用户名</td><td>应付款（￥）</td><td>应付时间</td><td>实付款时间</td><td>备注</td></tr>'
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
      var uri = 'data:application/vnd.ms-excel;charset=utf-8;base64,'

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
      // console.log(template)
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
      this.tableTab(this.num2, '当前页数一共x条')
    },
    currentChange (val) {
      this.house.currentPage = val
      this.tableTab(this.num2, '当前第几页')
    },
    // 选中列表
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
        this.Data = []
        if (this.isChartShow === true) {
          this.Data = res.data
          
          if (data === 'rentOrNull') {
            this.chartsTwo()
          } else if (data === 'contractStatus') {
            this.chartsThree()
          } else if(data === 'agingRanking'){
            this.chartsFourth()
          } else if (data === 'rentLine') {
            this.chartsFifth()
          } else if (data === 'propertyLine') {
            this.chartsSixth()
          } else {
            this.charts()
          }
          if (res.data.x.length <= 0) {
            this.$message({
              type: 'error',
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
    // 切换数据
    tableTab1 (index) {
      this.num2 = index
      this.house.currentPage = 1
      this.tableTab(this.num2)
    },
    tableTab (index, changetab) {
      // this.num2 = index
      if (!changetab) {
        this.howDate = ''
      }
      if (this.isChartShow === false) {
        if (changetab === 'exportExcelAll') {
          if (this.num2 === 0) {
            this.getData('contractValueTable', 'exportExcelAll')
          }
          if (this.num2 === 1) {
            this.getData('payRankingTable', 'exportExcelAll')
          }
          if (this.num2 === 2) {
            this.getData('contractStatusTable', 'exportExcelAll')
          }
          if (this.num2 === 3) {
            this.getData('rentOrNullTable', 'exportExcelAll')
          }
          if (this.num2 === 4) {
            this.getData('agingRankingTable', 'exportExcelAll')
          }
          if (this.num2 === 5) {
            this.getData('rentLineTable', 'exportExcelAll')
          }
          if (this.num2 === 6) {
            this.getData('propertyLineTable', 'exportExcelAll')
          }
        } else {
          if (this.num2 === 0) {
            this.getData('contractValueTable')
          }
          if (this.num2 === 1) {
            this.getData('payRankingTable')
          }
          if (this.num2 === 2) {
            this.getData('contractStatusTable')
          }
          if (this.num2 === 3) {
            this.getData('rentOrNullTable')
          }
          if (this.num2 === 4) {
            this.getData('agingRankingTable')
          }
          if (this.num2 === 5) {
            this.getData('rentLineTable')
          }
          if (this.num2 === 6) {
            this.getData('propertyLineTable')
          }
        }
      } else {
        if (this.num2 === 0) {
          this.color = ['#F9A400']
          this.getData('contractValue')
        }
        if (this.num2 === 1) {
          this.color = ['#FF9494']
          this.getData('payRanking')
        }
        if (this.num2 === 2) {
          this.getData('contractStatus')
        }
        if (this.num2 === 3) {
          this.color = ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA']
          this.getData('rentOrNull')
        }
        if (this.num2 === 4) {
          this.color = ['#FF9494']
          this.getData('agingRanking')
        }
        if (this.num2 === 5) {
          this.color = ['#FF9494']
          this.getData('rentLine')
        }
        if (this.num2 === 6) {
          this.color = ['#FF9494']
          this.getData('propertyLine')
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
          show: true,
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
            name:'客户名',
            type : 'category',
            data : this.Data.x,
            // nameRotate: 50,
            axisTick: {
              alignWithLabel: true,
              show: false,
              interval: 0,
            },
            axisLabel: {
              interval: 0,
              rotate:20
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '缴费额度(￥)',
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
            name:'缴费数额',
            type:'bar',
            barWidth: '31px',
            data: this.Data.y,
            label: {
              show: true,
              position: 'top'
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
          show: true,
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
            name: '楼宇名',
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
            name: '占比(%)',
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
            name:'空置率(%)',
            type:'bar',
            stack: '总量',
            barWidth: '40px',
            // data: this.Data.y,
            data: this.Data.yNull,
            label: {
              show: true,
              // position: 'insideTop',
            }
          },
          {
            name:'出租率(%)',
            type:'bar',
            stack: '总量',
            barWidth: '40px',
            data: this.Data.yRent,
            label: {
              show: true
              // position: 'insideTop',
              // distance: 10
            }
          }
        ]
      }, true)
    },
    chartsThree () {
      var myChart2 = echarts.init(document.getElementById('main1'));
      myChart2.setOption({
        color: this.color,
        legend: {
          type: 'plain',
          right: '10%',
          bottom: '30%',
          orient: 'vertical',
        },
        tooltip : {
          show: true,
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
            name:'合约数',
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
            name: '缴费额度(￥)',
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
            name:'缴费数额',
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
    chartsFourth () {
      var myChart3 = echarts.init(document.getElementById('main1'));
      myChart3.setOption({
        // color: ['#F9A400'],
        color: this.color,
        legend: {
          type: 'plain',
          right: '10%',
          bottom: '30%',
          orient: 'vertical',
        },
        tooltip : {
          show: true,
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
            name: '客户名',
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
            name: '帐龄(天数)',
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
            barWidth: '51px',
            type:'bar',
            stack: '总量',
            barWidth: '20px',
            // data: this.Data.y,
            data: this.Data.y,
            label: {
              show: true,
              position: 'insideTop'
            }
          }
        ]
      }, true)
    },
    chartsFifth () {
      var myChart5 = echarts.init(document.getElementById('main1'))
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
      myChart5.setOption({
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
          name: '时间',
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
          name: '租金(￥)',
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
    chartsSixth () {
      var myChart6 = echarts.init(document.getElementById('main1'))
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
      myChart6.setOption({
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
          name: '时间',
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
          name: '物业费(￥)',
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
    }
  },
  components: {
    DecisionCommonHeader
  }
}
// 输出base64编码
function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
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
