<template>
  <div class="navHeader">
    <div class="search">
      <span>当前物业:</span>
      <select class="sec">
        <option>卢比克摩方</option>
      </select>

      <div class="sousuo">
        <!--搜索-->
        <form action="" method="post" style="display:inline-block;"></form>
        <img :src="photo">
        <!-- <span class="demonstration"></span> -->
        <el-dropdown>
          <span class="el-dropdown-link">
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <span @click="change"><el-dropdown-item>修改密码</el-dropdown-item></span>
            <span @click="signOut"><el-dropdown-item>{{this.status}}</el-dropdown-item></span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="450px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录密码:" prop="oldPwd">
            <el-input v-model="ruleForm.oldPwd" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <div class="fenye1">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
          </div>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { removeCookie, delCookie, getCookie } from '../assets/js/cookie.js'
import url from '../assets/Req.js'
export default {
  name: 'NavHeader',
  data () {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateOldpwd = (rule, value, callback) =>{
        if (value === '') {
          callback(new Error('请输入登录密码'));
        } else if (value !== sessionStorage.getItem('pwd')) {
          callback(new Error('登录密码错误'))
        } else {
          callback();
        }
      }
    return {
      name: '请登录',
      status: '登出',
      photo: 'static/yonghu.png',
      dialogVisible: false,
      ruleForm: {
        oldPwd: '',
        pass: '',
        checkPass: '',
        id: ''
      },
      rules: {
        oldPwd: [
          { required: true,validator: validateOldpwd, trigger: 'blur' },
        ],
        pass: [
          { required: true,validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true,validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
	mounted(){
    this.findUser()
    // if(!sessionStorage.getItem("userId")){
    // this.$router.push('/login')
    // }else{}
  },
	methods: {
    findUser () {
      this.$ajax.get(url + 'user/indexFindById',{
      params: {
          token: sessionStorage.getItem("userId")
      }
    }).then(res => {
      if(res.data.status === 200){
        sessionStorage.setItem('phone',res.data.data.phone)
        sessionStorage.setItem('rname', res.data.data.rname)
        this.name = res.data.data.username
        this.ruleForm.id = res.data.data.id
        if (res.data.data.photo) {
          this.photo = res.data.data.photo
        }
      }else{
        // this.status = '请登录'
        // this.$router.push('/login')
      }
    })
    },
    signOut () {
      this.$ajax.post(url+'login/logout').then(res =>{
      })
      sessionStorage.clear()
      removeCookie('phone', '/login')
      delCookie('phone')
      delCookie('pwd')
      this.$router.push('/login')
      // window.history.go(0)
    },
    change () {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.post(url + 'user/indexUpdate/'+this.ruleForm.id+'/'+this.ruleForm.pass).then(res => {
            if (res.data.status === 200){
              this.$message({
                message:'修改成功',
                type:'success'
              })
              this.dialogVisible = false
            } else {
              this.$message({
                message:'修改失败',
                type:'error'
              })
            }
          })
        } else {
          return false;
        }
      });
    },
	}
}
</script>

<style lang="less" scoped>
.el-dropdown {
  cursor: pointer;
}
.navHeader {
  width: 100%;
  height: 3.17%;
  background-color: white;
}

.sousuo {
  float: right;
}

.search {
  padding: 21px 34px;
}

img {
  border-radius: 50%;
  width: 2em;
  height: 2em;
  /* background-color: #2e3d50; */
  overflow: hidden;
}
input{
  background-image: url(.././assets/search.png);
  background-size: 1em;
  background-repeat:no-repeat;
  z-index: 99;
  background-position: 95% 50%;
  border: 1px solid #eeeeee;
  border-radius: 6px;
}
.sec {
  border-radius: 13px;
  width: 151px;
  border: 1px solid #32a8ee;
}
.fenye1 {
  width: 100%;
  text-align: right
}
</style>
