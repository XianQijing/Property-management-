<template>
 <div class="historyCharge">
    <div class="search">
      <el-input v-model="input" size="small" placeholder="请输入客户姓名" clearable>
        <template slot="append"><el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button></template>
      </el-input>
    </div>
    <el-button type="primary" size="small" class="all" @click="getHistory('getPayOrderHistory')">全部</el-button>
    <el-table :data="historyMoney" style="width: 100%">
      <!-- <el-table-column prop="roomType" label="房屋类型"></el-table-column> -->
      <el-table-column prop="roomBuilding" label="楼宇"></el-table-column>
      <el-table-column prop="roomNum" label="房号"></el-table-column>
      <el-table-column prop="ownerName" label="客户姓名"></el-table-column>
      <el-table-column prop="payItemName" label="费用类别"></el-table-column>
      <el-table-column prop="shouldPrice" label="应收"></el-table-column>
      <el-table-column prop="payPrice" label="实收"></el-table-column>
      <el-table-column prop="shouldTime" label="应收时间"></el-table-column>
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
      }
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
}
</style>
