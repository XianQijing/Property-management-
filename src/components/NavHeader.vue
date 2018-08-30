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
        <img :src="this.photo">
        <!-- <span class="demonstration"></span> -->
        <el-dropdown>
          <span class="el-dropdown-link">
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <span @click="signOut"><el-dropdown-item>{{this.status}}</el-dropdown-item></span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { removeCookie, delCookie, getCookie } from '../assets/js/cookie.js'
import url from '../assets/Req.js'
export default {
  name: 'NavHeader',
  data () {
    return {
      name: '请登录',
      status: '登出',
      photo: '../assets/yonghu.png'
    }
  },
	mounted(){
    this.$ajax.get(url + 'user/indexFindById',{
      params: {
          token: sessionStorage.getItem("userId")
      }
    }).then(res => {
      if(res.data.status === 200){
        this.name = res.data.data.username
        this.photo = res.data.data.photo
      }else{
        this.status = '请登录'
        this.$router.push('/login')
      }
    })
    if(!sessionStorage.getItem("userId")){
    this.$router.push('/login')
    }else{

    }
    //   this.$router.push('/')
    
  },
	methods: {
    signOut () {
      this.$ajax.post(url+'login/logout').then(res =>{
      })
      sessionStorage.clear()
      removeCookie('phone', '/login')
      delCookie('phone')
      delCookie('pwd')
      this.$router.push('/login')
      window.history.go(0)
    }
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
</style>
