<template>
<!--车位管理-房产验收-->
    <div class="test">
        <h3>{{this.name}}房产</h3>
        <div class="tianjia">
            <div class="input">
            <el-form :model="carForm" ref="carForm" label-width="130px" class="demo-carForm">
               <el-form-item label="关联房屋：">
                    <el-cascader expand-trigger="hover" :options="options" v-model="carForm.region" @change="handleChange"></el-cascader>
               </el-form-item>
                <el-form-item label="验收项目：">
                   <el-input v-model="carForm.project"></el-input>
               </el-form-item>
                <el-form-item label="验收标准：">
                <el-input v-model="carForm.standard">
                </el-input>
                </el-form-item>
                <el-form-item label="验收结果：">
                   <el-select v-model="carForm.Result" placeholder="请选择验收结果">
                       <el-option label="不合格" value="0"></el-option>
                       <el-option label="合格" value="1"></el-option>
                   </el-select>
               </el-form-item>
                <el-form-item label="验收人：">
                <el-input v-model="carForm.person" placeholder="请输入验收人"></el-input>
                </el-form-item>
                <el-form-item label="验收说明：" prop="Type">
                <el-input v-model="carForm.Explain" placeholder="请输入验收说明"></el-input>
                </el-form-item>
                <el-form-item label="验收时间：" prop="Type">
                  <el-date-picker 
                    v-model="carForm.time" 
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss" 
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择验收时间">
                </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：" prop="remarks">
                <el-input v-model="carForm.remarks" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            </div>
            <div class="nn">
            <button class="nextStep" @click="save">保存</button><button class="cancel" @click="goBack">返回</button>
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
                region:[],
                carNumber: '',
                project:'',
                standard:'',
                Result:'',
                person:'',
                Explain:'',
                time:'',
                remarks: ''
        },
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
            this.getRoomList()
            console.log(this.$route.query.id)
        }
    },
    
    methods:{
        goBack(){
            window.history.back()
        },
        handleChange(value) {
          console.log(value);
        },
        getRoomList(){
          this.$ajax.get(url + 'room/flndByClientId').then(res => {
                  console.log(res)
                  this.options=res.data;
          })
        },
        save(){
          console.log(this.carForm)
          var roomStandard={}
          roomStandard.room=this.carForm.region[2];
          roomStandard.acceptanceStandard=this.carForm.standard
          roomStandard.acceptanceResult=this.carForm.Result
          roomStandard.acceptanceBy=this.carForm.Result
          roomStandard.acceptanceState=this.carForm.Explain
          roomStandard.acceptanceTime=this.carForm.time
          roomStandard.remark=this.carForm.remarks
          this.$ajax.post(url + 'roomStandard/addRoomStandard',roomStandard).then(res => {
              console.log(res)
          })

        },
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
