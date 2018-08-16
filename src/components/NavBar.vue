<template>
	<aside>
		<div class="nav"></div>
		<ul class="asideList">
			<li><router-link to="/helloWorld"><img src=".././assets/shouye.png">个人首页</router-link></li>
			<li><router-link to="/Department"><img src=".././assets/jichu.png">基础信息</router-link></li>
			<li><router-link to="/house"><img src=".././assets/kehu.png">房产管理</router-link></li>
			<li><router-link to="/relationship"><img src=".././assets/hetong.png">客户关系</router-link></li>
			<li><router-link to="/rent"><img src=".././assets/zulin.png">租赁管理</router-link></li>
			<li><router-link to="/support"><img src=".././assets/xitong.png">决策支持</router-link></li>
			<li><router-link to="/charge"><img src=".././assets/renshi.png">收费管理</router-link></li>
			<li><router-link to="/parking"><img src=".././assets/tingche.png">停车管理</router-link></li>
			<li><router-link to=""><img src=".././assets/gongzhonghao.png">微信公众号</router-link></li>
		</ul>
	</aside>
</template>

<script>
export default {
	data(){
		return{
		}
	},
	methods: {
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
		width: 11.7%;
		z-index: 1;
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
	}

	img {
		margin-right: 16px;
	}

	a {
		color: white;
        display: inline-block;
        width: 100%;
        padding: 20px 0;
		font-size: 0.8vw
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
}

ul{
	padding: 0;
}
</style>
