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
								<div>
									<router-view class="rent_addhouse"></router-view>
								    <router-view class="rent_edit"></router-view>
								</div>
								<router-link :to="{name: 'Rent_addhouse',query:{msg:'tianjia'}}"><button class="add">添加房源</button></router-link>
                                <div class="fenye" style="display:inline-block" id="btn"><button>全部数据</button><button>只显示已租数据</button><button>只显示未租数据</button></div>
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
								<!--<router-link :to="{name: 'RelationshipAdd'}">--><button class="add" @click="shangji('','','tianjia')">添加商机</button><!--</router-link>-->
								<el-table :data="tableDataBusiness" style="width: 100%">
									<el-table-column prop="namec" label="客户姓名" width="180"></el-table-column>
									<el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
									<el-table-column prop="visiting_way" label="来访方式"></el-table-column>
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
													<span @click="shangji(scope.$index,tableDataBusiness,'bianji')"><el-dropdown-item>查看</el-dropdown-item></span>
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
								<div>
									<router-view class="rent_contract_change"></router-view>
								    <!-- <router-view class="householdDetail"></router-view> -->
								</div>
								<!--<router-link :to="{name: 'RelationshipAdd'}">--><button class="add">导入合同</button><!--</router-link>-->
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
													<router-link :to="{name:'Rent_contract_change'}"><el-dropdown-item>查看/修改</el-dropdown-item></router-link>
													<!-- <el-dropdown-item>修改</el-dropdown-item> -->
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
                    <el-input v-model="upload.name" :placeholder="shuru.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:">
                    <el-input v-model="upload.phone" :placeholder="shuru.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="客户类别:">
                    <el-input v-model="upload.type" :placeholder="shuru.type"></el-input>
                    </el-form-item>
                    <el-form-item label="需求面积:" prop="roomArea">
                    <el-input v-model="upload.roomArea" :placeholder="shuru.area">
                        <template slot="append">平方米</template>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="需求价格:">
                    <el-input v-model="upload.price" :placeholder="shuru.price">
                        <template slot="append">元/月</template>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="来访方式:">
                    <el-input v-model="upload.visit" :placeholder="shuru.visit"></el-input>
                    </el-form-item>
                    <el-form-item label="来访时间:" >
                    <el-input v-model="upload.time" :placeholder="shuru.time"></el-input>
                    </el-form-item>
                    <el-form-item label="是否已看房">
                    <el-input v-model="upload.watch" :placeholder="shuru.watch"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                    <el-input v-model="upload.remarks" :placeholder="shuru.remarks"  ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
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
            
            modify:false,
            activeName: 'first',

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
            
            //商机管理-查看
            shuru: 
            {
                name: 'sdgh',
                phone: '19848668654',
                type: '门面房',
                area: '60',
                price: '20000',
                visit: '电话',
                time: '2018-07-16',
                watch: '是',
                remarks:''
            },
            //商机管理-更新
            upload:{
                name: '',
                phone: ' ',
                type: ' ',
                area: ' ',
                price: ' ',
                visit: ' ',
                time: ' ',
                watch: ' ',
                remarks:''
            }
        }
    },
    mountd:
        function () {
            var btn  = document.getElementById('btn');
            var btnlist = btn.children;
            for (var i = 0;i < btnlist.length;i++){
                btn[i].index = i;
                
            }
        },
    mounted(){
        this.flndAllHousingResource(),
        this.flndAllBusiness(),
        this.flndAllContract()
    },
    methods:{
        changePosition() {
            console.log(this.position)
		},
		handleClick(tab, event) {
			console.log(tab, event);
        },
        save(){
            var prospectiveCustomer={}
            prospectiveCustomer.namec=upload.name
            prospectiveCustomer.phone=upload.phone
            prospectiveCustomer.clientType=upload.type
            prospectiveCustomer.areaNeed=upload.roomArea
            prospectiveCustomer.priceNeed=upload.price
            prospectiveCustomer.visitingWay=upload.visit
            prospectiveCustomer.visitingWay=upload.visit

            this.$ajax.get(url + 'prospectiveCustomer/addProspectiveCustomer',prospectiveCustomer).then((res) => {
                console.log(res)
            })
        },
        //房源管理=>查询全部
        flndAllHousingResource(){
            this.$ajax.get(url + 'housingResource/flndAllHousingResource/'+this.pageNo+'/'+this.pageSize).then((res) => {
                console.log(res)
                this.tableData=res.data.data.rows
                this.totalDataNumber=res.data.data.records
            })
        },handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize=val;
            this.flndAllHousingResource()
        },handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNo=val;
            this.flndAllHousingResource()
        },


        //商机管理
        flndAllBusiness(){
            this.$ajax.get(url + 'housingResource/flndAllHousingResource/'+this.pageNoBusiness+'/'+this.pageSizeBusiness).then((res) => {
                console.log(res)
                this.tableDataBusiness=res.data.data.rows
                this.totalDataNumberBusiness=res.data.data.records
            })
        },handleSizeChangeBusiness(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeBusiness=val;
            this.flndAllBusiness()
        },handleCurrentChangeBusiness(val) {
            console.log(`当前页: ${val}`);
            this.pageNoBusiness=val;
            this.flndAllBusiness()
        },

        //合同管理
        flndAllContract(){
            this.$ajax.get(url + 'contract/flndAll/'+this.pageNoContract+'/'+this.pageSizeContract).then((res) => {
                console.log(res)
                this.tableDataContract=res.data.data.rows
                this.totalDataNumberContract=res.data.data.records
            })
        },handleSizeChangeContract(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeContract=val;
            this.flndAllContract()
        },handleCurrentChangeContract(val) {
            console.log(`当前页: ${val}`);
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
            this.msg = msg;
            if(this.msg == "bianji"){
                this.id = this.tableDataBusiness[index].id;
                this.edit = true
                console.log(this.id)
                this.tanchuang = "查看详情"
            }else if(this.msg == "gengxin"){
                this.id = this.tableDataBusiness[index].id;
                this.edit = false
                console.log(this.id)
                this.tanchuang = "更新商机"
            }
            else{
                this.tanchuang = "添加商机"
                this.edit = false
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
</style>
