<template>
  <div class="addBuild">
    <h3>{{this.name}}楼宇</h3>
    <div class="tianjia">
      <div class="input">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
          <el-form-item label="所属小区" prop="region">
            <el-select v-model="ruleForm.precinct" placeholder="请选择活动区域">
              <el-option v-for="(items, index) in rows" :key="index" :value="items.id" :label="items.namec"></el-option>
              <!-- <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="楼宇名称" prop="roomnumber">
            <el-input v-model="ruleForm.namec" placeholder="请输入楼宇名称"></el-input>
            <!-- <el-input v-model="ruleForm.roomnumber" placeholder="请输入楼宇名称" :value="ruleForm.input"></el-input> -->
          </el-form-item>
          <el-form-item label="房间数量" prop="buildArea">
            <el-input v-model="ruleForm.room" placeholder="请输入单元数量" @blur="blur"></el-input>
          </el-form-item>
          <el-form-item label="楼宇层数" prop="roomArea">
            <el-input v-model="ruleForm.layer" placeholder="请输入楼宇层数" @blur="blur"></el-input>
          </el-form-item>
          <el-form-item label="楼宇类型" prop="publicArea">
            <el-input v-model="ruleForm.buildingType" placeholder="请输入楼宇类型"></el-input>
          </el-form-item>
          <el-form-item label="楼宇结构" prop="roomType">
            <el-input v-model="ruleForm.flatFabric" placeholder="请输入楼宇结构"></el-input>
          </el-form-item>
          <el-form-item label="楼宇朝向" prop="roomLabel">
            <el-input v-model="ruleForm.buildingTowards" placeholder="请输入楼宇朝向"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="houseType">
            <el-input v-model="ruleForm.comment" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="nn">
        <button class="nextStep" @click="save" v-loading.fullscreen.lock="fullscreenLoading">保存</button><button class="cancel" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import url from '../assets/Req.js'

export default {
  name: 'addBuild',
  data () {
    return {
      name:'添加',
      ruleForm: {
        reprecinctgion: '',
        namec: '',
        room:'',
        layer: '',
        buildingType:'',
        flatFabric: '',
        buildingTowards: '',
        comment: '',
        input:[]
      },
      rules: {
        name: [
          { required: true, message: '请输入所在楼层', trigger: 'blur' },
        ],
        precinct: [
          { required: true, message: '请选择小区/楼宇/单元', trigger: 'change' }
        ],
        namec: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' }
        ],
        room: [
          { required: true, message: '请输入楼宇层数', trigger: 'blur' }
        ],
        layer: [
          { required: true, message: '请输入单元数量', trigger: 'blur' }
        ]
      },
      fullscreenLoading: false,
      rows: []
    }
  },
  mounted () {
    // 获取所属小区下拉框
    this.$ajax.get(url + 'precinct/selectPrecinct/1/10').then(res => {
      // console.log(res.data.data.rows)
      this.rows = res.data.data.rows
    })
    this.edit()
  },
  methods: {
    // 编辑楼宇
    edit () {
      // console.log(this.$route.query)
      if (this.$route.query.id) {
        this.name = '编辑'
        // console.log(this.$route.query.id)
        this.id = this.$route.query.id
        this.$ajax.get(url + 'building/flndById/' + this.id).then(res => {
          console.log(res.data.data)
          this.ruleForm = {
            'precinct': res.data.data.precinct,
            'namec': res.data.data.namec,
            'room': res.data.data.rooms,
            'layer': res.data.data.layer,
            'buildingType': res.data.data.buildingType,
            'flatFabric': res.data.data.flatFabric,
            'buildingTowards': res.data.data.buildingTowards,
            'comment': res.data.data.comment,
          }
        })
      }
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
    goBack () {
      window.history.back()
    },
    // 保存按钮
    save () {
      // console.log(this.ruleForm)
      if (this.ruleForm.precinct === '') {
        this.$message({
          message: '楼宇名称不能为空',
          type: 'warning'
        })
      } else if (this.ruleForm.namec === '') {
        this.$message({
          message: '单元数量不能为空',
          type: 'warning'
        })
      } else if (this.ruleForm.room === '') {
        this.$message({
          message: '楼宇层数不能为空',
          type: 'warning'
        })
      } else if (this.ruleForm.layer === '') {
        this.$message({
          message: '楼宇类型不能为空',
          type: 'warning'
        })
      } else {
        let data = {
          'precinct': this.ruleForm.precinct,
          'namec': this.ruleForm.namec,
          'room': this.ruleForm.room,
          'layer': this.ruleForm.layer,
          'buildingType': this.ruleForm.buildingType,
          'flatFabric': this.ruleForm.flatFabric,
          'buildingTowards': this.ruleForm.buildingTowards,
          'comment': this.ruleForm.comment
        }
        let data2 = {
          'precinct': this.ruleForm.precinct,
          'namec': this.ruleForm.namec,
          'buildingType': this.ruleForm.buildingType,
          'flatFabric': this.ruleForm.flatFabric,
          'buildingTowards': this.ruleForm.buildingTowards,
          'comment': this.ruleForm.comment,
          'id': this.$route.query.id
        }
        // loading图标
        this.fullscreenLoading = true
        if (this.$route.query.id) {
          this.$ajax.post(url + 'building/updateBuilding/', data2).then(res => {
            // console.log(res.data)
            if (res.data.status === 200) {
              this.fullscreenLoading = false
              window.history.go(-1)
            }
          })
        } else {
          this.$ajax.post(url + 'building/addBuilding', data).then(res => {
            // console.log(res.data)
            if (res.data.status === 200) {
              this.fullscreenLoading = false
              window.history.go(-1)
            }
          })
        }
      }
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
