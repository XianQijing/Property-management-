<template>
    <div class="Rent_contract_change">
        <h3>住户详情</h3>
        <div class="qq">
        <el-form :model="detail" ref="detail" label-width="130px" class="demo-detail" :disabled="edit">
        <div class="tianjia">
            <div class="input">
                
                    <el-form-item label="承租方:">
                        <el-input v-model="detail.owner.name" :placeholder="input.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系地址:">
                        <el-input v-model="detail.owner.address" :placeholder="input.address"></el-input>
                    </el-form-item>
                    <el-form-item label="关联房屋:">{{detail.rooms.codes}}
                        <el-select v-model="detail.rooms.codes">
                        <el-option v-for="item in options" :key="item.id" :label="item.roomNumber" :value="item.id">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="租赁时间:">
                        <el-date-picker v-model="detail.startTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        <!-- <el-input v-model="detail.startTime" :placeholder="input.startTime" style="width:44%"></el-input><span style="color:#c0c4cc"> —— </span>
                        <el-input v-model="detail.endtime" :placeholder="input.endtime" style="width:44%"></el-input> -->
                    </el-form-item>
                    <el-form-item label="租金:">
                        <el-input v-model="detail.rooms.pricing" :placeholder="input.price">
                            <template slot="append">元/天/平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="物业管理费:">
                        <el-input v-model="detail.strataFee" :placeholder="input.expense">
                            <template slot="append">元/天/平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="装修免租金日期:">
                        <el-date-picker
                            v-model="detail.rentFreeTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                        <!-- <el-input v-model="detail.rentFreeTime" :placeholder="input.date"></el-input> -->
                    </el-form-item>
            </div>
        </div>

        <div class="tianjia">
            <div class="input">
                    <el-form-item label="联系电话：">
                        <el-input v-model="detail.owner.phone" :placeholder="input.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="建筑面积：">
                        <el-input v-model="detail.building.codes" :placeholder="input.area"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺类型：">
                        <el-input v-model="detail.rooms.useId" :placeholder="input.type"></el-input>
                    </el-form-item>
                    <el-form-item label="交付时间：">
                        <el-date-picker
                            v-model="detail.paymentTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                        <!-- <el-input v-model="detail.paymentTime" :placeholder="input.rentTime"></el-input> -->
                    </el-form-item>
                    <el-form-item label="三年后租金增幅：">
                        <el-input v-model="detail.riseMoney" :placeholder="input.riseMoney" style="width:35%" >
                            <template slot="append">%/月</template>
                        </el-input>
                        <span>每月租金为：</span>
                        <el-input v-model="detail.afterTheRent" :placeholder="input.rentMoney" style="width:35%">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="每两月缴费日期：">
                        <el-date-picker
                            v-model="detail.payTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                        <!-- <el-input v-model="detail.payTime" :placeholder="input.day"></el-input> -->
                    </el-form-item>
                    <el-form-item label="合同保证金：">
                        <el-input v-model="detail.cashDeposit" style="width:20%" >
                        </el-input>
                        <span>物业押金：</span>
                        <el-input v-model="detail.cashPledge"  style="width:20%">
                        </el-input>
                        <span>合计：</span>
                        <el-input v-model="detail.total" style="width:20%">
                        </el-input>
                    </el-form-item>
            </div>
        </div>
        <div style="width:90%">
        <el-form-item label="备注：">
            <el-input type="textarea" :rows="2" :placeholder="input.textarea" v-model="detail.comment">
        </el-input>
        </el-form-item>
        </div>
        </el-form>
        </div>
        <div class="nn" v-show="addOne">
            <button class="nextStep"  @click="sumbit">确定1</button><button class="cancel" @click="goBack">返回</button>
        </div>
        <div class="nn" v-show="watchOne">
            <button class="nextStep"  @click="goBack">确定2</button><button class="cancel" @click="goBack">返回</button>
        </div>
        <div class="nn" v-show="changeOne">
            <button class="nextStep"  @click="sumbit1">确定3</button><button class="cancel" @click="goBack">返回</button>
        </div>
    </div>
</template>

<script>
import url from '../assets/Req.js'
export default {
    name:'Rent_contract_change',
    data(){
        return{
            ww:true,
            tt:false,
            id:'',
            detail: {
                id: "",
                startTime: [],
                paymentAmount: 1,
                paymentTime: "",
                amplification: 1,
                afterTheRent: 1,
                strataFee: 1,
                rentFreeTime: "",
                payTime: "",
                cashDeposit: 1,
                cashPledge: 1,
                total: 1,
                comment: "",
                owner: {
                    name: "",
                    phone: "",
                    address: ""
                },
                rooms: {
                    id: "",
                    codes: "",
                    coveredArea: 0,
                    roomType: "",
                    comment: "",
                    useId:''
                },
                building: {
                    codes: ""
                },
                total:'',
                comment:''

            },
            input: {
                name: '请输入姓名',
                address: '请输入联系地址',
                house: '请输入关联房屋',
                endtime: '请选择结束时间',
                startTime: '请选择开始时间',
                price: '请输入租金',
                expense:'请输入物业管理费',
                date:'请选择装修免租金日期',
                phone:'请输入手机号',
                area: '请输入建筑面积',
                type:'请输入店铺类型',
                textarea:'',
                rentTime:'请输入交付时间',
                riseMoney: '请输入增幅百分比',
                day: '请输入每月缴费金额',
            },
            edit: true,
            message:'',
            options:{},
            addOne:true,
            changeOne:false,
            watchOne:false
        }
    },
    mounted(){
        this.id = this.$route.query.id
        this.message = this.$route.query.msg
        console.log(this.message)
        this.$ajax.get(url + 'room/flndAll/1/10').then(res => {
            console.log(res.data.data.rows)
            this.options = res.data.data.rows
            console.log(this.options)
        })
        if (this.$route.query.msg === "watch"){
            this.addOne = false,
            this.changeOne = false,
            this.watchOne = true
            this.edit = true,
            this.$ajax.get(url+'contract/flndById/'+this.id).then(res => {
                // console.log(res)
                this.detail = res.data.data
                this.detail.startTime = [res.data.data.startTime,res.data.data.endTime]
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
        }
    },
    methods: {
        sumbit1(){
            var data2 = {
                        "address":this.detail.owner.address,
                        "afterTheRent":this.detail.afterTheRent,
                        "amplification":this.detail.riseMoney,
                        "cashDeposit":this.detail.cashDeposit,
                        "cashPledge":this.detail.cashPledge,
                        "comment":this.detail.total,
                        "name":this.detail.owner.name,
                        "phone":this.detail.owner.phone,
                        "room":this.detail.rooms.codes,
                        "strataFee":this.detail.strataFee,
                        "total":this.detail.total,
                        "startTime":this.detail.startTime[0],
                        "endTime":this.detail.startTime[1],
                        "paymentAmount":this.detail.rooms.pricing,
                        "rentFreeTime":this.detail.rentFreeTime,
                        // "rooms.coveredArea":this.detail.building.codes,
                        // "rooms.roomType":this.detail.rooms.useId,
                        "paymentTime":this.detail.paymentTime,
                        "payTime":this.detail.payTime,
                        "comment":this.detail.comment
                        }
                this.$ajax.put(url + 'contract/updateContract/'+this.id,data2
                ).then(res => {
                    if(res.data.status === 200){
                        alert('成功')
                    }
                })
        },
        sumbit(){
            var data1 = {
                        "address":this.detail.owner.address,
                        "afterTheRent":this.detail.afterTheRent,
                        "amplification":this.detail.riseMoney,
                        "cashDeposit":this.detail.cashDeposit,
                        "cashPledge":this.detail.cashPledge,
                        "comment":this.detail.total,
                        "name":this.detail.owner.name,
                        "phone":this.detail.owner.phone,
                        "room":this.detail.rooms.codes,
                        "strataFee":this.detail.strataFee,
                        "total":this.detail.total,
                        "startTime":this.detail.startTime[0],
                        "endTime":this.detail.startTime[1],
                        "paymentAmount":this.detail.rooms.pricing,
                        "rentFreeTime":this.detail.rentFreeTime,
                        // "rooms.coveredArea":this.detail.building.codes,
                        // "rooms.roomType":this.detail.rooms.useId,
                        "paymentTime":this.detail.paymentTime,
                        "payTime":this.detail.payTime,
                        "comment":this.detail.comment
                        }
            this.$ajax.post(url + 'contract/addContract', {data:data1}).then(res => {
                    console.log(res)
                })
        },
      goBack(){
            window.history.back()
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
    margin: 4% 0 0 40%;
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
    padding: 0 10%
}
</style>
