<template>
  <div class="operation">
    <div class="date">
      <div class="time">
        <div>
          <span>选择时间:</span>
          <el-button size="small" v-for="(item, index) in date" :key="index" :class="{actived:index == num}" @click="tableTab(index)">{{ item }}</el-button>
        </div>
        <div class="selectTime">
          <span>日期：</span>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </div>
      <div class="search">
        <el-input v-model="input" size="small" placeholder="请输入内容">
          <template slot="append"><el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button></template>
        </el-input>
      </div>
    </div>
    <el-table :data="log" style="width: 100%">
      <el-table-column prop="titleName" label="账号" width="350"></el-table-column>
      <el-table-column prop="content" label="姓名" width="400"></el-table-column>
      <el-table-column prop="signature" label="时间" width="350"></el-table-column>
      <el-table-column prop="signature" label="操作" width="350"></el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination @size-change="handleSizeChangetemplate" @current-change="handleCurrentChangetemplate" :current-page="page.pageNoTemplate"  :page-size="page.pageSizeTemplate" :page-sizes="page.pageSizesListTemplate" layout="total, sizes, prev, pager, next, jumper" :total="page.totalDataNumbertemplate">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import url from '../../assets/Req.js'
export default {
  name: 'operation',
  data(){
    return{
      date: ['近三天', '近一周', '半个月', '一个月'],
      num: 0,
      time: [],
      input: '',
      log:[],
      page: {
        pageNoTemplate: 1,
        pageSizeTemplate: 10,
        totalDataNumbertemplate: 0,
        pageSizesListTemplate: [10,20, 30, 40, 50]
      }
    }
  },
  mounted() {

  },
  methods: {
    getLog() {
      this.$ajax.get(url + '',{
        params: {

        }
      }).then(res => {
        this.log = res.data.data.rows
        this.page.totalDataNumbertemplate = res.data.data.records
      })
    },
    tableTab(index){
      this.num = index
    },
    search(){
      console.log('sfsd')
    },
    handleSizeChangetemplate(val) {
      this.page.pageSizeTemplate = val;
    },
    handleCurrentChangetemplate(val) {
      this.page.pageNoTemplate = val;
    }
  }
}

</script>

<style scoped>
.operation{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  margin-right: 2px;
  height: 810px;
  min-width: 1200px;
}
.time button:hover {
  background: #FF9494;
  color: #fff;
  border-color: #FF9494;
}
.actived {
  background: #FF9494;
  color: #fff;
  outline: none;
  border-color: #FF9494;
}
.time {
  display: flex;
  justify-content: space-between;
}
.date{
  display: flex;
  justify-content: space-between;
  padding: 20px 0 40px 0;
}
.selectTime{
  margin-left: 20px;
}
.fenye {
  float: right;
  padding: 20px 0;
}
</style>

