<template>
	<div class="name">
		<nav-bar/>
		<div class="container">
			<nav-header/>
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">

						<el-tab-pane label="客户基本资料" name="first">
							<div class="main">
								<div>
									<router-view class="relationshipAdd"></router-view>
								    <router-view class="householdDetail"></router-view>
								</div>
								<button class="delect">迁出</button>
								<el-table :data="base" style="width: 100%">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="name" label="姓名" width="180"></el-table-column>
									<el-table-column prop="phone" label="手机号" width="180"></el-table-column>
									<el-table-column prop="rentType" label="租用类型"></el-table-column>
									<el-table-column prop="build" label="楼宇"></el-table-column>
									<el-table-column prop="templateNumber" label="房号"></el-table-column>
									<el-table-column prop="time" label="租用时间"></el-table-column>
									<el-table-column prop="remarks" label="备注"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="detail(scope.$index, base)"><el-dropdown-item>详情</el-dropdown-item></span>
													<router-link :to="{name: 'RelationshipAdd',query:{bian:'qq'}}"><el-dropdown-item>编辑</el-dropdown-item></router-link>
													<span @click="baseDelete(scope.$index, base)"><el-dropdown-item>迁出</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="已迁出">
                            <div class="main">
								<router-view class="householdDetail"></router-view>
								<el-table :data="MoveOut" style="width: 100%">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="name" label="姓名" width="140"></el-table-column>
									<el-table-column prop="phone" label="手机号" width="148"></el-table-column>
									<el-table-column prop="rentType" label="租用类型" width="148"></el-table-column>
									<el-table-column prop="build" label="楼宇" width="124"></el-table-column>
									<el-table-column prop="templateNumber" label="房号" width="140"></el-table-column>
									<el-table-column prop="startTime" label="迁入时间" width="148"></el-table-column>
									<el-table-column prop="endTime" label="迁出时间" width="172"></el-table-column>
                                    <el-table-column prop="ammeter" label="电表读数" width="140"></el-table-column>
                                    <el-table-column prop="WaterMeter" label="水表读数" width="140"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
												<span style="color:rgb(50, 168, 238)" @click="detail(scope.$index, MoveOut)">
                                                    查看详情
                                                </span>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
									</el-pagination>
								</div>
							</div>
                        </el-tab-pane>

						<el-tab-pane label="添加短信模板">
							<div class="main">
								
								<button class="add"  @click="addDuanxin">添加</button>
								<el-table :data="template" style="width: 100%">
									<el-table-column prop="title" label="标题" width="280"></el-table-column>
									<el-table-column prop="content" label="内容" width="480"></el-table-column>
									<el-table-column prop="sign" label="签名" width="280"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="tanchaung(scope.$index,template)"><el-dropdown-item>编辑</el-dropdown-item></span>
													<span @click="templateDelete(scope.$index, template)"><el-dropdown-item>删除</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="已发送短信">
							<div class="main">
								
								<button style="visibility: hidden;">添加</button>
								<el-table :data="sended" style="width: 100%">
									<el-table-column prop="name" label="姓名" width="180"></el-table-column>
									<el-table-column prop="phone" label="手机号" width="180"></el-table-column>
									<el-table-column prop="title" label="短信标题" width="180"></el-table-column>
									<el-table-column prop="content" label="短信内容" width="780"></el-table-column>
									<el-table-column prop="time" label="发送时间" width="200"  fixed="right"></el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="出入证管理">
							<div class="main">
								
								<button class="add" @click="dialogVisible = true">添加</button>
								<el-table :data="inandcome" style="width: 100%">
									<el-table-column prop="name" label="姓名" ></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="reason" label="来访因由"></el-table-column>
									<el-table-column prop="remarks" label="备注"></el-table-column>
									<el-table-column prop="time" label="来访时间"  fixed="right"></el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="装修管理">
							<div class="main">
								<div>
									<router-view class="apply"></router-view>
									<router-view class="check"></router-view>
									<router-view class="patrol"></router-view>
								</div>
								<router-link :to="{name: 'Apply'}"><button class="add1">装修申请</button></router-link>
								<el-table :data="redecorated" style="width: 100%">
									<el-table-column prop="name" label="姓名" ></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="rentType" label="租用类型"></el-table-column>
									<el-table-column prop="building" label="楼宇"></el-table-column>
									<el-table-column prop="roomNumber" label="房号"></el-table-column>
									<el-table-column prop="area" label="建筑面积（平方米）"></el-table-column>
									<el-table-column prop="type" label="装修性质"></el-table-column>
									<el-table-column prop="person" label="施工负责人"></el-table-column>
									<el-table-column prop="startTime" label="开始时间"></el-table-column>
									<el-table-column prop="endTime" label="预估结束时间"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="toApply(scope.$index,redecorated,8,'chakan')"><el-dropdown-item>查看</el-dropdown-item></span>
													<span @click="toApply(scope.$index,redecorated,8,'yanshou')"><el-dropdown-item>验收</el-dropdown-item></span>
													<span @click="toApply(scope.$index,redecorated,8,'xunjian')"><el-dropdown-item>巡检</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="服务派工">
							<div class="main">
								<div>
									<router-view class="server"></router-view>
									<router-view class="return"></router-view>
									
								</div>
								<router-link :to="{name: 'Server1'}"><button class="add1">新增派工</button></router-link>
								<el-table :data="server" style="width: 100%">
									<el-table-column prop="name" label="客户" ></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="rentType" label="服务类别"></el-table-column>
									<el-table-column prop="building" label="保修方式"></el-table-column>
									<el-table-column prop="roomNumber" label="满意程度"></el-table-column>
									<el-table-column prop="area" label="验收方式"></el-table-column>
									<el-table-column prop="type" label="回访情况"></el-table-column>
									<el-table-column prop="person" label="服务及时率"></el-table-column>
									<el-table-column prop="startTime" label="保修时间"></el-table-column>
									<el-table-column prop="endTime" label="完工时间"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<router-link :to="{name: 'Server1',query:{}}"><el-dropdown-item>查看</el-dropdown-item></router-link>
													<router-link :to="{name: 'Return'}"><el-dropdown-item>回访</el-dropdown-item></router-link>
													<el-dropdown-item>派工</el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

                        <el-tab-pane label="客户事件">
							<div class="main">
								<div>
									<router-view class="addCustomer"></router-view>
									<!-- <router-view class="return"></router-view> -->
									
								</div>
								<router-link :to="{name: 'AddCustomer',query:{msg:1}}"><button class="add1">新增事件</button></router-link>
								<el-table :data="customer" style="width: 100%">
									<el-table-column prop="name" label="客户" ></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="rentType" label="事件类型"></el-table-column>
									<el-table-column prop="building" label="事件描述"></el-table-column>
									<el-table-column prop="roomNumber" label="事件损失"></el-table-column>
									<el-table-column prop="area" label="经办人"></el-table-column>
									<el-table-column prop="type" label="回访情况"></el-table-column>
									<el-table-column prop="person" label="满意度"></el-table-column>
									<el-table-column prop="startTime" label="发生时间"></el-table-column>
									<el-table-column prop="endTime" label="备注"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="see(scope.$index,customer,4)"><el-dropdown-item>查看</el-dropdown-item></span>
													<span @click="see(scope.$index,customer,5)"><el-dropdown-item>回访</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="客户信息管理">
							<div class="main">
								<div>
									<router-view class="AddCustomer"></router-view>
									<!-- <router-view class="return"></router-view> -->
									
								</div>
								<router-link :to="{name: 'AddCustomer'}"><button class="add1">新增事件</button></router-link>
								<el-table :data="customerMsg" style="width: 100%">
									<el-table-column prop="name" label="客户" ></el-table-column>
									<el-table-column prop="phone" label="关联房屋"></el-table-column>
									<el-table-column prop="rentType" label="事件类型"></el-table-column>
									<el-table-column prop="building" label="事件描述"></el-table-column>
									<el-table-column prop="roomNumber" label="受理人"></el-table-column>
									<el-table-column prop="area" label="处理情况"></el-table-column>
									<el-table-column prop="type" label="处理事件"></el-table-column>
									<el-table-column prop="person" label="满意度"></el-table-column>
									<el-table-column prop="startTime" label="最近修改时间"></el-table-column>
									<el-table-column prop="endTime" label="备注"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="see1(scope.$index,customerMsg)"><el-dropdown-item>查看</el-dropdown-item></span>
													<router-link :to="{name: 'AddCustomer',query:{msg:3}}"><el-dropdown-item>修改</el-dropdown-item></router-link>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						

					</el-tabs>
					
				</div>
			</div>
			<!-- 添加短信弹窗 -->

				<el-dialog
					:title="this.name"
					:visible.sync="modify"
					width="30%">
					<div class="body">
                        <el-form  ref="addMessage" label-width="100px" class="demo-addMessage">
							<el-form-item label="短信标题:" prop="title">
                                <el-input v-model="addMessage.title" placeholder="请输入短信标题"></el-input>
								<span>仅为表示，短信不发送标题</span>
                            </el-form-item>
							<el-form-item label="短信内容:" prop="content">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="addMessage.content">
                                </el-input>
                            </el-form-item>
							<el-form-item label="签名:" prop="sign">
                                <el-input v-model="addMessage.sign"></el-input>
                            </el-form-item>
						</el-form>
                    </div>
                    <div class="footer">
                        <button class="add">确定</button><button class="delect" @click="modify = !modify">取消</button>
                    </div>
				</el-dialog>


			<!-- 出入证添加 -->
			<el-dialog
                title="添加来访人员"
                :visible.sync="dialogVisible"
                width="30%">

                <el-form  ref="shuru" label-width="130px" class="demo-shuru" size="mini">
					 <el-form-item label="姓名:">
                    <el-input v-model="upload.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:">
                    <el-input v-model="upload.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="来访因由:">
                    <el-input v-model="upload.reason" ></el-input>
                    </el-form-item>
                    <el-form-item label="来访时间:">
                    <el-input v-model="upload.time">
                    </el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                    <el-input v-model="upload.remarks">
                    </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>

            </el-dialog>
		</div>
	</div>
</template>

<script>
	import NavHeader from '@/components/NavHeader'
	import NavBar from '@/components/NavBar'
	export default {
		data() {
			return {
				//分页数据
				name:'添加',
				pageNo: 1,
                pageSize: 10,
                pageSizesList: [10, 15, 20, 30, 50],
                tableData: [],//返回的结果集合
				totalDataNumber: 400,//数据的总数,
				
				dialogVisible:false,
				modify:false,
				activeName: 'first',
				//出入证管理
				inandcome: [
					{
						name: 'sfsd',
						phone:'189494561',
						reason:'dfs',
						remarks: '困得一批',
						time: '2018.07.25'
					}
				],
				//出入证添加
				upload: 
				{
					name: '',
					phone: '',
					remarks:'',
					time: '',
					reason:''
				},
				//装修
				redecorated:[
					{
						name: 'adaef',
						phone: '189486669841',
						rentType: '店铺',
						building: '门面',
						roomNumber: 'efef',
						area:'dawr',
						type: 'werewe',
						person: 'def',
						startTime:'2018-01-01',
						endTime:'2018-12-12',
						id:145786414
					}
				],
				//服务派工
				server:[
					{
						name: 'adaef',
						phone: '189486669841',
						rentType: '店铺',
						building: '门面',
						roomNumber: 'efef',
						area:'dawr',
						type: 'werewe',
						person: 'def',
						startTime:'2018-01-01',
						endTime:'2018-12-12'
					}
				],
				//客户事件
				customer: [
					{
						name: 'adaef',
						phone: '189486669841',
						rentType: '店铺',
						building: '门面',
						roomNumber: 'efef',
						area:'dawr',
						type: 'werewe',
						person: 'def',
						startTime:'2018-01-01',
						endTime:'2018-12-12',
						id:589641654
					}
				],
				//客户信息管理
				customerMsg: [
					{
						name: 'adaef',
						phone: '189486669841',
						rentType: '店铺',
						building: '门面',
						roomNumber: 'efef',
						area:'dawr',
						type: 'werewe',
						person: 'def',
						startTime:'2018-01-01',
						endTime:'2018-12-12'
					}
				],
				//客户基本资料
				base: [{
						name: 'A座',
						rentType: '1',
                        build: '3',
                        phone:'146848964',
                        remarks:'fewf',
                        time:'8798',
						templateNumber:'er',
						id:56565
                },
                {
						name: 'A座',
						rentType: '1',
                        build: '3',
                        phone:'146848964',
                        remarks:'fewf',
                        time:'8798',
						templateNumber:'er',
						id:59874
                },{
						name: 'A座',
						rentType: '1',
                        build: '3',
                        phone:'146848964',
                        remarks:'fewf',
                        time:'8798',
						templateNumber:'er',
						id:5867
				}],
				//已迁出
                MoveOut: [
                    {
                        name:'038568',
                        phone:'魔方物业',
                        rentType:'A栋',
                        build:'1',
                        templateNumber:'4单元',
                        startTime: '105',
                        endTime:'0154',
                        ammeter:'150',
                        WaterMeter:'办公',

						id: 1

                    },
                    {
                        name:'038568',
                        phone:'魔方物业',
                        rentType:'A栋',
                        build:'1',
                        templateNumber:'4单元',
                        startTime: '105',
                        endTime:'0154',
                        ammeter:'150',
                        WaterMeter:'办公',
						id: 1,
						href:"www.baidu.com"
                    },
                    {
                        name:'038568',
                        phone:'魔方物业',
                        rentType:'A栋',
                        build:'1',
                        templateNumber:'4单元',
                        startTime: '105',
                        endTime:'0154',
                        ammeter:'150',
                        WaterMeter:'办公',
						id: 2

                    }
				],
				car: [{
						carrentType: '卢比克魔方',
						name: 'A座',
						rentType: '1',
						carType: '3',
						state: '多层',
						endTime: '钢筋混凝土',
						remarks: '坐北朝南',
						id:10,
						ammeter:'',
					},
				],
				//添加短信模板
				template:[
					{
						title:'节日祝福',
						content: '尊敬的XX用户，祝您中秋节快乐，阖家幸福',
						sign: '魔方物业'
					},
					{
						title:'节日祝福',
						content: '尊敬的XX用户，祝您生日快乐',
						sign: '魔方物业'
					},
				],
				//已发送短信
				sended:[ {
					name: 'sfsd',
					phone:'dsf',
					content:'dfs',
					title: 'sdf',
					time: '2018.07.25'
				},],
				addMessage: {
					content:'',
					title: '',
					sign: ''
				},
				
				rules: {
                    title: [
                    { required: true, message: '请输入短信标题', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				content: [
                    { required: true, message: '请输入短信内容', trigger: 'blur' },
                    { max: 246, message: '长度在246个字符以内', trigger: 'blur' }
				],
				}
			}
		},
		// mounted() {
		// 	gettemplate(),
		// 	getbase()
		// },
		
		methods: {
			changePosition() {
				console.log(this.position)
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			//获取base
			getbase() {
				this.$ajax.get('url').then((res) => {
					this.base = res.data.base
				})
			},
			baseDelete(index,rows) {
				let that = this;
				that.id = this.base[index].id;
				console.log(this.id);
				rows.splice(index, 1);
				this.$ajax.post('url' + this.id).then((res) => {
					this.getbase()
				})
			},
			//客户基本资料-详情
			detail(index,rows){
				let that = this;
				that.id = this.base[index].id;
				console.log(this.base[index].id)
				this.$router.push({name: 'RelationshipAdd',query:{id:that.id,bian:'no'}})
			},
			//获取MoveOut
			gettemplate() {
				this.$ajax.get('url').then((res) => {
					this.MoveOut = res.data.MoveOut
				})
			},
			//删除所选行
			templateDelete(index,rows) {
				let that = this;
				that.id = this.MoveOut[index].id;
				console.log(this.id);
				rows.splice(index, 1);
				console.log(this.MoveOut)
				this.$ajax.post('url' + this.id).then((res) => {
					this.gettemplate()
				})
			},
			//添加短信弹窗
			addDuanxin(){
				this.addMessage = {},
				this.modify = true,
				this.name = '添加'
			},
			//编辑短信弹窗
			tanchaung(index,rows){
                let that = this;
				that.id = this.template[index].id;
                console.log(this.id);
                this.modify = true
                if(that.id !== ''){
                    this.name = '编辑'
                    this.$ajax.get(url + '',{
                        params:{
                            '': this.id
                        }
                    }).then(res => {
                    })
                }
			},
			//客户事件--查看
			see(index,row,msg){
				let that = this;
				that.id = this.customer[index].id;
				this.msg = msg
				this.$router.push({name:'AddCustomer',query:{id:that.id,msg:this.msg}})
			},
			//客户信息管理--查看
			see1(index,row){
				let that = this;
				that.id = this.customerMsg[index].id;
				this.$router.push({name:'AddCustomer',query:{id:that.id,msg:2}})
			},
			//装修管理
			toApply(index,row,msg,toWhere){
				this.toWhere = toWhere;
				let that = this;
				that.id = this.redecorated[index].id;
				this.msg = msg
				if(this.toWhere == "chakan"){
					this.$router.push({name:'Apply',query:{id:that.id,msg:this.msg}})
				}else if(this.toWhere == "yanshou"){
					this.$router.push({name:'Check',query:{id:that.id}})
				}else if(this.toWhere == "xunjian"){
					this.$router.push({name:'Patrol',query:{id:that.id}})
				}
			}

		},
		components: {
			NavHeader,
			NavBar
		}
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
	
	.name {
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
		width: 63px;
		height: 31px;
        margin-right: 10px;
        margin-top: 10px;
		margin-bottom: 20px;
    }
	.add1 {
		color: white;
		background-color: #32a8ee;
		font-size: 14px;
		font-family: "Microsoft YaHei";
		border: 1px solid #32a8ee;
		border-radius: 5px;
		width: 90px;
		height: 31px;
        margin-right: 10px;
        margin-top: 10px;
		margin-bottom: 20px;
    }

	
	.delect {
		font-size: 14px;
		font-family: "Microsoft YaHei";
		color: rgb(212, 212, 212);
		border-width: 1px;
		border-color: rgb(217, 217, 217);
		border-style: solid;
		border-radius: 5px;
		background-color: rgb(245, 245, 245);
		width: 63px;
		height: 31px;
        margin-right: 10px;
        margin-top: 10px;
		margin-bottom: 20px;
	}
	
	.main {
		padding: 0 40px 0 50px;
		width: 99%;
		margin-left: 2px;
		height: 844px;
	}
	
	.biaodan span {
		width: 12%;
		text-align: center;
		display: inline-block;
		padding: 16px 0;
		font-size: 12px;
		font-family: "Microsoft YaHei";
	}
	
	input[type='checkbox'] {
		position: relative;
		left: 40px;
	}
	
	.head {
		background-color: rgb(250, 250, 250);
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
	}
	
	
	label {
		width: 100%;
	}
	
	.has-gutter {
		background-color: rgb(250, 250, 250)!important;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25)!important;
	}
	.el-table__header{
        background-color: rgb(250, 250, 250)!important;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25)!important;
    }
	.el-dropdown-link {
		width: 4em !important;
	}
	
	.el-dropdown {
		width: 100px !important;
	}
	
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
	
	
	.el-dropdown-link {
		width: 4em !important;
	}
	
	.el-dropdown {
		width: 100px !important;
	}
    .cash {
  border: 1px rgb(217, 217, 217) solid;
  border-radius: 5px;
  background-color: rgb(245, 245, 245);
  width: 113px;
  height: 31px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(212, 212, 212);
  margin-right: 10px;
        margin-top: 10px;
		margin-bottom: 20px;
    }
    .import {
        color: white;
		background-color: #32a8ee;
		font-size: 14px;
		font-family: "Microsoft YaHei";
		border: 1px solid #32a8ee;
		border-radius: 5px;
		width: 63px;
		height: 31px;
        margin-right: 10px;
        margin-top: 10px;
		margin-bottom: 20px;
    }
    .el-dropdown-menu__item button{
    border: none;
    background: none;
    padding: none;
}

.next{
	position: absolute;
}
.el-tabs__content{
	overflow: visible!important;
}
a{
    color: white;
}
.relationshipAdd {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
}
.xiugai {
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
    height: 50%;
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
.body {
	margin-top: 15%;
    width: 70%;
    height: 60%;
}
</style>