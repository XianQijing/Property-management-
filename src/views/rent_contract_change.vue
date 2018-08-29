<template>
    <div class="Rent_contract_change">
        <div v-show="nextUp">
            <h3>住户详情</h3>
            <div class="qq">
            <el-form :model="detail" ref="detail" :rules="rules" size="small " label-width="130px" class="demo-detail" :disabled="edit">
                <el-row>
                <el-col :span="11">
                    <el-form-item label="承租方:" prop="tenantry">
                        <el-input v-model="detail.tenantry" placeholder="请输入承租方" style="width:100%"></el-input>
                    </el-form-item>
                    <el-form-item label="联系地址:" prop="site">
                        <el-input v-model="detail.site" placeholder="请输入联系地址"></el-input>
                    </el-form-item>
                    <el-form-item label="关联房屋:" prop="room">
                        <!-- <el-cascader expand-trigger="hover" :options="options" v-model="detail.rooms" @change="relation" v-if="this.message==='add'"></el-cascader> -->
                        <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            v-model="selectedOptions2"
                            @change="relation"
                             v-if="this.message==='add'">
                        </el-cascader>
                        <!-- <el-tag type="info" v-for="room in thisRoom" :key="room.id" >{{room}}</el-tag> -->
                        <el-tag v-for="room in thisRoom" :key="room.id" :closable="close" @close="handleClose(room)">{{room}}</el-tag>

                    </el-form-item>
                    <el-form-item label="租赁时间:">
                        <el-col :span="11">
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="detail.startTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="detail.endTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                        <!-- <el-date-picker v-model="detail.startTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> -->
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="三年后租金增幅：">
                                <el-input @blur="isStudentNo" v-model="detail.amplification" placeholder="请输入增幅">
                                    <template slot="append">%/月</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="三年后租金：">
                                <el-input v-model="detail.fixedGrowth" placeholder="请输入租金">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                        <el-form-item label="租金:">
                            <el-input v-model="detail.dailyRent" placeholder="请输入租金">
                                <template slot="append">元/天/平方米</template>
                            </el-input>
                        </el-form-item>
                        
                        <el-form-item label="物业管理费:">
                            <el-input v-model="form.dailyManagementFee " placeholder="请输入物业管理费">
                                <template slot="append">元/天/平方米</template>
                            </el-input>
                        </el-form-item>
                        
                    <el-form-item label="租金和物业费合计:">
                            <el-input v-model="form.total">
                                <template slot="append">月/元</template>
                            </el-input>
                        </el-form-item>
                    <el-form-item label="装修免租金天数:">
                        <el-input @blur="isStudentNo" v-model="detail.budget" placeholder="请输入免租天数">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">&ensp;&ensp;&ensp;&ensp;</el-col>



                <el-col :span="11">
                    <el-row>
                    <el-col :span="12">
                    <el-form-item label="联系电话：" prop="phone">
                        
                        <el-input v-model="detail.phone" placeholder="请输入联系电话" @blur="blur"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="传真：">
                            <el-input v-model="detail.fax" placeholder="请输入传真"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <!-- <el-col :span="12">
                        <el-form-item label="建筑面积：">
                            <el-input v-model="detail.room.rooms.coveredAreas" placeholder="请输入建筑面积"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="用途：">
                            <el-input v-model="detail.purpose" placeholder="请输入用途"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="12">
                        <el-form-item label="建筑面积：">
                            <el-input v-model="detail.rooms.coveredAreas" :disabled="yes" placeholder="建筑面积"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="交付时间：">
                            <el-date-picker
                                v-model="detail.deliveryTime"
                                type="date"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-form-item label="每两月缴费日期：">
                        
                        <el-input @blur="isStudentNo" v-model="detail.taxes" placeholder="请输入缴费日">
                            <template slot="prepend">每月</template>
                            <template slot="append">日</template>
                        </el-input>
                    </el-form-item>
                    
                        <el-form-item label="每月租金为：">
                            <el-input v-model="detail.afterTheRent" placeholder="请输入租金">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="合计:">
                            <el-input v-model="form.monthlyRent">
                                <template slot="append">月/元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="合计:">
                            <el-input v-model="form.monthlyManagementFee">
                                <template slot="append">月/元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="大写：">
                            <el-input v-model="detail.big3"></el-input>
                        </el-form-item>
                         <el-form-item label="免租时间">
                            <el-col :span="11">
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.budgeStartTime " style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="form.budgeEndTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                </el-col>
                </el-row>
                <div>
                    <el-row>
                    <el-col :span="8">
                        <el-form-item label="合同保证金：">
                            <el-input v-model="detail.cashDeposit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="物业押金：">
                            <el-input v-model="detail.cashPledge"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合计：">
                            <el-input v-model="detail.theDepositAmount"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-form-item label="备注：">
                        <el-input type="textarea" :rows="2" v-model="detail.comment">
                    </el-input>
                    </el-form-item>
                    </el-row>
                </div>
            </el-form>
                <div class="nn">
                    <button class="nextStep"  @click="nextDown = true,nextUp = false">下一步</button><button class="cancel" @click="goBack">返回</button>
                </div>
            </div>
            
        </div>
        <div v-show="nextDown" class="supplement">
            
            <h3>补充条款</h3>
            <!-- 定义 -->
            <div class="qq">
                <div class="difinition con">
                <p><span>定义</span></p>
                <el-form ref="form" :model="form" label-width="160px" size="small" :disabled="edit">
                    <el-col :span="12">
                    <el-form-item label="交付日：">
                    <el-date-picker v-model="detail.deliveryTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:100%"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="终止日：">
                    <el-date-picker v-model="form.terminationTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:100%"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="免租装修期：">
                        <el-row>
                            <el-col :span="11">
                                <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2" style="float:left">-</el-col>
                            <el-col :span="11">
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    </el-col>
                </el-form>
                </div>
                <!-- 租金、物业管理费和支付方式补充 -->
                <div class="rent_supplement con">
                <p><span>租金、物业管理费和支付方式补充</span></p>
                <el-form ref="form" :model="form" label-width="160px" size="small" :disabled="edit">
                    <el-col :span="12">
                    <el-form-item label="租金：">
                    <el-input placeholder="请输入内容" v-model="form.monthlyRent">
                        <template slot="append">元人民币/月</template>
                    </el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="物业管理费：">
                    <el-input placeholder="请输入内容" v-model="form.monthlyManagementFee">
                        <template slot="append">元人民币/月</template>
                    </el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="合计：">
                    <el-input placeholder="请输入内容" v-model="form.total">
                        <template slot="append">元人民币/月</template>
                    </el-input>
                    </el-form-item>
                    </el-col>
                </el-form>
                </div>
                <!-- 保证金和其他费用补充 -->
                <div class="bond_supplement con">
                <p><span>保证金和其他费用补充</span></p>
                <el-form ref="form" :model="form" label-width="160px" size="small" :disabled="edit">
                    <el-col :span="12">
                    <el-form-item label="租赁保证金：">
                    <el-input placeholder="请输入内容" v-model="form.premiumForLease">
                        <template slot="append">元</template>
                    </el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="管理费押金：">
                        <el-input placeholder="请输入内容" v-model="form.cashPledge">
                            <template slot="append">元</template>
                        </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <el-form-item label="物业管理费：">
                        <el-col :span="6">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.manageStartTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="3">至</el-col>
                        <el-col :span="6">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="form.manageEndTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="3">为</el-col>
                        <el-col :span="6">
                            <el-input placeholder="请输入内容" v-model="form.administrativeFee">
                                <template slot="append">元</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    </el-col>
                    <el-form-item label="租金">
                        <el-col :span="6">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.rentalStartTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="3">至</el-col>
                        <el-col :span="6">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="form.rentalEndTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="3">为</el-col>
                        <el-col :span="6">
                            <el-input placeholder="请输入内容" v-model="form.rental">
                                <template slot="append">元</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="物业管理费：">
                        <el-col :span="6">
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.managementCostStartTime" style="width: 100%;"></el-date-picker>
                        </el-col>   
                        <el-col class="line" :span="3">至</el-col>
                        <el-col :span="6">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="form.managementCostEndTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="3">为</el-col>
                        <el-col :span="6">
                            <el-input placeholder="请输入内容" v-model="form.managementCost">
                                <template slot="append">元</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-col :span="12">
                    <el-form-item label="合计：">
                    <el-input placeholder="请输入内容" v-model="form.aggregate">
                        <template slot="append">元人民币/月</template>
                    </el-input>
                    </el-form-item>
                    </el-col>
                </el-form>
                </div>
            </div>


            <div class="nn" v-show="addOne">
                <button class="nextStep"  @click="sumbit">确定</button><button class="cancel" @click="nextDown = false,nextUp = true">返回</button>
            </div>
            <div class="nn" v-show="watchOne">
                <button class="nextStep"  @click="goBack">确定</button><button class="cancel" @click="nextDown = false,nextUp = true">返回</button>
            </div>
            <div class="nn" v-show="changeOne">
                <button class="nextStep"  @click="sumbit1">确定</button><button class="cancel" @click="nextDown = false,nextUp = true">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import url from '../assets/Req.js'
export default {
    name:'Rent_contract_change',
    data(){
        return{
            yes:true,
            ww:true,
            tt:false,
            id:'',
            nextUp:true,
            nextDown: false,
            detail: {
                id: "",
                startTime: '',
                tenantry: '',
                site: '',
                amplification: '',
                afterTheRent: '',
                dailyRent: '',
                monthlyRent: '',
                dailyManagementFee: '',
                monthlyManagementFee: '',
                total: '',
                budget: '',
                phone: '',
                fax: '',
                room: [],
                purpose: '',
                rooms: {
                    coveredAreas:''
                },
                deliveryTime: '',
                taxes: '',
                budgeStartTime: '',
                budgeEndTime: '',
                cashDeposit: '',
                cashPledge: '',
                theDepositAmount: '',
                comment: '',
                room1: [],
                big: '',
                big1: '',
                big2: '',
                big3: '',
                big4: '',
                room: '',
                buildingId: '',
                roomNumber: '',
                endTime: '',
                fixedGrowth:''
            },
            form: {
                terminationTime: '',
                startTime: '',
                endTime: '',
                monthlyRent: '',
                monthlyManagementFee: '',
                total: '',
                premiumForLease: 0,
                cashPledge: '',
                manageStartTime: '',
                manageEndTime: '',
                administrativeFee: '',
                rentalStartTime: '',
                rentalEndTime: '',
                rental: '',
                managementCostStartTime: '',
                managementCostEndTime: '',
                managementCost: '',
                aggregate: '',
                budgeStartTime: '',
                budgeEndTime: ''
            },
            date: '',
            rules: {
                tenantry: [
                    { required: true, message: '请输入承租方', trigger: 'blur' },
                ],
                site: [
                    { required: true, message: '请输入联系地址', trigger: 'blur' },
                ],
                phone:[
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                ],
                room:[
                    { required: true, message: '请选择关联房屋', trigger: 'change' }
                ]
            },
            edit: true,
            message:'',
            options: [],
            addOne:true,
            changeOne:false,
            watchOne:false,
            thisRoom: [],
            building: [],
            rooms:[],
            close:true,
            selectedOptions2: []
        }
    },
    mounted(){
        this.id = this.$route.query.id
        this.message = this.$route.query.msg

        this.$ajax.get(url + 'room/flndByClientId/aaa').then(res => {
                this.options=res.data;
                // console.log(res)
            })
        if (this.$route.query.msg === "watch"){
            this.addOne = false,
            this.changeOne = false,
            this.watchOne = true
            this.edit = true,
            this.$ajax.get(url+'contract/flndById/'+this.id).then(res => {
                if(res.data.status === 200){
                this.detail = res.data.data
                this.form = res.data.data
                this.thisRoom = this.detail.rooms.roomNumbers.split(',')
                this.close = false
                }else if(res.data.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.goBack()
                        }
                    });
                }
            })
        }else if(this.$route.query.msg === "add"){
            this.addOne=true,
            this.changeOne=false,
            this.watchOne=false
            this.edit = false
        }else if(this.$route.query.msg === "edit"){
            this.addOne=false,
            this.changeOne=true,
            this.watchOne=false
            this.edit = false
            this.$ajax.get(url+'contract/flndById/'+this.id).then(res => {
                if(res.data.status === 200){
                    this.detail = res.data.data
                    this.form = res.data.data
                    this.thisRoom = this.detail.rooms.roomNumbers.split(',')
                    this.close = false
                }else if(res.data.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.goBack()
                        }
                    });
                }
            })
        }
    },
    methods: {
        isStudentNo(e) {
            var reg=/^\d+$/;   /*定义验证表达式*/
            if(!reg.test(e.target.value)){
                e.target.style.borderColor = 'red'
                this.$message({
                message: '请输入数字',
                type: 'error'
                })
            }else{
                e.target.style.borderColor = '#67c23a'
            }    /*进行验证*/
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
					e.target.style.borderColor = 'red'
					this.$message({
					message: '请输入11位数字',
					type: 'error'
					})
				} else {
					e.target.style.borderColor = '#67c23a'
				}
				},
        sumbit1(){
            if(this.detail.rooms.codes === ''){
                this.$message({
                    message: '请选择关联房屋',
                    type: 'warning'
                });
            }else if(this.detail.tenantry === ''){
                this.$message({
                    message: '请输入承租方',
                    type: 'warning'
                });
            }else if(this.detail.address === ''){
                this.$message({
                    message: '请输入联系地址',
                    type: 'warning'
                });
            }else if(this.detail.phone === ''){
                this.$message({
                    message: '请输入联系电话',
                    type: 'warning'
                });
            }else{
                var data2 = {
                    "site":this.detail.site,
                    "afterTheRent":this.detail.afterTheRent,
                    "amplification":this.detail.amplification,
                    "cashDeposit":this.detail.cashDeposit,
                    "tenantry":this.detail.tenantry,
                    "room":this.detail.room,
                    "phone":this.detail.phone,
                    "purpose": this.detail.purpose,
                    "comment":this.detail.comment,
                    "deliveryTime": this.detail.deliveryTime,
                    "terminationTime": this.form.terminationTime,
                    "startTime": this.detail.startTime,
                    "endTime": this.detail.endTime,
                    "monthlyRent": this.form.monthlyRent,
                    "monthlyManagementFee": this.form.monthlyManagementFee,
                    "total": this.form.total,
                    "premiumForLease": this.form.premiumForLease,
                    "cashPledge": this.form.cashPledge,
                    "manageStartTime": this.form.manageStartTime,
                    "manageEndTime": this.form.manageEndTime,
                    "administrativeFee": this.form.administrativeFee,
                    "rentalStartTime": this.form.rentalStartTime,
                    "rentalEndTime": this.form.rentalEndTime,
                    "rental": this.form.rental,
                    "managementCostStartTime": this.form.managementCostStartTime,
                    "managementCostEndTime": this.form.managementCostEndTime,
                    "managementCost": this.form.managementCost,
                    "aggregate": this.form.aggregate,
                    "roomNumber":this.detail.roomNumber,
                    "budgeEndTime":this.form.budgeEndTime,
                    "budgeStartTime":this.form.budgeStartTime,
                    "id":this.id,
                    "fixedGrowth":this.detail.fixedGrowth,
                    "fax": this.detail.fax,
                    "budget": this.detail.budget,
                    "taxes": this.detail.taxes,
                    "theDepositAmount": this.detail.theDepositAmount,
                    "dailyRent": this.detail.dailyRent,
                    "dailyManagementFee": this.detail.dailyManagementFee
                        }
                this.$ajax.put(url + 'contract/updateContract',data2
                ).then(res => {
                    if(res.data.status === 200){
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                            })
                        this.$router.push('/rent')
                    }else if(res.data.status===403){
                            this.$message({
                                message:'权限不足',
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

        },
        sumbit(){
            // 交付时间： paymentTime
            // 合同终止时间： terminationTime
            // 租赁时间： startTime   endTime

            // 月租金： monthlyRent
            // 月物业管理费： monthlyManagementFee
            // 租金物业费合计： total
            
            // 租赁保证金： leaseCommencementDate
            // cashPledge 物业管理费押金
            // 物业管理费开始日期 manageStartTime
            // 物业管理费结束日期 manageEndTime
            // 管理费 administrativeFee
            // 租金开始时间 rentalStartTime
            // 租金结束时间 rentalEndTime
            // 租金 rental
            // 管理费开始时间 managementCostStartTime
            // 合同中的第二次管理费结束时间 managementCostEndTime
            // 合同中的第二次管理费 managementCost
            // 合计 aggregate
            // var contractVO = {
            //      "site":this.detail.site,
            //         "afterTheRent":this.detail.afterTheRent,
            //         "amplification":this.detail.amplification,
            //         "cashDeposit":this.detail.cashDeposit,
            //         "tenantry":this.detail.tenantry,
            //         "ContractualRelation.roomId":this.detail.room,
            //         "phone":this.detail.phone,
            //         "purpose": this.detail.purpose,
            //         "comment":this.detail.comment,
            //         "deliveryTime": this.form.deliveryTime,
            //         "terminationTime": this.form.terminationTime,
            //         "startTime": this.detail.startTime,
            //         "endTime": this.detail.endTime,
            //         "monthlyRent": this.form.monthlyRent,
            //         "monthlyManagementFee": this.form.monthlyManagementFee,
            //         "total": this.form.total,
            //         "leaseCommencementDate": this.form.leaseCommencementDate,
            //         "cashPledge": this.form.cashPledge,
            //         "manageStartTime": this.form.manageStartTime,
            //         "manageEndTime": this.form.manageEndTime,
            //         "administrativeFee": this.form.administrativeFee,
            //         "rentalStartTime": this.form.rentalStartTime,
            //         "rentalEndTime": this.form.rentalEndTime,
            //         "rental": this.form.rental,
            //         "managementCostStartTime": this.form.managementCostStartTime,
            //         "managementCostEndTime": this.form.managementCostEndTime,
            //         "managementCost": this.form.managementCost,
            //         "aggregate": this.form.aggregate,
            //         "roomNumber":this.detail.roomNumber,
            //         "budgeEndTime":this.form.budgeEndTime,
            //         "budgeStartTime":this.form.budgeStartTime
            // }
            
            this.$ajax.post(url + 'contract/addContract', {
                "site":this.detail.site,
                    "afterTheRent":this.detail.afterTheRent,
                    "amplification":this.detail.amplification,
                    "cashDeposit":this.detail.cashDeposit,
                    "tenantry":this.detail.tenantry,
                    "room":this.detail.room,
                    "phone":this.detail.phone,
                    "purpose": this.detail.purpose,
                    "comment":this.detail.comment,
                    "deliveryTime": this.detail.deliveryTime,
                    "terminationTime": this.form.terminationTime,
                    "startTime": this.detail.startTime,
                    "endTime": this.detail.endTime,
                    "monthlyRent": this.form.monthlyRent,
                    "monthlyManagementFee": this.form.monthlyManagementFee,
                    "total": this.form.total,
                    "premiumForLease": this.form.premiumForLease,
                    "cashPledge": this.form.cashPledge,
                    "manageStartTime": this.form.manageStartTime,
                    "manageEndTime": this.form.manageEndTime,
                    "administrativeFee": this.form.administrativeFee,
                    "rentalStartTime": this.form.rentalStartTime,
                    "rentalEndTime": this.form.rentalEndTime,
                    "rental": this.form.rental,
                    "managementCostStartTime": this.form.managementCostStartTime,
                    "managementCostEndTime": this.form.managementCostEndTime,
                    "managementCost": this.form.managementCost,
                    "aggregate": this.form.aggregate,
                    "roomNumber":this.detail.roomNumber,
                    "budgeEndTime":this.form.budgeEndTime,
                    "budgeStartTime":this.form.budgeStartTime,
                    "id":this.id,
                    "fixedGrowth":this.detail.fixedGrowth,
                    "fax": this.detail.fax,
                    "budget": this.detail.budget,
                    "taxes": this.detail.taxes,
                    "theDepositAmount": this.detail.theDepositAmount,
                    "dailyRent": this.detail.dailyRent,
                    "dailyManagementFee": this.detail.dailyManagementFee
            }).then(res => {
                if(res.data.status === 200){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.$router.push('/rent')
                }else if(res.data.status===403){
                            this.$message({
                                message:'权限不足',
                                type: 'error'
                            })
                        } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        goBack(){
            window.history.back()
        },
        relation(e){
            
            this.$ajax.get(url + 'room/flndById/'+e[2]).then(res => {
                if(this.rooms.indexOf(res.data.data.id)<0){
                this.rooms.unshift(res.data.data.id)
                this.thisRoom.unshift(res.data.data.roomNumber.toString())
                this.detail.room = this.rooms.join()
                }
            }
            )
        },
        handleClose(tag) {
        this.thisRoom.splice(this.thisRoom.indexOf(tag), 1);
        this.rooms.splice(this.rooms.indexOf(tag), 1);
      },
    }
}
</script>

<style scoped>
.Rent_contract_change {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.tianjia{
    display: inline-block;
    vertical-align: top;
    width: 47%;
}


.next input {
    margin-left: 20px
}

.input {
    width: 90%;

}
.nextStep {
  border-radius: 5px;
  background-color: rgb(50, 168, 238);
  width: 65px;
  height: 33px;
  border: none;
  color: white;
}

.cancel {
  border-width: 1px;
  border-color: rgb(217, 217, 217);
  border-style: solid;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  width: 63px;
  height: 33px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(138, 138, 138);
}
.nn {
    width: 20%;
    margin: 2% 0 0 40%;
    display: flex;
    justify-content: space-between;
}
.el-upload-list--picture-price .el-upload-list__item{
    width: 123px;
    height: 123px;
}
.el-upload--picture-price{
    width: 123px;
    height: 123px;
}
form {
    margin-top: 35px;
}
.main span {
font-size: 14px;color: #606266;padding-left:10px;font-weight: 700;
}
.qq {
    padding: 0 10% 0 5%
}

 .supplement .el-form {
    overflow: hidden;
    width: 100%;
    min-width: 1030px;
  }
  .supplement .el-form-item {
    /* width: 50%; */
    /* float: left; */
    clear: both;
  }
  .supplement.con {
    padding: 0 10%;
  }
 
  .supplement span {
      border-left: #ffa517 solid 4px;
      line-height: 18px;
      height: 18px;
      padding-left: 6px;
    }
  .supplement{
      width: 100%
  }
.line{
    text-align: center
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
