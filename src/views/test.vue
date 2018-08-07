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
  data () {
    return {
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
      options: [],
    }
  },
  mounted(){
    if (this.$route.query.id !== "add") {
      this.id = this.$route.query.id
      this.name = "编辑"
      // GET /roomStandard/flndById/{id}
      this.$ajax.get(url + 'roomStandard/flndById/' + this.id).then(res => {
        console.log(res.data.data)
        this.carForm.region = res.data.data.room.split(',')
        this.carForm.project = res.data.data.projectAcceptance
        this.carForm.standard = res.data.data.acceptanceStandard
        this.carForm.Result = status(res.data.data.acceptanceResult)
        this.carForm.person = res.data.data.acceptanceBy
        this.carForm.Explain = res.data.data.acceptanceState
        this.carForm.time = res.data.data.acceptanceTime
        this.carForm.remarks = res.data.data.remark
      })
    } else if(this.$route.query.id === "add") {
      this.name = "添加"
    }
    this.getRoomList()
  },
  
  methods: {
    goBack () {
      window.history.back()
    },
    handleChange (value) {
      // console.log(value);
    },
    getRoomList () {
      this.$ajax.get(url + 'room/flndByClientId').then(res => {
        // console.log(res)
        this.options = res.data;
      })
    },
    save () {
      var roomStandard = {}
      roomStandard.room = this.carForm.region[0] + ',' + this.carForm.region[1] + ',' +this.carForm.region[2]
      roomStandard.projectAcceptance = this.carForm.project
      roomStandard.acceptanceStandard = this.carForm.standard
      roomStandard.acceptanceResult = status2(this.carForm.Result)
      roomStandard.acceptanceBy = this.carForm.person
      roomStandard.acceptanceState = this.carForm.Explain
      roomStandard.acceptanceTime = this.carForm.time
      roomStandard.remark = this.carForm.remarks
      if (this.$route.query.id !== "add") {
        roomStandard.id = this.$route.query.id
        // console.log(roomStandard)
        this.$ajax.put(url + 'roomStandard/updateRoomStandard', roomStandard).then(res => {
          console.log(res.data)
          if (res.data.status === 200) {
            // this.fullscreenLoading = false
            window.history.go(-1)
          }
        })
      } else if(this.$route.query.id === "add") {
        this.$ajax.post(url + 'roomStandard/addRoomStandard', roomStandard).then(res => {
          if (res.data.status === 200) {
            // this.fullscreenLoading = false
            window.history.go(-1)
          }
        })
      }
    },
  }
}
function status (data) {
  if (data === 0) return '不合格'
  if (data === 1) return '合格'
}
function status2 (data) {
  if (data === '不合格') return 0
  if (data === '合格') return 1
  return data
}
</script>

<style scoped>
.test {
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
    margin: 4% 0 50% 40%;
    display: flex;
    justify-content: space-between;
}
.input {
    display: block;
}
</style>
