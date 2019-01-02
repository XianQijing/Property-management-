<template>
	<div class="name">
		<div>
			<!-- <nav-header/> -->
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">

						<el-tab-pane label="客户基本资料" name="first" v-if="this.role.indexOf('rubik:customerInformation:list')!==-1">
							<div class="main">
								<div  v-if="tabIndex === '0'">
									<router-view class="relationshipAdd"></router-view>
								    <!-- <router-view class="householdDetail"></router-view> -->
								</div>
								<!-- <button class="delect" id="delect">迁出</button> -->
								<el-table :data="base" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="name" label="姓名"></el-table-column>
									<el-table-column prop="phone" label="手机号" width="180"></el-table-column>
									<!-- <el-table-column prop="sexs" label="性别"></el-table-column> -->
									<!-- <el-table-column prop="wechat" label="微信号"></el-table-column> -->
									<el-table-column prop="roomNumber" label="房间号"></el-table-column>
									<!-- <el-table-column prop="leaseType" label="租用类型"></el-table-column> -->
									<el-table-column prop="buildingName" label="楼宇"></el-table-column>
									<el-table-column prop="buildingName" label="状态" :filters="[{ text: '在租', value: '在租' }, { text: '已迁出', value: '已迁出' }]" :filter-method="filterTag" filter-placement="bottom-end">
										<template slot-scope="scope">
											<el-tag :type="scope.row.label === '在租' ? 'primary' : 'success'" disable-transitions>{{scope.row.label}}</el-tag>
										</template>
									</el-table-column>
									<el-table-column prop="decorateSituation" label="装修状态"></el-table-column>
									<el-table-column width="180">
										<template slot-scope="scope">
											<button class="operation1" @click="detail(scope.$index, base)">详情</button>
											<button class="operation" @click="customerEdit(scope.$index, base)" v-if="scope.row.label == '在租'">编辑</button>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="pageSize" :page-sizes="pageSizesList" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="已发送短信" name="third" v-if="this.role.indexOf('rubik:textMessageSent:list')!==-1">
							<div class="main">
								
								<button style="visibility: hidden;">添加</button>
								<el-table :data="sended" style="width: 100%">
									<el-table-column prop="name" label="姓名"></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="titleName" label="短信标题"></el-table-column>
									<el-table-column prop="content" label="短信内容" ></el-table-column>
									<el-table-column prop="sendTime" label="发送时间" fixed="right"></el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChangesended" @current-change="handleCurrentChangesended" :current-page="pageNoSended"  :page-size="pageSizeSended" :page-sizes="pageSizesListSended" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumbersended">
									</el-pagination>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="出入证管理" name="fourth" v-if="this.role.indexOf('rubik:certificateManagement:list')!==-1">
							<div class="main">
								
								<button class="add" @click="dialogVisible = true">添加</button>
								<el-table :data="inandcome" style="width: 100%">
									<el-table-column prop="id" label="卡号" ></el-table-column>
									<el-table-column prop="name" label="领取人" ></el-table-column>
									<el-table-column prop="phone" label="联系方式"></el-table-column>
									<el-table-column prop="remarks" label="备注"></el-table-column>
									<el-table-column prop="useTime" label="使用时间"></el-table-column>
									<el-table-column prop="times" label="领取时间"></el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChangeinandcome" @current-change="handleCurrentChangeinandcome" :current-page="pageNoInandcome"  :page-size="pageSizeInandcome" :page-sizes="pageSizesListInandcome" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumberinandcome">
									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="装修管理" name="fifth" v-if="this.role.indexOf('rubik:decorateManagement:list')!==-1">
							<div class="main">
								<div  v-if="tabIndex === '3'">
									<router-view class="apply"></router-view>
									<!-- <router-view class="check"></router-view> -->
									<!-- <router-view class="patrol"></router-view> -->
								</div>
								<router-link :to="{name: 'Apply'}"><button class="add1">装修申请</button></router-link>
								<el-table :data="redecorated" style="width: 100%">
									<el-table-column prop="name" label="姓名" ></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="decorate_situation" label="装修状态"></el-table-column>
									<el-table-column prop="buildingName" label="楼宇"></el-table-column>
									<el-table-column prop="roomNumber" label="房号"></el-table-column>
									<el-table-column prop="cash_deposit" label="装修保证金"></el-table-column>
									<el-table-column prop="natureName" label="装修性质"></el-table-column>
									<el-table-column prop="principal_man" label="施工负责人"></el-table-column>
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
													<span @click="toApply(scope.$index,redecorated,7,'xiugai')" v-if="scope.row.odelFlag == 1"><el-dropdown-item>修改</el-dropdown-item></span>
													<span @click="toApply(scope.$index,redecorated,8,'yanshou')" v-if="scope.row.odelFlag == 1,scope.row.decorate_situation!='装修合格'"><el-dropdown-item>验收</el-dropdown-item></span>
													<span @click="toApply(scope.$index,redecorated,8,'xunjian')" v-if="scope.row.odelFlag == 1"><el-dropdown-item>巡检</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChangeredecorated" @current-change="handleCurrentChangeredecorated" :current-page="pageNoRedecorated"  :page-size="pageSizeRedecorated" :page-sizes="pageSizesListRedecorated" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumberredecorated">
									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="服务派工" name="sixth" v-if="this.role.indexOf('rubik:serviceDispatching:list')!==-1">
							<div class="main">
								<div  v-if="tabIndex === '4'">
									<router-view class="server"></router-view>
									<!-- <router-view class="return"></router-view> -->
								</div>
								<router-link :to="{name: 'Server1'}"><button class="add1">新增派工</button></router-link>
								<el-table :data="server" style="width: 100%">
									<el-table-column prop="name" label="客户" ></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="service_classes" label="服务类别"></el-table-column>
									<el-table-column prop="way" label="报修方式"></el-table-column>
									<el-table-column prop="cacsi" label="满意程度"></el-table-column>
									<el-table-column prop="check_condition" label="验收情况"></el-table-column>
									<el-table-column prop="visit_explain" label="回访情况"></el-table-column>
									<el-table-column prop="service_timeliness" label="服务及时率"></el-table-column>
									<el-table-column prop="receiverTime" label="报修时间"></el-table-column>
									<el-table-column prop="endTime" label="完工时间"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="toServer(scope.$index,server,8,'server')"><el-dropdown-item>查看</el-dropdown-item></span>
													<span @click="toServer(scope.$index,server,7,'edit')"><el-dropdown-item>编辑</el-dropdown-item></span>
													<span @click="toServer(scope.$index,server,8,'return')"  v-if="scope.row.odelFlag == 1"><el-dropdown-item>回访</el-dropdown-item></span>
													<!-- <el-dropdown-item>派工</el-dropdown-item> -->
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChangeserver" @current-change="handleCurrentChangeserver" :current-page="pageNoServer"  :page-size="pageSizeServer" :page-sizes="pageSizesListServer" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumberserver">
									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

                        <el-tab-pane label="客户事件" name="seventh" v-if="this.role.indexOf('rubik:theCustomerEvent:list')!==-1">
							<div class="main">
								<div  v-if="tabIndex === '5'">
									<router-view class="addCustomer"></router-view>
									<!-- <router-view class="return"></router-view> -->
								</div>
								<router-link :to="{name: 'AddCustomer',query:{msg:1}}"><button class="add1">新增事件</button></router-link>
								<el-table :data="customer" style="width: 100%">
									<el-table-column prop="name" label="客户" ></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="eventTypeValue" label="类型"></el-table-column>
									<el-table-column prop="event_depict" label="描述"></el-table-column>
									<el-table-column prop="event_loss" label="事件损失"></el-table-column>
									<el-table-column prop="agent" label="经办人"></el-table-column>
									<el-table-column prop="visit_condition" label="回访情况"></el-table-column>
									<el-table-column prop="cacsi" label="满意度"></el-table-column>
									<el-table-column prop="eventDate" label="发生时间"></el-table-column>
									<!-- <el-table-column prop="remarks" label="备注"></el-table-column> -->
									<el-table-column width="180">
										<template slot-scope="scope">
											<button class="operation1" @click="see(scope.$index,customer,4)">查看</button>
											<button class="operation" @click="see(scope.$index,customer,5)"  v-if="scope.row.odelFlag == 1">回访</button>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChangecustomer" @current-change="handleCurrentChangecustomer" :current-page="pageNoCustomer"  :page-size="pageSizeCustomer" :page-sizes="pageSizesListCustomer" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumbercustomer">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="客户信息管理" name="eight" v-if="this.role.indexOf('rubik:ECIF:list')!==-1">
							<div class="main">
								<div  v-if="tabIndex === '6'">
									<router-view class="AddCustomer"></router-view>
									<!-- <router-view class="return"></router-view> -->
									
								</div>
								<router-link :to="{name: 'AddCustomer'}"><button class="add1">新增事件</button></router-link>
								<el-table :data="customerMsg" style="width: 100%">
									<el-table-column prop="name" label="客户" ></el-table-column>
									<el-table-column prop="phone" label="手机号"></el-table-column>
									<el-table-column prop="categoryValue" label="类型"></el-table-column>
									<el-table-column prop="content" label="描述"></el-table-column>
									<el-table-column prop="occurrenceTime" label="反馈时间"></el-table-column>
									<el-table-column prop="handler" label="受理人"></el-table-column>
									<el-table-column prop="process_condition" label="处理情况"></el-table-column>
									<el-table-column prop="processTime" label="处理时间"></el-table-column>
									<el-table-column prop="process_cacsi" label="满意度"></el-table-column>
									<el-table-column prop="remarks" label="备注"></el-table-column>
									<el-table-column width="180">
										<template slot-scope="scope">
											<button class="operation1" @click="see1(scope.$index,customerMsg,2)">查看</button>
											<button class="operation" @click="see1(scope.$index,customerMsg,3)"  v-if="scope.row.odelFlag == 1">修改</button>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChangecustomerMsg" @current-change="handleCurrentChangecustomerMsg" :current-page="pageNoCustomerMsg"  :page-size="pageSizeCustomerMsg" :page-sizes="pageSizesListCustomerMsg" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumbercustomerMsg">

									</el-pagination>
								</div>
							</div>
						</el-tab-pane>

						

					</el-tabs>
					
				</div>
			</div>
			<!-- 添加短信弹窗 -->
			<!-- <el-dialog
					:title="this.name"
					:visible.sync="modify"
					width="30%"
					> -->
					
                        <!-- <el-form :model="addMessage" :rules="rules" ref="addMessage" label-width="100px" class="demo-addMessage" v-if="msg === 1">
							<el-form-item label="短信标题:" prop="title">
								<el-select v-model="addMessage.title" placeholder="请输入短信标题">
									<el-option
										v-for="item in messageTitle"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
                   			</el-select>
								<br>
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
						</el-form> -->
						<!-- 群发短信 -->
						<!-- <el-form :model="textMessage" ref="textMessage" label-width="100px" class="demo-textMessage" v-if="msg === 2">
							<el-form-item label="短信模板:">
								<el-select v-model="textMessage.templateId" placeholder="请选择短信模板">
									<el-tooltip placement="right" v-for="items in template" :key="items.id" effect="light">
										<div slot="content">{{items.content}}</div>
										<el-option
											:label="items.titleName"
											:value="items.id">
										</el-option>
									</el-tooltip>
								</el-select>
							</el-form-item>
							<el-form-item label="发送类型:">
								<el-radio v-model="textMessage.change" label="1" @click="textarea.who=''">指定身份发送</el-radio>
								<el-radio v-model="textMessage.change" label="2" @click="textarea.who=''">指定号码发送</el-radio>
							</el-form-item>
							<el-form-item label="发送对象:" v-if="textMessage.change === '1'">
									<el-cascader
										expand-trigger="hover"
										:options="options"
										v-model="textMessage.more"
										@change="changeOne">
									</el-cascader>
							</el-form-item> -->
							<!-- <el-form-item label="住户状态:" v-if="textMessage.change === '1'">
								<el-radio v-model="textMessage.status" label="1">已迁入</el-radio>
								<el-radio v-model="textMessage.status" label="2">已迁出</el-radio>
							</el-form-item> -->
							<!-- <el-form-item label="发送对象:" v-if="textMessage.change === '2'">
								<el-input
									type="textarea"
									:rows="4"
									placeholder="请输入号码，多条以逗号(半角)隔开"
									v-model="textMessage.who">
								</el-input>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer" v-show="tianjia">
							<el-button @click="modify = false">取 消</el-button>
							<el-button type="primary" @click="addOne()">确 定</el-button>
						</span>
						<span slot="footer" class="dialog-footer" v-show="bianji">
							<el-button @click="modify = false">取 消</el-button>
							<el-button type="primary" @click="noteTemplateUpdate">确 定</el-button>
						</span> -->
                    <!-- <div class="footer" v-show="tianjia">
                        <button class="add" @click="addOne()">确定</button><button class="delect" @click="modify = !modify">取消</button>
                    </div>
					<div class="footer" v-show="bianji">
                        <button class="add" @click="noteTemplateUpdate">编辑</button><button class="delect" @click="modify = !modify">取消</button>
                    </div> -->
			<!-- </el-dialog> -->
			

			<!-- 出入证添加 -->
			<el-dialog
                title="添加来访人员"
                :visible.sync="dialogVisible"
                width="30%">

                <el-form  :model="upload" ref="shuru" label-width="130px" :rules="rules1" class="demo-shuru" style="margin:0 10% 0 0">
					 <el-form-item label="领取人:" prop="name">
                    <el-input v-model="upload.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:" prop="phone">
                    <el-input v-model="upload.phone" @blur="blur"></el-input>
                    </el-form-item>
                    <el-form-item label="领取时间:" prop="time">
						<el-date-picker
							v-model="upload.time"
							type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择日期时间"
							style="width:100%">
						</el-date-picker>
                    </el-form-item>
					<el-form-item label="使用时间:" prop="useTime">
						<el-date-picker
							v-model="upload.useTime"
							type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择日期时间"
							style="width:100%">
						</el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注:" prop="remarks">
						<el-input v-model="upload.remarks">
						</el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addInandcome">确 定</el-button>
                </span>

            </el-dialog>
		</div>
	</div>
</template>

<script>
	import NavHeader from '@/components/NavHeader'
	import NavBar from '@/components/NavBar'
	 import url from '../assets/Req.js'
	export default {
		data() {
			return {
				msg: 0,
				//分页数据
				name:'添加短信模板',
				pageNo: 1,
                pageSize: 10,
                pageSizesList: [10,20, 30, 40, 50],
                tableData: [],//返回的结果集合
				totalDataNumber: 400,//base数据的总数,
				totalDataNumberMoveOut: 400,//MoveOut数据的总数,
				totalDataNumbertemplate: 400,//template数据的总数,
				totalDataNumbersended: 400,//sended数据的总数,
				totalDataNumberinandcome: 400,//inandcome数据的总数,
				totalDataNumberredecorated: 400,//redecorated数据的总数,
				totalDataNumberserver: 400,//server数据的总数,
				totalDataNumbercustomer: 400,//customer数据的总数,
				totalDataNumbercustomerMsg: 400,//customerMsg数据的总数,
				pageNoMoveOut: 1,
                pageSizeMoveOut: 10,
				pageSizesListMoveOut: [10,20, 30, 40, 50],
				pageNoTemplate: 1,
                pageSizeTemplate: 10,
				pageSizesListTemplate: [10,20, 30, 40, 50],
				
				pageNoSended: 1,
                pageSizeSended: 10,
				pageSizesListSended: [10,20, 30, 40, 50],
				
				pageNoInandcome: 1,
                pageSizeInandcome: 10,
				pageSizesListInandcome: [10,20, 30, 40, 50],
				
				pageNoRedecorated: 1,
                pageSizeRedecorated: 10,
				pageSizesListRedecorated: [10,20, 30, 40, 50],
				
				pageNoServer: 1,
                pageSizeServer: 10,
				pageSizesListServer: [10,20, 30, 40, 50],
				
				pageNoCustomer: 1,
                pageSizeCustomer: 10,
				pageSizesListCustomer: [10,20, 30, 40, 50],
				
				pageNoCustomerMsg: 1,
                pageSizeCustomerMsg: 10,
                pageSizesListCustomerMsg: [10,20, 30, 40, 50],
				
				// tianjia:false,
				// bianji:true,
				dialogVisible:false,
				// modify:false,
				activeName: 'first',
				//出入证管理
				inandcome: [],
				//出入证添加
				upload: 
				{
					name: '',
					phone: '',
					remarks:'',
					time: '',
					useTime:''
				},
				//装修
				redecorated:[],
				//服务派工
				server:[],
				//客户事件
				customer: [],
				//客户信息管理
				customerMsg: [],
				//客户基本资料
				base: [],
				//已迁出
                MoveOut: [],
				car: [],
				//添加短信模板
				template:[
					{
						title:'节日祝福',
						content: '尊敬的XX用户，祝您生日快乐',
						sign: '魔方物业'
					},
				],
				// addMessage: {
				// 	content:'b',
				// 	title: 32,
				// 	sign: 'a'
				// },
				//短信模板下拉框
				messageTitle:[
					{label: "节日祝福",value: 32},
					{label: "生日祝福",value: 33},
					{label: "活动通知",value: 34},
					{label: "欠费通知",value: 35},
					{label: "费用通知",value: 36},
					{label: "短信调查",value: 37}
				],
				tabIndex: '0',
				//已发送短信
				sended:[],
				// rules: {
                //     title: [
				// 		{ required: true, message: '请输入短信标题', trigger: 'blur' },
				// 	],
				// 	content: [
				// 		{ required: true, message: '请输入短信内容', trigger: 'blur' },
				// 		{ max: 246, message: '长度在246个字符以内', trigger: 'blur' }
				// 	],
				// 	sign:[
				// 		{ required: true, message:'请输入签名',trigger: 'blur'}
				// 	]
				// },
				rules1: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
					],
					useTime: [
						{ required: true, message: '请选择使用时间', trigger: 'blur' },
					],
					time: [
						{ required: true, message: '请输入时间', trigger: 'blur' },
					],
					remarks:[
						{ required: true, message: '请输入备注', trigger: 'blur' },
					]
				},
				// textMessage: {
				// 	templateId: '',
				// 	change: '',
				// 	who: '',
				// 	status: '',
				// 	textarea: '',
				// 	more:[]
				// },
				options:[],
				role:[]
			}
		},
		mounted() {
			this.$ajax.get(url + 'role/findPermission').then(res => {
				res.data.data.forEach(v => {
					this.role.push(v.permission)
				})
			})
			this.getbase(),
			this.getMoveOut(),
			this.getsended(),
			this.getinandcome(),
			this.getredecorated(),
			this.getserver(),
			this.getcustomer(),
			this.getcustomerMsg()
			if(this.$route.query.tabPane){
				this.activeName = this.$route.query.tabPane
			}else{
				this.activeName = 'first'
			}
		},
		
		methods: {
			blur (e) {
				var reg = /^\+?[1-9][0-9]*$/
				if (!reg.test(e.target.value)) {
					e.target.style.borderColor = 'red'
					this.$message({
					message: '请输入数字',
					type: 'error'
					})
				}else if(e.target.value.length!==11){
					e.target.style.borderColor = 'red'
					this.$message({
					message: '请输入11位数字',
					type: 'error'
					})
				} else {
					e.target.style.borderColor = '#67c23a'
				}
				},
			changePosition() {
			},
			changeOne(e){
				this.textMessage.who = e.join(",")
			},
			handleClick(tab, event) {
				this.tabIndex = tab.index
				this.$router.push('/relationship')
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.pageNo = 1
				setTimeout(this.getbase(),1000)
				
			},
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getbase()
			},
			//获取base
			getbase() {
				this.$ajax.get(url+'owner/condition/'+this.pageNo+'/'+this.pageSize).then((res) => {
					if(res.data.status === 200){
					this.base = res.data.data.rows
					this.totalDataNumber = res.data.data.records

					}
				})
			},
			baseDelete(index,rows) {
				let that = this;
				that.id = this.base[index].id;
				that.roomid = this.base[index].roomid;
				that.contractId = this.base[index].contractId;
				this.$confirm('此操作将永久迁出, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						this.$ajax.post(url+'owner/del/' + this.id+'/'+ this.roomid+'/'+that.contractId).then((res) => {
							if(res.status === 200){
								this.getbase()
								this.$message({
									type: 'success',
									message: '迁出成功!'
								})
							}else if(res.data.status===403){
								this.$message({
									message: '权限不足',
									type: 'error'
								})
							}else{
								message({
									type: 'error',
									message: this.msg
								})
							}
						})          
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消迁出'
						});          
					});                                                                                                                  
			},
			//客户基本资料-详情
			detail(index,rows){
				let that = this;
				that.id = this.base[index].id;
				that.roomid = this.base[index].roomid;
				that.contractId = this.base[index].contractId;
				if(!this.roomid){
					this.roomid = '0';
				}
				this.$router.push({name: 'RelationshipAdd',query:{id:that.id,roomid:that.roomid,bian:'no',contractId:that.contractId}})
			},
			// details(index,rows){
			// 	let that = this;
			// 	that.id = this.MoveOut[index].customer;
			// 	that.roomid = this.MoveOut[index].room;
			// 	this.$router.push({name: 'RelationshipAdd',query:{id:that.id,roomid:that.roomid,bian:'no'}})
			// },
			//客户基本资料-编辑
			customerEdit(index,rows){
				let that = this;
				that.id = this.base[index].id;
				that.contractId = this.base[index].contractId;
				//alert(this.base[index].roomid);
				that.roomid = this.base[index].roomid;
				this.$router.push({name: 'RelationshipAdd',query:{id:that.id,roomid:that.roomid,bian:'qq',contractId:that.contractId}})
			},
			handleSizeChangeMoveOut(val) {
				this.pageSizeMoveOut = val;
				this.getMoveOut()
			},
			handleCurrentChangeMoveOut(val) {
				this.pageNoMoveOut = val;
				this.getMoveOut()
			},
			//获取MoveOut
			getMoveOut() {
				this.$ajax.get(url+'moveOut/condition/'+this.pageNoMoveOut+'/'+this.pageSizeMoveOut).then((res) => {
					this.MoveOut = res.data.data.rows
					this.totalDataNumberMoveOut = res.data.data.records
				})
			},
			//删除所选行
			// templateDelete(index,rows) {
			// 	let that = this;
			// 	that.id = this.MoveOut[index].id;
			// 	rows.splice(index, 1);
			// 	this.$ajax.post(url+'moveOut/del/' + this.id).then((res) => {
			// 		this.getMoveOut()
			// 	})
			// },
			handleSizeChangetemplate(val) {
				this.pageSizeTemplate = val;
				this.gettemplate()
			},
			handleCurrentChangetemplate(val) {
				this.pageNoTemplate = val;
				this.gettemplate()
			},
			//获取template 短信模板
			gettemplate() {
				this.$ajax.get(url+'noteTemplate/findCondition/'+this.pageNoTemplate+'/'+this.pageSizeTemplate).then((res) => {
					this.template = res.data.data.rows
					this.totalDataNumbertemplate = res.data.data.records
				})
			},
			//增加短信模板
		// 	addOne(){
		// 		if(this.msg === 1){
		// 			var noteTemplate={};
		// 			noteTemplate.title=this.addMessage.title;
		// 			noteTemplate.content=this.addMessage.content;
		// 			noteTemplate.signature=this.addMessage.sign;
		// 			this.$ajax.post(url+"noteTemplate/insert",noteTemplate
		// 			).then((res) => {
		// 				if(res.status){
		// 				this.form = res.data
		// 				this.$message({
		// 					message: '成功',
		// 					type: 'success'
		// 			});
		// 				this.modify = false
		// 				this.gettemplate()
		// 				}else{
		// 					this.$message.error('添加失败');
		// 				}
		// 			})
		// 		}else{
		// 			if (!this.textMessage.templateId){
		// 				this.$message.error('请选择标题');
		// 			}else if(!this.textMessage.change){
		// 				this.$message.error('请选择发送类型');
		// 			}else if(!this.textMessage.who){
		// 				this.$message.error('请选择发送对象');
		// 			}else{
		// 			 this.$ajax.post(url + 'note/insert/'+this.textMessage.templateId+'/'+this.textMessage.change+'/'+this.textMessage.who).then(res => {
		// 				 if(res.data.status === 200){
		// 					 this.$message.success('成功');
		// 				 }else{
		// 					 this.$message.success(res.data.msg);
		// 				 }
		// 			 })
		// 			}
		// 		}
		// },
		//添加短信弹窗
			// addDuanxin(msg){
			// 	this.msg = msg
			// 	this.modify = true
			// 	this.tianjia = true,
			// 	this.bianji = false
			// 	if(msg === 1){
			// 		this.addMessage = {},
			// 		this.name = '添加短信模板',
			// 		this.tianjia = true,
			// 		this.bianji = false
			// 	}else{
			// 		this.textMessage.title = '',
			// 		this.textMessage.textarea = ''
			// 		this.name = '短信群发'
			// 		this.textMessage.radio = '1'
			// 	}
			// },
		//编辑短信弹窗
		// noteTemplateEdit(index,rows){
		// 		let that = this;
		// 		this.msg = 1
		// 		that.id = this.template[index].id;
		// 		this.modify = true,
		// 		this.bianji = true,
		// 		this.tianjia = false
        //         if(that.id){
        //             this.name = '编辑短信模板'
        //             this.$ajax.get(url+'noteTemplate/findId/' + this.id).then(res => {
		// 				this.addMessage.title = birthDay(res.data.title);
		// 				this.addMessage.content = res.data.content;
		// 				this.addMessage.sign = res.data.signature;
		// 			})
        //         }
		// },
		//提交短信编辑
		// noteTemplateUpdate(){
		// 	this.bianji == true,
		// 	this.tianjia == false
		// 	var noteTemplate={};
		// 	noteTemplate.id=this.id;
        //     noteTemplate.title=birthDay1(this.addMessage.title);
        //    	noteTemplate.content=this.addMessage.content;
        //     noteTemplate.signature=this.addMessage.sign;
		// 	this.$ajax.put(url+'noteTemplate/update',noteTemplate).then(res => {
		// 		if(res.status === 200){
		// 			this.$message({
		// 			message: '成功',
		// 			type: 'success'
		// 	});
		// 		this.modify = false
		// 		this.gettemplate()
		// 		}else{
		// 			this.$message.error('修改失败');
		// 		}
		// 	})
		// },
			//删除所选行短信模板
			// noteTemplateDelete(index,rows) {
			// 	let that = this;
			// 	that.id = this.template[index].id;
			// 	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 		}).then(() => {
			// 	this.$ajax.delete(url+'noteTemplate/del/' + this.id).then((res) => {
			// 		if(res.status === 200){
			// 			this.gettemplate()
			// 			this.$message({
			// 						type: 'success',
			// 						message: '删除成功!'
			// 					})
			// 		}else{
			// 			this.$message(
			// 				{
			// 					type: 'error',
			// 					message: this.msg
			// 				}
			// 					)
			// 		}
			// 	})
			// 	}).catch(() => {
			// 			this.$message({
			// 				type: 'info',
			// 				message: '已取消删除'
			// 			});          
			// 		}); 
			// },
			handleSelectionChange (val) {
      //val 为选中数据的集合
      this.multipleSelection = val
      if (val.length > 0) {
        // 楼宇批量删除按钮
        document.getElementById('delect').style.background = 'red'
        // 房间批量删除按钮
        document.getElementById('roomDelete').style.background = 'red'
        // 车辆管理批量删除按钮
        document.getElementById('carDelete').style.background = 'red'
      } else {
        document.getElementById('delect').style.background = '#f5f5f5'
        document.getElementById('roomDelete').style.background = '#f5f5f5'
        document.getElementById('carDelete').style.background = '#f5f5f5'
      }
    },
			handleSizeChangesended(val) {
				this.pageSizeSended = val;
				this.pageNoSended = 1
				this.getsended()
			},
			handleCurrentChangesended(val) {
				this.pageNoSended = val;
				this.getsended()
			},
			//获取sended 短信记录
			getsended() {
				this.$ajax.get(url+'note/findCondition/'+this.pageNoSended+'/'+this.pageSizeSended).then((res) => {
					this.sended = res.data.data.rows
					this.totalDataNumbersended = res.data.data.records
				})
			},
			handleSizeChangeinandcome(val) {
				this.pageSizeInandcome = val;
				this.pageNoInandcome = 1
				this.getinandcome()
			},
			handleCurrentChangeinandcome(val) {
				this.pageNoInandcome = val;
				this.getinandcome()
			},
			//获取inandcome 出入证记录
			getinandcome() {
				this.$ajax.get(url+'visit/record/'+this.pageNoInandcome+'/'+this.pageSizeInandcome).then((res) => {
					if(res.data.status === 200){
					this.inandcome = res.data.data.rows
					this.totalDataNumberinandcome = res.data.data.records
					}else{
						// alert(res.data.msg)
					}
				})
			},
			//增加出入证记录
			addInandcome(){
				if(this.upload.name){
				var visit={};
				visit.name=this.upload.name;
				visit.phone=this.upload.phone;
				visit.useTime=this.upload.useTime;
				visit.time=this.upload.time;
				visit.remarks=this.upload.remarks;
            this.$ajax.post(url+"visit/insert",visit
            ).then((res) => {
				if(res.data.status === 200){
				this.form = res.data
				this.upload = {}
				this.$message({
					message: '添加成功',
					type: 'success'
					});
				this.dialogVisible = false
				this.getinandcome()
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
			})}
			else{
				this.$message({
					message: '请输入姓名',
					type: 'warning'
					});
			}
		},
		
			handleSizeChangeredecorated(val) {
				this.pageSizeRedecorated = val;
				this.getredecorated()
			},
			handleCurrentChangeredecorated(val) {
				this.pageNoRedecorated = val;
				this.getredecorated()
			},
			//获取redecorated 装修管理记录
			getredecorated() {
				this.$ajax.get(url+'adornApply/condition/1/'+this.pageNoRedecorated+'/'+this.pageSizeRedecorated).then((res) => {
					this.redecorated = res.data.data.rows
					this.totalDataNumberredecorated = res.data.data.records
				})
			},
			//装修管理
			toApply(index,row,msg,toWhere){
				this.toWhere = toWhere;
				let that = this;
				that.id = this.redecorated[index].id;
				this.msg = msg
				this.roomid = this.redecorated[index].room;
				if(this.toWhere == "chakan"){
					this.$router.push({name:'Apply',query:{id:that.id,msg:this.msg}})
				}else if(this.toWhere == "yanshou"){
					this.$router.push({name:'Test',params:{id:this.roomid,zhuangxiu:that.id},query:{id:"addNews"}})
				}else if(this.toWhere == "xunjian"){
					this.$router.push({name:'Patrol',query:{id:that.id}})
				}else{
					this.$router.push({name:'Apply',query:{id:that.id,msg:this.msg}})
				}
			},
			handleSizeChangeserver(val) {
				this.pageSizeServer = val;
				this.getserver()
			},
			handleCurrentChangeserver(val) {
				this.pageNoServer = val;
				this.getserver()
			},
			//获取server 服务派工记录
			getserver() {
				this.$ajax.get(url+'serviceAccept/condition/1/'+this.pageNoServer+'/'+this.pageSizeServer).then((res) => {
					this.server = res.data.data.rows
					this.totalDataNumberserver = res.data.data.records
				})
			},
			//服务派工的新增修改
			toServer(index,row,msg,toWhere){
				this.toWhere = toWhere;
				let that = this;
				that.id = this.server[index].id;
				this.msg = msg
				if(this.toWhere == "server"){
					this.$router.push({name:'Server1',query:{id:that.id,msg:this.msg}})
				}else if(this.toWhere == "return"){
					this.$router.push({name:'Return',query:{id:that.id}})
				}else{
					this.$router.push({name:'Server1',query:{id:that.id,msg:this.msg}})
				}
			},
			handleSizeChangecustomer(val) {
				this.pageSizeCustomer = val;
				this.getcustomer()
			},
			handleCurrentChangecustomer(val) {
				this.pageNoCustomer = val;
				this.getcustomer()
			},
			//获取customer 客户事件记录
			getcustomer() {
				this.$ajax.get(url+'customerEvent/condition/1/'+this.pageNoCustomer+'/'+this.pageSizeCustomer).then((res) => {
					this.customer = res.data.data.rows
					this.totalDataNumbercustomer = res.data.data.records
				})
			},
			handleSizeChangecustomerMsg(val) {
				this.pageSizeCustomerMsg = val;
				this.getcustomerMsg()
			},
			handleCurrentChangecustomerMsg(val) {
				this.pageNoCustomerMsg = val;
				this.getcustomerMsg()
			},
			//获取customerMsg 客户反馈信息记录
			getcustomerMsg() {
				this.$ajax.get(url+'feedbackMessage/condition/1/'+this.pageNoCustomerMsg+'/'+this.pageSizeCustomerMsg).then((res) => {
					this.customerMsg = res.data.data.rows
					this.totalDataNumbercustomerMsg = res.data.data.records
				})
			},
			
			//客户事件--查看
			see(index,row,msg){
				let that = this;
				that.id = this.customer[index].id;
				this.msg = msg
				this.$router.push({name:'AddCustomer',query:{id:that.id,msg:this.msg}})
			},
			//客户信息管理--查看
			see1(index,row,msg){
				let that = this;
				that.id = this.customerMsg[index].id;
				this.msg = msg
				this.$router.push({name:'AddCustomer',query:{id:that.id,msg:this.msg}})
			},
			// moreSelect(){
			// 	this.$ajax.get(url + 'room/flndByBuilding/aaa').then(res => {
			// 		this.options = res.data
			// 	})
			// },
	// 		formatter(row, column) {
    //     return row.address;
    //   },
			filterTag(value, row) {
				return row.label === value;
			},
    //   filterHandler(value, row, column) {
    //     const property = column['property'];
    //     return row[property] === value;
    //   }
		},
		components: {
			NavHeader,
			NavBar
		},
		watch:{
			'$route'(){
				this.getbase(),
				this.getMoveOut(),
				this.getsended(),
				this.getinandcome(),
				this.getredecorated(),
				this.getserver(),
				this.getcustomer(),
				this.getcustomerMsg()
			}
		}
	}
function birthDay (data) {
  if (data === '32') return '节日祝福'
  if (data === '33') return '生日祝福'
  if (data === '34') return '活动通知'
  if (data === '35') return '欠费通知'
  if (data === '36') return '费用通知'
  if (data === '37') return '短信调查'
}
function birthDay1 (data) {
  if (data === '节日祝福') return '32'
  if (data === '生日祝福') return '33'
  if (data === '活动通知') return '34'
  if (data === '欠费通知') return '35'
  if (data === '费用通知') return '36'
  if (data === '短信调查') return '37'
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
		height: 805px;
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
	
	
	/* label {
		width: 100%;
	} */
	
	.has-gutter {
		background-color: rgb(250, 250, 250)!important;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25)!important;
	}
	/* .el-table__header{
        background-color: rgb(250, 250, 250)!important;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25)!important;
    }
	.el-dropdown-link {
		width: 4em !important;
	}
	
	.el-dropdown {
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
	
	
	/* .el-dropdown-link {
		width: 4em !important;
	}
	
	.el-dropdown {
		width: 100px !important;
	} */
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
.footer {
	float: right;
}
.operation{
	width: 64px;
	height: 32px;
	border-radius: 5px;
	border: 1px solid #A1CEFF;
	background: white;
	color: #A1CEFF;
	margin: 0
}
</style>