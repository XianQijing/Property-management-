<template>
    <div class="check">
        <h3>装修验收</h3>
        <div class="shou">
            <div class="ds">
            <el-form :model="detail" ref="detail" label-width="130px" class="demo-detail" size = "small">
                <el-form-item label="验收日期:">
                        <el-input :value="detail.day" style="width:50%"></el-input>
                        <el-switch
                            v-model="detail.pass"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            active-text="验收通过">
                            </el-switch>
                    </el-form-item>
                    <div class="money_1">
                    <el-form-item label="已收押金:">
                        <el-input :value="detail.aready"></el-input>
                    </el-form-item>
                    </div>
                    <div class="money_1">
                        <el-form-item label="扣款合计:">
                        <el-input :value="detail.all"></el-input>
                    </el-form-item>
                    </div>
                    <div class="money_1">
                        <el-form-item label="拟退押金:">
                        <el-input :value="detail.money"></el-input>
                    </el-form-item>
                    </div>
                    
                        <el-form-item label="验收说明：">
                            <el-input type="textarea" :rows="4">
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
                    <el-form-item label="建筑面积:">
                        <el-input :value="input.area"></el-input>
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
                        <el-radio-group :value="input.fitUp">
                            <el-radio :label="input.fitUp"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                        <el-form-item label="施工负责人:">
                            <el-input :value="input.person"></el-input>
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
                        <el-input :value="input.mold"></el-input>
                    </el-form-item>
                    <el-form-item label="装修保证金：">
                        <el-input :value="input.money"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人身份证号:">
                        <el-input :value="input.card"></el-input>
                    </el-form-item>
                    <el-form-item label="装修项目:">
                        <el-input :value="input.project"></el-input>
                    </el-form-item>
            </div>
        </div>
        
        </el-form>
        </div>
        <div class="nn">
            <button class="nextStep">保存</button><button class="cancel" @click="goBack">返回</button>
            </div>
    </div>
</template>

<script>
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
                house: '办公室C座301',
                area: 'afse',
                startTime:'管理费',
                endTime: '5000元/年',
                time: '2018.6.23',
                startTime: '2017.6.23',
                fitUp: 'sfdg',
                project:'18874562233',
                mold: '办公区',
                person:'1354',
                phone:'787',
                card:'2年',
                money:'2年',
            },
            
        }
    },
    methods: {
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
