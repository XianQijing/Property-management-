<template>
    <div class="index">
      <aside v-if="this.role">
        <div class="nav"><img src="@/assets/logo@3x.png"></div>
        <ul class="asideList">
          <li><router-link :to="{path:'/home'}"><img src=".././assets/shouye.png">个人首页</router-link></li>
          <li id="base" v-if="this.role.indexOf('rubik:baseInfo:list')!==-1"><router-link :to="{path:'/Department'}"><img src=".././assets/jichu.png">基础信息</router-link></li>
          <li id="house" v-if="this.role.indexOf('rubik:house:list')!==-1"><router-link :to="{path:'/house'}"><img src=".././assets/kehu.png">房产管理</router-link></li>
          <li id="customer" v-if="this.role.indexOf('rubik:relationship:list')!==-1"><router-link :to="{path:'/relationship'}"><img src=".././assets/hetong.png">客户关系</router-link></li>
          <li id="rent" v-if="this.role.indexOf('rubik:rent:list')!==-1"><router-link :to="{path:'/rent'}"><img src=".././assets/zulin.png">租赁管理</router-link></li>
          <li id="support" v-if="this.role.indexOf('rubik:report:list')!==-1"><router-link :to="{path:'/support'}"><img src=".././assets/xitong.png">决策支持</router-link></li>
          <li id="charge" v-if="this.role.indexOf('rubik:income:list')!==-1"><router-link :to="{path:'/charge'}"><img src=".././assets/renshi.png">收费管理</router-link></li>
          <li id="parking" v-if="this.role.indexOf('rubik:park:list')!==-1"><router-link :to="{path:'/parking'}"><img src=".././assets/tingche.png">停车管理</router-link></li>
          <li id="system" v-if="this.role.indexOf('rubik:system:list')!==-1"><router-link :to="{path:'/system'}"><img src=".././assets/system.png">系统管理</router-link></li>
        </ul>
      </aside>
			<div class="container">
			<nav-header ref="mychild"></nav-header>
      <router-view @ee="cc"/>
			</div>
    </div>
</template>
<script>
import NavHeader from '.././components/NavHeader.vue'
import url from '../assets/Req.js'
export default {
    name: 'index',
    data(){
      return{
        role:[]
      }
		},
		components:{
        NavHeader
    },
    mounted(){
      this.$ajax.get(url + 'role/findPermission').then(res => {
				res.data.data.forEach(v => {
					this.role.push(v.permission)
					// console.log(res.data.data)
				})
			})
    },
    methods:{
			cc () {
				this.$refs.mychild.findUser()
			}
    }
}
</script>
<style scoped>
aside {
	background-color: #2e3d50;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 4;
	min-width: 150px;
	width: 11.7%;
}

	aside li {
	height: 70px;
	list-style-type: none;
	color: white;
	width: 100%;
	text-align: center;
}

.nav {
	height: 11%;
	display:flex;
	align-items:center;
	justify-content: center;
}

.asideList img {
	margin-right: 16px;
}

a {
	color: white;
	display: inline-block;
	width: 100%;
	padding: 20px 0;
	font-size: 0.8vw;
	opacity: 0.41;
	text-decoration: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.select {
	background-color: aliceblue;
}
.router-link-active {
	background-color: #202F41;
	border-left: 6.68px solid #32A8EE;
	opacity: 1;
}

ul{
	padding: 0;
}
.nav img{
	display: inline-block;
	vertical-align: middle;
	width: 100%;
	max-width: 143px;
}
.index {
	height: 100%;
}
.container {
	width: 88%;
	position: relative;
	left: 6%;
	background-color: #eeeeee;
	padding: 0
}
a:hover {
	background-color: #202F41;
	opacity: 1;
	color: white;
	/* border-left: 6.68px solid #32A8EE; */
}
@media (min-width: 576px){
	.container {
			max-width: 88%;
	}
}
@media (min-width: 992px) {
	.container {
			max-width: 88%;
	}
}
@media (min-width: 768) {
	.container {
			max-width: 88%;
	}
}
</style>


