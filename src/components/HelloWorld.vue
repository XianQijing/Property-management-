<template>
	<div class="HelloWorld">
		<nav-bar/>
    <div class="container">
	<div class="row">
		<div class="personal col-md-12">
			<nav-header :name="username"></nav-header>
		</div>
	</div>
	<div class="row">
		<div class="personal col-md-12">
			<p>个人首页</p>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="title1">
				<p class="tongzhi">通知</p>
				<div  class="bodymain">
				<div v-for="ok in inform" :key="ok.id" class="notic-body">
					<p :class="ok.class">{{ok.title}}</p><span>{{ok.main}}</span><span class="time">{{ok.time}}</span>
				</div>
				</div>
			</div>
		</div>

		<div class="col-md-8">
			<div class="title1">
				<p class="richeng">快捷工作台</p>
					<div class="bodymain">
						<div class="aa">
						<div class="card">
							<img src="@/assets/card-yuangong.png">
							<div class="linkto">
								<p>员工<span style="float:right">0个</span></p>
								<div class="link">
							<span><a>添加员工</a></span><span><a>导入员工</a></span><span><a>权限管理</a></span>
								</div>
							</div>
						</div>
						<div class="card">
							<img src="@/assets/card-zuhu.png">
							<div class="linkto">
								<p>租户<span style="float:right">0个</span></p>
								<div class="link">
							<span>添加租户</span><span>导入租户</span><span>迁入审核</span>
								</div>
							</div>
						</div>
						<div class="card">
							<img src="@/assets/card-tingche.png">
							<div class="linkto">
								<p>停车<span style="float:right">0个</span></p>
								<div class="link">
							<span style="color:white">添加员工</span><span>添加车位</span><span>导入车位</span>
								</div>
							</div>
						</div>
						<div class="card">
							<img src="@/assets/card-duanxin.png">
							<div class="linkto">
								<p>短信<span style="float:right">0个</span></p>
								<div class="link">
							<span @click="task1">短信群发</span><span>模板设计</span><span>短信记录</span>
								</div>
							</div>
						</div>
						<div class="card">
							<img src="@/assets/card-chaobiao.png">
							<div class="linkto">
								<p>抄表记录<span style="float:right">0个</span></p>
								<div class="link">
							<span>录入数据</span><span>导入表单</span><span>导出表单</span>
								</div>
							</div>
						</div>
						<div class="card">
							<img src="@/assets/card-jiaofei.png">
							<div class="linkto">
								<p>缴费通知<span style="float:right">0个</span></p>
								<div class="link">
							<span style="color:white">添加员工</span><span>发送短信</span><span>查看详情</span>
								</div>
							</div>
						</div>
						</div>
					</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-4">
			<div class="title1" >
				<p class="tongzhi">待办任务</p>
				<div class="bodymain">
					<div v-for="nn in task1" :key="nn.id" class="notic-body">
					<p :class="nn.class">{{nn.title}}</p><span>{{nn.main}}</span><span class="time">{{nn.time}}</span>
				</div>
				</div>
			</div>
		</div>

		<div class="col-md-8">
			<div class="title1">
				<p class="liucheng">收费统计</p>
				<div class="bodymain">
				</div>
			</div>
		</div>

	</div>
		</div> 
    </div>
</template>

<script>
import NavBar from '.././components/NavBar.vue'
import NavHeader from '.././components/NavHeader.vue'
import { setCookie,getCookie,delCookie } from '.././assets/js/cookie.js'
import url from '../assets/Req.js'

export default {
	name:'HelloWorld',
  data(){
    return{
		username: '',
			inform:[
				{
					class: 'new',
					title: 'new',
					main:'关于端午放假通知',
					time: '2018-07-01',
					id:10

				},
				{
					class: 'xitong',
					title: '系统',
					main:'关于端午放假通知',
					time: '2018-07-01',
					id: 11

				},
				{
					class: 'xitong',
					title: '系统',
					main:'关于端午放假通知',
					time: '2018-07-01',
					id: 12

				}
			],
			task1: [
				{
					class: 'huiyi',
					title: '会议',
					main: '保洁会议，在14号会议室举行',
					time:"2018-07-06",
					id: 21
				},
				{
					class: 'hetong',
					title: '合同',
					main: '22栋14楼',
					time:"2018-07-06",
					id: 22
				},
				{
					class: 'jiaofei',
					title: '缴费',
					main: '提醒住户缴费',
					time:"2018-07-06",
					id: 23
				}
			],
			tuling:""
    }
  },

  mounted(){
			let uname = getCookie('phone')
			this.$ajax.get( url + '/user/findById',{
				params:{
						'token': sessionStorage.getItem('userId'),
					}
			}).then(res => {
				console.log(res.data)
			})
            this.username = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.$router.push('/')
            }
  },
  
  methods:{
	  quit(){
                /*删除cookie*/
                delCookie('username')
            },
	  task(){
		  this.$ajax.get('/').then((res) => {
			  this.task1 = res.data
		  })
	  }
  },
  components: {
    NavBar,
	NavHeader
  }
}
</script>

<style scoped>
.HelloWorld {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}

html {
  background-color: #eeeeee!important;
}

.container {
		width: 88%;
		position: relative;
		left: 6%;
		background-color: #eeeeee;
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
	
	
	.personal {
		position: relative;
		background-color: white;
	}
	
	.personal p {
		width: 91px;
		margin: 0;
		margin-top: 20px;
	}
	

	.title1{
		border-left: 8px solid #48a3f0;
		border-bottom: 1px solid #48a3f0;
		height: 42px;
		margin: 0;
	}

	.tongzhi {
		padding-top: 15px;
		padding-left: 5px;
	}
	.richeng {
		padding-left: 5px;
	}
	.liucheng {
		padding-top: 15px;
		padding-left: 5px;
	}
	.quxiang {
		padding-top: 15px;
		padding-left: 5px;
	}

  .row {
        margin-top: 5px;
		background-color: white;
		margin-left: -2px;
        margin-right: 1px;
    }

	.col-md-4 {
		position: relative;
		height: 43.65vh;
		border-right: 5px solid #eeeeee;
	}
	.col-md-8 {
		position: relative;
		height: 43.65vh;
	}

.new {
	display: inline-block;
	background-color: #ffa517;
	color: white;
	height: 22px;
	width: 29px;
	font-size:12px;
	padding-top:3px;
	margin-right:5px;
	text-align: center;
	border-radius: 4px;
}

.huiyi {
	display: inline-block;
	background-color: #ffa517;
	color: white;
	height: 22px;
	width: 29px;
	font-size:12px;
	padding-top:3px;
	margin-right:5px;
	text-align: center;
	border-radius: 4px;
}

.hetong {
	display: inline-block;
	background-color: #ffa517;
	color: white;
	height: 22px;
	width: 29px;
	font-size:12px;
	padding-top:3px;
	margin-right:5px;
	text-align: center;
	border-radius: 4px;
}

.jiaofei {
	display: inline-block;
	background-color: #ffa517;
	color: white;
	height: 22px;
	width: 29px;
	font-size:12px;
	padding-top:3px;
	margin-right:5px;
	text-align: center;
	border-radius: 4px;
}
.xitong {
	display: inline-block;
	background-color: #68b828;
	color: white;
	height: 22px;
	width: 29px;
	font-size:12px;
	padding-top:3px;
	margin-right:5px;
	text-align: center;
	border-radius: 4px;
}
.notic-body{
	margin-top: 30px;
	border-bottom: 1px solid #eeeeee;
}
.time {
	float: right;
}

.mainbody {
	margin-top: 15px;
}

.richeng {
    padding-top: 15px;
}



.card {
	height: 12.5vh;
	border: 1px solid #eeeeee;
	display: inline-block;
	margin-top: 29px;
	font-size:12px;
	padding-top:3px;
	margin-right:5px;
	width: 32%;
	-moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */
	box-shadow: 1px 3px 5px #888888;
	color: #666666;
}
.linkto p{
	    font-size: 16px;
}
.linkto {
	display: inline-block;
	position: relative;
	top: 21px;
	width: 68%;
}

.link {
	display: flex;
	justify-content: space-between;
}
.card img {
	margin: 30px 0 20px 10px;
	height: 3.5vw
}
.aa {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.card:hover{
	padding-left: 1px;
}
</style>
