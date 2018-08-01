<template>
    <div class="patrol">
        <h3>装修巡检</h3>
        <div class="shou">
            <div class="ds">
            <el-form :model="detail" ref="detail" label-width="130px" class="demo-detail">
                <div class="zhuangxiu">
                    <el-form-item label="巡检日期:">
                        <el-input v-model="detail.day"></el-input>
                    </el-form-item>
                </div>
                <div class="zhuangxiu">
                    <el-form-item label="巡检次数:">
                        <el-input v-model="detail.number"></el-input>
                    </el-form-item>
                </div>
                <div class="zhuangxiu">
                    <el-form-item label="巡检人:">
                        <el-input v-model="detail.person"></el-input>
                    </el-form-item>
                </div>
                <div class="zhuangxiu">
                    <el-form-item label="巡检人联系方式:">
                        <el-input v-model="detail.phone"></el-input>
                    </el-form-item>
                </div>
                <div class="zhuangxiu">
                    <el-form-item label="是否完工:">
                        <el-radio v-model="detail.radio" label="1">是</el-radio>
                        <el-radio v-model="detail.radio" label="2">否</el-radio>
                    </el-form-item>
                </div>
                <div class="zhuangxiu">
                    <el-form-item label="是否违规:">
                        <el-radio v-model="detail.radio" label="1">是</el-radio>
                        <el-radio v-model="detail.radio" label="2">否</el-radio>
                    </el-form-item>
                </div>
                
                    
                <el-form-item label="巡查说明：">
                    <el-input type="textarea" :rows="4">
                </el-input>
                </el-form-item>
                   
            </el-form>
            </div>
        </div>
        <div class="nn">
            <button class="nextStep">保存</button><button class="cancel" @click="goBack">返回</button>
            </div>
    </div>
</template>

<script>
export default {
    name:'patrol',
    data(){
        return{
            detail: {
                day:'',
                number:'',
                person:'',
                phone: '',
                radio:'是',
                textarea:'',
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
.patrol {
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
    padding: 2vh 12vw 0 6vw
}

</style>
