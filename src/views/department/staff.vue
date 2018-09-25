<template>
  <div class="staff">
    <div class="main">
      <button @click="openAdd" class="btnn">+ 添加新员工</button>
      <button @click="isShow = !isShow" class="btnn">导入</button>
      <button class="delete2" @click="allDelete" id="clear">删除</button>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="wechat" label="微信号" width="180"></el-table-column>
        <el-table-column prop="username" label="昵称" width="180"></el-table-column>
        <el-table-column prop="rname" label="职位" width="180"></el-table-column>
        <el-table-column prop="cname" label="部门" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column width="180">
          <template slot-scope="scope"  v-if="scope.row.phone == role3 || role4 == 'admin' || role4 == '经理'">
            <button class="operation" @click="toUserEdit(scope.$index, tableData)">编辑</button>
            <button class="delete1" @click="deleteRow(scope.$index, tableData)" >删除</button>
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
    <el-dialog
        title="导入"
        :visible.sync="isShow"
        width="30%">
      <div class="put">
        <p>导入设置:</p>
        <form>
          <ul class="shuju">
            <li>
              <el-radio v-model="radio" label="0">重复数据不导入</el-radio>
            </li> 
            <li>
              <el-radio v-model="radio" label="1">重复数据覆盖</el-radio>
            </li>
          </ul>
        </form>
        <div class="upload">
          <span>选择excel上传：</span><div class="file"><input type="file" @change="getPath" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>点击上传</div>
        </div>
        <div>{{this.fileName}}</div>
      </div>
                  
      <div>
        <p>如何导入通讯录</p>
        <ul class="liebiao">
          <li class="how">数据导入采用Excel表格导入</li>
          <li>1、不支持Excel公式导入，尽量去除所有文字和表格样式</li>
          <li>2、只支持工作表1导入</li>
          <li>3、请点击下载微小区实例</li>
          <li>4、如需导入时间，时间格式必须为YYYY-MM-DD(例如：2016-01-01)</li>
          <li class="how">必须项目(必须项目不能为空且不能重复)</li>
          <li>姓名</li>
          <li>手机号（必须是手机格式且不能重复）</li>
          <li>密码不得带‘.’（小数点）</li>
          <li>部门（必须与组织架构对应）</li>
          <li>选填项目（选填项目可以为空）</li>
          <li>微信（填写员工微信号）</li>
          <li>昵称（填写员工昵称）</li>
          <li>职位（填写员工职位）</li>
          <li>备注</li>
        </ul>
      </div>
      <div class="footer1">
        <button class="confirm" @click="submit">确定</button><button class="cancel" @click="isShow = !isShow">取消</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import url from '../../assets/Req.js'
export default {
  name: 'staff',
  data () {
    return {
      role4: '',
      role3: '',
      add: false,
      Data: [],
      options: [],
      isShow:false,
      tableData: [],
      multipleSelection: [],
      pageNo: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 50, 100],
      totalDataNumber: 1,//数据的总数,
    }
  },
  mounted () {
    this.staff()
  },
  methods: {
    openAdd(){
      this.add = true;
      this.Area()
    },
    Area(){
      this.$ajax.get(url + 'company/findAll').then((res) => {
        this.Data = res.data.data
        this.options = this.transTreeData(this.Data)
      })
    },
    //职员信息批量删除
    allDelete() {
      let comments = this.multipleSelection
      let num = []
      for (let i = 0;i<comments.length;i++) {
        num.push(comments[i].id)
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post(url + "user/delete","id="+num).then(res=>{
            if(res.data.status === 200){
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.staff()
            }else if(res.data.status===403){
              this.$message({
                message:'权限不足',
                type: 'error'
              })
            }else{
              this.$message({
                message: '删除失败',
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
    staff(){
      this.$ajax.get(url + 'user/findUser',{params:{'page':this.pageNo,'pageSize':this.pageSize}}).then((res) => {
        if(res.data.status === 200){
          this.tableData = res.data.data.rows;
          this.totalDataNumber=res.data.data.records;
        }else if(res.data.status === 403){
          this.$confirm('权限不足', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        document.getElementById('clear').style.cssText = 'background:red;border:1px solid red;color:white'

      } else {
        document.getElementById('clear').style.cssText = 'background:#f5f5f5;border:1px solid rgb(217, 217, 217);color:rgb(217, 217, 217)'
      }
    },
    toUserEdit(index, rows){
      this.Area()
      let that = this;
      that.id = this.tableData[index].id;
      this.$ajax.get(url + 'user/findById',{params:{"token":this.id}}).then((res) => {
        if(res.data.status === 200){
          this.addpersonEdit.name = res.data.data.name;
          this.addpersonEdit.nickname = res.data.data.username;
          this.addpersonEdit.number = res.data.data.phone;
          this.addpersonEdit.mima = res.data.data.password;
          this.addpersonEdit.wechat = res.data.data.wechat;
          this.addpersonEdit.email = res.data.data.email;
          this.addpersonEdit.position = res.data.data.roleId;
          this.addpersonEdit.beizhu = res.data.data.remark;
          this.zhiyuan = true;
          this.addpersonEdit.img = res.data.data.photo
          this.$ajax.get(url + 'company/findById?id='+res.data.data.orgId).then(res=> {
            let arr = res.data.data[0].parentIds.split(',').slice(1)
            arr.push(res.data.data[0].value)
            this.addpersonEdit.gangwei = arr
          })
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
			})
    },
    deleteRow(index, rows) {
      let that = this;
      that.id = this.tableData[index].id;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post(url + 'user/deleteById',"id="+this.id).then((res) => {
          if(res.data.status === 200){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.staff()
          }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }else {
            this.$message({
              message: '删除失败',
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
    handleSizeChange(val) {
      this.pageSize = val;
      setTimeout(this.staff,1000)
    },
    //职员信息
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.staff();
    },
  }
}
</script>
