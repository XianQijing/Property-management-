<template>
    <div class="addCustomer">
        <h3>{{name}}客户事件</h3>
        <div class="tianjia">
            <div class="input">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" size='small' :disabled="ww">
                <div id="fenkai">
                <el-form-item label="客户名字：" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入客户名字"></el-input>
                </el-form-item>
                <el-form-item label="客户手机号：" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入客户手机号"></el-input>
                </el-form-item>
               <el-form-item label="关联房屋：" prop="house">
                    <!-- <el-select :value="ruleForm.house" v-model="ruleForm.house" placeholder="请选择活动楼宇" > -->
                    <el-cascader expand-trigger="hover" :options="options" v-model="ruleForm.house" @change="handleChange"></el-cascader>
                </el-form-item>
                
                <el-form-item label="事件类型：" prop="buildArea">
                <el-select v-model="ruleForm.type" placeholder="请选择时间类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="处理情况：" prop="Situation" v-show="pan">
                <el-input v-model="ruleForm.Situation" placeholder="请输入处理情况"></el-input>
                </el-form-item>
                
                <el-form-item label="处理时间：" prop="time" v-show="pan">
                <el-date-picker
                        v-model="ruleForm.time"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="回访时间：" prop="endTime" v-show="show">
                <el-date-picker
                        v-model="ruleForm.endTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                
                </div>
                <div id="fenkai1">
                    <el-form-item label="事情描述：" prop="describe">
                <el-input v-model="ruleForm.describe" placeholder="请输入描述事情"></el-input>
                </el-form-item>
                    <el-form-item label="受理人：" prop="person">
                <el-input v-model="ruleForm.person" placeholder="请输入受理人姓名"></el-input>
                </el-form-item>
                    <el-form-item label="处理方式：" prop="due" v-show="duan">
                <el-input v-model="ruleForm.due" placeholder="请输入处理方式"></el-input>
                </el-form-item>
                
                <el-form-item label="处理满意度：" prop="Satisfied" v-show="pan">
                <el-input v-model="ruleForm.Satisfied" placeholder="请输入处理满意度"></el-input>
                </el-form-item>
                <el-form-item label="回访情况：" prop="Return" v-show="show">
                <el-input v-model="ruleForm.Return" placeholder="请输入回访情况"></el-input>
                </el-form-item>
                <el-form-item label="发生时间:" prop="phone">
                    <el-date-picker
                        v-model="ruleForm.startTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="回访满意度：" prop="returnSatisfied" v-show="pan">
                <el-input v-model="ruleForm.returnSatisfied" placeholder="请输入回访满意度"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remarks" v-show="pan">
                <el-input v-model="ruleForm.remarks" placeholder="请输入房屋类型"></el-input>
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
            options: [
          {
          value: 'bangongqu',
          label: '办公区',
          children: [{
              value: 'Azuo',
              label: 'A座',
              children: [{
                value: '101',
                label: '101'
              }, {
                value: '102',
                label: '102'
              }, {
                value: '103',
                label: '103'
              }, {
                value: '104',
                label: '104'
              },
              {
                value: '105',
                label: '105'
              }]
          }, 
          {
            value: 'Bzuo',
            label: 'B座',
            children: [{
              value: '101',
              label: '101'
            }, {
              value: '102',
              label: '102'
            }, {
              value: '103',
              label: '103'
            }, {
              value: '104',
              label: '104'
            },
            {
              value: '105',
              label: '105'
            }]
          },{
            value: 'Czuo',
            label: 'C座',
            children: [{
              value: '101',
              label: '101'
            }, {
              value: '102',
              label: '102'
            }, {
              value: '103',
              label: '103'
            }, {
              value: '104',
              label: '104'
            },
            {
              value: '105',
              label: '105'
            }]
          }]
        },{
          value: 'yanjiedianpu',
          label: '沿街店铺',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
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
            ruleForm: {
                house: [],
                type:'',
                name: '',
                buildArea:'',
                houseType: '',
                Situation: '',
                roomType: '',
                roomArea: '',
                phone:'',
                time:'',
                Situation:'',
                endTime:'',
                describe:'',
                person:'',
                due:'',
                Satisfied:'',
                Return:'',
                startTime:'',
                returnSatisfied:"",
                remarks:''
            },
            input:{
                house: 'shanghai',
            },

        
        }
    },
    mounted(){
        this.id = this.$route.query.id
        if(this.$route.query.msg === 2){
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
        }else if(this.$route.query.msg === 1){
            this.name = '新增',
            this.pan = false,
            this.duan = true,
            this.show = false
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
        },
        handleChange(value) {
        console.log(value);
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
