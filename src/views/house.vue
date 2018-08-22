<template>
	<div class="house">
		<div class="container">
			<nav-header/>
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<!-- 管理区 -->
						<el-tab-pane label="管理区" name="first" v-if="this.role.indexOf('rubik:precinct:list')!==-1">
							<div class="main">
								<div v-if="tabIndex === '0'"><router-view class="addAdmin"></router-view></div>
								<button class="add" @click="addToAdmin('','','tianjia')">+ 添加</button>
                <!-- <button class="delect">删除</button> -->
								<el-table :data="admin" style="width: 100%">
									<el-table-column prop="namec" label="小区名称" width="180"></el-table-column>
									<el-table-column prop="region" label="所在地区"></el-table-column>
									<el-table-column prop="overallFloorage" label="建筑面积(平方)"></el-table-column>
									<el-table-column prop="garage" label="车库(座)"></el-table-column>
									<el-table-column prop="stall " label="车位(个)"></el-table-column>
									<el-table-column prop="building" label="楼宇(栋)"></el-table-column>
									<el-table-column prop="overallFloorage" label="建筑面积(平方)"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                          操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
													<span @click="addToAdmin(scope.$index, admin,'bianji')"><el-dropdown-item>编辑</el-dropdown-item></span>
													<span  @click="adminDelete(scope.$index,admin)"><el-dropdown-item>删除</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination
                    @size-change="adminSizeChange"
                    @current-change="adminCurrentChange"
                    :current-page="pageNoAdmin"
                    :page-sizes="pageSizesListAdmin" 
                    :page-size="pageSizeAdmin"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalDataNumberAdmin">
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

						<el-tab-pane label="楼宇" name="second" v-if="this.role.indexOf('rubik:building:list')!==-1">
							<div class="main">
								<div v-if="tabIndex === '1'"><router-view></router-view></div>
								<router-link :to="{path: '/house/addBuild'}"><button class="add">+ 添加</button></router-link>
                <button class="delect" id="delect" @click="allDeletelou('building')">删除</button>
                <el-select v-model="precinct" placeholder="请选择" @change="selectbuild">
                  <el-option
                    v-for="item in selectBuild"
                    :key="item.id"
                    :label="item.namec"
                    :value="item.id">
                  </el-option>
                </el-select>
								<el-table :data="build" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="precinctName" label="所属小区" width="180"></el-table-column>
									<el-table-column prop="namec" label="楼宇名称" width="180"></el-table-column>
									<el-table-column prop="roomRelationship.room" label="房间数量"></el-table-column>
									<el-table-column prop="layer" label="楼宇层数"></el-table-column>
									<el-table-column prop="buildingType" label="楼宇类型"></el-table-column>
									<el-table-column prop="flatFabric" label="楼宇结构"></el-table-column>
									<el-table-column prop="buildingTowards" label="楼宇朝向"></el-table-column>
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
                    @size-change="buildingSizeChange"
                    @current-change="buildingCurrentChange"
                    :current-page="pageNoBuilding"
                    :page-sizes="pageSizesListBuilding" 
                    :page-size="pageSizeBuilding"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalDataNumberBuilding">
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

						<el-tab-pane label="房间" name="third" v-if="this.role.indexOf('rubik:room:llist')!==-1">
              <div class="main">
								<div v-if="tabIndex === '2'">
                  <router-view class="Next"></router-view>
                  <!-- <router-view class="daoru"></router-view> -->
                </div>
								<router-link :to="{name: 'Next',query:{id:'qq'}}"><button class="add">+ 添加</button></router-link>
                <!-- <router-link :to="{name: 'Daoru'}"><button class="import">分配楼宇</button></router-link> -->
                <button class="add" @click="isShow = true">导入</button>
                <button class="delect" id="roomDelete" @click="allDeletelou('room')">删除</button>
								<el-table :data="room" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="id" label="房屋编号" width="160"></el-table-column>
									<el-table-column prop="precincts.namec" label="小区" width="128"></el-table-column>
									<el-table-column prop="building" label="楼宇" width="108"></el-table-column>
									<el-table-column prop="ste" label="单元号" width="124"></el-table-column>
									<el-table-column prop="floor" label="所在楼层" width="140"></el-table-column>
									<el-table-column prop="roomNumber" label="房号" width="108"></el-table-column>
									<el-table-column prop="denominatorVolume" label="收费标准个数" width="172"></el-table-column>
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
									<el-pagination 
                    @size-change="roomSizeChange" 
                    @current-change="roomCurrentChange" 
                    :current-page="pageNoRoom"  
                    :page-size="pageSizeRoom" 
                    :page-sizes="pageSizesListRoom" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="totalDataNumberRoom">
									</el-pagination>
								</div>
							</div>
            </el-tab-pane>

						<!-- <el-tab-pane label="车辆管理" name="fourth">
							<div class="main">
								<div v-if="tabIndex === '3'">
									<router-view class="addCar"></router-view> -->
									<!-- <router-view class="carCharge"></router-view> -->
                <!-- </div> -->
								<!-- <router-link :to="{name: 'AddCar',query:{id:'ww'}}"><button class="add">+ 添加</button></router-link> -->
                <!-- <router-link :to="{name: 'Daoru'}"><button class="add">导入</button></router-link> -->
                <!-- <button class="cash">+ 添加收费标准</button> -->
                <!-- <button class="delect" id="carDelete" @click="allDeletelou('car')">删除</button>
								<el-table :data="car" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="parkingSpots.plateNumbers" label="车辆编号" width="180"></el-table-column>
									<el-table-column prop="precincts.namec" label="所属小区" width="180"></el-table-column>
									<el-table-column prop="carSeatNumber" label="车位号" width="180"></el-table-column>
									<el-table-column prop="parkingType" label="车位类型"></el-table-column>
									<el-table-column prop="parkingState" label="车位状态"></el-table-column>
									<el-table-column prop="parkingArea" label="车位面积"></el-table-column> -->
								  <!-- <el-table-column prop="charge" label="收费标准个数"></el-table-column> -->
									<!-- <el-table-column prop="comment" label="备注"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                          操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
												<el-dropdown-menu slot="dropdown"> -->
													<!-- <el-dropdown-item>绑定住户</el-dropdown-item> -->
													<!-- <el-dropdown-item><router-link :to="{name: 'CarCharge'}" style="color: #606266;">添加收费标准</router-link></el-dropdown-item> -->
													<!-- <span @click="jumpCar(scope.$index, car)"><el-dropdown-item>编辑 / 详情</el-dropdown-item></span>
													<el-dropdown-item><button @click="carDelete(scope.$index, car)">删除</button></el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination 
									@size-change="carSizeChange" 
									@current-change="carCurrentChange" 
									:current-page="pageNoCar"  
									:page-size="pageSizeCar" 
									:page-sizes="pageSizesListCar" 
									layout="total, sizes, prev, pager, next, jumper" 
									:total="totalDataNumberCar">
									</el-pagination>
								</div>
							</div>
						</el-tab-pane> -->

						<!-- <el-tab-pane label="房产验收" name="fifth">
							<div class="main">
								<div v-if="tabIndex === '4'">
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
													<el-dropdown-item><button @click="houseDelete(scope.$index, tableDataRoomStandard)">删除</button></el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination 
									@size-change="handleSizeChange" 
									@current-change="handleCurrentChange" 
									:current-page="pageNoRoomStandard"  
									:page-size="pageSizeRoomStandard" 
									:page-sizes="pageSizesListRoomStandard" 
									layout="total, sizes, prev, pager, next, jumper" 
									:total="totalDataNumberRoomStandard">
									</el-pagination>
								</div>
							</div>
						</el-tab-pane> -->
					</el-tabs>
          <!--导入弹窗-->
      <el-dialog
        title="导入"
        :visible.sync="isShow"
        width="500px">
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
        <div class="footer1">
          <button class="confirm" @click="submit">确定</button><button class="cancel" @click="isShow = !isShow">取消</button>
        </div>
      </el-dialog>
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
      file:'',
      fileName: '',
      isShow:false,
      activeName: 'first',
      multipleSelection: [],
      pp:1,
      dialogVisible : false,
      pageNo: 1,
      pageSize: 10,
      pageSizesList: [10, 15, 20, 30, 50],
      tableData: [],//返回的结果集合
      totalDataNumber: 100,//数据的总数,
      
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

      //
      zongtiaoshu:4,
      meiyexianshi:9,
      //
      //管理区

      pageNoAdmin: 1,
      pageSizeAdmin: 10,
      pageSizesListAdmin: [10, 20, 30, 40, 50],
      admin: [{
          namec: '',
          region: '',
          overallFloorage: '',
          cellParkingRelationship:{
            garage:'',
            carSeatNumber:'',
          },
          building: '',
          totalUsableArea: '',
          id:10
        },
      ],
      totalDataNumberAdmin: 100,//数据的总数,

      //楼宇
      pageNoBuilding: 1,
      pageSizeBuilding: 10,
      pageSizesListBuilding: [10, 20, 30, 40, 50],
      build: [
        {
          precinctName: '',
          namec: '',
          roomRelationship:{
            room:'',
          } ,
          layer: '',
          buildingType: '',
          struflatFabriccture: '',
          buildingTowards: '',
        },
      ],
      totalDataNumberBuilding: 100,//数据的总数,

      //房间
      pageNoRoom: 1,
      pageSizeRoom: 10,
      pageSizesListRoom: [10, 20, 30, 40, 50],
      room: [],
      totalDataNumberRoom: 100,//数据的总数,
      
      //车辆管理
      // pageNoCar: 1,
      // pageSizeCar: 10,
      // pageSizesListCar: [10, 20, 30, 40, 50],
      // car: [],
      // totalDataNumberCar: 100,//数据的总数,
      tabIndex: '0',
      // 楼宇id的集合
      louIdArr: [],
      precinct: '',
      selectBuild:[],
      role:[],
      radio:''
    }
  },
  mounted() {
    this.$ajax.get(url + 'role/findPermission').then(res => {
        res.data.data.forEach(v => {
            this.role.push(v.permission)
        })
      })
    if(this.$route.query.tabPane){
      this.activeName = this.$route.query.tabPane
      }else{
        this.activeName = 'first'
      }
    this.getAdmin()
    this.getRoom()
    this.getRoomStandard()
    this.getBuild()
    // this.getCar()
    if(this.$route.query.tabPane){
      this.activeName = this.$route.query.tabPane
    }else{
      this.activeName = 'first'
    }
    this.$ajax.get(url + 'precinct/flndAll').then(res=>{
      this.selectBuild=res.data.data
    })
  },
  methods: {
    //上传的方法
    getPath(e){
      this.fileName = e.currentTarget.files[0].name
      this.file = e.currentTarget.files[0]//百度是没有name的
    },
    submit(){
            var formData = new FormData()
            // console.log(this.files)
            formData.append('file', this.file)
            // formData.append('status', this.radio)
            this.$ajax.post(url+ 'room/excelImport',formData).then(res => {
                if(res.data.status === 200) {
                    this.$message({
                        message: '成功',
                        type: 'success'
                    })
                    this.isShow = false
                }else if(res.data.status===403){
                  this.$message({
                    message:'权限不足',
                    type: 'error'
                  })
                }else{
                    this.$message({
                        message: '失败',
                        type: 'error'
                    })
                }
            })
        },
    selectbuild(e){
      this.selectABuild()
    },
    //选择楼宇
    selectABuild(){
      this.$ajax.get(url + 'building/selectByPrecinct/'+this.precinct+'/'+this.pageNoBuilding+'/'+this.pageSizeBuilding).then(res=>{
        this.build = res.data.data.rows
        this.totalDataNumberBuilding =  res.data.data.records
      })
    },
    // 批量删除
    allDeletelou (judge) {
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(v => {
          this.louIdArr.push(v.id)
        })
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (judge === 'building') {
            this.$ajax.delete(url + 'building/deleteBuilding/' + this.louIdArr).then((res) => {
              if (res.data.status === 200) {
                this.getBuild()
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              }else if(res.data.status===403){
                this.$message({
                  message: '权限不足',
                  type: 'error'
                })
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
          } else if (judge === 'room') {
            this.$ajax.delete(url + 'room/deleteRoom/' + this.louIdArr).then((res) => {
              if (res.data.status === 200) {
                this.getRoom()
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              }else if(res.data.status===403){
                this.$message({
                  message: '权限不足',
                  type: 'error'
                })
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
          }
          // } else if (judge === 'car') {
          //   this.$ajax.delete(url + 'cellparkingRelatinship/deleteCarport/' + this.louIdArr).then((res) => {
          //     if (res.data.status === 200) {
          //       this.getCar()
          //       this.$message({
          //         message: '删除成功',
          //         type: 'success'
          //       })
          //     }else{
          //       this.$message({
          //         message: res.data.msg,
          //         type: 'error'
          //       })
          //     }
          //   })
          // }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    changePosition() {
    },
    handleClick(tab, event) {
      this.tabIndex = tab.index
      this.multipleSelection = []
      this.$router.push('/house')
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
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
    adminDelete(index,rows){
        let that = this;
        that.id = this.admin[index].id;
        rows.splice(index, 1);
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.delete(url + 'precinct/deletePrecinct/'+this.id).then((res) =>{
            if(res.data.status === 200){
              this.getAdmin();
              this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
            }else if(res.data.status===403){
                this.$message({
                  message: '权限不足',
                  type: 'error'
                })
              }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  })
                }
                }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        })
      },

    //获取管理区
    getAdmin(){
      this.$ajax.get(url + 'precinct/selectPrecinct/'+this.pageNoAdmin+'/'+this.pageSizeAdmin+'',{
        params:{
          'token': sessionStorage.getItem('userId'),
        }
      }).then(res => {
        this.admin = res.data.data.rows
        this.totalDataNumberAdmin = res.data.data.records
      })
    },
    adminSizeChange(val) {
      this.pageSizeAdmin=val
      this.getAdmin()
    },
    adminCurrentChange(val) {
      this.pageNoAdmin=val
      this.getAdmin()
    },
    //获取build
    getBuild() {
      this.$ajax.get(url + 'building/flndAll/'+this.pageNoBuilding+'/'+this.pageSizeBuilding+'',{
        params:{
          'token': sessionStorage.getItem('userId'),
        }
      }).then((res) => {
        this.build = res.data.data.rows
        this.totalDataNumberBuilding =  res.data.data.records
        // for(var i=0;i<this.build.length;i++){
        //   var o = {}
        //   if(this.buildArr.indexOf(this.build[i].precinctName) == -1){
        //     this.buildArr.push(this.build[i].precinctName)
        //   }
        // }
      })
    },
    buildingSizeChange(val) {
      this.pageSizeBuilding=val
      if(this.precinct){
        this.selectABuild()
      }else{
      this.getBuild()
      }
    },
    buildingCurrentChange(val) {
      this.pageNoBuilding=val
      if(this.precinct){
        this.selectABuild()
      }else{
      this.getBuild()
      }
    },
    //编辑build
    jumpBuild(index,rows){
      let that = this;
      that.id = this.build[index].id;
      this.$router.push({name: 'AddBuild',query:{id:that.id}})
    },
    //删除build
    buildDelete(index,rows) {
      let that = this;
      that.id = this.build[index].id;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$ajax.delete(url + 'building/deleteBuilding/' + that.id).then((res) => {
          if (res.data.status === 200) {
            this.getBuild()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }else if(res.data.status===403){
                this.$message({
                  message: '权限不足',
                  type: 'error'
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
    // getCar(){
    //   this.$ajax.get(url + 'cellparkingRelatinship/selectCellParkingRelationship/'+this.pageNoCar+'/'+this.pageSizeCar+'',{
    //     params:{
    //       'token': sessionStorage.getItem('userId'),
    //     }
    //   }).then((res) => {
    //     this.car = res.data.data.rows
    //     this.totalDataNumberCar =  res.data.data.records
    //   })
    // },
    // carSizeChange(val) {
    //   this.pageSizeCar=val
    //   this.getCar()
    // },
    // carCurrentChange(val) {
    //   this.pageNoCar=val
    //   this.getCar()
    // },

    //获取room
    getRoom() {
      this.$ajax.get(url + 'room/flndAll/'+this.pageNoRoom+'/'+this.pageSizeRoom+'',{
      }).then(res => {
        this.room = res.data.data.rows
        this.totalDataNumberRoom =  res.data.data.records
      })
    },
    roomSizeChange(val) {
      this.pageSizeRoom=val
      this.getRoom()
    },
    roomCurrentChange(val) {
      this.pageNoRoom=val
      this.getRoom()
    },
    
    //房产验收
    getRoomStandard() {
      this.$ajax.get(url + 'roomStandard/flndAll/'+this.pageNoRoomStandard+'/'+this.pageSizeRoomStandard+'',{}).then(res => {
        this.tableDataRoomStandard = res.data.data.rows
        res.data.data.rows.forEach((v, k) => {
          if (v.room) {
            if (v.room.indexOf(',') !== -1) {
              this.tableDataRoomStandard[k].room = v.room.split(',')[0]
            }
          }
        })
        this.totalDataNumberRoomStandard =  res.data.data.records
      })
    },
    // handleSizeChange(val) {
    //   this.pageSizeRoomStandard=val
    //   this.getRoomStandard()
    // },
    // handleCurrentChange(val) {
    //   this.pageNoRoomStandard=val
    //   this.getRoomStandard()
    // },
    //跳转编辑
    jumpRoom(index,rows){
      let that = this;
      that.id = this.room[index].id;
      this.$router.push({name: 'Next',query:{id:that.id}})
    },
    //删除room
    roomDelete(index,rows) {
      let that = this;
      that.id = this.room[index].id;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      this.$ajax.delete(url + 'room/deleteRoom/' + that.id).then((res) => {
        if (res.data.status === 200) {
          this.getRoom()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }else if(res.data.status===403){
          this.$message({
            message: '权限不足',
            type: 'error'
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
    //跳转车辆
    // jumpCar(index,rows){
    //   let that = this;
    //   that.id = this.car[index].id;
    //   this.$router.push({name: 'AddCar',query:{id:that.id}})
    // },
    // carDelete (index,rows) {
    //   let that = this;
    //   that.id = this.car[index].id;
    //    this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //   this.$ajax.delete(url + 'cellparkingRelatinship/deleteCarport/' + that.id).then((res) => {
    //     if (res.data.status === 200) {
    //       this.getCar()
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success'
    //       })
    //     }else{
    //             this.$message({
    //               message: res.data.msg,
    //               type: 'error'
    //             })
    //           }
    //   })
    //    }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });          
    //     });
    // },
    // //跳转房产验收
    // jumpHouse(index,rows){
    //   let that = this;
    //   that.id = this.tableDataRoomStandard[index].id;
    //   this.$router.push({name: 'Test',query:{id:that.id}})
    // },
    //删除房产
    // houseDelete(index,rows) {
    //   let that = this;
    //   that.id = this.tableDataRoomStandard[index].id;
    //   this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //   this.$ajax.delete(url + 'roomStandard/deleteRoomStandard/' + that.id).then((res) => {
    //     if (res.data.status === 200) {
    //       this.getRoomStandard()
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success'
    //       })
    //     }else{
    //             this.$message({
    //               message: res.data.msg,
    //               type: 'error'
    //             })
    //           }
    //     })
    //   }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });          
    //     });
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
    allDelete() {
      let comments = this.multipleSelection
      let num = []
      for (let i = 0;i<comments.length;i++) {
        num.push(comments[i].id)
      }
      // 写this.$axios
      this.$ajax.get(this.$host + 'allDle.do', {params: {'commentsId':num}}).then(resp => {
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

<style lang="less" scoped>
button {
  cursor: pointer;
}
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
    height: 810px;
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
		width: 90px;
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
.put {
  margin:0 0px 60px 29%!important;
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
.upload {
    margin: 24px 0 0 0!important
}
.liebiao {
    font-size: 6px;
    line-height: 20px;
}
.how{
    color: #32a8ee;
}
.footer1{
    height: 30px;
    margin: 0 !important;
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
li{
  list-style: none;
}
.cancel {
    background-color: white;
    border: 1px solid rgb(217, 217, 217);
    color: rgb(138, 138, 138);
    border-radius: 5px;
}
</style>