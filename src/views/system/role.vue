<template>
  <div class="role">
    <router-view></router-view>
    <button @click="AddRole">+ 添加角色</button>
    <button class="shanchu" id="roll_all_del" @click="deleteRoleAll">删除</button>
    <el-table :data="jurisdictionData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="角色" width="180"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
        <el-table-column label="权限管理">
        <template slot-scope="scope">
          <router-link style="color: #6AC8FF; cursor: pointer;" :to="{name: 'Page', query: {id: scope.row.id}}">权限设置</router-link>
        </template>
      </el-table-column>
            <el-table-column label="操作">
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="edit(scope)">编辑</span>
          &nbsp;&nbsp;
          <span style="cursor: pointer;" @click="roleDel(scope)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination
        @size-change="roleSizeChange"
        @current-change="roleCurrentChange"
        :current-page="rolePage.currentPage"
        :page-sizes="rolePage.pageArr"
        :page-size="rolePage.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rolePage.total">
      </el-pagination>
    </div>
    <el-dialog :title="addOrEdit" :visible.sync="dialogFormVisible" width="30%">
      <el-form>
        <el-form-item label="角色名称：" label-width="120px">
          <el-input v-model="rolename" placeholder="请输入角色名称" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addrole">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import url from '../../assets/Req.js'
export default {
  name: 'role',
  data(){
    return{
      dialogFormVisible: false,
      addOrEdit: '添加角色',
      rolename: '',
      multipleSelection: [],
      rolePage: {
        currentPage: 1,
        total: 7,
        pageSize: 5,
        pageArr: [10, 20, 30, 40, 50]
      },
      jurisdictionData:[]
    }
  },
  mounted(){
    this.getRoleData()
  },
  methods:{
    addrole () {
      if (this.rolename === '') {
        this.$message({
          message: '角色名称不能为空',
          type: 'error'
        })
      } else {
        // role/insert name
        var insert = 'role/insert'
        var role = {
          name: this.rolename
        }
        if (this.addOrEdit === '添加角色') {
          insert = 'role/insert'
          role = {
            name: this.rolename
          }
        } else {
          insert = 'role/update'
          role = {
            name: this.rolename,
            id: this.roleid
          }
        }
        this.$ajax.post(url + insert, role).then(res=> {
          if (res.data.status === 200) {
            this.$message({
              message: '角色名称添加成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getRoleData()
          }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      }
    },
    edit (data) {
      // get  /role/findById  id 进入编辑页面接口
      this.$ajax.get(url + 'role/findById', {
        params: {
          id: data.row.id
        }
      }).then(res => {
        if(res.data.status === 200){
        this.dialogFormVisible = true
        this.rolename = res.data.data.name
        this.roleid = res.data.data.id
        this.addOrEdit = '编辑角色'
        }else if(res.data.status===403){
                this.$alert('您的权限不足', '权限不足', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.news = false
                  }
                });
              }
      })
    },
    getRoleData () {
      this.$ajax.get(url + 'role/findAll', {
        params: {
          page: this.rolePage.currentPage,
          pageSize: this.rolePage.pageSize
        }
      }).then(res=> {
        // console.log(res.data.data)
        this.rolePage.total = res.data.data.records
        res.data.data.rows.forEach(v => {
          v.createDate = toDate(v.createDate)
        })
        this.jurisdictionData = res.data.data.rows
      })
    },
    AddRole () {
      this.dialogFormVisible = true
      this.addOrEdit = '添加角色'
      this.rolename = ''
    },
    deleteRoleAll () {
      if (this.multipleSelection.length > 0) {
        var idArr = []
        this.multipleSelection.forEach(v => {
          idArr.push(v.id)
        })
        this.$confirm('是否确定', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post(url + 'role/deleteAll ', 'id=' + idArr).then(res => {
            if (res.data.status === 200) {
              this.getRoleData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择您需要删除的角色'
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
     roleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.rolePage.pageSize = val
      this.getRoleData()
    },
    roleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.rolePage.currentPage = val
      this.getRoleData()
    },
    // 删除角色
    roleDel (data) {
      this.$confirm('是否删除此条信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post(url + 'role/delete', {id: data.row.id}).then(res => {
          // console.log(res.data)
          if (res.data.status === 200) {
            this.getRoleData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
}
function toDate (data) {
  var date = new Date(data)
  return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
}
function zero (data) {
  if (data > 10) return data
  if (data < 10) return '0' + data
}
</script>

<style scoped>
.role{
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
}
.add {
  color: white;
  background-color: #32a8ee;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  border: 1px solid #32a8ee;
  border-radius: 5px;
  width: 100px;
  height: 31px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.operation{
	width: 64px;
	height: 32px;
	border-radius: 5px;
	border: 1px solid #A1CEFF;
	background: white;
	color: #A1CEFF;
}
button {
    color: white;
    background-color: #32a8ee;
    border: none;
    border-radius: 5px;
    height: 30px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>

