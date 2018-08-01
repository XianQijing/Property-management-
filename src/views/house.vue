<template>
	<div class="house">
		<nav-bar/>
		<div class="container">
			<nav-header/>
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<!-- 管理区 -->
						<el-tab-pane label="管理区" name="first">
							<div class="main">
								<div><router-view class="addAdmin"></router-view></div>
								<button class="add" @click="addToAdmin('','','tianjia')">+ 添加</button><button class="delect">删除</button>
								<el-table :data="admin" style="width: 100%">
									<el-table-column prop="namec" label="小区名称" width="180"></el-table-column>
									<el-table-column prop="site" label="楼高"></el-table-column>
									<el-table-column prop="building" label="建筑面积(平方)"></el-table-column>
									<el-table-column prop="totalUsableArea" label="车库(座)"></el-table-column>
									<el-table-column prop="roadSurface" label="车位(个)"></el-table-column>
									<el-table-column prop="cellParkingRelationship.garage" label="楼宇(栋)"></el-table-column>
									<el-table-column prop="cellParkingRelationship.carSeatNumber" label="使用面积(平方)"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="addToAdmin(scope.$index, admin,'bianji')"><el-dropdown-item>编辑</el-dropdown-item></span>
													<span><el-dropdown-item>删除</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page=1
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="meiyexianshi"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="zongtiaoshu">
                                    </el-pagination>
                                    <!--size-change, pageSize 改变时会触发 -->
                                    <!-- current-change	currentPage 改变时会触发 -->
                                    <!-- current-page	当前页数，支持 .sync 修饰符 -->
                                    <!-- page-sizes	每页显示个数选择器的选项设置 -->
                                    <!-- layout	组件布局，子组件名用逗号分隔 -->
                                    <!-- total	总条目数 -->
									<!-- page-size	每页显示条目个数 -->
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="楼宇">
							<div class="main">
								<div><router-view class="addBuild"></router-view></div>
								<router-link :to="{name: 'AddBuild'}"><button class="add">+ 添加</button></router-link><button class="delect">删除</button>
								<el-table :data="build" style="width: 100%">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="precinct" label="所属小区" width="180"></el-table-column>
									<el-table-column prop="namec" label="楼宇名称" width="180"></el-table-column>
									<el-table-column prop="rooms" label="单元数量"></el-table-column>
									<el-table-column prop="layer" label="楼宇层数"></el-table-column>
									<el-table-column prop="buildingType" label="楼宇类型"></el-table-column>
									<el-table-column prop="buildingTowards" label="楼宇结构"></el-table-column>
									<el-table-column prop="orientation" label="楼宇朝向"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="jumpBuild(scope.$index, build)"><el-dropdown-item>编辑</el-dropdown-item></span>
													<span  @click="buildDelete(scope.$index, build)"><el-dropdown-item>删除</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page=1
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="meiyexianshi"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="zongtiaoshu">
                                    </el-pagination>
                                    <!--size-change, pageSize 改变时会触发 -->
                                    <!-- current-change	currentPage 改变时会触发 -->
                                    <!-- current-page	当前页数，支持 .sync 修饰符 -->
                                    <!-- page-sizes	每页显示个数选择器的选项设置 -->
                                    <!-- layout	组件布局，子组件名用逗号分隔 -->
                                    <!-- total	总条目数 -->
									<!-- page-size	每页显示条目个数 -->
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="房间">
                            <div class="main">
								<div>
							<router-view class="Next"></router-view>
							<router-view class="daoru"></router-view>
							</div>
								<router-link :to="{name: 'Next',query:{id:'qq'}}"><button class="add">+ 添加</button></router-link><router-link :to="{name: 'Daoru'}"><button class="import">导入</button></router-link><button class="cash">+ 添加收费标准</button><button class="delect" @click="allDelete">删除</button>
								<el-table :data="room" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="id" label="房屋编号" width="140"></el-table-column>
									<el-table-column prop="precinct" label="小区" width="108"></el-table-column>
									<el-table-column prop="buildings" label="楼宇" width="108"></el-table-column>
									<el-table-column prop="ste" label="单元号" width="124"></el-table-column>
									<el-table-column prop="floor" label="所在楼层" width="140"></el-table-column>
									<el-table-column prop="roomNumber" label="房号" width="108"></el-table-column>
									<el-table-column prop="chargeNumber" label="收费标准个数" width="172"></el-table-column>
                                    <el-table-column prop="coveredArea" label="建筑面积" width="140"></el-table-column>
                                    <el-table-column prop="useId" label="房屋类型" width="140"></el-table-column>
                                    <el-table-column prop="roomType" label="房屋户型" width="140"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
                                                    <!-- <el-dropdown-item>绑定住户</el-dropdown-item> -->
													<!-- <el-dropdown-item>添加收费标准</el-dropdown-item> -->
													<span @click="jumpRoom(scope.$index, room)"><el-dropdown-item>详情/编辑</el-dropdown-item></span>
													<span @click="roomDelete(scope.$index, room)"><el-dropdown-item>删除</el-dropdown-item></span>
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

						<el-tab-pane label="车辆管理">
							<div class="main">
								<div>
									<router-view class="addCar"></router-view>
									<router-view class="carCharge"></router-view>
									</div>
								<router-link :to="{name: 'AddCar',query:{id:'ww'}}"><button class="add">+ 添加</button></router-link><router-link :to="{name: 'Daoru'}"><button class="import">导入</button></router-link><button class="cash">+ 添加收费标准</button><button class="delect" @click="allDelete">删除</button>
								<el-table :data="car" style="width: 100%" >
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="carNumber" label="车辆编号" width="180"></el-table-column>
									<el-table-column prop="house" label="所属小区" width="180"></el-table-column>
									<el-table-column prop="number" label="车位号" width="180"></el-table-column>
									<el-table-column prop="carType" label="车位类型"></el-table-column>
									<el-table-column prop="state" label="车位状态"></el-table-column>
									<el-table-column prop="area" label="车位面积"></el-table-column>
									<el-table-column prop="charge" label="收费标准个数"></el-table-column>
									<el-table-column prop="remarks" label="备注"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<!-- <el-dropdown-item>绑定住户</el-dropdown-item> -->
													<!-- <el-dropdown-item><router-link :to="{name: 'CarCharge'}" style="color: #606266;">添加收费标准</router-link></el-dropdown-item> -->
													<span @click="jumpCar(scope.$index, car)"><el-dropdown-item>编辑 / 详情</el-dropdown-item></span>
													<el-dropdown-item><button @click="buildDelete(scope.$index, car)">删除</button></el-dropdown-item>
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

						<el-tab-pane label="房产验收">
							<div class="main">
								<div>
									<router-view class="test"></router-view>
									</div>
								<router-link :to="{name: 'Test',query:{id:'add'}}"><button class="add">+ 添加</button></router-link>
								<el-table :data="yanshou" style="width: 100%" >
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="carNumber" label="关联房屋" width="180"></el-table-column>
									<el-table-column prop="house" label="验收项目" width="180"></el-table-column>
									<el-table-column prop="number" label="验收标准" width="180"></el-table-column>
									<el-table-column prop="carType" label="验收结果"></el-table-column>
									<el-table-column prop="state" label="验收人"></el-table-column>
									<el-table-column prop="area" label="验收说明"></el-table-column>
									<el-table-column prop="charge" label="验收日期"></el-table-column>
									<el-table-column prop="remarks" label="备注"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="jumpHouse(scope.$index, yanshou)"><el-dropdown-item>查看 / 编辑</el-dropdown-item></span>
													<el-dropdown-item><button @click="houseDelete(scope.$index, yanshou)">删除</button></el-dropdown-item>
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
				activeName: 'first',
				multipleSelection: [],
				pp:1,
				dialogVisible : false,
				pageNo: 1,
                pageSize: 10,
                pageSizesList: [10, 15, 20, 30, 50],
                tableData: [],//返回的结果集合
				totalDataNumber: 400,//数据的总数,

				//
				zongtiaoshu:4,
				meiyexianshi:9,
				//
				//管理区
				admin: [{
						house: '卢比克魔方',
						namec: 'A座',
						number: '1',
						layers: '3',
						type: '多层',
						structure: '钢筋混凝土',
						orientation: '坐北朝南',
						id:10
					},
					{
						house: '卢比克魔方',
						namec: 'A座',
						number: '1',
						layers: '3',
						type: '多层',
						structure: '钢筋混凝土',
						orientation: '坐北朝南',
						id:6879685416
					}],
				//楼宇
				build: [{
						house: '卢比克魔方',
						name: 'A座',
						number: '1',
						layers: '3',
						type: '多层',
						structure: '钢筋混凝土',
						orientation: '坐北朝南',
						id:10
					},
					{
						house: '卢比克魔方',
						name: 'B座',
						number: '1',
						layers: '3',
						type: '多层',
						structure: '钢筋混凝土',
						orientation: '坐北朝南',
						id:11
					}
				],
				//房间
                room: [
					{
						house: '卢比克魔方',
						name: 'A座',
						number: '1',
						layers: '3',
						type: '多层',
						structure: '钢筋混凝土',
						orientation: '坐北朝南',
						id:10
					},
					{
						house: '卢比克魔方',
						name: 'B座',
						number: '1',
						layers: '3',
						type: '多层',
						structure: '钢筋混凝土',
						orientation: '坐北朝南',
						id:11
					}
				],
				//车辆管理
				car: [
					{
						carNumber: '卢比克魔方',
						house: 'A座',
						number: '1',
						carType: '3',
						state: '多层',
						charge: '钢筋混凝土',
						remarks: '坐北朝南',
						id:10,
						area:'',
					},
				],
				//房产验收
				yanshou:[
					{
						carNumber: '卢比克魔方',
						house: 'A座',
						number: '1',
						carType: '3',
						state: '多层',
						charge: '钢筋混凝土',
						remarks: '坐北朝南',
						id:10,
						area:'',
					},
				]
			}
		},
		mounted() {
			// this.getAdmin()
			// this.getRoom()
			this.getBuild()
			// this.getCar()
		},
		
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
				console.log(`当前 ${val} 页`)
				this.pp = val
				this.getAdmin(),
				this.getBuild()
			},
			//管理区添加
			addToAdmin(index,rows,msg){
				this.msg = msg
				if(this.msg == 'tianjia'){
					this.$router.push({name: 'AddAdmin',query:{msg:this.msg}})
				}else{
					let that = this
					that.id = this.admin[index].id
					this.$router.push({name: 'AddAdmin',query:{id:this.id,msg:this.msg}})
				}
				
			},
			//获取管理区
			getAdmin(){
				this.$ajax.get(url + 'precinct/selectPrecinct/'+this.pp+'/'+this.pp+'',{
					params:{
						'token': sessionStorage.getItem('userId'),
					}
				}).then(res => {
					this.admin = res.data.data.rows
					this.zongtiaoshu = res.data.data.rows.length
					this.meiyetiaoshu = res.data.data.records
				})
			},
			//获取build
			getBuild() {
				this.$ajax.get(url + 'building/flndAll/'+this.pp+'/'+this.pp+'',{
					params:{
						'token': sessionStorage.getItem('userId'),
					}
				}).then((res) => {
					this.build = res.data.data.rows
					console.log(res.data.data)
				})
			},
			//编辑build
			jumpBuild(index,rows){
				let that = this;
				that.id = this.build[index].id;
				console.log(this.build[index].id)
				this.$router.push({name: 'AddBuild',query:{id:that.id}})
			},
			//删除build
			buildDelete(index,rows) {
				let that = this;
				that.id = this.build[index].id;
				console.log(this.id);
				rows.splice(index, 1);
				this.$ajax.post('url' + this.id).then((res) => {
					this.getBuild()
				})
			},
			getCar(){
				this.$ajax.get(url + 'parkingSpot/flndParkingSpot/{id}').then((res) => {
					
				})
			},

			//获取room
			getRoom() {
				this.$ajax.get(url + 'room/flndAll/2/2',{
				}).then(res => {
					this.room = res.data.data.rows
					console.log(this.room)
				})
			},
			//跳转编辑
			jumpRoom(index,rows){
				let that = this;
				that.id = this.room[index].id;
				console.log(this.room[index].id)
				this.$router.push({name: 'Next',query:{id:that.id}})
			},
			//删除room
			roomDelete(index,rows) {
				let that = this;
				that.id = this.room[index].id;
				console.log(this.id);
				rows.splice(index, 1);
				console.log(this.room)
				
				this.$ajax.post('url' + this.id).then((res) => {
					this.getRoom()
				})
			},
			//跳转车辆
			jumpCar(index,rows){
				let that = this;
				that.id = this.car[index].id;
				console.log(this.car[index].id)
				this.$router.push({name: 'AddCar',query:{id:that.id}})
			},
			//跳转房产验收
			jumpHouse(index,rows){
				let that = this;
				that.id = this.yanshou[index].id;
				console.log(this.yanshou[index].id)
				this.$router.push({name: 'Test',query:{id:that.id}})
			},
			//删除房产
			houseDelete(index,rows) {
				let that = this;
				that.id = this.yanshou[index].id;
				console.log(this.id);
				rows.splice(index, 1);
				console.log(this.room)
				
				// this.$ajax.post('url' + this.id).then((res) => {
				// 	this.getRoom()
				// })
			},
			handleSelectionChange (val) {
            //val 为选中数据的集合
                this.multipleSelection = val
                console.log(this.multipleSelection)
            },
			allDelete() {
                let comments = this.multipleSelection
				console.log(comments.id)
                let num = []
                for (let i = 0;i<comments.length;i++) {
                num.push(comments[i].id)
                console.log(num)
            }
            // 写this.$axios
            this.$ajax.get(this.$host + 'allDle.do', {params: {'commentsId':num}})
                .then(resp => {
                console.log(resp.data)
                console.log(comments.length)
                for (let j = 0;j<comments.length;j++){
                this.room.splice(comments[j], 1)
            }
            this.toggleSelection()
            })
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
		padding: 0
	}
	
	.house {
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
	
	.fenye button {
		background-color: white;
		border: 1px solid #32a8ee;
		color: #32a8ee;
		width: 2em;
		margin-right: 10px;
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

.add1 {
		color: white;
		background-color: #32a8ee;
		font-size: 14px;
		font-family: "Microsoft YaHei";
		border: 1px solid #32a8ee;
		border-radius: 5px;
		width: 63px;
		height: 31px;
        margin-right: 10px;

    }

	
	.delect1 {
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
	}


</style>