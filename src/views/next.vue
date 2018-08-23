<template>
<!--房间-添加房间-->
  <div class="next">
    <h3>{{this.name}}房间</h3>
    <div class="tianjia">
      <div class="input">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
          <el-form-item label="活动区域:" prop="buildings">
            <!-- <el-select v-model="ruleForm.buildings" placeholder="请选择活动区域" @change="buildingChange"> -->
              <el-cascader
                expand-trigger="hover"
                :options="options"
                v-model="ruleForm.buildings"
                @change="buildingChange">
              </el-cascader>
              <!-- <el-option v-for="(data, index) in buildingList" :key="index" :label="data.namec" :value="data.id"></el-option> -->
            <!-- </el-select> -->
          </el-form-item>
          <el-form-item label="所在楼层:" prop="floor">
            <el-select v-model="ruleForm.floor" placeholder="请输入所在楼层">
              <el-option v-for="(data, index) in buildingListlist" :key="index" :label="data.floorNumber" :value="data.floorNumber"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房号:" prop="roomNumber">
            <el-input v-model="ruleForm.roomNumber" placeholder="请输入房号"></el-input>
          </el-form-item>
          <el-form-item label="建筑面积:" prop="coveredArea">
            <el-input v-model="ruleForm.coveredArea" placeholder="请输入建筑面积" @blur="blur">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="套内面积:" prop="usableArea">
            <el-input v-model="ruleForm.usableArea" placeholder="请输入套内面积" @blur="blur">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="公摊面积:" prop="gardenArea">
            <el-input v-model="ruleForm.gardenArea" placeholder="请输入公摊面积" @blur="blur">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="房屋类型:" prop="useId">
            <el-input v-model="ruleForm.useId" placeholder="请输入房屋类型"></el-input>
          </el-form-item>
          <el-form-item label="房屋标签:" prop="codes">
            <el-input v-model="ruleForm.codes" placeholder="请输入房屋标签"></el-input>
          </el-form-item>
          <el-form-item label="房屋户型:" prop="roomType">
            <el-input v-model="ruleForm.roomType">
              <!-- <template slot="append">室</template> -->
            </el-input>
            <!-- <el-input v-model="ruleForm.roomType.ting" style="width:32%">
              <template slot="append">厅</template>
            </el-input>
            <el-input v-model="ruleForm.roomType.wei" style="width:32%">
              <template slot="append">卫</template>
            </el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="comment">
            <el-input v-model="ruleForm.comment"></el-input> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="nn">
        <button class="nextStep" @click="save">保存</button><button class="cancel" @click="goBack">取消</button>
      </div>
    </div>
    <!--下一步-->
    <!-- <div v-show="show2" class="tianjia">
      <div class="input">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
          <el-form-item label="房间朝向:" prop="houseDirection">
            <el-input v-model="ruleForm.houseDirection" placeholder="请输入房屋类型"></el-input>
          </el-form-item>
          <el-form-item label="交房时间:" prop="time">
            <el-date-picker v-model="ruleForm.time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="产权年限:" prop="houseYear">
            <el-input v-model="ruleForm.houseYear" placeholder="请输入房屋类型">
                <template slot="append">年</template>
            </el-input>
          </el-form-item>
          <el-form-item label="附件:" prop="Enclosure">
            <div style="margin-left:20px">
              <span>最多可上传5张组片,且图片大小不超过2M.</span>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </el-form-item>
          <el-form-item label="备注:" prop="remarks">
            <el-input v-model="ruleForm.remarks" placeholder="请输入房屋类型"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="nn">
        <button class="nextStep">保存</button><button class="cancel" @click="show1 = true,show2 =false">返回</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import url from '../assets/Req.js'
export default {
  data(){
    return{
      show1:true,
      show2:false,
      name:'',
      ruleForm: {
        buildings: [],
        building:'',
        floor: '',
        roomNumber: '',
        coveredArea: '',
        usableArea: '',
        gardenArea: '',
        useId: '',
        codes: '',
        roomType: '',
        // comment:''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        buildings: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        floor: [
          { required: true, message: '请输入所在楼层', trigger: 'change' }
        ],
        roomNumber: [
          { required: true, message: '请输入房号', trigger: 'blur' }
        ],
        coveredArea: [
          { required: true, message: '请输入建筑面积', trigger: 'blur' }
        ]
      },
      options: [],
      buildingListlist: [],
    }
  },
  mounted(){
    
    this.$ajax.get(url + 'room/flndByBuilding/aaa').then(res => {
      this.options = res.data
    })
    if (this.$route.query.id !== "qq") {
      this.name = "编辑"
      this.id = this.$route.query.id
      this.name = "编辑"
      // GET /room/flndById/{id}
      this.$ajax.get(url + 'room/flndById/' + this.id).then(res => {
        if(res.data.status === 200){
            this.ruleForm.buildings= [res.data.data.precinct,res.data.data.buildings],
            this.buildingChange()
            this.ruleForm.floor= res.data.data.floor,
            this.ruleForm.roomNumber= res.data.data.roomNumber,
            this.ruleForm.coveredArea= res.data.data.coveredArea,
            this.ruleForm.usableArea= res.data.data.usableArea,
            this.ruleForm.gardenArea= res.data.data.gardenArea,
            this.ruleForm.useId= res.data.data.useId,
            this.ruleForm.codes= res.data.data.codes,
            this.ruleForm.roomType=res.data.data.roomType
            // this.ruleForm.roomTypeting=toLowerCase(res.data.data.roomType.split('室')[1].split('厅')[0]),
            // this.ruleForm.roomTypewei=toLowerCase(res.data.data.roomType.split('室')[1].split('厅')[1].split('卫')[0])
            // this.ruleForm.comment= res.data.data.comment
        }else if(res.data.status===403){
          this.$alert('您的权限不足', '权限不足', {
          confirmButtonText: '确定',
          callback: action => {
            this.goBack()
          }
        });
        }
      })
    } else if(this.$route.query.id === "qq"){
      this.name = "添加"
    }
    
  },
  methods:{
    buildingChange () {
      var building = this.ruleForm.buildings[1]
      this.$ajax.get(url + 'building/selectByBuilding/' + building).then(res => {
        this.buildingListlist = res.data.data
        this.ruleForm.building = this.ruleForm.buildings.join(',')
      })
    },
    // 判断输入是否为数字
    blur (e) {
      var reg = /^\+?[1-9][0-9]*$/
      if (!reg.test(e.target.value)) {
        e.target.style.borderColor = 'red'
        this.$message({
          message: '请输入数字',
          type: 'error'
        })
      } else {
        e.target.style.borderColor = '#67c23a'
      }
    },
    save () {
      // 楼宇编号 building
      // 楼层 floor 0
      // 房号 roomNumber
      // 建筑面积 coveredArea 0
      // 套内面积 usableArea 0
      // 公摊面积 gardenArea 0
      // 房屋类型 useId
      // 房屋标签 codes
      // 房屋户型 roomType
      if (this.ruleForm.buildings === '') {
        this.$message({
          message: '活动区域不能为空',
          type: 'error'
        })
      } else if (this.ruleForm.floor === '') {
        this.$message({
          message: '所在楼层不能为空',
          type: 'error'
        })
      } else if (this.ruleForm.roomNumber === '') {
        this.$message({
          message: '房号不能为空',
          type: 'error'
        })
      } else if (this.ruleForm.coveredArea === '') {
        this.$message({
          message: '建筑面积不能为空',
          type: 'error'
        })
      } else {
        let data = {
          'buildings': this.ruleForm.building,
          'floor': this.ruleForm.floor,
          'roomNumber': this.ruleForm.roomNumber,
          'coveredArea': this.ruleForm.coveredArea,
          'usableArea': this.ruleForm.usableArea,
          'gardenArea': this.ruleForm.gardenArea,
          'useId': this.ruleForm.useId,
          'codes': this.ruleForm.codes,
          'roomType': this.ruleForm.roomType,
          // 'comment': this.ruleForm.comment
        }
        if (this.$route.query.id !== "qq") {
          // PUT /room/update/{id
          data.id = this.$route.query.id
          this.$ajax.put(url + 'room/update/' + this.$route.query.id, data).then(res => {
            if (res.data.status === 200) {
              this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              this.$router.push('/house')
            }else if(res.data.status===403){
              this.$message({
                message:'权限不足',
                type: 'error'
              })
            }else{
              this.$message({
                message:'修改失败',
                type:'error'
              })
            }
          })
        } else {
          this.$ajax.post(url + 'room/addRoom', data).then(res => {
            if (res.data.status === 200) {
              this.$message({
                message:'添加成功',
                type:'success'
              })
              this.$router.push('/house')
            }else if(res.data.status===403){
              this.$message({
                message:'权限不足',
                type: 'error'
              })
            }else{
              this.$message({
                message:'添加失败',
                type:'error'
              })
            }
          })
        }
      }
    },
    goBack(){
      window.history.back()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
    }
  }
}
function toUpperCase (data) {
  if (data === '1') return '一'
  if (data === '2') return '二'
  if (data === '3') return '三'
  if (data === '4') return '四'
  if (data === '5') return '五'
  if (data === '6') return '六'
  if (data === '7') return '七'
  if (data === '8') return '八'
  if (data === '9') return '九'
  if (data === '10') return '十'
  return data
}
function toLowerCase (data) {
  if (data === '一') return '1'
  if (data === '二') return '2'
  if (data === '三') return '3'
  if (data === '四') return '4'
  if (data === '五') return '5'
  if (data === '六') return '6'
  if (data === '七') return '7'
  if (data === '八') return '8'
  if (data === '九') return '9'
  if (data === '十') return '10'
  return data
}
</script>

<style scoped>
.next {
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
    margin: 2% 0 0 24%;
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
    height: 500px;
}
.el-icon-date:before {
    margin-left: 20px;
}
</style>
