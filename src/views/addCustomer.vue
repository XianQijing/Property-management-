<template>
  <div class="addCustomer">
    <h3>{{name}}客户事件</h3>
    <div class="tianjia">
      <div class="input">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" size='small' :disabled="ww">
          <div id="fenkai">
            <el-form-item label="客户名字：" prop="roomnumber">
              <el-input v-model="ruleForm.roomnumber" placeholder="请输入客户名字"></el-input>
            </el-form-item>
            <el-form-item label="客户手机号：" prop="publicArea">
              <el-input v-model="ruleForm.publicArea" placeholder="请输入客户手机号"></el-input>
            </el-form-item>
            <el-form-item label="关联房屋：" prop="region">
              <el-select :value="ruleForm.region" v-model="ruleForm.region" placeholder="请选择活动楼宇" >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="事件类型：" prop="buildArea">
              <el-select v-model="ruleForm.region" placeholder="请选择时间类型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理情况：" prop="roomLabel" v-show="pan">
              <el-input v-model="ruleForm.roomLabel" placeholder="请输入处理情况"></el-input>
            </el-form-item>
            <el-form-item label="处理时间：" prop="roomLabel" v-show="pan">
              <el-date-picker v-model="ruleForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="回访时间：" prop="roomLabel" v-show="show">
              <el-date-picker v-model="ruleForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </div>
          
          <div id="fenkai1">
            <el-form-item label="事情描述：" prop="publicArea">
              <el-input v-model="ruleForm.publicArea" placeholder="请输入描述事情"></el-input>
            </el-form-item>
            <el-form-item label="受理人：" prop="roomType">
              <el-input v-model="ruleForm.roomType" placeholder="请输入受理人姓名"></el-input>
            </el-form-item>
            <el-form-item label="处理方式：" prop="publicArea" v-show="duan">
              <el-input v-model="ruleForm.publicArea" placeholder="请输入处理方式"></el-input>
            </el-form-item>
            <el-form-item label="处理满意度：" prop="roomLabel" v-show="pan">
              <el-input v-model="ruleForm.roomLabel" placeholder="请输入处理满意度"></el-input>
            </el-form-item>
            <el-form-item label="回访情况：" prop="roomLabel" v-show="show">
              <el-input v-model="ruleForm.roomLabel" placeholder="请输入回访情况"></el-input>
            </el-form-item>
            <el-form-item label="发生时间:" prop="publicArea">
              <el-date-picker
                  v-model="ruleForm.time"
                  type="datetime"
                  placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="回访满意度：" prop="roomLabel" v-show="pan">
              <el-input v-model="ruleForm.roomLabel" placeholder="请输入回访满意度"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="houseType" v-show="pan">
              <el-input v-model="ruleForm.houseType" placeholder="请输入房屋类型"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="nn">
        <button class="nextStep">保存</button><button class="cancel" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addCustomer',
  data(){
    return{
      name:'',
      pan:false,
      duan:true,
      ww:false,
      show:true,
      ruleForm: {
        region: 'shanghai',
        roomnumber: '',
        buildArea:'',
        houseType: '',
        roomLabel: '',
        roomType: '',
        roomArea: '',
        publicArea:'',
        time:'',
      },
      input:{
        region: 'shanghai',
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
    this.id = this.$route.query.id
    if(this.$route.query.msg === 1){
      this.name = '新增',
      this.pan = false,
      this.duan = true,
      this.show = false
    }else if(this.$route.query.msg === 2){
      this.ww = true,
      this.name = '查看'
      this.pan = true,
      this.duan = false,
      this.show = true
    }else if(this.$route.query.msg === 3){
      this.name = '修改'
      this.pan = true,
      this.duan = false
      this.show = true
    }else if(this.$route.query.msg === 4){
      this.name = '查看',
      this.pan = false,
      this.duan = true,
      this.ww = true,
      this.show = true
      console.log(this.id)
    }else if(this.$route.query.msg === 5){
      this.name = '新增',
      this.pan = false,
      this.duan = true,
      this.show = false,
      console.log(this.id)
    }else{
      this.name = '新增'
      this.pan = true,
      this.duan = false,
      this.show = true
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
.addCustomer {
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
    margin: 5% 14% 0 10%
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
#fenkai {
    display: inline-block;
    width: 49%;
}
#fenkai1 {
    display: inline-block;
    width: 49%;
}
</style>
