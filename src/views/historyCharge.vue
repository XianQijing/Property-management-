<template>
 <div class="historyCharge">
    <div class="search">
      <el-input v-model="input" size="small" placeholder="请输入客户姓名" clearable>
        <template slot="append"><el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button></template>
      </el-input>
    </div>
    <button class="all" @click="getHistory('getPayOrderHistory')">全部</button>
    <button id="more" class="delete2" @click="out" :disabled="disabled">导出</button>
    <el-table :data="historyMoney" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="roomBuilding" label="楼宇"></el-table-column>
      <el-table-column prop="roomNum" label="房号"></el-table-column>
      <el-table-column prop="ownerName" label="客户姓名"></el-table-column>
      <el-table-column prop="payItemName" label="费用类别"></el-table-column>
      <el-table-column prop="shouldPrice" label="应收"></el-table-column>
      <el-table-column prop="payPrice" label="实收"></el-table-column>
      <el-table-column prop="shouldTime" label="所属月份"></el-table-column>
      <el-table-column prop="payTime" label="实收时间"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <!-- <el-table-column>
        <template slot-scope="scope">
          <span ><button @click="editThis(scope.$index,meter)">编辑</button></span>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="fenye">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage"  :page-size="page.pageSize" :page-sizes="page.pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="page.totalData">
      </el-pagination>
    </div>
 </div>
</template>

<script>
import url from "../assets/Req.js";
export default {
  name: 'historyCharge',
  data(){
    return{
      historyMoney: [],
      input: '',
      msg: '',
      page: {
        currentPage: 1,
        pageSize: 10,
        totalData: 400,
        pageSizes: [10, 20, 30, 40, 50]
      },
      multipleSelection: [],
      disabled: true
    }
  },
  mounted(){
    this.getHistory('getPayOrderHistory')
  },
  methods: {
    handleSizeChange(val){
      this.page.pageSize = val
      this.getHistory(this.msg)
    },
    handleCurrentChange(val){
      this.page.currentPage = val
      this.getHistory(this.msg)
    },
    getHistory(msg){
      this.msg = msg
      var params={}
      if(msg === 'getPayOrderHistory'){
        params = {
          page: this.page.currentPage,
          pageSize: this.page.pageSize
        }
      }else{
        params = {
          page: this.page.currentPage,
          pageSize: this.page.pageSize,
          ownerName: this.input
        }
      }
      this.$ajax.get(url + 'pay/' + msg, {params:params}).then(res => {
        this.historyMoney = res.data.data.rows
        this.page.totalData = res.data.data.records
      })
    },
    search(){
      this.page.currentPage = 1
      this.page.pageSize = 10
      this.getHistory('getPayOrderHistoryByOwnerName')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection.length > 0){
        this.disabled = false
        document.getElementById('more').style.cssText = "border:1px solid #32a8ee;background:#32a8ee;color:white"
      }else{
        this.disabled = true
        document.getElementById('more').style.cssText = "border:1px solid rgb(217, 217, 217);background: rgb(245, 245, 245);color:rgb(217, 217, 217)"
      }
    },
    //导出
    out(){
      if(this.multipleSelection.length > 0){
        // this.multipleSelection.forEach(v => {
        //   this.more2Id.push(v.id)
        //   this.more3Id = this.more2Id.join(',')
        // })
      let str = `楼宇, 房号, 客户姓名,费用类别,应收,实收,所属月份,实收时间,备注\n`;
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
      link.download =  "历史费用.csv";
      document.body.appendChild(link);
      link.click();
      }else{
        this.$message({
          message: '请至少选择一条信息',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
.historyCharge{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  height: 810px;
}
.fenye {
  float: right;
  padding: 20px 0;
  display: block !important;
}
.search{
  float: right;
  width: 300px;
  padding: 20px 0;
}
.all {
  margin: 20px 0;
  width: 64px;
	height: 32px;
	border-radius: 5px;
	border: 1px solid #32A8EE;
	background: #32A8EE;
  color: white;
}
</style>
