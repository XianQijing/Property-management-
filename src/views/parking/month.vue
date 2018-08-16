<template>
  <div class="month">
    <button class="delect" id="more1" @click="out">批量导出</button>
    <el-table :data="monthData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="车牌号"></el-table-column>
      <el-table-column prop="name" label="入库时间"></el-table-column>
      <el-table-column prop="name" label="出库时间"></el-table-column>
      <el-table-column prop="name" label="应收费用"></el-table-column>
      <el-table-column prop="name" label="实收费用"></el-table-column>
      <el-table-column prop="name" label="是否包月"></el-table-column>
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
      monthData:[{
        name:'1234648'
      }],
      multipleSelection: [],
      more1Id:[],
      //分页数据
      currentPage:1,
      pageSize:10,
      total:30
    }
  },
  mounted(){
    this.getmonth()
  },
  methods: {
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
      this.$ajax.get(url + '').then(res => {
        if(res.data.status === 200){
          this.monthData = res.data
        }
      })
    },
    //导出
    out(){
      if(this.multipleSelection.length > 0){
        this.multipleSelection.forEach(v => {
          this.more1Id.push(v.id)
        })
        this.$ajax.post(url + '').then(res => {
          if(res.data.status === 200){
            this.$message({
              message: '导出成功',
              type: 'success'
            })
          }else{
            this.$message({
              message: '导出失败',
              type: 'error'
            })
          }
        })
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
      this.getmonth()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getmonth()
    }
  }
}
</script>

<style>
.month{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  min-width: 1270px;
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
