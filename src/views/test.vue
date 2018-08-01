<template>
<!--车位管理-房产验收-->
    <div class="test">
        <h3>{{this.name}}房产</h3>
        <div class="tianjia">
            <div class="input">
            <el-form :model="carForm" ref="carForm" label-width="130px" class="demo-carForm">
               <el-form-item label="关联房屋：">
                   <el-select v-model="carForm.region" placeholder="请选择房屋类型">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
                <el-form-item label="验收项目：">
                   <el-select v-model="carForm.region" placeholder="请选择验收项目">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
                <el-form-item label="验收标准：">
                <el-input v-model="carForm.Area">
                </el-input>
                </el-form-item>
                <el-form-item label="验收结果：">
                   <el-select v-model="carForm.region" placeholder="请选择验收结果">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
                <el-form-item label="验收人：">
                <el-input v-model="carForm.carState" placeholder="请输入验收人"></el-input>
                </el-form-item>
                <el-form-item label="验收说明：" prop="Type">
                <el-input v-model="carForm.Type" placeholder="请输入验收说明"></el-input>
                </el-form-item>
                <el-form-item label="验收时间：" prop="Type">
                <el-input v-model="carForm.Type" placeholder="请输入验收时间"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remarks">
                <el-input v-model="carForm.remarks" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            </div>
            <div class="nn">
            <button class="nextStep">保存</button><button class="cancel" @click="goBack">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import url from '../assets/Req.js'
export default {
    name: 'test',
    data(){
        return{
            name:'添加',
            carForm: {
                region:'',
                carNumber: '',
                Area:'',
                remarks: '',
                Type: '',
                carType: '',
                carState:''
        },
        }
    },
    mounted(){
        console.log(this.$route.query.id)
        if (this.$route.query.id!=="add") {
            console.log(this.$route.query.id)
            this.id = this.$route.query.id
            this.name = "编辑"
            this.$ajax.get(url + 'building/flndById/'+this.id+'').then(res => {
                console.log(res.data.data)
            })
        }else if(this.$route.query.id==="add"){
            this.name = "添加"
            console.log(this.$route.query.id)
        }
    },
    
    methods:{
        goBack(){
            window.history.back()
        }
    }

}
</script>

<style scoped>
.test {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
}
.tianjia{
    vertical-align: top;
}


.next input {
    margin-left: 20px
}

.input {
    width: 40%;
    margin: 4% 0 0 24%;
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
.input {
    display: block;
}
</style>
