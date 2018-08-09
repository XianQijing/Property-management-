<template>
  <div class="fenye">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
		</el-pagination>
	</div>
</template>

<script>
export default {
  name:'fenye',
  data(){
    return{
      pageNo: 1,
      pageSize: 10,
      pageSizesList: [10, 15, 20, 30, 50],
      tableData: [],//返回的结果集合
      totalDataNumber: 400,//数据的总数,
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    }
  },
}
</script>

