<template>
    <div class="addBuild">
        <h3>{{this.name}}楼宇</h3>
        <div class="tianjia">
            <div class="input">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
               <el-form-item label="所属小区" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
                <el-form-item label="楼宇名称" prop="roomnumber">
                <el-input v-model="ruleForm.roomnumber" placeholder="请输入房号" :value="input"></el-input>
                </el-form-item>
                <el-form-item label="单元数量" prop="buildArea">
                <el-input v-model="ruleForm.buildArea" placeholder="请输入建筑面积"></el-input>
                </el-form-item>
                <el-form-item label="楼宇层数" prop="roomArea">
                <el-input v-model="ruleForm.roomArea" placeholder="请输入套内面积"></el-input>
                </el-form-item>
                <el-form-item label="楼宇类型" prop="publicArea">
                <el-input v-model="ruleForm.publicArea" placeholder="请输入公摊面积"></el-input>
                </el-form-item>
                <el-form-item label="楼宇结构" prop="roomType">
                <el-input v-model="ruleForm.roomType" placeholder="请输入房屋类型"></el-input>
                </el-form-item>
                <el-form-item label="楼宇朝向" prop="roomLabel">
                <el-input v-model="ruleForm.roomLabel" placeholder="请输入房屋标签"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="houseType">
                <el-input v-model="ruleForm.houseType" placeholder="请输入房屋类型"></el-input>
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
    name: 'addBuild',
    data(){
        return{
            name:'添加',
            ruleForm: {
            region: '',
            roomnumber: '',
            buildArea:'',
            houseType: '',
            roomLabel: '',
            roomType: '',
            roomArea: '',
            publicArea:'',
            input:[]
        },
        rules: {
          name: [
            { required: true, message: '请输入所在楼层', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择小区/楼宇/单元', trigger: 'change' }
          ],
          roomnumber: [
            { required: true, message: '请输入房号', trigger: 'blur' }
          ],
          buildArea: [
            { required: true, message: '请输入建筑面积', trigger: 'blur' }
          ]
        },
        }
    },
    mounted(){
        console.log(this.$route.query)
        if(this.$route.query.id !=''){
            this.name = '编辑'
            console.log(this.$route.query.id)
            this.id = this.$route.query.id
            this.$ajax.get(url + 'building/flndById/'+this.id+'').then(res => {
                console.log(res.data.data)
            })
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
.addBuild {
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
.el-radio {
    display: block;
    margin-top: 15px;
}
.el-radio+.el-radio {
    margin-left: 0!important;
}
</style>
