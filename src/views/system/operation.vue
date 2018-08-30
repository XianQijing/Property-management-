<template>
  <div class="operation">
    <div class="date">
      <div class="time">
        <div>
          <span>选择时间:</span>
          <el-button size="small" v-for="(item, index) in date" :key="index" :value="item.value" :class="{actived:index == num}" @click="tableTab1(index)">{{ item.name }}</el-button>
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
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="tableTab1(5)">
          </el-date-picker>
        </div>
      </div>
      <div class="search">
        <el-input v-model="input" size="small" placeholder="请输入内容" clearable>
          <template slot="append"><el-button type="primary" size="small" icon="el-icon-search" @click="tableTab1(6)">搜索</el-button></template>
        </el-input>
      </div>
    </div>
    <el-table :data="log" style="width: 100%">
      <el-table-column prop="createBy" label="账号" width="350"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="400"></el-table-column>
      <el-table-column prop="createDate" label="时间" width="350"></el-table-column>
      <el-table-column prop="title" label="操作" width="350"></el-table-column>
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
      date: [{name: '全部', value: '0'},{name:'近三天', value:-3}, {name:'近一周', value:-7}, {name:'半个月', value:-15}, {name:'一个月', value:-30}],
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
  mounted(){
    this.tableTab(this.num)
  },
  methods: {
    tableTab(index){
      // this.num = index
      if(index === 0) {
      this.$ajax.get(url + 'log/findLog',{
        params: {
          "page": this.page.pageNoTemplate,
          "pageSize": this.page.pageSizeTemplate
        }
      }).then(res => {
        this.log = res.data.data.rows
        this.page.totalDataNumbertemplate = res.data.data.records
      })
    }else if(index === 5){
      if(this.time){
        this.$ajax.get(url + 'log/findLogByData',{
          params:{
            "page": this.page.pageNoTemplate,
            "pageSize": this.page.pageSizeTemplate,
            "begDate": this.time[0],
            "endDate": this.time[1]
          }
        }).then(res => {
          this.log = res.data.data.rows
          this.page.totalDataNumbertemplate = res.data.data.records
        })
      }else{
        this.tableTab(0)
      }
    }else if(index === 6){
      if(this.input){
        this.$ajax.get(url + 'log/findByUserName',{
          params: {
            "page": this.page.pageNoTemplate,
            "pageSize": this.page.pageSizeTemplate,
            "userName": this.input
          }
        }).then(res => {
          if(res.data.status === 200){
            this.log = res.data.data.rows
            this.page.totalDataNumbertemplate = res.data.data.records
          }else{
            this.$message({
              message: res.data.msg,
              error: 'error'
            })
          }
        })
      }else{
        this.tableTab(0)
      }
    }else{
      this.$ajax.get(url + 'log/findLogByData',{
        params:{
          "page": this.page.pageNoTemplate,
          "pageSize": this.page.pageSizeTemplate,
          "begDate": getDay(this.date[index].value),
          "endDate": getDay(0)
        }
      }).then(res => {
        this.log = res.data.data.rows
        this.page.totalDataNumbertemplate = res.data.data.records
      })
    }
    },
    tableTab1(index){
      this.num = index
      this.page.pageNoTemplate = 1
      this.tableTab(this.num)
    },
    handleSizeChangetemplate(val) {
      this.page.pageSizeTemplate = val;
      setTimeout(this.tableTab(this.num),1000)
    },
    handleCurrentChangetemplate(val) {
      this.page.pageNoTemplate = val;
      setTimeout(this.tableTab(this.num),1000)
    },
    Page(){
      this.page.pageNoTemplate = 1;
    }
  }
}

function getDay(day){
    var today = new Date();
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear+"-"+tMonth+"-"+tDate;
}
function doHandleMonth(month){
    var m = month;
    if(month.toString().length == 1){
     m = "0" + month;
    }
    return m;
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
  min-width: 1250px;
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

