<template>
  <div class="department">
    <div class="container">
            
      <nav-header></nav-header>
      <div class="card row">
        <div class="col-md-12">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!--部门管理-->
            <el-tab-pane label="部门管理" name="first" v-if="this.role1.indexOf('rubik:divisional:list')!==-1">
                <manage-name></manage-name>
            </el-tab-pane>
            <!-- <el-tab-pane label="权限管理" name="second" v-if="this.role1[13] === 'rubik:role:list'">
              <div class="main">
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
              </div>
            </el-tab-pane> -->
            <!--职员信息-->
            <el-tab-pane label="职员信息" name="third" v-if="this.role1.indexOf('rubik:employee:list')!==-1">
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
            <el-tab-pane label="往来单位" name="fourth" v-if="this.role1.indexOf('rubik:btype:list')!==-1">
              <div class="main">
                <button @click="contact = !contact">+ 添加联系人</button>
                <!-- <button @click="isShow = !isShow">导入</button> -->
                <button @click="deleteAll">删除</button>
                <el-table :data="tableData1" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="btypeName" label="单位名称" width="180"></el-table-column>
									<el-table-column prop="type" label="行业" width="180"></el-table-column>
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
													<el-dropdown-item><button @click="toBtypeEdit(scope.$index, tableData1)">编辑</button></el-dropdown-item>
													<el-dropdown-item><button @click="deleteRowB(scope.$index, tableData1)">删除</button></el-dropdown-item>
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
                <el-input id="phone" placeholder="请输入手机号" v-model="addpersonEdit.number" @blur="blur"></el-input>
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
              <el-form-item label="园区:">
                <!-- <el-input id="gangwei"  placeholder="请输入岗位" v-model="addperson.gangwei"></el-input>{{addpersonEdit.gangwei}} -->
                <el-cascader  expand-trigger="hover" :options="options" v-model="addpersonEdit.gangwei" @change="handleChange"></el-cascader>
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
      <!--添加新员工弹窗-->
      <el-dialog
        title="添加新员工"
        :visible.sync="add"
        width="30%">
        <el-form  :model="addperson" :rules="addRules" ref="addperson" label-width="80px" size="small" class="chuang">
            <el-form-item label="姓名:" prop="name">
                <el-input placeholder="请输入姓名" v-model="addperson.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称:" prop="nickname">
                <el-input id="nickname" placeholder="请输入昵称" v-model="addperson.nickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="number">
                <el-input id="phone" placeholder="请输入手机号" @change="findPhone" @blur="blur" v-model="addperson.number"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="mima">
                <el-input id="mima" placeholder="新增密码" v-model="addperson.mima"></el-input>
            </el-form-item>
            <el-form-item label="微信号:">
                <el-input id="wechart" placeholder="请输入微信号" v-model="addperson.wechat"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input id="email" placeholder="请输入邮箱" v-model="addperson.email"></el-input>
            </el-form-item>
            <el-form-item label="角色:" prop="position">
                <el-select  id="position" placeholder="请输入职位" v-model="addperson.position">
                  <el-option v-for="roleAdd in role" :key="roleAdd.id" :value="roleAdd.id" :label="roleAdd.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="园区:" prop="gangwei">
                <!-- <el-input id="gangwei"  placeholder="请输入岗位" v-model="addperson.gangwei"></el-input> -->
                <el-cascader id="gangwei" expand-trigger="hover" :options="options" v-model="addperson.gangwei" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input id="remark" placeholder="备注信息" v-model="addperson.beizhu"></el-input>
            </el-form-item>
            <!-- <el-form-item label="备注:">
                <div class="fileWrap">
                    <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="upImg"/>
                </div>
            </el-form-item> -->
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
          <el-form ref="form" :model="btype" :rules="rules" label-width="90px" size="small" class="chuang">
          <el-form-item label="单位名称:" prop="btypeName">
                      <el-input id="btypeName"  placeholder="请输入单位" v-model="btype.btypeName"></el-input>
          </el-form-item>
          <el-form-item label="部门:">
                      <el-input id="type" placeholder="请输入部门" v-model="btype.type"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="linkman">
                      <el-input id="linkman" placeholder="请输入姓名" v-model="btype.linkman"></el-input>
          </el-form-item>
          <el-form-item label="职务:">
                      <el-input id="business" placeholder="请输入职务" v-model="btype.business"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="phone">
                      <el-input id="phone"  @blur="blur" placeholder="请输入联系电话" v-model="btype.phone"></el-input>
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

    <!-- 往来单位-编辑 -->
            <el-dialog
                title="编辑往来单位"
                :visible.sync="wanglai"
                width="30%">
                <ul class="shuru">
                            <li>
                                <label for="btypeName">单位名称:</label>
                                <input id="btypeName"  placeholder="请输入单位名称" v-model="addbtypeEdit.btypeName">
                            </li>
                            <li>
                                <label for="type">行业:</label>
                                <input id="type" placeholder="请输入行业" v-model="addbtypeEdit.type">
                            </li>
                            <li>
                                <label for="linkman">姓名:</label>
                                <input id="linkman" placeholder="请输入姓名" v-model="addbtypeEdit.linkman">
                            </li>
                            <li>
                                <label for="business">职务:</label>
                                <input id="business" placeholder="请输入职务" v-model="addbtypeEdit.business">
                            </li>
                            <li>
                                <label for="phone">联系电话:</label>
                                <input id="phone" @blur="blur" placeholder="请输入联系电话" v-model="addbtypeEdit.phone">
                            </li>
                            <li>
                                <label for="address">地址:</label>
                                <input id="address" placeholder="请输入地址" v-model="addbtypeEdit.address">
                            </li>
                            <li>
                                <label for="remark">备注:</label>
                                <input id="remark" placeholder="请输入邮箱" v-model="addbtypeEdit.remark">
                            </li>
                        </ul>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="wanglai = false">取 消</el-button>
                    <el-button type="primary" @click="editBtype()">确 定</el-button>
                </span>
            </el-dialog>

            <!-- <el-dialog :title="addOrEdit" :visible.sync="dialogFormVisible" width="30%">
              <el-form>
                <el-form-item label="角色名称：" label-width="120px">
                  <el-input v-model="rolename" placeholder="请输入角色名称" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addrole">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
              </div>
            </el-dialog> -->

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
            role:[],
          rolePage: {
              currentPage: 1,
              total: 7,
              pageSize: 5,
              pageArr: [1, 2, 3, 4, 5]
            },
            roleid: '',
            addOrEdit: '添加角色',
            rolename: '',
            dialogFormVisible: false,
            jurisdictionData: [],
            Data: [],
            options: [],
            fileName: '',
            Data: [],
            options: [],
            file:'',
            src:'',
            username:'',
            radio:'0',
            pageNo: 1,
            pageSize: 10,
            pageSizesList: [10, 20, 50, 100],
            totalDataNumber: 1,//数据的总数,
            pageNoB: 1,
            pageSizeB: 10,
            pageSizesListB: [10, 20, 50, 100],
            totalDataNumberB: 1,//数据的总数,
            // toggle:'',
            zhiyuan:false,
            wanglai:false,
            multipleSelection: [],
            person: [],
            isShow:false,
            add:false,
            activeName: 'first',
            contact:false,
            modify:false,
            selectArr: [],
            data5: JSON.parse(JSON.stringify(datato)),
            tableData: [],
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
                // gangwei: ['1'],
                gangwei: [],
                mima:''
            },
            addbtypeEdit:{
                btypeName:'',
                type:'',
                linkman:'',
                business:'',
                phone:'',
                address:'',
                remark:''
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
            role:[],
            rules: {
                btypeName: [
                    { required: true, message: '请输入单位名称', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    // { type: 'number', message: '必须为数字值'},
                    // { min: '11',max: '11', message: '长度在11个字符', trigger: 'blur' }
                ],
                linkman: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            },
            addRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                mima: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                gangwei: [
                    { required: true, message: '请选择岗位', trigger: 'change' }
                ]
            },
            role1:[],
            first: true,
            second: true,
            third: true,
            fourth: true,
            img:''
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
    this.$ajax.get(url + 'role/findPermission').then(res => {
        res.data.data.forEach(v => {
            this.role1.push(v.permission)
        })
      })
    // /company/findAll
    this.$ajax.get(url + 'company/findAll').then((res) => {
        // console.log(res.data.data)
        this.Data = res.data.data
        this.options = this.transTreeData(this.Data)
    })
    this.$ajax.get(url + 'role/findRole').then(res=> {
        
        this.role = res.data.data
    })
    this.staff(),
    this.Btype()
    this.getRoleData()
},
methods:{
     findPhone(){
        var phone = this.addperson.number
        this.$ajax.post(url + 'user/findPhone?phone='+phone).then(res => {
            if(res.data.data){
                this.$message({
                    message:'已有手机号',
                    type:'error'
                })
            }
        })
    },
    upImg(e) {
        console.log(e.currentTarget.files[0])
      },
    blur (e) {
      var reg = /^\+?[1-9][0-9]*$/
      if (!reg.test(e.target.value)) {
        e.target.style.borderColor = 'red'
        this.$message({
          message: '请输入数字',
          type: 'error'
        })
      }else if(e.target.value.length!==11){
          console.log(e.target.value.length)
          e.target.style.borderColor = 'red'
          this.$message({
          message: '请输入11位数字',
          type: 'error'
        })
      } else {
        e.target.style.borderColor = '#67c23a'
      }
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
      } else {
        this.$message({
          type: 'info',
          message: '请选择您需要删除的角色'
        })
      }
    },
    AddRole () {
      this.dialogFormVisible = true
      this.addOrEdit = '添加角色'
      this.rolename = ''
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
          }else if(res.data.status===403){
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
    // 编辑角色
    edit (data) {
      // get  /role/findById  id 进入编辑页面接口
      this.$ajax.get(url + 'role/findById', {
        params: {
          id: data.row.id
        }
      }).then(res => {
        this.dialogFormVisible = true
        this.rolename = res.data.data.name
        this.roleid = res.data.data.id
        this.addOrEdit = '编辑角色'
      })
    },
    // 获取角色
    getRoleData () {
      // GET /role/findAll page当前页 pageSize每页显示条数
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
    // 添加角色
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
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      }
    },
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
			if(tab.name==='second'){
                this.getRoleData()
            }else if(tab.name === 'third'){
                this.staff()
            }else if(tab.name === 'fourth'){
                this.Btype()
            }
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
            this.$ajax.get(url + 'user/findById',{params:{"token":this.id}}).then((res) => {
                if(res.data.status === 200){
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
                    this.$ajax.get(url + 'company/findById?id='+res.data.data.orgId).then(res=> {
                        let arr = res.data.data[0].parentIds.split(',').slice(1)
                        arr.push(res.data.data[0].value)
                        this.addpersonEdit.gangwei = arr
                        // console.log(this.addpersonEdit.gangwei)
                    })
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    })
                }
			})
        },
        //to往来单位编辑
        toBtypeEdit(index, rows){
            let that = this;
            that.id = this.tableData1[index].id;
            console.log(that.id);
            this.$ajax.get(url + 'btype/findById',{params:{"id":that.id}}).then((res) => {
                this.addbtypeEdit.btypeName = res.data.data.btypeName;
                this.addbtypeEdit.type = res.data.data.type;
                this.addbtypeEdit.linkman = res.data.data.linkman;
                this.addbtypeEdit.business = res.data.data.business;
                this.addbtypeEdit.phone = res.data.data.phone;
                this.addbtypeEdit.address = res.data.data.address;
                this.addbtypeEdit.remark = res.data.data.remark;
                this.wanglai = true;
                
			})
        },
        //职员删除
        deleteRow(index, rows) {
            let that = this;
            that.id = this.tableData[index].id;
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'}).then(() => {
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
        //往来单位删除
        deleteRowB(index, rows) {
            let that = this;
            that.id = this.tableData1[index].id;
            // console.log(that.id);
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'}).then(() => {
                    this.$ajax.post(url + 'btype/delete',"id="+this.id).then((res) => {
                        if(res.data.status === 200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.Btype()
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
        // console.log(token)
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
    //往来单位信息
    Btype(){
        this.$ajax.get(url + 'btype/findAll',{params:{'page':this.pageNoB,'pageSize':this.pageSizeB}}).then((res) => {
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
        // console.log(users)
        if(!this.addperson.name){
            this.$message({
            message: '请输入姓名',
            type: 'warning'
            });
        }else if(!this.addperson.nickname){
            this.$message({
            message: '请输入昵称',
            type: 'warning'
            });
        }else if(!this.addperson.number){
            this.$message({
            message: '请输入手机号',
            type: 'warning'
            });
        }else if(!this.addperson.mima){
            this.$message({
            message: '请输入密码',
            type: 'warning'
            });
        }else if(!this.addperson.email){
            this.$message({
            message: '请输入邮箱',
            type: 'warning'
            });
        }else if(!this.addperson.position){
            this.$message({
            message: '请输入角色',
            type: 'warning'
            });
        }else if(this.addperson.gangwei.length === 0){
            this.$message({
            message: '请输入岗位',
            type: 'warning'
            });
        }else{
            this.$ajax.post(url+"user/insert",users
            ).then((res) => {
                this.form = res.data
                if (res.data.status === 200) {
                    this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                //   window.history.go(0)
                this.add = false
                this.staff()
                }else if(res.data.status===403){
                    this.$message({
                        message: '权限不足',
                        type: 'error'
                    })
                }else{
                    this.$message({
                        message:'失败',
                        type:'errpr'
                    })
                }
                // console.log('this.form')
            })
        }
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
        this.$ajax.post(url+"user/update",users).then((res) => {
            if(res.data.status === 200){
                this.form = res.data
                this.$message({
                    message:'编辑成功',
                    type:'success'
                })
                this.zhiyuan = false;
                this.staff()
            }else if(res.data.status===403){
                    this.$message({
                        message: '权限不足',
                        type: 'error'
                    })
                }
        })
    },
    test(){
        this.value
    },
    //添加往来单位
    addBtype(){
        if(this.btype.btypeName && this.btype.linkman && this.btype.phone){
            var btype={};
            btype.btypeName =this.btype.btypeName;
            btype.type = this.btype.type;
            btype.linkman = this.btype.linkman;
            btype.business = this.btype.business;
            btype.phone = this.btype.phone;
            btype.address = this.btype.address;
            btype.remark = this.btype.remark;
            this.$ajax.post(url+"btype/insert",btype).then((res) => {
                if(res.data.status === 200){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.form = res.data
                    this.Btype()
                    this.contact = false
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
    //编辑往来单位
        editBtype(){
            var btype={};
            btype.id = this.id;
            console.log(id);
            btype.btypeName=this.addbtypeEdit.btypeName;
            btype.type=this.addbtypeEdit.type;
            btype.linkman=this.addbtypeEdit.linkman;
            btype.business=this.addbtypeEdit.business;
            btype.phone=this.addbtypeEdit.phone;
            btype.address=this.addbtypeEdit.address;
            btype.remark=this.addbtypeEdit.remark;
            this.$ajax.post(url+'btype/update',btype
            ).then((res) => {
                if(res.data.status === 200){
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.form = res.data
                    this.Btype()
                    this.wanglai = false;
                }else if(res.data.status===403){
                    this.$message({
                        message: '权限不足',
                        type: 'error'
                    })
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
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
            //职员信息批量删除
			allDelete() {
                let comments = this.multipleSelection
				// console.log(comments.id)
                let num = []
                for (let i = 0;i<comments.length;i++) {
                num.push(comments[i].id)
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'}).then(() => {
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
                
            
            }
            // console.log(num)
        },
        //往来单位批量删除
        deleteAll(){
            let comments = this.multipleSelection
            let num = []
            for (let i = 0;i<comments.length;i++) {
                num.push(comments[i].id)
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'}).then(() => {
                    this.$ajax.post(url + "btype/deleteAll","id="+num).then(res => {
                    if (res.data.status === 200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.Btype()
                    
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
                
            }
            console.log(num)
        },
        //上传的方法
         getPath(e){
            // console.log(e.target.value)
            
            this.fileName = e.currentTarget.files[0].name
            this.file = e.currentTarget.files[0]//百度是没有name的
            
            // console.log(this.src)
        },
        submit(){
            var formData = new FormData()
            // console.log(this.files)
            formData.append('file', this.file)
            formData.append('status', this.radio)
            this.$ajax.post(url+ 'user/excelImport',formData).then(res => {
                if(res.data.status === 200) {
                    this.$message({
                        message: '成功',
                        type: 'success'
                    })
                    this.staff()
                    this.isShow = false
                }else if(res.data.status===403){
                    this.$message({
                        message: '权限不足',
                        type: 'error'
                    })
                }else{
                    this.$message({
                        message: '失败',
                        type: 'error'
                    })
                }
            })
        }
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
    height: 810px;
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