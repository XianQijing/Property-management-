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
								<el-table :data="housingManagement" style="width: 100%">
									<el-table-column prop="house" label="房屋类型" width="180"></el-table-column>
									<el-table-column prop="build" label="楼宇" width="180"></el-table-column>
									<el-table-column prop="roomNumber" label="房号"></el-table-column>
									<el-table-column prop="buildArea" label="建筑面积(平方米)"></el-table-column>
									<el-table-column prop="price" label="价格(元/月)"></el-table-column>
									<el-table-column prop="state" label="租用状态"></el-table-column>
									<el-table-column prop="remarks" label="预定状态"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<span style="color:#32a8ee;" @click="toBianji(scope.$index,housingManagement,'bianji')">编辑</span>
										</template>
									</el-table-column>
								</el-table>
								<div class="fenye">
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

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
								<el-table :data="businessManagement" style="width: 100%">
									<el-table-column prop="name" label="客户姓名" width="180"></el-table-column>
									<el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
									<el-table-column prop="visit" label="来访方式"></el-table-column>
									<el-table-column prop="customer" label="客户类型"></el-table-column>
									<el-table-column prop="area" label="需求面积(平方米)"></el-table-column>
									<el-table-column prop="price" label="需求价格(元/月)"></el-table-column>
									<el-table-column prop="time" label="来访时间"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<span @click="shangji(scope.$index,businessManagement,'bianji')"><el-dropdown-item>查看</el-dropdown-item></span>
													<span  @click="shangji(scope.$index,businessManagement,'gengxin')"><el-dropdown-item>更新</el-dropdown-item></span>
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

                        <el-tab-pane label="合同管理">

                            <div class="main">
								<div>
									<router-view class="rent_contract_change"></router-view>
								    <!-- <router-view class="householdDetail"></router-view> -->
								</div>
								<!--<router-link :to="{name: 'RelationshipAdd'}">--><button class="add">导入合同</button><!--</router-link>-->
								<el-table :data="contract" style="width: 100%">
									<el-table-column prop="name" label="客户姓名" width="180"></el-table-column>
									<el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
									<el-table-column prop="rent" label="租用类型"></el-table-column>
                                    <el-table-column prop="build" label="楼宇" width="180"></el-table-column>
                                    <el-table-column prop="roomNumber" label="房号"></el-table-column>
                                    <el-table-column prop="buildArea" label="建筑面积(平方米)"></el-table-column>
									<el-table-column prop="use" label="用途"></el-table-column>
									<el-table-column prop="time" label="交付时间"></el-table-column>
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
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">

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
    name:'rent',
    data(){
        return{
            tanchuang:'查看商机',
            edit:true,
            dialogVisible: false,
            //分页数据
			pageNo: 1,
            pageSize: 10,
            pageSizesList: [10, 15, 20, 30, 50],
            tableData: [],//返回的结果集合
            totalDataNumber: 400,//数据的总数,
            
            modify:false,
            activeName: 'first',
            //房源管理
            housingManagement: [
                {
                    house: '店铺',
                    roomNumber: '023',
                    build: '门面',
                    buildArea:'125',
                    remarks:'6000',
                    state:'可租',
                    price:'是',
                    id:5674654
                },
                {
                    house: '办公',
                    roomNumber: '301',
                    build: 'C座',
                    buildArea:'200',
                    remarks:'9000',
                    state:'已租',
                    price:'否'
                },
            ],
            //商机管理
            businessManagement:[
                {
                    name: '王万',
                    phone: '15946907569',
                    visit: '到访',
                    customer: '办公需求',
                    area: '200',
                    price: 'fsdfd',
                    time: '2018.7.14',
                    id:6796845
                },
                {
                    name: '金星',
                    phone: '15946907569',
                    visit: '来电',
                    customer: '办公需求',
                    area: '200',
                    price: 'fsdfd',
                    time: '2018.7.14',
                    id:6796844
                }
            ],
            //合同管理
            contract: [
                {
                    name: '王万',
                    phone: '15946907569',
                    rent:'gdfg',
                    build: '门面',
                    roomNumber: '023',
                    buildArea:'125',
                    use: '200',
                    time: '2018.7.14'                 
                }
            ],
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
    methods:{
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
        //房源管理
        toBianji(index,row,msg){
            let that = this;
            this.id = this.housingManagement[index].id;
            this.msg = msg;
            this.$router.push({name: 'Rent_addhouse',query:{id:that.id,msg:this.msg}})
        },
        //商机管理
        shangji(index,row,msg){
            let that = this;
            this.msg = msg;
            this.dialogVisible = true;
            this.msg = msg;
            if(this.msg == "bianji"){
                this.id = this.businessManagement[index].id;
                this.edit = true
                console.log(this.id)
                this.tanchuang = "查看详情"
            }else if(this.msg == "gengxin"){
                this.id = this.businessManagement[index].id;
                this.edit = false
                console.log(this.id)
                this.tanchuang = "更新商机"
            }
            else{
                this.tanchuang = "添加商机"
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
