<template>
    <div class="check">
        <h3>装修验收</h3>
        <div class="shou">
            <div class="ds">
            <el-form :model="detail" ref="detail" label-width="130px" class="demo-detail" size = "small">
                <el-form-item label="验收日期:">
                        <el-date-picker
							v-model="detail.day"
							type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width:50%"
							placeholder="选择日期时间">
                         </el-date-picker>
                        <!-- <el-input :value="detail.day" style="width:50%"></el-input> -->
                        <el-switch
                            v-model="detail.pass"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            active-text="验收通过">
                            </el-switch>
                    </el-form-item>
                    <div class="money_1">
                    <el-form-item label="已收押金:">
                        <el-input v-model="detail.aready"></el-input>
                    </el-form-item>
                    </div>
                    <div class="money_1">
                        <el-form-item label="扣款合计:">
                        <el-input v-model="detail.all"></el-input>
                    </el-form-item>
                    </div>
                    <div class="money_1">
                        <el-form-item label="拟退押金:">
                        <el-input v-model="detail.money"></el-input>
                    </el-form-item>
                    </div>
                    
                        <el-form-item label="验收说明：">
                            <el-input v-model="detail.remark" type="textarea" :rows="4">
                        </el-input>
                        </el-form-item>
                   
            </el-form>
            </div>
            <h4>申请信息</h4>
        <el-form  ref="input" label-width="130px" class="demo-input" size = "small" :disabled=true>

        <div class="tianjia">
            <div class="input">
                
                    <el-form-item label="租户姓名:">
                        <el-input :value="input.name"></el-input>
                    </el-form-item>

                    <el-form-item label="关联房屋:">
                        <el-input :value="input.house"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话:">
                        <el-input :value="input.principal_phone"></el-input>
                    </el-form-item>
                    <div class="zhuangxiu">
                    <el-form-item label="开始装修时间:">
                        <el-input :value="input.startTime"></el-input>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                        <el-form-item label="预估结束时间:">
                        <el-input :value="input.endTime"></el-input>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                    <el-form-item label="装修性质:">
                        <el-radio-group :value="input.natureName">
                            <el-radio :label="input.natureName"></el-radio>
                        </el-radio-group>
                      
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                        <el-form-item label="施工负责人:">
                            <el-input :value="input.principal_man"></el-input>
                        </el-form-item>
                    </div>

            </div>
        </div>

        <div class="tianjia">
            <div class="input">
                    <el-form-item label="手机号：">
                        <el-input :value="input.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-input :value="input.leaseType"></el-input>
                    </el-form-item>
                    <el-form-item label="装修保证金：">
                        <el-input :value="input.cash_deposit"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人身份证号:">
                        <el-input :value="input.principal_card"></el-input>
                    </el-form-item>
                    <el-form-item label="装修项目:">
                        <el-input :value="input.project"></el-input>
                    </el-form-item>
            </div>
        </div>
        
        </el-form>
        </div>
        <div class="nn">
            <button class="nextStep" @click="addOne">保存</button><button class="cancel" @click="goBack">返回</button>
            </div>
    </div>
</template>

<script>

import url from '../assets/Req.js'

export default {
    name:'check',
    data(){
        return{
            detail: {
                day:'',
                aready:'',
                all: '',
                money: '',
                pass:'',
                textarea:'',
            },
            input: {
                name: '李文',
                roomNumber: '办公室C座301',
                principal_phone: 'afse',
                startTime:'管理费',
                endTime: '5000元/年',
                cash_deposit: '2018.6.23',
                project: '2017.6.23',
                natureName: 'sfdg',
                phone:'18874562233',
                leaseType: '办公区',
                principal_card:'1354',
                cash_deposit:'787',
                principal_man:'2年',
                company:'2年',
            },
            
        }
    },
    mounted(){
        console.log(this.$route.query.id)
         this.id = this.$route.query.id
         this.$ajax.get(url +'adornApply/findIdVO/'+this.id).then(res => {
            this.input = res.data;
            this.input.house = res.data.buildingName+"-"+res.data.roomNumber;
         })
     
    },
    methods: {
    //增加装修验收记录
     addOne(){
            var adornCheck={};
            adornCheck.applyid = this.id;
            adornCheck.checkTime = this.detail.day;
            adornCheck.receivedMoney = this.detail.aready;
            adornCheck.withholdMoney = this.detail.all;
            adornCheck.retreatMoney = this.detail.money;
            console.log(adornCheck)
            adornCheck.checkState = this.detail.remark;
            if(this.detail.pass == true){
                adornCheck.isPass = 1;
            }else{
                adornCheck.isPass = 0;
            }
           this.$ajax.post(url+"adornCheck/insert",adornCheck).then((res) => {
              this.form = res.data
              console.log(this.form);
              if(res.data.status === 200){
                         this.$message({
                                message: '新增数据成功',
                                type: 'success'
                            }),
                            this.goBack()
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                        }) 
                 }
              
            })
        },
      goBack(){
          window.history.back()
      }
    }
}
</script>

<style scoped>
.check {
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
.el-upload-list--picture-card .el-upload-list__item{
    width: 123px;
    height: 123px;
}
.el-upload--picture-card{
    width: 123px;
    height: 123px;
}
form {
    margin-top: 35px;
}
.zhuangxiu {
    width: 49%;
    display: inline-block;
    vertical-align: top;
}
.shou{
    padding: 2vh 10vw 0 6vw
}
.money_1{
display: inline-block;
width: 32.5%;
}
.ds{
    width: 90%
}
.el-switch{
    display: inline-block;
    position: relative;
    left: 5vw;
}
</style>
