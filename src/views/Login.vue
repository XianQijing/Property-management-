<template>
	<div class="login container">
		<div class="row">
		<!--登录-->
		<div class="col-md-12">
			<div class="main">
			<div><h3 class="welcome">欢迎登录</h3><h4 class="mofang">摩方物业管理系统</h4></div>
			<form>
				<div class="input">
					<input type="text" placeholder="请输入手机号" id="ss" v-model="phone">
					<p v-show="showTishi" class="sh">{{tishi}}</p>
					<input type="password" placeholder="请输入密码" id="ww" v-model="password" @keyup.enter="sumbitLogin">
				</div>
				<div class="password">
					<span>
						<el-checkbox v-model="remember"><span class="yes">记住密码</span></el-checkbox>
						<!-- <input type="checkbox"  id="remember" v-model="remember" @keyup.enter.native="sumbitLogin()"> -->
					</span>
					<!-- <a link=""><span>忘记密码</span></a> -->
				</div>
			</form>
			<button type="sumbit" class="confirm" @click="sumbitLogin">登录</button>
		</div>
		</div>
	</div>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../assets/js/cookie.js'
	import url from '../assets/Req.js'
	import qs from 'qs';
	export default {
		data() {
			return {
				showTishi: false,
				phone: '',
				password: '',
				tishi: '',
				remember: false
			};
		},
		mounted() {
			/*页面挂载获取cookie，如果存在phone的cookie，则跳转到主页，不需登录*/
			if(getCookie('phone')) {
				// console.log('11123')
				// sessionStorage.setItem('userId',res.data.data.token)
				// this.$router.push('/helloWorld')
				this.phone = getCookie('phone')
				this.password = getCookie('pwd')
				this.sumbitLogin()
			}
		},
		methods: {
			//登录
			sumbitLogin() {
				var remember = document.getElementById('remember')
				var redirect = decodeURIComponent(this.$route.query.redirect || '/')
				if(this.phone == "" || this.password == "") {
					this.$message({
						message: '请输入用户名或密码',
						type: 'error'
					})
				} else {
					if (this.remember == true){
						setCookie('phone',this.phone,1000*60)
						setCookie('pwd',this.password,1000*60)//保存帐号到cookie，有效期7天
					}
					this.$ajax.post(url + 'login/login_in', qs.stringify({
							'phone': this.phone,
							'password': this.password,
							'remember': this.remember
						
					})).then((res) => {
						/*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
						if(res.data.status === 200) {
							this.tishi = "登录成功"
							this.showTishi = true
							// this.$router.push('/home')
							sessionStorage.setItem('userId',res.data.data.token)
							sessionStorage.setItem('pwd',this.password)
							this.$router.push({
								//  你需要接受路由的参数再跳转
								path: redirect
							})
						}else{
							this.tishi = res.data.data.msg;
							this.showTishi = true
		
						}
					})
				}
			},
			//注册
		}
	}
</script>
<style scoped>
	.login {
		background-image: url(../../static/background.png);
		background-size: 100%;
		background-repeat:no-repeat;
		z-index: 99999999;
		width: 100%;
		height: 100%;
	}
	
	.main {
		margin: 1% 40%;
        width: 20%;
	}
	.container {
    max-width: 1920px;
}
	.welcome {
		font-family: "Microsoft YaHei";
		color: rgb(255, 196, 76);
		font-weight: bold;
		line-height: 2;
		display: inline;
		font-size: 1.3vw;
	}
	
	.input input {
		display: block;
		margin: 11% 0 5% 0;
        width: 100%;
        height: 2vw;
	}
	
	.register-input input {
		margin: 19px 0 15px 0;
		display: block;
		width: 100%;
		height: 38px;
	}
	
	/* .yanzhengma {
		width: 50% !important;
		margin-right: 98px !important;
		display: inline!important;
	} */
	
	.mofang {
		display: inline;
		font-family: "Microsoft YaHei";
		line-height: 2;
		font-size: 0.96vw;
	}
	
	.password {
		display: flex;
		justify-content: space-between;
	}
	
	a {
		color: rgb(255, 196, 76);
		font-size: 0.7vw;
	}
	
	.confirm {
		width: 100%;
		color: aliceblue;
		border-radius: 3px;
		background-color: rgb(68, 157, 198);
		border: none;
		height: 2.5vw;
		margin-top: 15px;
	}
	
	.switch {
		position: relative;
		width: 362px;
		top: 294px;
		left: 905px;
		border-width: 1px;
		border-color: rgb(255, 255, 255);
		border-style: solid;
		border-radius: 6px;
		width: 138px;
		height: 30px;
		overflow: hidden;
	}
	
	/* .get {
		background-color: rgb(118, 212, 255);
		box-shadow: inset 0.5px 0.866px 4px 0px rgba(0, 0, 0, 0.1);
		height: 40px;
		border: none;
		color: aliceblue;
		display: inline;
		;
	} */
	
	.switch button {
		width: 50%;
		border: none;
		background: none;
		color: white;
		height: 100%;
	}
	
	.switch button:focus {
		width: 50%;
		border: none;
		background: white;
		color: #449dc6;
		height: 101%;
	}
.row {

    padding: 20% 0 9% 0;
}
.yes {
    font-size: 0.7vw;
}

input {
	border: 1px solid #eeeeee;
}

input::-webkit-input-placeholder{
	font-size: 0.7vw
}

#ss{
	
	background-repeat:no-repeat;
	border: 1px solid #999999;
}
input:focus {
	border: 1px solid rgb(255, 196, 76);
}
.sh{
	font-size: 0.5vw;
	color: red;
	margin: 0;
	height: 0.5vw;
	position: absolute
}
#ww {
	border: 1px solid #999999
}
</style>