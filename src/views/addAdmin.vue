<template>
  <div class="addAdmin">
    <h3>{{name}}小区</h3>
    <div class="tianjia">
      <div class="input">
        <el-form :model="ruleForm" ref="ruleForm" label-width="130px" :rules="rules" class="demo-ruleForm" size='small' >
          <div id="fenkai">
            <el-form-item label="小区名称：" prop="namec">
              <el-input v-model="ruleForm.namec"></el-input>
            </el-form-item>
            <el-form-item label="所在地区：" prop="region">
              <el-cascader  :options="options" v-model="ruleForm.region" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址：" prop="site">
              <el-input v-model="ruleForm.site"></el-input>
            </el-form-item>
            <el-form-item label="客服电话：" prop="serviceTel">
              <el-input v-model="ruleForm.serviceTel" @blur="blur"></el-input>
            </el-form-item>
            <el-form-item label="负责人：" prop="principal">
              <el-input v-model="ruleForm.principal"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话：" prop="principalNumber">
              <el-input v-model="ruleForm.principalNumber" @blur="blur"></el-input>
            </el-form-item>
            <el-form-item label="楼宇数量" >
              <el-input v-model="ruleForm.building" @blur="isStudentNo" :disabled="edit"></el-input>
            </el-form-item>
          </div>
          <div id="fenkai1">
            <el-form-item label="占地面积：">
              <el-input v-model="ruleForm.totalArea">
                  <template slot="append">平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="建筑面积：">
              <el-input v-model="ruleForm.overallFloorage">
                  <template slot="append">平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="公共区域面积：">
              <el-input v-model="ruleForm.publicArea">
                  <template slot="append">平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="绿化面积：">
              <el-input v-model="ruleForm.greenArea">
                  <template slot="append">平方米</template>
              </el-input>
            </el-form-item>
            
            <el-form-item label="设计车位面积：">
              <el-input v-model="ruleForm.parkingArea">
                  <template slot="append">平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="车库数：" >
              <el-input @blur="isStudentNo" v-model="ruleForm.garage">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
            <el-form-item label="车位数：">
              <el-input @blur="isStudentNo" v-model="ruleForm.stall">
                  <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </div>
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
  name: 'addAdmin',
  data () {
    return{
      name:'',
      // ww:false,
      edit:true,
      ruleForm: {
        namec:'',
        region:[],
        site:'',
        serviceTel:'',
        principal:'',
        principalNumber:'',
        building:'',
        totalArea:'',
        overallFloorage:'',
        publicArea:'',
        greenArea:'',
        parkingArea:'',
        garage:'',
        stall:'',

      },
      rules: {
        namec: [
          { required: true, message: '请输入小区名称', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        principalNumber: [
          { required: true, message: '请输入负责人电话', trigger: 'blur' }
        ],
        site: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        serviceTel: [
          { required: true, message: '请输入客服电话', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ]
      },
      options: [],
    }
  },
  mounted () {
    this.$ajax.get(url + 'china/selectArea').then(res => {
      this.options = res.data.data
    })
    this.id = this.$route.query.id
    if (this.$route.query.msg === "tianjia") {
      this.ruleForm = {}
      this.edit = false
    } else if (this.$route.query.msg === "bianji") {
      this.edit = true
      // GET /precinct/flndById/{id}/{page}/{pageSize
      this.$ajax.get(url+ 'precinct/flndById/' + this.$route.query.id).then(res => {
        if(res.data.status === 200){
          this.ruleForm = res.data.data
          this.ruleForm.region = res.data.data.region.split(',').map(Number)
          this.ruleForm.garage=res.data.data.garage;
          this.ruleForm.stall=res.data.data.stall;
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
    handleChange () {},
    goBack () {
      window.history.back()
    },
    open2() {
        this.$message({
          message: '成功',
          type: 'success'
        });
      },
      blur (e) {
      var reg = /^1[3|4|5|8][0-9]\d{4,8}$/
      var isMob= /^([0-9]{3,4}-)?[0-9]{7,8}$/
      if (isMob.test(e.target.value)||reg.test(e.target.value)) {
        e.target.style.borderColor = '#67c23a'
      // }else if(e.target.value.length!==11){
      //     e.target.style.borderColor = 'red'
      //     this.$message({
      //     message: '请输入11位数字',
      //     type: 'error'
      //   })
      } else {
         e.target.style.borderColor = 'red'
        this.$message({
          message: '请输入正确的号码格式',
          type: 'error'
        })
      }
    },
    save(){
      var precinctVO = {
        'namec':this.ruleForm.namec, 
        'region':this.ruleForm.region[0]+','+this.ruleForm.region[1]+','+this.ruleForm.region[2], 
        'site':this.ruleForm.site, 
        'serviceTel':this.ruleForm.serviceTel, 
        'principal':this.ruleForm.principal, 
        'principalNumber':this.ruleForm.principalNumber, 
        'building':this.ruleForm.building, 
        'totalArea':this.ruleForm.totalArea, 
        'overallFloorage':this.ruleForm.overallFloorage, 
        'publicArea':this.ruleForm.publicArea, 
        'greenArea':this.ruleForm.greenArea, 
        'parkingArea':this.ruleForm.parkingArea, 
        'garage':this.ruleForm.garage, 
        'stall':this.ruleForm.stall, 
      }
      if (this.$route.query.msg === "tianjia") {
        this.$ajax.post(url + 'precinct/insertPrecinct',precinctVO).then(res => {
          if (res.data.status === 200) {
            this.open2()
            window.history.go(-1)
          }else if(res.data.status===403){
            this.$message({
                message: '权限不足',
                type: 'error'
            })
          }else{
            this.$message.error(res.data.msg);
          }
        })
      } else if (this.$route.query.msg === "bianji") {
        // PUT /precinct/updatePrecinct
        precinctVO.id = this.$route.query.id
        this.$ajax.put(url + 'precinct/updatePrecinct', precinctVO).then(res => {
          if (res.data.status === 200) {
            // this.fullscreenLoading = false
            this.open2()
            window.history.go(-1)
          }else if(res.data.status===403){
            this.$message({
                message: '权限不足',
                type: 'error'
            })
          }else{
            this.$message.error('编辑失败');
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.addAdmin {
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
    width: 40%;
    margin-right: 10%;
}
#fenkai1 {
    display: inline-block;
    width: 40%;
}
</style>
