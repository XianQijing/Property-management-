<template>
	<div class="HelloWorld">
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
						<p class="richeng">通知</p>
						<div class="bodymain">
							<div v-for="(ok,index) in inform" :key="index" class="notic-body" >
								<p :class="ok.titlep">{{ok.title}}</p>
								<span @click="detail(index)">{{ok.header}}</span>
                                <el-tag type="danger" size="mini">{{ok.status}}</el-tag>
                                <span class="time" @click="del(index)">删除</span>
								<!-- <span class="time">{{ok.createTime}}</span> -->
                                <p>{{ok.createTime}}</p>
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
										<p>员工
											<span style="float:right">{{countWork[0].count}}个</span>
										</p>
										<div class="link">
											<span>
												<router-link :to="{name: 'Department',query:{tabPane:'second'}}">添加员工</router-link>
											</span>
											<span>
												<router-link :to="{name: 'Department',query:{tabPane:'second'}}">导入员工</router-link>
											</span>
											<span>
												<router-link :to="{name: 'Department',query:{tabPane:'first'}}"><a>权限管理</a></router-link>
											</span>
										</div>
									</div>
								</div>
								<div class="card">
									<img src="@/assets/card-zuhu.png">
									<div class="linkto">
										<p>租户
											<span style="float:right">{{countWork[1].count}}个</span>
										</p>
										<div class="link">
											<span style="color:white">添加员工</span> 
											<!-- <span>添加租户</span>
											<span>导入租户</span>
											<span>迁入审核</span> -->
										</div>
									</div>
								</div>
								<div class="card">
									<img src="@/assets/card-tingche.png">
									<div class="linkto">
										<p>停车
											<span style="float:right">{{countWork[2].count}}个</span>
										</p>
										<div class="link">
											<span style="color:white">添加员工</span> 
											<router-link :to="{name: 'House',query:{tabPane:'fourth'}}"><span>添加车位</span></router-link>
											<!-- <router-link :to="{name: 'Daoru'}"><span>导入车位</span></router-link> -->
										</div>
									</div>
								</div>
								<div class="card">
									<img src="@/assets/card-duanxin.png">
									<div class="linkto">
										<p>短信
											<span style="float:right">{{countWork[3].count}}个</span>
										</p>
										<div class="link">
											<span style="color:white">添加员工</span> 
											<!-- <span @click="task1">短信群发</span> -->
											<router-link :to="{name: 'Relationship',query:{tabPane:'third'}}"><span>模板设计</span></router-link>
											<router-link :to="{name: 'Relationship',query:{tabPane:'fourth'}}"><span>短信记录</span></router-link>
										</div>
									</div>
								</div>
								<div class="card">
									<img src="@/assets/card-chaobiao.png">
									<div class="linkto">
										<p>抄表记录
											<span style="float:right">{{countWork[4].count}}个</span>
										</p>
										<div class="link">
											<span style="color:white">添加员工</span> 
											<router-link :to="{name: 'Charge',query:{tabPane:'second'}}"><span>录入数据</span></router-link>
											<!-- <span>导入表单</span>
											<span>导出表单</span> -->
										</div>
									</div>
								</div>
								<div class="card">
									<img src="@/assets/card-jiaofei.png">
									<div class="linkto">
										<p>缴费通知
											<span style="float:right">{{countWork[5].count}}个</span>
										</p>
										<div class="link">
											<span style="color:white">添加员工</span> 
											<!-- <span>发送短信</span> -->
											<router-link :to="{name: 'Relationship',query:{tabPane:'third'}}"><span>查看详情</span></router-link>
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
					<div class="title1">
						<p class="tongzhi">待办任务</p>
						<div class="bodymain">
							<div v-for="nn in task1" :key="nn.id" class="notic-body">
								<p :class="nn.class">{{nn.title}}</p>
								<span>{{nn.main}}</span>
								<span class="time">{{nn.time}}</span>
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
            <el-dialog
                :title="this.title"
                :visible.sync="dialogVisible"
                width="500px">
                <div class="content">{{this.content}}</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
		</div>
	</div>
</template>

<script>
import NavBar from ".././components/NavBar.vue";
import NavHeader from ".././components/NavHeader.vue";
import { setCookie, getCookie, delCookie } from ".././assets/js/cookie.js";
import url from "../assets/Req.js";
import DetailsNotification from "../views/DetailsNotification";

export default {
    name: "HelloWorld",
    data() {
        return {
            content: '',
            dialogVisible: false,
            username: "",
            //快捷工作台
            countWork: [
                { count: 0 },
                { count: 0 },
                { count: 0 },
                { count: 0 },
                { count: 0 },
                { count: 0 }
            ],

            inform: [],
            task1: [
                {
                    class: "huiyi",
                    title: "会议",
                    main: "RUBIKE",
                    time: "2018-07-06",
                    id: 21
                },
                {
                    class: "hetong",
                    title: "合同",
                    main: "RUBIKE",
                    time: "2018-07-06",
                    id: 22
                },
                {
                    class: "jiaofei",
                    title: "缴费",
                    main: "RUBIKE",
                    time: "2018-07-06",
                    id: 23
                }
            ],
            tuling: "",
            index: 0,
            title:''
        };
    },

    mounted() {
        this.getDetail()
    },

    methods: {
        del(index){
            var id = this.inform[index].id
            this.$ajax.post(url + 'notification/del/'+id).then(res => {
                if(res.data.status === 200){
                    this.$message({
                        message:'删除成功',
                        type: 'success'
                    })
                    this.getDetail()
                }else if(res.status){
                    this.$message({
                        message:'sfesf',
                        type: 'error'
                    })
                }
            })
        },
        detail(index){
            this.inform[index].status = '已读'
            this.content = this.inform[index].content
            this.index = index
            this.dialogVisible = true
            var id = this.inform[index].id
            this.title = this.inform[index].header
            this.$ajax.post(url + 'notification/updateStatusById/'+id)
        },
        getDetail(){
            this.$ajax.post(url + 'notification/findCondition').then(res => {
                this.inform = res.data.data
                for(var i in this.inform){
                    this.inform[i].status = judge(this.inform[i].status)
                }
            })
        }
    },
    components: {
        NavBar,
        NavHeader,
        DetailsNotification
    }
};
function judge(data){
if(data === 1)return '未读'
if(data === 2)return '已读'
}
</script>

<style scoped>
.HelloWorld {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
}

html {
    background-color: #eeeeee !important;
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

.title1 {
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
    height: 43.4vh;
    border-right: 5px solid #eeeeee;
    overflow: auto;
}
.col-md-8 {
    position: relative;
    height: 43.4vh;
}

.new {
    display: inline-block;
    background-color: #ffa517;
    color: white;
    height: 22px;
    width: 29px;
    font-size: 12px;
    padding-top: 3px;
    margin-right: 5px;
    text-align: center;
    border-radius: 4px;
}

.huiyi {
    display: inline-block;
    background-color: #ffa517;
    color: white;
    height: 22px;
    width: 29px;
    font-size: 12px;
    padding-top: 3px;
    margin-right: 5px;
    text-align: center;
    border-radius: 4px;
}

.hetong {
    display: inline-block;
    background-color: #ffa517;
    color: white;
    height: 22px;
    width: 29px;
    font-size: 12px;
    padding-top: 3px;
    margin-right: 5px;
    text-align: center;
    border-radius: 4px;
}

.jiaofei {
    display: inline-block;
    background-color: #ffa517;
    color: white;
    height: 22px;
    width: 29px;
    font-size: 12px;
    padding-top: 3px;
    margin-right: 5px;
    text-align: center;
    border-radius: 4px;
}
.xitong {
    display: inline-block;
    background-color: #68b828;
    color: white;
    height: 22px;
    width: 29px;
    font-size: 12px;
    padding-top: 3px;
    margin-right: 5px;
    text-align: center;
    border-radius: 4px;
}
.notic-body {
    margin-top: 30px;
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;
}
.time {
    float: right;
    color: #48a3f0;
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
    font-size: 12px;
    padding-top: 3px;
    margin-right: 5px;
    width: 32%;
    -moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */
    box-shadow: 1px 3px 5px #888888;
    color: #666666;
}
.linkto p {
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
    height: 3.5vw;
}
.aa {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.card:hover {
    padding-left: 1px;
}
.content{
    width: 90%;
    overflow: auto;
}
</style>
