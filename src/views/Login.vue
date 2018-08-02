<template>
	<div class="login container">
		<div class="row">
		<!--登录-->
		<div class="col-md-12">
			<div class="main">
			<div><h3 class="welcome">欢迎登录</h3><h4 class="mofang">魔方物业管理系统</h4></div>
			<form>
				<div class="input">
					<input type="text" placeholder="请输入手机号" id="ss" v-model="phone">
					<p v-show="showTishi" class="sh">{{tishi}}</p>
					<input type="password" placeholder="请输入密码" id="ww" v-model="password">
				</div>
				<div class="password">
					<span>
                        <input type="checkbox"  id="remember" v-model="remember"><span class="yes">记住密码</span>
					</span>
					<a link=""><span>忘记密码</span></a>
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
				remember:''
			};
		},
		mounted() {
			/*页面挂载获取cookie，如果存在phone的cookie，则跳转到主页，不需登录*/
			if(getCookie('phone')) {
				this.$router.push('/HelloWorld')
			}
		},
		methods: {
			//登录
			sumbitLogin() {
				var remember = document.getElementById('reme')
				if(this.phone == "" || this.password == "") {
					alert("请输入用户名或密码")
				} else {
					/*接口请求*/
					this.$ajax.post(url + 'login/login_in', qs.stringify({

							'phone': this.phone,
							'password': this.password,
							'remember':'5'
						
					})).then((res) => {
						
						/*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
						if(res.data.data.success == true) {
							console.log(res.data)
							this.tishi = "登录成功"
							this.showTishi = true
							this.$router.push('/HelloWorld')
							sessionStorage.setItem('userId',res.data.data.token)
							sessionStorage.setItem('judge',this.phone)

							if (this.remember = true){
								setCookie('phone',this.phone,1000*60)//保存帐号到cookie，有效期7天
							}
							// setCookie('phone', this.phone, 1000 * 60)
							// setTimeout(function() {
							// 	this.$router.push('/hellowWorld')
							// }.bind(this), 1000)
							// this.tishi = "该用户不存在"
							// this.showTishi = true
						// } else if(res.data == 0) {
						// 	this.tishi = "密码输入错误"
						// 	this.showTishi = true
						// } else if(res.data == 'admin') {
						// 	/*路由跳转this.$router.push*/
						// 	this.$router.push('/main')
						// } else {
						// 	this.tishi = "登录成功"
						// 	this.showTishi = true
						// 	if (remember.checked){
						// 		setCookie('phone',this.phone,7)//保存帐号到cookie，有效期7天
						// 		setCookie('password',this.password,7)//保存密码到cookie，有效期7天
						// 	}
						// 	// setCookie('phone', this.phone, 1000 * 60)
						// 	setTimeout(function() {
						// 		this.$router.push('/hellowWorld')
						// 	}.bind(this), 1000)
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

	}
	
	.main {
		margin: 1% 40%;
        width: 20%;
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
	
	.yanzhengma {
		width: 50% !important;
		margin-right: 98px !important;
		display: inline!important;
	}
	
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
	
	.get {
		background-color: rgb(118, 212, 255);
		box-shadow: inset 0.5px 0.866px 4px 0px rgba(0, 0, 0, 0.1);
		height: 40px;
		border: none;
		color: aliceblue;
		display: inline;
		;
	}
	
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

.input input:focus {
	border: 1px solid rgb(255, 196, 76);
}

input::-webkit-input-placeholder{
	font-size: 0.7vw
}

#ss{
	
	background-repeat:no-repeat;
	border: 1px solid #999999;
}

#ss:focus {
	border: 1px solid rgb(255, 196, 76);
}
.sh{
	font-size: 0.5vw;
	color: red;
	margin: 0;
	height: 0.5vw;
	position: absolute
}
</style>