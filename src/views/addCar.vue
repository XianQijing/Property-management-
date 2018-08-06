<template>
<!--车位管理-添加车位-->
    <div class="addCar">
        <h3>{{this.name}}车位</h3>
        <div class="tianjia">
            <div class="input">
            <el-form :model="carForm" :rules="rules" ref="carForm" label-width="130px" class="demo-carForm">
               <el-form-item label="小区" prop="region">
                   <el-select v-model="carForm.region" placeholder="请选择小区">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
                <el-form-item label="车位号" prop="carNumber">
                <el-input v-model="carForm.carNumber" placeholder="请输入车位号"></el-input>
                </el-form-item>
                <el-form-item label="产权面积" prop="Area">
                <el-input v-model="carForm.Area">
                    <template slot="append">平方米</template>
                </el-input>
                </el-form-item>
                <el-form-item label="车位类型" prop="carType">
                <el-input v-model="carForm.carType" placeholder="请输入车位类型"></el-input>
                </el-form-item>
                <el-form-item label="车位状态" prop="carState">
                <el-input v-model="carForm.carState" placeholder="请输入车位状态"></el-input>
                </el-form-item>
                <el-form-item label="车位标签" prop="Type">
                <el-input v-model="carForm.Type" placeholder="请输入车位标签"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
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
    name: 'addCar',
    data(){
        return{
            name:'',
            carForm: {
            region:'',
            carNumber: '',
            Area:'',
            remarks: '',
            Type: '',
            carType: '',
            carState:''
        },
        rules: {
          carType: [
            { required: true, message: '请输入车位类型', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择小区/楼宇/单元', trigger: 'change' }
          ],
          carNumber: [
            { required: true, message: '请输车位号', trigger: 'blur' }
          ],
          Area: [
            { required: true, trigger: 'blur' }
          ],
          carState: [
            { required: true,message: '请输车位类型', trigger: 'blur' }
          ]
        },
        }
    },
    mounted(){
        console.log(this.$route.query.id)
        if (this.$route.query.id!=="ww") {
            console.log(this.$route.query.id)
            this.id = this.$route.query.id
            this.name = "编辑"
            this.$ajax.get(url + 'building/flndById/'+this.id+'').then(res => {
                console.log(res.data.data)
            })
        }else if(this.$route.query.id==="ww"){
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
.addCar {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
    height: 100%;
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
