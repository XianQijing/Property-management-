<template>
    <div class="rent">
        <div class="container">
            <nav-header/>
            <div class="card row">
                <div class="col-md-12">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="房源管理" name="first" v-if="this.role.indexOf('rubik:roomManager:list')!==-1">
                            <div class="main">
								<div v-if="this.indexTable === '0'">
									<router-view class="rent_addhouse"></router-view>
								    <!-- <router-view class="rent_edit"></router-view> -->
								</div>
								<router-link :to="{name: 'Rent_addhouse',query:{msg:'tianjia'}}"><button class="add">添加房源</button></router-link>
                                <div class="fenye" style="display:inline-block" id="btn">
                                    <button @click="display(1)" class="active" id="all">全部数据</button>
                                    <button @click="display(2)" id="rented">只显示已租数据</button>
                                    <button @click="display(3)" id="renting">只显示未租数据</button>
                                </div>
								<el-table :data="tableData" style="width: 100%">
									<el-table-column prop="roomType" label="房屋类型" width="180"></el-table-column>
									<el-table-column prop="buildinges.namec" label="楼宇" width="180"></el-table-column>
									<el-table-column prop="roomNumber" label="房号"></el-table-column>
									<el-table-column prop="coveredArea" label="建筑面积(平方米)"></el-table-column>
									<el-table-column prop="pricing" label="价格(元/月)"></el-table-column>
									<el-table-column prop="renting" label="租用状态" :formatter="formatRole"></el-table-column>
									<el-table-column prop="reserve" label="预定状态"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<span style="color:#32a8ee;" @click="toBianji(scope.$index,tableData,'bianji')">编辑</span>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination 
                                    @size-change="handleSizeChange" 
                                    @current-change="handleCurrentChange" 
                                    :current-page="pageNo"  
                                    :page-size="pageSize" 
                                    :page-sizes="pageSizesList"
                                    layout="total, sizes, prev, pager, next, jumper" 
                                    :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
                        </el-tab-pane>

                        <el-tab-pane label="商机管理" v-if="this.role.indexOf('rubik:businessManager:list')!==-1">
                             <div class="main">
								<!-- <div>
									<router-view class="relationshipAdd"></router-view>
								    <router-view class="householdDetail"></router-view>
								</div> -->
								<!--<router-link :to="{name: 'RelationshipAdd'}">--><button class="add" @click="shangji('0','0','tianjia')">添加商机</button><!--</router-link>-->
								<el-table :data="tableDataBusiness" style="width: 100%">
									<el-table-column prop="namec" label="客户姓名" width="180"></el-table-column>
									<el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
									<el-table-column prop="visitingWay" label="来访方式"></el-table-column>
									<el-table-column prop="clientType" label="客户类型"></el-table-column>
									<el-table-column prop="areaNeed" label="需求面积(平方米)"></el-table-column>
									<el-table-column prop="priceNeed" label="需求价格(元/月)"></el-table-column>
									<el-table-column prop="visitTime" label="来访时间"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="shangji(scope.$index,tableDataBusiness,'chakan')"><el-dropdown-item>查看</el-dropdown-item></span>
													<span  @click="shangji(scope.$index,tableDataBusiness,'gengxin')"><el-dropdown-item>更新</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination 
                                    @size-change="handleSizeChangeBusiness" 
                                    @current-change="handleCurrentChangeBusiness" 
                                    :current-page="pageNoBusiness"  
                                    :page-size="pageSizeBusiness" 
                                    :page-sizes="pageSizesListBusiness"
                                    layout="total, sizes, prev, pager, next, jumper" 
                                    :total="totalDataNumberBusiness">

									</el-pagination>
								</div>
							</div>
                        </el-tab-pane>

                        <el-tab-pane label="合同管理" v-if="this.role.indexOf('rubik:contractManager:list')!==-1">

                            <div class="main">
								<div  v-if="this.indexTable === '2'">
									<router-view class="rent_contract_change"></router-view>
								    <!-- <router-view class="householdDetail"></router-view> -->
								</div>
								<button class="add" @click="houseSource('0','0','add')">新增合同</button>
                                <button class="add" @click="isShow = true">导入合同</button>
                                <!-- <button class="add">导出合同</button> -->
                                 <div class="fenye" style="display:inline-block">
                                     <button><img src=".././assets/down.png" style="width:16px;">模板</button>
                                 </div>
								<el-table :data="tableDataContract" style="width: 100%">
									<el-table-column prop="tenantry" label="客户姓名" width="180"></el-table-column>
									<el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
									<el-table-column prop="rooms.useId" label="租用类型"></el-table-column>
                                    <el-table-column prop="namec" label="楼宇" width="180"></el-table-column>
                                    <el-table-column prop="rooms.roomNumber" label="房号"></el-table-column>
                                    <el-table-column prop="rooms.coveredArea" label="建筑面积(平方米)"></el-table-column>
									<el-table-column prop="rooms.useId" label="用途"></el-table-column>
									<el-table-column prop="deliveryTime" label="交付时间"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span  @click="houseSource(scope.$index,tableDataContract,'watch')"><el-dropdown-item>查看</el-dropdown-item></span>
													<span  @click="houseSource(scope.$index,tableDataContract,'edit')"><el-dropdown-item>修改</el-dropdown-item></span>
                                                    <span @click="out(scope.$index,tableDataContract)"><el-dropdown-item>导出</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination 
                                    @size-change="handleSizeChangeContract" 
                                    @current-change="handleCurrentChangeContract" 
                                    :current-page="pageNoContract"  
                                    :page-size="pageSizeContract" 
                                    :page-sizes="pageSizesListContract"
                                    layout="total, sizes, prev, pager, next, jumper" 
                                    :total="totalDataNumberContract">

									</el-pagination>
								</div>
							</div>                 
                        </el-tab-pane>
                        <el-tab-pane label="房产验收" name="fifth" v-if="this.role.indexOf('rubik:acceptance:list')!==-1">
							<div class="main">
								<div v-if="indexTable === '4'">
									<router-view class="test"></router-view>
                                </div>
								<router-link :to="{name: 'Test',query:{id:'add'}}"><button class="add">+ 添加</button></router-link>
								<el-table :data="tableDataRoomStandard" style="width: 100%" >
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="room" label="关联房屋" width="180"></el-table-column>
									<el-table-column prop="projectAcceptance" label="验收项目" width="180"></el-table-column>
									<el-table-column prop="acceptanceStandard" label="验收标准" width="180"></el-table-column>
									<el-table-column prop="acceptanceResult" label="验收结果"></el-table-column>
									<el-table-column prop="acceptanceBy" label="验收人"></el-table-column>
									<el-table-column prop="acceptanceState" label="验收说明"></el-table-column>
									<el-table-column prop="acceptanceTime" label="验收日期"></el-table-column>
									<el-table-column prop="remark" label="备注"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="jumpHouse(scope.$index, tableDataRoomStandard)"><el-dropdown-item>查看 / 编辑</el-dropdown-item></span>
													<span @click="houseDelete(scope.$index, tableDataRoomStandard)"><el-dropdown-item>删除</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination 
									@size-change="handleSizeChange1" 
									@current-change="handleCurrentChange1" 
									:current-page="pageNoRoomStandard"  
									:page-size="pageSizeRoomStandard" 
									:page-sizes="pageSizesListRoomStandard" 
									layout="total, sizes, prev, pager, next, jumper" 
									:total="totalDataNumberRoomStandard">
									</el-pagination>
								</div>
							</div>
						</el-tab-pane>
                    </el-tabs>
                </div>
            </div>


            <!-- 弹窗 -->
            <el-dialog
                :title="this.tanchuang"
                :visible.sync="dialogVisible"
                width="30%">

                <el-form :model="shuru" ref="shuru" :rules="rules" label-width="130px" class="demo-shuru" size="mini" :disabled="edit" style="margin:0 7% 0 0">
                
                    <el-form-item label="客户姓名:" prop="namec">
                    <el-input v-model="upload.namec" placeholder="请输入客户姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:" prop="phone">
                    <el-input v-model="upload.phone" :placeholder="shuru.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="客户类别:">
                    <el-input v-model="upload.clientType" :placeholder="shuru.clientType"></el-input>
                    </el-form-item>
                    <el-form-item label="需求面积:" prop="areaNeed">
                    <el-input v-model="upload.areaNeed" :placeholder="shuru.areaNeed">
                        <template slot="append">平方米</template>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="需求价格:">
                    <el-input v-model="upload.priceNeed" :placeholder="shuru.priceNeed">
                        <template slot="append">元/月</template>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="来访方式:">
                    <el-input v-model="upload.visitingWay" :placeholder="shuru.visitingWay"></el-input>
                    </el-form-item>
                    <el-form-item label="来访时间:" >
                        <el-date-picker
                            v-model="upload.visitTime"
                            type="datetime"
                            placeholder="选择日期时间" style="width:100%">
                        </el-date-picker>
                    <!-- <el-input v-model="upload.visitTime" :placeholder="shuru.visitTime"></el-input> -->
                    </el-form-item>
                    <el-form-item label="是否已看房:">
                    <el-radio v-model="upload.seeHouse" label="0">否</el-radio>
                    <el-radio v-model="upload.seeHouse" label="1">是</el-radio>
                    </el-form-item>
                    <el-form-item label="备注:">
                    <el-input v-model="upload.comment" :placeholder="shuru.comment"  ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer" v-show="add">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addChange('tianjia')">确 定</el-button>
                </span>
                <span slot="footer" class="dialog-footer" v-show="editOne">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addChange('gengxin')">确 定</el-button>
                </span>

            </el-dialog>

            <el-dialog
                title="导入合同"
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
                <div>{{this.file.name}}</div>
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
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isShow = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </span>
                <!-- <div class="footer1">
                <button class="confirm" @click="submit">确定</button><button class="cancel" @click="isShow = !isShow">取消</button>
                </div> -->
            </el-dialog>
        </div>
    </div>
</template>

<script>
	import NavHeader from '@/components/NavHeader'
    import NavBar from '@/components/NavBar'
    import url from '../assets/Req.js'
export default {
    name:'rent',
    data(){
        return{
            role:[],
            isShow: false,
            radio: '0',
            file: '',
            fileName:'',
            tanchuang:'查看商机',
            edit:true,
            dialogVisible: false,
            add:true,
            editOne:false,
            modify:false,
            activeName: 'first',
            indexTable:'0',
            //房源管理
			pageNo: 1,
            pageSize: 10,
            pageSizesList: [10, 20, 30, 40, 50],
            tableData: [],//返回的结果集合
            totalDataNumber: 400,//数据的总数,
            
            //商机管理
			pageNoBusiness: 1,
            pageSizeBusiness: 10,
            pageSizesListBusiness: [10, 20, 30, 40, 50],
            tableDataBusiness: [],//返回的结果集合
            totalDataNumberBusiness: 400,//数据的总数,
            
            //合同管理
			pageNoContract: 1,
            pageSizeContract: 10,
            pageSizesListContract: [10, 20, 30, 40, 50],
            tableDataContract: [],//返回的结果集合
            totalDataNumberContract: 400,//数据的总数,
            precinct:1,
            id:'',
            bb:1,
            //商机管理-查看
            shuru: 
            {
                namec: '请输入客户姓名',
                phone: '请输入联系方式',
                clientType: '请输入客户类别',
                areaNeed: '请输入需求面积',
                priceNeed: '请输入需求价格',
                visitingWay: '请输入来访方式',
                visitTime: '请输入来访时间',
                comment:''
            },
            //商机管理-更新
            upload:{
                namec: '',
                phone: '',
                clientType: '',
                area: '',
                priceNeed: '',
                visitingWay: '',
                visitTime: '',
                seeHouse: '0',
                comment:''
            },
            rules:{
                namec: [
                        { required: true, message: '请输入客户姓名', trigger: 'blur' },
                    ],
                phone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                ],
            },
            //房产验收
            pageNoRoomStandard: 1,
            pageSizeRoomStandard: 10,
            pageSizesListRoomStandard: [10, 20, 30, 40, 50],
            tableDataRoomStandard: [
                {
                room:'',
                projectAcceptance:'',
                acceptanceStandard:'',
                acceptanceResult:'',
                acceptanceBy:'',
                acceptanceState:'',
                acceptanceTime:'',
                remark:'',
                id: ''
                }
            ],//返回的结果集合
            totalDataNumberRoomStandard: 100,//数据的总数,
        }
    },
    
    mounted(){
         this.$ajax.get(url + 'role/findPermission').then(res => {
            res.data.data.forEach(v => {
                this.role.push(v.permission)
                })
            })
        this.flndAllHousingResource(),
        this.flndAllBusiness(),
        this.flndAllContract(),
        // this.nn()
        this.getRoomStandard()
       
    },
    methods:{
        formatRole: function(row, column) {
            return row.authority == '0' ? "可租" : "已租";
        },

        changePosition() {
		},
		handleClick(tab, event) {
            this.indexTable = tab.index
            this.$router.push('/rent')
        },
        
        //房源管理=>查询全部
        flndAllHousingResource(){
            this.$ajax.get(url + 'housingResource/flndAllHousingResource/'+this.pageNo+'/'+this.pageSize).then((res) => {
                
            if(res.data.status === 200){    
                this.tableData=res.data.data.rows
                this.totalDataNumber=res.data.data.records
                }
            })
        },handleSizeChange(val) {
            this.pageSize=val;
            this.display(this.bb)
        },handleCurrentChange(val) {
            this.pageNo=val;
            // this.flndAllHousingResource()
            this.display(this.bb)
        },


        //商机管理
        flndAllBusiness(){
            this.$ajax.get(url + 'prospectiveCustomer/flndAll/'+this.pageNoBusiness+'/'+this.pageSizeBusiness).then((res) => {
                if(res.data.status === 200){  
                    this.tableDataBusiness=res.data.data.rows
                    this.totalDataNumberBusiness=res.data.data.records
                }
            })
        },handleSizeChangeBusiness(val) {
            this.pageSizeBusiness=val;
            this.flndAllBusiness()
        },handleCurrentChangeBusiness(val) {
            this.pageNoBusiness=val;

            this.flndAllBusiness()
        },

        //合同管理
        flndAllContract(){
            this.$ajax.get(url + 'contract/flndAll/'+this.pageNoContract+'/'+this.pageSizeContract).then((res) => {
                if(res.data.status === 200){  
                this.tableDataContract=res.data.data.rows
                this.totalDataNumberContract=res.data.data.records
                console.log(this.tableDataContract)
                }
                
            })
        },handleSizeChangeContract(val) {
            this.pageSizeContract=val;
            this.flndAllContract()
        },handleCurrentChangeContract(val) {
            this.pageNoContract=val;
            this.flndAllContract()
        },

        //房源添加
        toBianji(index,row,msg){
            let that = this;
            this.id = this.tableData[index].id;
            this.msg = msg;
            this.$router.push({name: 'Rent_addhouse',query:{id:that.id,msg:this.msg}})
        },
        //商机添加
        shangji(index,row,msg){
            let that = this;
            this.msg = msg;
            this.dialogVisible = true;
            
            if(this.msg == "chakan"){
                this.id = this.tableDataBusiness[index].id;
                this.edit = true
                this.tanchuang = "查看详情"
                this.$ajax.get(url + 'prospectiveCustomer/flngById/'+this.id).then(res => {
                    if(res.data.status===200){
                        this.upload = res.data.data
                    }else if(res.data.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.dialogVisible = false;
                        }
                    });
                }
                })
            }else if(this.msg == "gengxin"){
                this.id = this.tableDataBusiness[index].id;
                this.edit = false
                this.editOne = true
                this.add = false
                this.tanchuang = "更新商机"
                this.$ajax.get(url + 'prospectiveCustomer/flngById/'+this.id).then(res => {
                    if(res.data.status===200){
                        this.upload = res.data.data
                    }else if(res.data.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.dialogVisible = false;
                        }
                    });
                }
                })
            }else{
                this.edit = false,
                this.editOne = false
                this.add = true
                this.tanchuang = "添加商机"
                this.upload = {
                    seeHouse:'0'
                }
            }
        },
        display(precinct){
            this.bb = precinct
            if (this.bb === 1){
                document.getElementById('all').className = 'active'
                document.getElementById('rented').className = ''
                document.getElementById('renting').className = ''
                this.flndAllHousingResource()
                this.bb === 1;
            }else if(this.bb === 2){
                document.getElementById('all').className = ''
                document.getElementById('rented').className = 'active'
                document.getElementById('renting').className = ''
                this.bb === 2;
                this.$ajax.get(url + 'housingResource/selectOccupancy'+this.pageNo+'/'+this.pageSize).then(res => {
                    this.tableData=res.data.data.rows
                    this.totalDataNumber=res.data.data.records
                })
            }else if(this.bb === 3){
                document.getElementById('all').className = ''
                document.getElementById('rented').className = ''
                document.getElementById('renting').className = 'active'
                this.bb === 3;
                this.$ajax.get(url + 'housingResource/selectUnleased'+this.pageNo+'/'+this.pageSize).then(res => {
                    this.tableData=res.data.data.rows
                    this.totalDataNumber=res.data.data.records
                })
            }
        },

        //添加商机
        addChange(msg){
            if(this.upload.namec&&this.upload.phone){
            var prospectiveCustomer={}
            prospectiveCustomer.namec=this.upload.namec
            prospectiveCustomer.phone=this.upload.phone
            prospectiveCustomer.clientType=this.upload.clientType
            prospectiveCustomer.areaNeed=this.upload.areaNeed
            prospectiveCustomer.priceNeed=this.upload.priceNeed
            prospectiveCustomer.visitingWay=this.upload.visitingWay
            prospectiveCustomer.comment=this.upload.comment
            if(this.msg === "tianjia"){
                this.$ajax.post(url+'prospectiveCustomer/addProspectiveCustomer',prospectiveCustomer).then(res => {
                    if(res.data.status === 200){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogVisible = false
                    }else if(res.data.status===403){
                        this.$message({
                            message:'权限不足',
                            type: 'error'
                        })
                    }else{
                        this.$message({
                            message:'添加失败',
                            type: 'error'
                        })
                    }
                })
            }else if(this.msg === "gengxin"){
                this.$ajax.put(url+'prospectiveCustomer/updateProspectiveCustomer',
                    {
                        "namec":this.upload.namec,
                        "phone":this.upload.phone,
                        "clientType":this.upload.clientTyp,
                        "areaNeed":this.upload.areaNeed,
                        "priceNeed":this.upload.priceNeed,
                        "visitingWay":this.upload.visitingWay,
                        "id":this.id,
                        "comment":this.upload.comment
                    }
                ).then(res => {
                    if(res.data.status === 200){
                    this.$message({
                        message: '更新成功',
                        type: 'success'
                    });
                    this.dialogVisible = false
                    }else if(res.data.status===403){
                        this.$message({
                            message:'权限不足',
                            type: 'error'
                        })
                    }else{
                        this.$message({
                            message:'更新失败',
                            type: 'error'
                        })
                    }
                })
            }else{
                this.dialogVisible = false
            }
            }else if(!this.upload.namec){
                this.$message({
                    message: '请输入客户姓名',
                    type: 'warning'
                });
            }else{
                this.$message({
                    message: '请输入联系方式',
                    type: 'warning'
                });
            }
        },
        //房源的添加和修改
        houseSource(index,rows,msg){
            if(msg == 'add'){
            this.$router.push({name:'Rent_contract_change',query:{msg:msg}})
            }else if(msg == 'watch'){
                this.$router.push({name: 'Rent_contract_change',query:{id:this.tableDataContract[index].id,msg:msg}})
            }else if(msg == 'edit'){
                this.$router.push({name: 'Rent_contract_change',query:{id:this.tableDataContract[index].id,msg:msg}})
            }
        },
        // nn(){
        //     var card = document.getElementById("btn");
        //     var cardlist = card.children;

        //     for (var i = 0; i < cardlist.length; i++){
        //         cardlist[i].index = i;
        //         cardlist[i].onclick = function() {
        //             for (var m = 0; m <cardlist.length; m++){
        //                 cardlist[m].className = "";
        //             }
        //             this.className = "active"
        //         }
        //     }
        // },
        //导入合同
        getPath(e) {
            this.file = e.currentTarget.files[0]
        },
        submit() {
            var formData = new FormData()
            formData.append('file',this.file)
            formData.append('status',this.radio)
            this.$ajax.post(url + 'contract/excelImport',formData).then(res => {
                if(res.data.status === 200){
                    this.$message({
                        message: '导入成功',
                        type: 'success'
                    });
                    this.isShow = false
                    this.flndAllContract()
                }else if(res.data.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.isShow = false
                        }
                    });
                }
            })
        },

        //导出-个人
        out(index,rows) {
            let id = this.tableDataContract[index].id
            console.log(this.tableDataContract[index])
            // let roomId = this.tableDataContract[index]
            this.$ajax.get(url + 'contract/turnDown/'+id,{
                
            }).then(res => {
                
                if (res.data.status === 500){
                    
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }else{
                    window.location.href = url + 'contract/turnDown/'+id
                }
            })
        },
        //房产验收
        handleSizeChange1(val) {
            this.pageSizeRoomStandard=val
            this.getRoomStandard()
        },
        handleCurrentChange1(val) {
            this.pageNoRoomStandard=val
            this.getRoomStandard()
        },
        getRoomStandard() {
            this.$ajax.get(url + 'roomStandard/flndAll/'+this.pageNoRoomStandard+'/'+this.pageSizeRoomStandard+'',{}).then(res => {
                if(res.data.status === 200){  
            this.tableDataRoomStandard = res.data.data.rows
            res.data.data.rows.forEach((v, k) => {
                if (v.room) {
                if (v.room.indexOf(',') !== -1) {
                    this.tableDataRoomStandard[k].room = v.room.split(',')[0]
                }
                }
            })
            this.totalDataNumberRoomStandard =  res.data.data.records
                }
            })
        },
        jumpHouse(index,rows){
            let that = this;
            that.id = this.tableDataRoomStandard[index].id;
            this.$router.push({name: 'Test',query:{id:'edit',roomId:that.id}})
        },
        houseDelete(index,rows) {
            let that = this;
            that.id = this.tableDataRoomStandard[index].id;
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
            this.$ajax.delete(url + 'roomStandard/deleteRoomStandard/' + that.id).then((res) => {
                if (res.data.status === 200) {
                this.getRoomStandard()
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
        },
        
    },
    components: {
        NavHeader,
        NavBar
    },
    filters: {
    }
}
function status (data) {
    if (data === 0) return '未预定'
    if (data === 1) return '已预订'
}
function rentHouse(data){
    if(data === 0) return '可租'
    if(data === 1) return '已租'
}
</script>
<style scoped>
.container {
		width: 88%;
		position: relative;
		left: 6%;
		background-color: #eeeeee;
		padding: 0;
	}

.rent {
	background: #eeeeee;
	}

.card {
		margin: 0;
		background-color: white;
		width: 99%;
		margin: 10px 10px 0 5px;
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

    .fenye {
		float: right;
		padding: 20px 0;
	}

    .main {
		padding: 0 40px 0 50px;
		width: 99%;
		margin-left: 2px;
        height: 810px;
	}

    .fenye button{
        border: 1px solid #999999;
        border-radius: 5px;
        margin-left: 5px;
        background: white;
        color: #999999;
        height: 31px;
    }

    .fenye button:focus{
        border: 1px solid #32a8ee;
        color: #32a8ee;
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
.active {
  border: 1px solid #32a8ee !important;
  color: #32a8ee !important;
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

ul li {
    list-style: none;
}
</style>
