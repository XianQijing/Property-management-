<template>
<!--车位管理-添加车位-->
  <div class="addCar">
    <h3>{{this.name}}车位</h3>
    <div class="tianjia">
      <div class="input">
        <el-form :model="carForm" :rules="rules" ref="carForm" label-width="130px" class="demo-carForm">
          <el-form-item label="小区" prop="precinct">
            <el-select v-model="carForm.precinct" placeholder="请选择小区">
              <el-option v-for="(data, index) in list" :key="index" :label="data.namec" :value="data.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车位号" prop="carSeatNumber">
            <el-input v-model="carForm.carSeatNumber" placeholder="请输入车位号"></el-input>
          </el-form-item>
          <el-form-item label="面积" prop="parkingArea">
            <el-input v-model="carForm.parkingArea">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="车位类型" prop="parkingType">
            <el-input v-model="carForm.parkingType" placeholder="请输入车位类型"></el-input>
          </el-form-item>
          <el-form-item label="车位状态" prop="parkingState">
            <el-input v-model="carForm.parkingState" placeholder="请输入车位状态"></el-input>
          </el-form-item>
          <el-form-item label="车位标签" prop="garage">
            <el-input v-model="carForm.garage" placeholder="请输入车位标签"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
            <el-input v-model="carForm.comment" placeholder="请输入备注"></el-input>
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
  name: 'addCar',
  data () {
    return {
      name:'',
      carForm: {
        precinct:'',
        carSeatNumber: '',
        parkingArea:'',
        parkingType: '',
        parkingState: '',
        garage: '',
        comment: ''
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
      list: []
    }
  },
  mounted () {
    this.$ajax.get(url + 'precinct/selectPrecinct/1/10').then(res => {
      this.list = res.data.data.rows
    })
    if (this.$route.query.id !== "ww") {
      this.id = this.$route.query.id
      this.name = "编辑"
      this.$ajax.get(url + 'cellparkingRelatinship/selectById/' + this.id).then(res => {
        // console.log(res.data.data)
        this.carForm = res.data.data
      })
    } else if(this.$route.query.id === "ww"){
      this.name = "添加"
    }
  },
  methods: {
    save () {
      // 所属小区 precinct
      // 车位号 carSeatNumber
      // 面积 parkingArea
      // 车位类型 parkingType
      // 车位状态 parkingState
      // 车库 garage
      // 备注 comment
      if (this.carForm.precinct === '') {
        this.$message({ 
          message: '请选择小区',
          type: 'warning'
        })
      } else {
        let data = {
          'precinct': this.carForm.precinct,
          'carSeatNumber': this.carForm.carSeatNumber,
          'parkingArea': this.carForm.parkingArea,
          'parkingType': this.carForm.parkingType,
          'parkingState': this.carForm.parkingState,
          'garage': this.carForm.garage,
          'comment': this.carForm.comment
        }
        if (this.$route.query.id !== "ww") {
          data.id = this.$route.query.id
          this.$ajax.put(url + 'cellparkingRelatinship/updateCarport', data).then(res => {
            // console.log(res.data)
            if (res.data.status === 200) {
              this.fullscreenLoading = false
              window.history.go(-1)
            }
          })
        } else {
          this.$ajax.post(url + 'cellparkingRelatinship/insertCarport', data).then(res => {
            // console.log(res.data)
            if (res.data.status === 200) {
              // this.fullscreenLoading = false
              window.history.go(-1)
            }
          })
        }
      }
    },
    goBack () {
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
