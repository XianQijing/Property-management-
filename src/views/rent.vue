<template>
    <div class="rent">
        <nav-bar/>
        <div class="container">
            <nav-header/>
            <div class="card row">
                <div class="col-md-12">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="房源管理" name="first">
                            <div class="main">
								<div v-if="this.indexTable === '0'">
									<router-view class="rent_addhouse"></router-view>
								    <!-- <router-view class="rent_edit"></router-view> -->
								</div>
								<router-link :to="{name: 'Rent_addhouse',query:{msg:'tianjia'}}"><button class="add">添加房源</button></router-link>
                                <div class="fenye" style="display:inline-block" id="btn"><button @click="display(1)" class="active">全部数据</button><button @click="display(2)">只显示已租数据</button><button @click="display(3)">只显示未租数据</button></div>
								<el-table :data="tableData" style="width: 100%">
									<el-table-column prop="roomType" label="房屋类型" width="180"></el-table-column>
									<el-table-column prop="build" label="楼宇" width="180"></el-table-column>
									<el-table-column prop="roomNumber" label="房号"></el-table-column>
									<el-table-column prop="coveredArea" label="建筑面积(平方米)"></el-table-column>
									<el-table-column prop="pricing" label="价格(元/月)"></el-table-column>
									<el-table-column prop="room_status" label="租用状态"></el-table-column>
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

                        <el-tab-pane label="商机管理">
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

                        <el-tab-pane label="合同管理">

                            <div class="main">
								<div  v-if="this.indexTable === '2'">
									<router-view class="rent_contract_change"></router-view>
								    <!-- <router-view class="householdDetail"></router-view> -->
								</div>
								<button class="add" @click="houseSource('0','0','add')">导入合同</button>
								<el-table :data="tableDataContract" style="width: 100%">
									<el-table-column prop="owner.name" label="客户姓名" width="180"></el-table-column>
									<el-table-column prop="owner.phone" label="联系方式" width="180"></el-table-column>
									<el-table-column prop="rooms.roomType" label="租用类型"></el-table-column>
                                    <el-table-column prop="buildings.namec" label="楼宇" width="180"></el-table-column>
                                    <el-table-column prop="rooms.roomNumber" label="房号"></el-table-column>
                                    <el-table-column prop="rooms.coveredArea" label="建筑面积(平方米)"></el-table-column>
									<el-table-column prop="rooms.useId" label="用途"></el-table-column>
									<el-table-column prop="paymentTime" label="交付时间"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span  @click="houseSource(scope.$index,tableDataContract,'watch')"><el-dropdown-item>查看</el-dropdown-item></span>
													<span  @click="houseSource(scope.$index,tableDataContract,'edit')"><el-dropdown-item>修改</el-dropdown-item></span>
                                                    <el-dropdown-item>导出</el-dropdown-item>
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
                    </el-tabs>
                </div>
            </div>


            <!-- 弹窗 -->
            <el-dialog
                :title="this.tanchuang"
                :visible.sync="dialogVisible"
                width="30%">

                <el-form :model="shuru" ref="shuru" label-width="130px" class="demo-shuru" size="mini" :disabled="edit">
                
                    <el-form-item label="客户姓名:">
                    <el-input v-model="upload.namec" :placeholder="shuru.namec"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:">
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
                    <el-input v-model="upload.visitTime" :placeholder="shuru.visitTime"></el-input>
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
                    <el-button type="primary" @click="addChange('tianjia')">确 定1</el-button>
                </span>
                <span slot="footer" class="dialog-footer" v-show="editOne">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addChange('gengxin')">确 定2</el-button>
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
    name:'rent',
    data(){
        return{
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
            pageSizesList: [1, 2, 3, 4, 5],
            tableData: [],//返回的结果集合
            totalDataNumber: 400,//数据的总数,
            
            //商机管理
			pageNoBusiness: 1,
            pageSizeBusiness: 10,
            pageSizesListBusiness: [1, 2, 3, 4, 5],
            tableDataBusiness: [],//返回的结果集合
            totalDataNumberBusiness: 400,//数据的总数,
            
            //合同管理
			pageNoContract: 1,
            pageSizeContract: 10,
            pageSizesListContract: [1, 2, 3, 4, 5],
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
            }
        }
    },
    
    mounted(){
        this.flndAllHousingResource(),
        this.flndAllBusiness(),
        this.flndAllContract(),
        this.nn()
    },
    methods:{
        changePosition() {
            // console.log(this.position)
		},
		handleClick(tab, event) {
            // console.log(tab.index);
            this.indexTable = tab.index
            this.$router.push('/rent')
        },
        
        //房源管理=>查询全部
        flndAllHousingResource(){
            this.$ajax.get(url + 'housingResource/flndAllHousingResource/'+this.pageNo+'/'+this.pageSize).then((res) => {
                
                this.tableData=res.data.data.rows
                this.totalDataNumber=res.data.data.records
            })
        },handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize=val;
            this.display(this.bb)
        },handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageNo=val;
            // this.flndAllHousingResource()
            this.display(this.bb)
        },


        //商机管理
        flndAllBusiness(){
            this.$ajax.get(url + 'prospectiveCustomer/flndAll/'+this.pageNoBusiness+'/'+this.pageSizeBusiness).then((res) => {
                // console.log(res)
                this.tableDataBusiness=res.data.data.rows
                this.totalDataNumberBusiness=res.data.data.records
            })
        },handleSizeChangeBusiness(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSizeBusiness=val;
            this.flndAllBusiness()
        },handleCurrentChangeBusiness(val) {
            // console.log(`当前页: ${val}`);
            this.pageNoBusiness=val;

            this.flndAllBusiness()
        },

        //合同管理
        flndAllContract(){
            this.$ajax.get(url + 'contract/flndAll/'+this.pageNoContract+'/'+this.pageSizeContract).then((res) => {
                // console.log(res)
                this.tableDataContract=res.data.data.rows
                this.totalDataNumberContract=res.data.data.records
            })
        },handleSizeChangeContract(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSizeContract=val;
            this.flndAllContract()
        },handleCurrentChangeContract(val) {
            // console.log(`当前页: ${val}`);
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
                    console.log(res.data.data)
                    this.upload = res.data.data
                })
            }else if(this.msg == "gengxin"){
                this.id = this.tableDataBusiness[index].id;
                this.edit = false
                this.editOne = true
                this.add = false
                // console.log(this.id)
                this.tanchuang = "更新商机"
                this.$ajax.get(url + 'prospectiveCustomer/flngById/'+this.id).then(res => {
                    console.log(res.data.data)
                    this.upload = res.data.data
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
        // addShangji(){
        //         this.upload = {},
        //         this.tanchuang = "添加商机"
        //         this.edit = false,
        //         this.dialogVisible = true;
        // },
        //显示房源
        display(precinct){
            this.bb = precinct
            // console.log(this.bb)
            if (this.bb === 1){
                this.flndAllHousingResource()
                this.bb === 1;
                // console.log(this.precinct)
            }else if(this.bb === 2){
                this.bb === 2;
                this.$ajax.get(url + 'housingResource/selectOccupancy'+this.pageNo+'/'+this.pageSize).then(res => {
                    // console.log(res)
                    this.tableData=res.data.data.rows
                    this.totalDataNumber=res.data.data.records
                })
            }else if(this.bb === 3){
                this.bb === 3;
                // console.log(this.bb)
                this.$ajax.get(url + 'housingResource/selectUnleased'+this.pageNo+'/'+this.pageSize).then(res => {
                    // console.log(res)
                    this.tableData=res.data.data.rows
                    this.totalDataNumber=res.data.data.records
                })
            }
        },

        //添加商机
        addChange(msg){
            var prospectiveCustomer={}
            prospectiveCustomer.namec=this.upload.namec
            prospectiveCustomer.phone=this.upload.phone
            prospectiveCustomer.clientType=this.upload.clientType
            prospectiveCustomer.areaNeed=this.upload.areaNeed
            prospectiveCustomer.priceNeed=this.upload.priceNeed
            prospectiveCustomer.visitingWay=this.upload.visitingWay
            prospectiveCustomer.comment=this.upload.comment
            if(this.msg === "tianjia"){
                this.$ajax.post(url+'prospectiveCustomer/addProspectiveCustomer',
                    prospectiveCustomer
                ).then(res => {
                    alert('成功')
                    this.dialogVisible = false
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
                    alert('更新成功')
                    this.dialogVisible = false
                })
            }else{
                this.dialogVisible = false
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
        nn(){
            var card = document.getElementById("btn");
            var cardlist = card.children;

            for (var i = 0; i < cardlist.length; i++){
                cardlist[i].index = i;
                cardlist[i].onclick = function() {
                    for (var m = 0; m <cardlist.length; m++){
                        cardlist[m].className = "";
                    }
                    this.className = "active"
                }
            }
        }
        
    },
    components: {
			NavHeader,
			NavBar
		},
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
		height: 844px;
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
</style>
