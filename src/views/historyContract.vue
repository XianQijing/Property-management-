<template>
  <div class="historyContract">
    <router-view class="rent_contract_change"></router-view>
    <el-table :data="tableDataContract" style="width: 100%">
        <el-table-column prop="tenantry" label="客户姓名"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <!-- <el-table-column prop="rooms.useId" label="租用类型"></el-table-column> -->
        <el-table-column prop="namec" label="楼宇"></el-table-column>
        <el-table-column prop="rooms.roomNumber" label="房号"></el-table-column>
        <el-table-column prop="rooms.coveredArea" label="建筑面积(平方米)"></el-table-column>
        <el-table-column prop="purpose" label="用途"></el-table-column>
        <el-table-column prop="rooms.furnitureId" label="验收状态"></el-table-column>
        <el-table-column prop="deliveryTime" label="交付时间"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <button class="operation" @click="detail(scope.$index, tableDataContract)">详情</button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage"  :page-size="page.pageSize" :page-sizes="page.pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="page.totalData">
        </el-pagination>
      </div>
  </div>
</template>
<script>
  import url from '../assets/Req.js'
export default {
  name: 'historyContract',
  data () {
    return {
      tableDataContract: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        totalData: 400,
        pageSizes: [10, 20, 30, 40, 50]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$ajax.get(url + '/contract/selectHistoricalContract/' + this.page.currentPage+'/'+this.page.pageSize).then( res=> {
        if (res.data.status === 200) {
          this.tableDataContract = res.data.data.rows,
          this.page.totalData = res.data.data.records
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getData()
    },
    detail (index, rows) {
      this.$router.push({name: 'Rent_contract_change',query:{id:this.tableDataContract[index].id,msg:'history'}})
      // console.log(this.tableDataContract[index].id)
    }
  }
}
</script>
<style scoped>
.historyContract {
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  height: 810px;
}
.fenye {
  float: right;
  padding: 20px 0;
}
.operation{
	width: 64px;
	height: 32px;
	border-radius: 5px;
	border: 1px solid #A1CEFF;
	background: white;
    color: #A1CEFF;
    margin: 0
}
</style>

