<template>
    <div class="manage">
        <el-container>
            <el-aside width="200px">
                <div class="departNav">
        <h1>部门</h1>
       <el-tree :data="data5"  node-key="id" default-expand-all  @node-click="back">
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
              <el-table-column prop="rname" label="岗位"></el-table-column>
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
        id:'',
        isThird: true,
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ]},
            tableData2: [
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
                {
                    userName: 'admin',
                    name2: '系统管理员',
                    position2: '所有部门',
                    post2: '部门经理',
                    role: '系统管理员',
                    file: '2048M',
                },
            ]
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
        // console.log(data.id)
      }
      this.$ajax.post(url + 'company/insert?id='+data.id + '&name=' + this.name).then((res) => {
        console.log(res.data)
      })
    },
    back (e) {
      // console.log(e);
      this.$ajax.post(url + 'company/findCompanyById',"id="+e.id).then(res =>{
        var child = res.data.data;
        // console.log(child)
        if (!e.children) {
          this.$set(e, 'children', []);
        }
        this.id = e.id
        e.children = res.data.data
        this.$ajax.get(url+'company/findUser',{
          params:{
            "id":this.id,
            "page":1,
            "pageSize":this.pageSizeCustomerMsg
          }
        }).then((res) => {
          // console.log(res.data.data)
          this.tableData2 = res.data.data.rows
          this.totalDataNumbercustomerMsg = res.data.data.records
        })
      })
    },
    remove (node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      
      this.$ajax.post(url + 'company/delete',"id="+data.id).then(res=>{
          // console.log(res)
      })
    },

    qq (node, data) {
      // console.log(data)
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
        //   console.log(res.data.data)
          this.data5= res.data.data
        //   console.log(res.data.data)
      }),
      this.$ajax.get(url + 'company/findUser',{
        params:{
          "id":1,
          "page":this.pageNoCustomerMsg,
          "pageSize":this.pageSizeCustomerMsg
        }
      }).then(res => {
        //   console.log(res.data.data.rows)
        this.tableData2= res.data.data.rows
        this.totalDataNumbercustomerMsg = res.data.data.records
        //   console.log(res.data.data)
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSizeCustomerMsg = val;
      this.getcustomerMsg()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
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
          // console.log(res.data.data)
        this.tableData2 = res.data.data.rows
        this.totalDataNumbercustomerMsg = res.data.data.records
      })
    },
    stop(index,rows){
      var thisId = this.tableData2[index].id;
      rows.splice(index, 1);
      this.$ajax.post(url + 'user/logicDelete',"id="+thisId).then(res => {
        // console.log(res)
      })
    }
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
button {
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
