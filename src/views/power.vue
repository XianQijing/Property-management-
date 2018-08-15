<template>
<div class="power">
  <div class="main">
    <button class="add" @click="edit(0,0,1)">+ 添加角色</button>
    <button id="shanchu" @click="deleteAll">删除</button>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="角色"></el-table-column>
      <el-table-column prop="name" label="创建时间"></el-table-column>
      <el-table-column prop="name" label="权限管理"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.$index,tableData,2)">编辑</el-button>
          <el-button type="text" @click="deleteRow(scope.$index,tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalDataNumber">
      </el-pagination>
  </div>
  </div>
</div>
</template>

<script>
import url from '../assets/Req.js'
export default {
  name: 'power',
  data(){
    return{
      pageNo: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 50, 100],
      totalDataNumber: 1,//数据的总数,
      multipleSelection: [],
      louIdArr:[],
      tableData: [
        {
          name: '13456',
          id: 222
        }
      ],
    }
  },
  mounted(){
    this.getPower()
  },
  methods: {
    //全选
    handleSelectionChange (val) {
      this.multipleSelection = val
      if(val.length > 0){
        document.getElementById('shanchu').style.cssText = 'background:red;border:1px solid red'
      }else{
        document.getElementById('shanchu').style.cssText = 'background:rgba(245,245,245,1);border:1px solid D9D9D9'
      }
    },
    //批量删除
    deleteAll(){
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(v => {
          this.louIdArr.push(v.id)
        })
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.delete(url + '' + this.louIdArr).then((res) => {
              if (res.data.status === 200) {
                this.getCar()
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
          })
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    //编辑和新增
    edit(index,rows,msg){
      if(msg === 1){
      }else{
      }
    },
    //删除
    deleteRow(index,rows){
      this.id = this.tableData[index].id
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      this.$ajax.get(url + '').then(res => {
        if(res.data.status === 200){
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getPower()
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.getPower()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getPower()
    },
    //获取数据
    getPower(){
      this.$ajax.get(url + '').then(res => {
        if(res.data.status === 200){
          this.tableData = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped>
.add {
  color: white;
  background-color: #32a8ee;
  border: none;
  border-radius: 5px;
  height: 30px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.main {
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  height: 810px;
}

.fenye button {
  background-color: white;
  border: 1px solid #32a8ee;
  color: #32a8ee;
  width: 2em;
}
#shanchu {
  width:64px;
  height:32px;
  background:rgba(245,245,245,1);
  border-radius:5px;
  border: 1px solid #D9D9D9;
  color: #D4D4D4;
}
.fenye {
  float: right;
  padding: 20px 0;
}
</style>

