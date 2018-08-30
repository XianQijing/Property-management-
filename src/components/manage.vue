<template>
    <div class="manage">
        <el-container>
            <el-aside width="200px">
                <div class="departNav">
        <h1>部门</h1>
        <el-button type="text" @click="qq" v-if="this.data5.length == 0">添加部门</el-button>
       <el-tree :data="data5" node-key="id"  @node-click="back" lazy>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <div class="aa">
          <img src=".././assets/add.png" @click="() => qq(node, data)" class="tianjia" >
          <img src=".././assets/delet.png" class="shanchu"  @click="() => remove(node, data)"/>
        </div>
      </span>
    </el-tree>
    <el-dialog
  title="添加"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="mingcheng">
  <div class="name1">部门名称：</div>
    <el-input v-model="name"></el-input>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="() => append(this.pp)">确 定</el-button>
  </span>
</el-dialog>

    </div>
            </el-aside>
            <el-main>
        <div class="body">
            <div class="title">
                <h3>人员</h3><span>共5条记录</span>
                </div>
                    <el-table :data="tableData2" style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="username" label="用户名"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="cname" label="所属部门"></el-table-column>
                        <el-table-column prop="rname" label="角色"></el-table-column>
                        <!-- <el-table-column prop="file" label="个人文档"></el-table-column> -->
                        <el-table-column label="停用">
                            <template  slot-scope="scope">
                            <button class="stop" @click="stop(scope.$index,tableData2)">停用</button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="fenye">
                    <div class="fenye">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNoCustomerMsg"  :page-size="pageSizeCustomerMsg" :page-sizes="pageSizesListCustomerMsg" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumbercustomerMsg">

                        </el-pagination>
                    </div>
                </div>
                </div>
                
            </el-main>
            
        </el-container>
    </div>
</template>

<script>
// import departNav from './departNav'
import url from '../assets/Req.js'
let id = 1000;
export default {
    name: 'manage',
    data(){
        return{
        data5: [],
        dialogVisible: false,
        pageNoCustomerMsg: 1,
        pageSizeCustomerMsg: 10,
        pageSizesListCustomerMsg: [10,20, 50, 100],
        totalDataNumbercustomerMsg: 400,//customerMsg数据的总数,
        name:'',
        id:'1',
        isThird: true,
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ]},
            tableData2: []
        }
    },
    mounted(){
        this.getbumen()
    },
    methods: {
      append(data) {
        const newChild = { id: id++, label: this.name, children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        if (this.name !=='') {
        data.children.push(newChild);
        this.dialogVisible = false;
        }else{
            
        }
        if(!this.name){
            this.$message({
                message: '请输入部门名称',
                type: 'error'
            })
        }else{
            this.$ajax.post(url + 'company/insert?id='+data.id +'&name='+this.name).then(res=>{
                if(res.data.status===200){
                    this.$message({
                    message: '添加成功',
                    type: 'success'
                })
                // this.getbumen()
                }else if(res.data.status===403){
                    this.$message({
                        message: '权限不足',
                        type: 'error'
                    })
                }else{
                    this.$message({
                        message: '添加失败',
                        type: 'error'
                    })
                }
            })
        }
      },
      back(e,node){
            this.id = e.id
            if(this.id){
            this.$ajax.post(url + 'company/findCompanyById',"id="+e.id).then(res =>{
                var child = res.data.data;
                if (!e.children) {
                    this.$set(e, 'children', []);
                    }
                    // this.id = ''
                e.children = res.data.data
            })
            }
            this.$ajax.get(url+'company/findUser',{
                params:{
                    "id":this.id,
                    "page":1,
                    "pageSize":this.pageSizeCustomerMsg
                }
            }).then((res) => {
                this.tableData2 = res.data.data.rows
                this.totalDataNumbercustomerMsg = res.data.data.records
            })
            
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        this.$confirm('此操作将删除该部门及下属部门, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'}).then(() => {
                    this.$ajax.post(url + 'company/delete',"id="+data.id).then(res=>{
                        if(res.data.status === 200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            // this.getbumen()
                            children.splice(index, 1);
                        }else if(res.data.status===403){
                            this.$message({
                                message: '权限不足',
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

      qq (node, data) {
      if (node.level !== 3) {
        this.dialogVisible = true;
        this.pp = data;
        this.name = '';
        // this.isThird = true
      } else {
        //   this.isThird = false
      }
    },

      getbumen(){
          this.$ajax.get(url + 'company/findCompany').then(res => {
              var data = res.data.data
              this.data5= res.data.data
              this.id = this.data5[0].id
          }),
          this.$ajax.get(url + 'company/findUser',{
              params:{
                        "id":this.id,
                        "page":this.pageNoCustomerMsg,
                        "pageSize":this.pageSizeCustomerMsg
                    }
          }).then(res => {
              if(res.data.status === 200){
                this.tableData2= res.data.data.rows
                this.totalDataNumbercustomerMsg = res.data.data.records
              }else if(res.data.status === 403){
                  
              }
          })
      },
      handleSizeChange(val) {
        this.pageSizeCustomerMsg = val;
        this.getcustomerMsg()
      },
      handleCurrentChange(val) {
        this.pageNoCustomerMsg = val;
        this.getcustomerMsg()
      },
      getcustomerMsg() {
                this.$ajax.get(url+'company/findUser',{
                    params:{
                        "id":this.id,
                        "page":this.pageNoCustomerMsg,
                        "pageSize":this.pageSizeCustomerMsg
                    }
                }).then((res) => {
					this.tableData2 = res.data.data.rows
					this.totalDataNumbercustomerMsg = res.data.data.records
				})
            },
    stop(index,rows){
        var thisId = this.tableData2[index].id;
        // rows.splice(index, 1);
        this.$confirm('此操作将停用此人员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'}).then(() => {
                    this.$ajax.post(url + 'user/logicDelete',"id="+thisId).then(res => {
                        if(res.data.status === 200){
                            this.$message({
                                message: '停用成功',
                                type: 'success'
                            })
                            this.getcustomerMsg()
                        }else if(res.data.status===403){
                            this.$message({
                                message: '权限不足',
                                type: 'error'
                            })
                        }else {
                            this.$message({
                                message: '停用失败',
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
    //  loadNode(node, resolve) {
    //      if (node.level === 0) {
    //       return resolve([{ name: 'region' }]);
    //     }
    //     if (node.level > 1) return resolve([]);

    //     setTimeout(() => {
    //       const data = [{
    //         name: 'leaf',
    //         leaf: true
    //       }, {
    //         name: 'zone'
    //       }];

    //       resolve(data);
    //     }, 500);
    //     }
    }
}
</script>

<style scoped>

h3{
    display: inline-block;
    margin: 1% 16px;
}
.biaodan span{
    width: 12%;
    text-align: center;
    display: inline-block;
    padding: 16px 0;
    font-size: 12px;
    font-family: "Microsoft YaHei";
}
.name {
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: rgb(111, 192, 85);
  line-height: 2.667;
}
.head{
  background-color: rgb(250, 250, 250);
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
}
.el-main button {
  border:1px solid rgb(46, 146, 255);
  border-radius: 5px;
  background: white;
  width: 58px;
  height: 30px;
}
label {
        width: 100%;
}

.departNav h1 {
    padding-left: 2%;
    font-size: 1.5vw;
}

li {
    height: 51px;
	list-style-type: none;
	color: black;
	width: 100%;
	text-align: center;
    background-color: white;
    padding-right: 50px;
}
.tianjia{
    width: 20px;
    position: relative;
    left: 8px;
}
.shanchu {
    width: 35px;
}
.name1 {
    margin-left: 2%;
    display: inline-block;
}
.el-input{
    display: inline-block;
    width: 70%;
}
.mingchen {
    width: 50%;
}
.aa{
    display: inline-block;
}
.fenye {
		float: right;
		padding: 20px 0;
	}
</style>
