<template>
  <div class="history">
    <button class="delect" id="more2" @click="out">批量导出</button>
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      @change="selectTime">
    </el-date-picker>
    <el-table :data="historyData" style="width: 100%" @selection-change="handleSelectionChange"  :row-class-name="tableRowClassName">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="carNo" label="车牌号"></el-table-column>
      <el-table-column prop="inputTime" label="入库时间"></el-table-column>
      <el-table-column prop="outTime" label="出库时间"></el-table-column>
      <el-table-column prop="receivable" label="应收费用"></el-table-column>
      <el-table-column prop="reality" label="实收费用"></el-table-column>
      <!-- <el-table-column prop="reality" label="是否包月"></el-table-column> -->
    </el-table>
    <div class="fenye">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 100]"
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
  name: 'history',
  data(){
    return{
      historyData:[{
        name:'1234648'
      }],
      multipleSelection: [],
      more2Id:[],
      //分页数据
      currentPage:1,
      pageSize:10,
      total:30,
      more3Id:'',
      time:[]
    }
  },
  mounted(){
    this.gethistory()
  },
  methods: {
    // 变色
    tableRowClassName({row, rowIndex}) {
      if (row.receivable !== row.reality) {
        return 'ww';
      }
      return 'tt';
    },
    //选择时间
    selectTime(){
      if(this.time){
        this.$ajax.get(url + 'pack/findPackRecordLastByDate',{
          params:{
            "begTime": this.time[0],
            "endTime": this.time[1],
            "page":this.currentPage,
            "pageSize":this.pageSize
          }
        }).then(res => {
          if(res.data.status === 200){
            this.historyData = res.data.data.rows
            this.total = res.data.data.records
          }else{
            this.$message({
              message: '没有数据',
              type: 'error'
            })
          }
        })
      }else{
        this.gethistory()
      }
    },
    //多选变色
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection.length > 0){
        document.getElementById('more2').style.cssText = "border:1px solid #32a8ee;background:#32a8ee;color:white"
      }else{
        document.getElementById('more2').style.cssText = "border:1px solid rgb(217, 217, 217);background: rgb(245, 245, 245);color:rgb(217, 217, 217)"
      }
    },
    //今日停车数据
    gethistory(){
      this.$ajax.get(url + 'pack/findLastPackRecord',{
        params:{
          "page":this.currentPage,
          "pageSize":this.pageSize
        }
      }).then(res => {
        if(res.data.status === 200){
          this.historyData = res.data.data.rows
          this.total = res.data.data.records
        }
      })
    },
    //导出
    out(){
      if(this.multipleSelection.length > 0){
        this.multipleSelection.forEach(v => {
          this.more2Id.push(v.id)
          this.more3Id = this.more2Id.join(',')
        })
      let str = `车牌号, 应收费用, 实收费用,入库时间,出库时间\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      for(let i = 0 ; i < this.multipleSelection.length ; i++ ){
        for(let item in this.multipleSelection[i]){
            str+=`${this.multipleSelection[i][item] + '\t'},`;     
        }
        str+='\n';
      }
      //encodeURIComponent解决中文乱码
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      //通过创建a标签实现
      var link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download =  "历史停车.csv";
      document.body.appendChild(link);
      link.click();
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
        if(this.time.length != 0){
          this.selectTime()
        }else{
          this.gethistory()
        }
      }else{
        this.gethistory()
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if(this.time){
        if(this.time.length != 0){
          this.selectTime()
        }else{
          this.gethistory()
        }
      }else{
        this.gethistory()
      }
    }
  }
}
function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
</script>

<style scoped>
.history{
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
<style>
.ww {
  background: oldlace!important;
}
</style>

