<template>
  <!--房源管理-添加-->
  <div class="rent_addhouse">
    <h3>{{this.name}}房源</h3>
    <div class="tianjia" v-show="show1">
      <div class="input">
        <el-form :model="addCustomer" :rules='rules' ref="addCustomer" label-width="130px" class="demo-addCustomer">
          <el-form-item label="房屋类型：" prop="roomType">
            <el-input v-model="addCustomer.roomType" placeholder="请输入房屋类型"></el-input>
          </el-form-item>

          <el-form-item label="楼宇：" prop="buildings">
            <!-- <el-select v-model="addCustomer.buildings" placeholder="请选择楼宇">
              <el-option :label="item.namec" :value="item.id" v-for="item in builds" :key="item.id"></el-option>
            </el-select> -->
            <el-cascader
                expand-trigger="hover"
                :options="builds"
                v-model="addCustomer.buildings"
                @change="buildingChange">
              </el-cascader>
          </el-form-item>

          <el-form-item label="房号：" prop="roomNumber">
            <el-input v-model="addCustomer.roomNumber" placeholder="请输入房号"></el-input>
          </el-form-item>

          <el-form-item label="建筑面积：" prop="coveredArea">
            <el-input v-model="addCustomer.coveredArea" placeholder="请输入建筑面积"></el-input>
          </el-form-item>

          <el-form-item label="定价：" prop="pricing">
            <el-input v-model="addCustomer.pricing" placeholder="请输入定价">
              <template slot="append">元/月</template>
            </el-input>
          </el-form-item>

          <el-form-item label="租用状态：" prop="renting">
            <el-select v-model="addCustomer.renting" placeholder="请选择房屋类型" :disabled="disabled">
              <el-option label="可租" value="0"></el-option>
              <el-option label="已租" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="预定状态：" prop="reserve">
            <el-select v-model="addCustomer.reserve" placeholder="请选择房屋类型" :disabled="disabled">
              <el-option label="未预定" value="0"></el-option>
              <el-option label="已预定" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="nn">
        <button class="nextStep" @click="save">保存</button><button class="cancel" @click="goBack">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import url from '../assets/Req.js'
export default {
  name:'rent_addhouse',
  data(){
    return{
      name:'添加',
      show1:true,
      show2:false,
      //数据
      addCustomer: {
        roomType:'',
        buildings: [],
        roomNumber:1,
        coveredArea: 1,
        pricing: '',
        renting: 1,
        reserve: 1,
        id:1,
        precinct:1,
        buildingsString: ''
      },
      builds: [],
      disabled:false,
      rules:{
        buildings: [
          { required: true, message: '请选择楼宇', trigger: 'change'}
        ],
        roomNumber: [
          { required: true, message: '请输入房号', trigger: 'blur'}
        ]
      }
    }
  },
  mounted(){
    this.$ajax.get(url + 'room/flndByBuilding/aaa').then(res => {
      this.builds = res.data
    })
    if (this.$route.query.msg == "tianjia") {
      this.name = '添加',
      this.addCustomer = {}
      // this.$ajax.get(url + 'building/flndAll/1/999').then(res => {
      //   this.builds=res.data.data.rows
      //   goBack()
      // })
    } else {
      this.name = '编辑'
      this.disabled = true
      this.id = this.$route.query.id
      this.$ajax.get(url + 'housingResource/flndHById/' + this.id).then(res => {
        if(res.data.status===200){
        this.addCustomer.buildings = res.data.data.bid.split(',')
        this.addCustomer.buildingsString = res.data.data.bid
        this.addCustomer.roomType = res.data.data.roomType
        this.addCustomer.roomNumber = res.data.data.roomNumber
        this.addCustomer.coveredArea = res.data.data.coveredArea
        this.addCustomer.pricing = res.data.data.pricing
        this.addCustomer.renting = res.data.data.renting.toString()
        this.addCustomer.reserve = res.data.data.reserve.toString()
        }else if(res.data.status===403){
          this.$alert('您的权限不足', '权限不足', {
              confirmButtonText: '确定',
              callback: action => {
                  this.goBack()
              }
          });
        }
      })
    }
    
  },
  methods: {
    buildingChange(){
      this.addCustomer.buildingsString = this.addCustomer.buildings.join(',')
    },
    isStudentNo(e) {
      var reg=/^\d+$/;   /*定义验证表达式*/
      if(!reg.test(e.target.value)){
        e.target.style.borderColor = 'red'
        this.$message({
          message: '请输入数字',
          type: 'error'
        })
      }else{
        e.target.style.borderColor = '#67c23a'
      }    /*进行验证*/
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    handleRemove (file, fileList) {
    },
    handlePreview (file) {
    },
    save () {
      if(this.$route.query.msg === "tianjia"){
        var housingResourceVO = {}
        housingResourceVO.buildings = this.addCustomer.buildingsString
        housingResourceVO.coveredArea = this.addCustomer.coveredArea,
        housingResourceVO.precinct = this.addCustomer.precinct,
        housingResourceVO.pricing = this.addCustomer.pricing,
        housingResourceVO.renting = this.addCustomer.renting,
        housingResourceVO.reserve = this.addCustomer.reserve,
        housingResourceVO.roomNumber = this.addCustomer.roomNumber,
        housingResourceVO.roomType = this.addCustomer.roomType
          
        // housingResourceVO= this.addCustomer
        this.$ajax.post(url + 'housingResource/insertRoom', housingResourceVO).then(res => {
          if(res.data.status === 200){
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.push('/rent')
          }else if(res.data.status===403){
            this.$message({
                message:'权限不足',
                type: 'error'
            })
          }
        })
      }else{
        var housingResourceVO = {}
        housingResourceVO.buildings = this.addCustomer.buildingsString
        housingResourceVO.coveredArea = this.addCustomer.coveredArea,
        housingResourceVO.precinct = this.addCustomer.precinct,
        housingResourceVO.pricing = this.addCustomer.pricing,
        housingResourceVO.renting = this.addCustomer.renting,
        housingResourceVO.reserve = this.addCustomer.reserve,
        housingResourceVO.roomNumber = this.addCustomer.roomNumber,
        housingResourceVO.roomType = this.addCustomer.roomType
         housingResourceVO.id = this.id
          
        // housingResourceVO= this.addCustomer
        this.$ajax.put(url + 'housingResource/updateRooms', housingResourceVO).then(res => {
          if(res.data.status === 200){
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.$router.push('/rent')
          }else if(res.data.status===403){
            this.$message({
                message:'权限不足',
                type: 'error'
            })
          }
        })
      }
    },
    goBack () {
      window.history.back()
    },
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-2);
    },
    // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
    },
    // 上传错误
    uploadError (response, file, fileList) {
    },
  }
}
</script>

<style scoped>
.rent_addhouse {
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
    margin: 0 0 0 24%;
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
    height: 500px;
}
.el-icon-date:before {
    margin-left: 20px;
}
.el-upload__input {
    display: none!important;
}
.el-input__inner {
  height: 32px;
}
</style>
