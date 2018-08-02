<template>
    	<div class="navHeader ">
				<div class="search">
					<span>当前物业</span>
					<select>
						<option>卢比克魔方</option>
					</select>

					<div class="sousuo">
						<!--搜索-->
						<form action="" method="post" style="display:inline-block;">
						</form>
						<el-dropdown>
							<span class="el-dropdown-link">
								<img src=".././assets/yonghu.png"><i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<span @click="quit"><el-dropdown-item>退出登录</el-dropdown-item></span>
							</el-dropdown-menu>
						</el-dropdown>
						
						<span>{{name}}</span>
					</div>
				</div>
			</div>
</template>

<script>
import {delCookie} from '.././assets/js/cookie.js'
export default {
	props:{
		name:''
	},
	data() {
		return{
		}
	},
	mounted(){
		// let uname = getCookie('phone')
		// 	// this.$ajax.get( url + '/user/findById',{
		// 	// 	params:{
		// 	// 			'token': sessionStorage.getItem('userId'),
		// 	// 		}
		// 	// }).then(res => {
		// 	// 	console.log(res.data)
		// 	// })
        //     this.username = uname
        //     /*如果cookie不存在，则跳转到登录页*/
        //     if(uname == ""){
        //         this.$router.push('/')
        //     }
	},
	
	methods: {
		quit(){
			this.$emit('login_out');
		}
	}
}
</script>

<style scoped>
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
</style>
