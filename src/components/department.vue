<template>
  <div class="department">
    <nav-bar/>
    <div class="container">
            
      <nav-header></nav-header>
      <div class="card row">
        <div class="col-md-12">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!--部门管理-->
            <el-tab-pane label="部门管理" name="first">
                <manage-name></manage-name>
            </el-tab-pane>

            <!--职员信息-->
            <el-tab-pane label="职员信息" name="second">
              <div class="main">
                <button @click="add = !add">+ 添加新员工</button>
                <button @click="isShow = !isShow">导入</button>
                <button class="shanchu" @click="allDelete">删除</button>
                <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="name" label="姓名" width="180"></el-table-column>
									<el-table-column prop="phone" label="手机号" width="180"></el-table-column>
									<el-table-column prop="wechat" label="微信号"></el-table-column>
									<el-table-column prop="username" label="昵称"></el-table-column>
									<el-table-column prop="rname" label="职位"></el-table-column>
									<el-table-column prop="cname" label="部门"></el-table-column>
									<el-table-column prop="remark" label="备注"></el-table-column>
									<el-table-column>
                    <template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                          操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="toUserEdit(scope.$index, tableData)"><el-dropdown-item>编辑</el-dropdown-item></span>
													<span @click="deleteRow(scope.$index, tableData)"><el-dropdown-item>删除</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
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
            </el-tab-pane>
            <!--往来单位-->
            <el-tab-pane label="往来单位" name="third">
              <div class="main">
                <button @click="contact = !contact">+ 添加联系人</button>
                <!-- <button @click="isShow = !isShow">导入</button> -->
                <button @click="test">删除</button>
                <el-table :data="tableData1" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="btypeName" label="单位名称" width="180"></el-table-column>
									<el-table-column prop="type" label="部门" width="180"></el-table-column>
									<el-table-column prop="linkman" label="姓名"></el-table-column>
									<el-table-column prop="business" label="职务"></el-table-column>
									<el-table-column prop="phone" label="联系电话"></el-table-column>
									<el-table-column prop="address" label="地址"></el-table-column>
									<el-table-column prop="remark" label="备注"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                          操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
												<el-dropdown-menu slot="dropdown">
													<el-dropdown-item>房屋操作</el-dropdown-item>
													<el-dropdown-item>编辑</el-dropdown-item>
													<el-dropdown-item><button @click="deleteRowB(scope.$index, tableData)">删除</button></el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
                <div class="fenye">
									<el-pagination
                      @size-change="handleSizeChangeB"
                      @current-change="handleCurrentChangeB"
                      :current-page="pageNoB"
                      :page-sizes="pageSizesListB"
                      :page-size="pageSizeB"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalDataNumberB">
                  </el-pagination>
								</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>   
      </div>


      <!-- 职员信息-编辑 -->
      <el-dialog
        title="编辑员工"
        :visible.sync="zhiyuan"
        width="30%">
        <el-form  :model="addpersonEdit" ref="addpersonEdit" label-width="80px" size="small" class="chuang">
              <el-form-item label="姓名:">
                <el-input placeholder="请输入姓名" v-model="addpersonEdit.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称:">
                <el-input id="nickname" placeholder="请输入昵称" v-model="addpersonEdit.nickname"></el-input>
            </el-form-item>
              <el-form-item label="手机号:">
                <el-input id="phone" placeholder="请输入手机号" v-model="addpersonEdit.number"></el-input>
            </el-form-item>
              <el-form-item label="密码:">
                <el-input id="mima" placeholder="新增密码" v-model="addpersonEdit.mima" type="password"></el-input>
            </el-form-item>
              <el-form-item label="微信号:">
                <el-input id="wechart" placeholder="请输入微信号" v-model="addpersonEdit.wechat"></el-input>
            </el-form-item>
              <el-form-item label="邮箱:">
                <el-input id="email" placeholder="请输入邮箱" v-model="addpersonEdit.email"></el-input>
            </el-form-item>
              <el-form-item label="角色:">
                <el-select  id="position" placeholder="请输入职位" v-model="addpersonEdit.position">
                  <el-option v-for="roleAdd in role" :key="roleAdd.id" :value="roleAdd.id" :label="roleAdd.name"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="岗位:">
                <!-- <el-input id="gangwei"  placeholder="请输入岗位" v-model="addperson.gangwei"></el-input> -->
                <el-cascader id="gangwei1" expand-trigger="hover" :options="options" v-model="addpersonEdit.gangwei" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input id="remark" placeholder="备注信息" v-model="addpersonEdit.beizhu"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="zhiyuan = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
        </span>
      </el-dialog>
      <!--导入弹窗-->
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
          <div>{{this.file}}</div>
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
      <!--添加新员工弹窗-->
      <el-dialog
        title="添加新员工"
        :visible.sync="add"
        width="30%">
        <el-form  :model="addperson" ref="addperson" label-width="80px" size="small" class="chuang">
            <el-form-item label="姓名:">
                <el-input placeholder="请输入姓名" v-model="addperson.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称:">
                <el-input id="nickname" placeholder="请输入昵称" v-model="addperson.nickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
                <el-input id="phone" placeholder="请输入手机号" v-model="addperson.number"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input id="mima" placeholder="新增密码" v-model="addperson.mima"></el-input>
            </el-form-item>
            <el-form-item label="微信号:">
                <el-input id="wechart" placeholder="请输入微信号" v-model="addperson.wechat"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
                <el-input id="email" placeholder="请输入邮箱" v-model="addperson.email"></el-input>
            </el-form-item>
            <el-form-item label="角色:">
                <el-select  id="position" placeholder="请输入职位" v-model="addperson.position">
                  <el-option v-for="roleAdd in role" :key="roleAdd.id" :value="roleAdd.id" :label="roleAdd.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="岗位:">
                <!-- <el-input id="gangwei"  placeholder="请输入岗位" v-model="addperson.gangwei"></el-input> -->
                <el-cascader id="gangwei" expand-trigger="hover" :options="options" v-model="addperson.gangwei" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input id="remark" placeholder="备注信息" v-model="addperson.beizhu"></el-input>
            </el-form-item>
        </el-form>
        <div class="footer">
          <button class="confirm" @click="addOne">确定</button><button class="cancel" @click="add = !add">取消</button>
        </div>
      </el-dialog>
      <!--外部联系人-->
      <el-dialog
          title="添加外部联系人"
          :visible.sync="contact"
          width="30%">
          <el-form ref="form" :model="btype" label-width="80px" size="small" class="chuang">
          <el-form-item label="单位名称:">
                      <el-input id="btypeName"  placeholder="请输入单位" v-model="btype.btypeName"></el-input>
          </el-form-item>
          <el-form-item label="部门:">
                      <el-input id="type" placeholder="请输入部门" v-model="btype.type"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
                      <el-input id="linkman" placeholder="请输入姓名" v-model="btype.linkman"></el-input>
          </el-form-item>
          <el-form-item label="职务:">
                      <el-input id="business" placeholder="请输入职务" v-model="btype.business"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
                      <el-input id="phone" placeholder="请输入联系电话" v-model="btype.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
                      <el-input id="address" placeholder="请输入地址" v-model="btype.address"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
                      <el-input id="remark" placeholder="请输入备注" v-model="btype.remark"></el-input>
          </el-form-item>
          </el-form>
          <div class="footer">
                      <button class="confirm" @click="addBtype">确定</button><button class="cancel" @click="contact = !contact">取消</button>
          </div>
      </el-dialog>

      <!--修改-->
      <div class="xiugai" v-show="modify">
        <div class="modal-content">
          <div class="atitle">
            <span class="close" @click="modify = !modify">&times;</span>
            <p>添加部门</p>
          </div>
          <div class="body">
            部门名称 <input type="text" v-model="position" @keyup="changePosition">
          </div>
          <div class="footer">
            <button class="confirm" @click="addOne">确定</button><button class="cancel" @click="modify = !modify">取消</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { setCookie,getCookie,delCookie } from '.././assets/js/cookie.js'
import NavBar from '.././components/NavBar.vue'
import NavHeader from '.././components/NavHeader.vue'
import departNav from './departNav'
import manageName from './manage'
import url from '../assets/Req.js'
import qs from 'qs';




let id = 1000;
export default {
    name: 'department',
    data(){
        const datato = [{
            id: 1,
            label: '一级 1',
            children: []
        }];
        return{
            Data: [],
            options: [],
            file:'',
            src:'',
            username:'',
            radio:'0',
            pageNo: 1,
            pageSize: 1,
            pageSizesList: [1, 2, 3, 4, 5],
            totalDataNumber: 1,//数据的总数,
            pageNoB: 1,
            pageSizeB: 1,
            pageSizesListB: [1, 2, 3, 4, 5],
            totalDataNumberB: 1,//数据的总数,
            // toggle:'',
            zhiyuan:false,
            multipleSelection: [],
            person: [],
            isShow:false,
            add:false,
            activeName: 'first',
            contact:false,
            modify:false,
            selectArr: [],
            data5: JSON.parse(JSON.stringify(datato)),
            tableData: [
                    {
                        id: "rnejkgtrek",
                        name: "杨帅",
                        username: "ys",
                        password: "06ba0ebc6f9efec42b0c43dd2e3ce1cf",
                        phone: "13553552222",
                        wechat: "123.0",
                        remark: "3.0",
                        rname: "admin",
                        cname: "卢比克魔方"
                    },

                ],
            tableData1:[{
                id:'',
                btypeName: "123456",
                type: "",
                linkman: "",
                business: "",
                address: "",
                phone: "",
                remark: ""
            }],
            addperson:{
                name:'',
                number:'',
                wechat:'',
                nickname:'',
                post:'',
                position:'',
                beizhu:'',
                gangwei: [],
                mima:''
            },
            addpersonEdit:{
                name:'',
                number:'',
                wechat:'',
                nickname:'',
                post:'',
                position:'',
                beizhu:'',
                gangwei: [],
                mima:''
            },
            btype:{
                btypeName: "",
                type: "",
                linkman: "",
                business: "",
                address: "",
                phone: "",
                remark: ""
            },
            form:{},
            position: '',
            role:[]
        }
    },
    components:{
        NavBar,
        NavHeader,
        departNav,
        manageName,
        NavBar,
    },
    directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
},
mounted(){
    // /company/findAll
    this.$ajax.get(url + 'company/findAll').then((res) => {
        // console.log(res.data.data)
        this.Data = res.data.data
        this.options = this.transTreeData(this.Data)
        // console.log(this.options)
    })
    this.$ajax.get(url + 'role/findRole').then(res=> {
        // console.log(res.data.data)
        // this.options = this.transTreeData(res.data.data)
        this.role = res.data.data
    })
    this.staff(),
    this.Btype()
},
methods:{
    handleChange () {},
    transTreeData (items) {
        // console.log(items)
      if(items.length > 0){
        var curpid = 0 
        var parent = this.findChild(curpid)
        return parent;
      }
    },
    findChild (curpid) {
      var _arr = [];
      var items = this.Data;
      var length = items.length;
      for(var i = 0; i < length; i++){
        if(items[i].parentId == curpid){
          var _obj = items[i];
          _obj.children = this.findChild(_obj.id);
          _arr.push(_obj);
        }
      }
      if (_arr.length > 0) {
        return _arr;
      }
    },
    changePosition() {
			// console.log(this.position)
		},
		handleClick(tab, event) {
			// console.log(tab, event);
        },
        //职员信息
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.staff();
        },
        //职员信息
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageNo = val;
            this.staff();
        },
        //往来单位管理
        handleSizeChangeB(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSizeB = val;
            this.Btype();
        },
        //往来单位管理
        handleCurrentChangeB(val) {
            // console.log(`当前页: ${val}`);
            this.pageNoB = val;
            this.Btype();
        },
        //to职员编辑
        toUserEdit(index, rows){
            let that = this;
            that.id = this.tableData[index].id;
            // console.log(that.id);
            // rows.splice(index, 1);
            console.log(this.options)
            this.$ajax.get(url + 'user/findById',{params:{"token":this.id}}).then((res) => {
                console.log(res.data.data)
                this.addpersonEdit.name = res.data.data.name;
                this.addpersonEdit.nickname = res.data.data.username;
                this.addpersonEdit.number = res.data.data.phone;
                this.addpersonEdit.mima = res.data.data.password;
                this.addpersonEdit.wechat = res.data.data.wechat;
                this.addpersonEdit.email = res.data.data.email;
                this.addpersonEdit.position = res.data.data.roleId;
                // this.addpersonEdit.gangwei = res.data.data.orgId;
                this.addpersonEdit.beizhu = res.data.data.remark;
                this.zhiyuan = true;
<<<<<<< HEAD
                this.$ajax.get(url + 'company/findById?id='+res.data.data.orgId).then(res=> {
                    console.log(res.data.data)
                    this.addpersonEdit.gangwei = res.data.data[0].parentIds.split(',')
                })
			})
=======
			      })
>>>>>>> 7eb0774735160e35a229e6d06ff0a312a1b9865f
        },
        //职员删除
        deleteRow(index, rows) {
            let that = this;
            that.id = this.tableData[index].id;
            // console.log(that.id);
            // rows.splice(index, 1);
            this.$ajax.post(url + 'user/logicDelete',"id="+this.id).then((res) => {
			})
        },
        //往来单位删除
        deleteRowB(index, rows) {
            let that = this;
            that.id = this.tableData1[index].id;
            // console.log(that.id);
            // rows.splice(index, 1);
            this.$ajax.post(url + 'btype/delete',"id="+this.id).then((res) => {
			})
        },
        
        //         foo:function (event) {
        //             formdata = new FormData();
        //             formdata.append('file',event.target.files[0]);
        //             formdata.append('action','test');
        //         axios({
        //         url:'test.php',
        //         method:'post',
        //         data:formdata,
        //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //     }).then((res)=>{console.log(res)})
        // },
    //职员信息
    staff(){
        this.$ajax.get(url + 'user/findUser',{params:{'page':this.pageNo,'pageSize':this.pageSize}}).then((res) => {
            // console.log(res)
            this.tableData = res.data.data.rows;
            this.totalDataNumber=res.data.data.records;
        })
    },
    //往来单位信息
    Btype(){
        this.$ajax.get(url + 'btype/findAll',{params:{'page':this.pageNoB,'pageSize':this.pageSizeB}}).then((res) => {
            // console.log(res)
            this.tableData1 = res.data.data.rows;
            this.totalDataNumberB=res.data.data.records;
        })
    },
    //添加员工
    addOne(){
        var users={};
        users.name=this.addperson.name;
        users.username=this.addperson.nickname;
        users.phone=this.addperson.number;
        users.password=this.addperson.mima;
        users.wechat=this.addperson.wechat;
        users.email=this.addperson.email;
        if (Array.isArray(this.addperson.gangwei)) {
          users.orgId = this.addperson.gangwei[this.addperson.gangwei.length - 1]
        } else {
          users.orgId=this.addperson.gangwei;
        }
        users.remark=this.addperson.beizhu;
        users.roleId=this.addperson.position;
        console.log(users)
        this.$ajax.post(url+"user/insert",users
        ).then((res) => {
            this.form = res.data
            if (res.data.status === 200) {
              window.history.go(0)
            }
            // console.log('this.form')
        })
    },
    editUser(){
        var users={};
        users.id = this.id;
        // console.log(id);
        users.name=this.addpersonEdit.name;
        users.username=this.addpersonEdit.nickname;
        users.phone=this.addpersonEdit.number;
        users.wechat=this.addpersonEdit.wechat;
        users.email=this.addpersonEdit.email;
        if (Array.isArray(this.addpersonEdit.gangwei)) {
          users.orgId = this.addpersonEdit.gangwei[this.addpersonEdit.gangwei.length - 1]
        } else {
          users.orgId=this.addpersonEdit.gangwei
        }
        users.password=this.addpersonEdit.mima;
        users.remark=this.addpersonEdit.beizhu;
        users.roleId=this.addpersonEdit.position;
        this.$ajax.post(url+"user/update",users
        ).then((res) => {
            this.form = res.data
            // console.log('this.form')
            this.zhiyuan = false;
        })
    },
    test(){
        this.value
    },
    //添加往来单位
    addBtype(){
       var btype={};
       btype.btypeName =this.btype.btypeName;
       btype.type = this.btype.type;
       btype.linkman = this.btype.linkman;
       btype.business = this.btype.business;
       btype.phone = this.btype.phone;
       btype.address = this.btype.address;
       btype.remark = this.btype.remark;
       this.$ajax.post(url+"btype/insert",btype).then((res) => {
           this.form = res.data
        //    console.log('this.form')
           this.contact = false
       })
    },
    append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      
      //删除
            handleSelectionChange (val) {
            //val 为选中数据的集合
                this.multipleSelection = val
                // console.log(this.multipleSelection)
            },
			allDelete() {
                let comments = this.multipleSelection
				// console.log(comments.id)
                let num = []
                for (let i = 0;i<comments.length;i++) {
                num.push(comments[i].id)
                this.$ajax.post(url + "user/delete","id="+num)
            }
            // console.log(num)
        },
        //上传的方法
         getPath(e){
            // console.log(e.target.value)
            
            // this.path = e.target.value;
            this.file = e.currentTarget.files[0].name//百度是没有name的
            
            // console.log(this.src)
        },
        submit(){
            var formData = new FormData()
            // console.log(this.files)
            formData.append('path', this.file)
            formData.append('status', this.radio)
            this.$ajax.post(url+ 'user/excelImport',formData).then(res => {
                // console.log(res)
            })
        }
    }
}

</script>

<style scoped>
html {
    background-color: #eeeeee !important;
}
body {
    background-color: #eeeeee !important;
    color: #5F5F5F !important;
}
.department {
    background-color: #eeeeee;
}
.container {
		width: 88%;
		position: relative;
		left: 6%;
        background-color: #eeeeee;
        padding: 0
	}


.card ul{
    display: inline-block;
}
.card {
    margin: 0;
    background-color: white;
    width: 99%;
    margin: 10px 10px 0 5px;
}

.header1 {
    position: relative;
    display: inline-block;
}

.header1 h1 {
    font-size: 20px;
    display: inline-block;
    padding: 1em;
}

.header1 p {
    color: #b1b1b1;
}

.title1 {
    width: 100%;
    background-color: #eeeeee;
}

.title1 p {
    width: 10%;
    display: inline-block;
}
.title2 {
    width: 100%;
    background-color:white;
}
.title2 p {
    width: 10%;
    display: inline-block;
}

input{
    margin-left: 1em;
    border: 1px solstate #ffffff;
    background-color: #eeeeee;
}
.name {
    color: #6fc055;
}
.main button {
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

}

.fenye button {
    background-color: white;
    border: 1px solid #32a8ee;
    color: #32a8ee;
    width: 2em;
}
select {
    background-color: white;
    border: 1px solid #eeeeee;
    color: black;
    height: 2em;
    border-radius: 5px;
}
.fenye {
    float: right;
        padding: 20px 0;
}
.fenye input {
    width: 3em;
    height: 2em;
    border: 1px solid #eeeeee;
    background-color: white;
    border-radius: 5px;
}
.add {
    position: fixed; /* 固定定位 */
    z-index: 1; /* 设置在顶层 */
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%;
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 

}
.modal-content {
    width: 31%;
    left: 35%;
    top: 23%;
    padding: 0 20px;
    border-radius: 0px;
    height: 58%;
    }

.atitle {
    border-bottom: 1px solid #eeeeee;
}
.atitle p{
    margin: 0;
    padding: 10px 0;
}
.atitle span {
    padding: 10px 0;
}
.footer {
    border-top: 1px solid #eeeeee;
    width: 100%;
}
.footer button {
    margin: 10px 10px 10px 0 ;
    float: right;
    width: 50px;
    padding: 5px 0;
}
.footer1 {
    border-top: 1px solid #eeeeee;
    width: 100%;
}
.footer1 button {
    margin: 10px 10px 10px 0 ;
    float: right;
    width: 50px;
    padding: 5px 0;
}
.confirm {
    background-color: #32a8ee;
    border: #32a8ee;
    color: white;
    border-radius: 5px;
}

.cancel {
    background-color: white;
    border: 1px solid rgb(217, 217, 217);
    color: rgb(138, 138, 138);
    border-radius: 5px;
}

.shuru input {
    border: 1px solid rgb(217, 217, 217);
    border-radius: 5px;
    background-color: white;
    color: #999999;
    font-size: inherit;
    margin-top: 30px;
    height: 32px;
    text-indent: 15px;
}
.shuru select {
    border: 1px solid rgb(217, 217, 217);
    border-radius: 5px;
    background-color: white;
    color: #999999;
    font-size: inherit;
    margin-top: 30px;
    height: 32px;
    text-indent: 15px;
    margin-left: 1em;
    width: 171px;
}

ul li {
    list-style: none;
}
.shuru ul 
{
    padding: 0;
}
.shuru label {
    cursor: pointer;
            display: inline-block;
            padding: 3px 6px;
            text-align: right;
            width: 30%;
            vertical-align: top;
            margin-top: 30px;
}
.how{
    color: #32a8ee;
}
label {
    font-weight: 500px;
    color: #5F5F5F
}
span {
    color: #5F5F5F
}
.nn {
    display: block
}
.nn span {
    width: 12%;
}
.tree div{
    display: inline-block;
    margin-left: 10%;
}
.rendertree li{
    display: inline-block;
}
.tree ul {
    width: 100%;
}
.ant-btn-group{
    width: 125px;
    height: 40px;
}
.el-dropdown-link{
    width: 4em !important;
}
/* .el-dropdown{
    width: 100px !important;
} */
.modal-content1 {
    background-color: white;
    width: 29%;
    position: absolute;
    left: 39%;
    top: 24%;
}

.modal-content1 div {
    margin: 0 20px;
}

.footer{
    height: 30px;
    margin-top: 30px;
}
.footer1{
    height: 30px;
    margin: 0 !important;
}

.file {
    position: relative;
    display: inline-block;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    padding: 4px 12px;
    color: #999999;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    margin: 0!important;
}
.file input {
    position: absolute;
    opacity: 0;
    width: 40px;
}
.file:hover{
    border: 1px solid #777777;
    color: #777777;
}
.put {
    margin:58px 0px 60px 29%!important;
}
.put ul {
    padding: 0
}
.put p{
    display: inline-block;
    vertical-align: top;
}
.put form {
    display: inline-block;
}
.yuangong {
    margin: 18px 5px;
    font-size: 16px;
    border-bottom: 1px solid #eeeeee;
}
.upload {
    margin: 24px 0 0 0!important
}
.liebiao {
    font-size: 6px;
    line-height: 20px;
}
.el-dropdown-menu__item button{
    border: none;
    background: none;
    padding: none;
}
.chuang{
    margin: 0 15% 0 10%
}
</style>
