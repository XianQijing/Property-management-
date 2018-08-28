<template>
  <div class="month">
    <button class="delect" id="more1" @click="out">批量导出</button>
    <el-date-picker
      v-model="time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="selectTime">
    </el-date-picker>
    <el-table :data="monthData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="carPlate" label="车牌号"></el-table-column>
      <el-table-column prop="owner" label="车主"></el-table-column>
      <el-table-column prop="startDate" label="入库时间"></el-table-column>
      <el-table-column prop="endDate" label="出库时间"></el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import url from '@/assets/Req.js'
export default {
  name: 'month',
  data(){
    return{
      time:[],
      monthData:[{
        name:'1234648'
      }],
      multipleSelection: [],
      more1Id:[],
      //分页数据
      currentPage:1,
      pageSize:10,
      total:30,
      more2Id:''
    }
  },
  mounted(){
    this.getmonth()
  },
  methods: {
    selectTime(){
      if(this.time){
        this.$ajax.get(url + 'pack/findCmCardAllByDate',{
          params:{
            "begTime": this.time[0],
            "endTime": this.time[1],
            "page":this.currentPage,
            "pageSize":this.pageSize
          }
        }).then(res => {
          if(res.data.status === 200){
            this.monthData = res.data.data.rows
            this.total = res.data.data.records
          }
        })
      }else{
        this.getmonth()
      }
    },
    //多选变色
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection.length > 0){
        document.getElementById('more1').style.cssText = "border:1px solid #32a8ee;background:#32a8ee;color:white"
      }else{
        document.getElementById('more1').style.cssText = "border:1px solid rgb(217, 217, 217);background: rgb(245, 245, 245);color:rgb(217, 217, 217)"
      }
    },
    //今日停车数据
    getmonth(){
      this.$ajax.get(url + 'pack/findCmCardAll',{
        params:{
          "page":this.currentPage,
          "pageSize":this.pageSize
        }
      }).then(res => {
        if(res.data.status === 200){
          this.monthData = res.data.data.rows
          this.total = res.data.data.records
        }
      })
    },
    //导出
    out(){
      if(this.multipleSelection.length > 0){
        this.multipleSelection.forEach(v => {
          this.more1Id.push(v.id)
          this.more2Id = this.more1Id.join(',')
        })
<<<<<<< HEAD
        var str = '<tr><td>车牌号</td><td>入库时间</td><td>出库时间</td><td>应收费用</td><td>实收费用</td><td>是否包月</td></tr>'

=======
        var str = '<tr><td>车牌号</td><td>车主</td><td>入库时间</td><td>出库时间</td>/tr>'
>>>>>>> XianQijing
        for(let i = 0 ; i < this.multipleSelection.length; i++ ){
        str += '<tr>'
        for(let item in this.multipleSelection[i]){
          //增加\t为了不让表格显示科学计数法或者其他格式
          // console.log(this.tableExportData[i][item])
          str += `<td>${ this.multipleSelection[i][item] + '\t'}</td>`;    
        }
        }
        str += '</tr>'
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
      }else{
        this.$message({
          message: '请至少选择一条信息',
          type: 'error'
        })
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val
      if(this.time){
        this.selectTime()
      }else{
        this.getmonth()
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if(this.time){
        this.selectTime()
      }else{
        this.getmonth()
      }
    }
  }
}
function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
</script>

<style>
.month{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  height: 810px;
}
.delect {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(212, 212, 212);
  border-width: 1px;
  border-color: rgb(217, 217, 217);
  border-style: solid;
  border-radius: 5px;
  background-color: rgb(245, 245, 245);
  width: 100px;
  height: 31px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.fenye {
  float: right;
  padding: 20px 0;
}
</style>
