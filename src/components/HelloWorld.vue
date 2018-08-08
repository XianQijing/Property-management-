<template>
	<div class="HelloWorld">
		<nav-bar/>
		<div class="container">
			<div class="row">
				<div class="personal col-md-12">
					<nav-header :name="username"></nav-header>
				</div>
			</div>
			<div class="row" v-if="DetailShow">
				<div class="personal col-md-12">
					<p>个人首页</p>
				</div>
			</div>
			<div class="row" v-if="DetailShow">
				<div class="col-md-4">
					<div class="title1">
						<p class="tongzhi">通知</p>
						<div class="bodymain">
							<div v-for="ok in inform" :key="ok.id" class="notic-body" @click="toDetail">
								<p :class="ok.class">{{ok.title}}</p>
								<span>{{ok.main}}</span>
								<span class="time">{{ok.time}}</span>
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
												<a @click="add = !add">添加员工</a>
											</span>
											<span>
												<a @click="isShow = !isShow">导入员工</a>
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
											<router-link :to="{name: 'AddCar',query:{id:'ww'}}"><span>添加车位</span></router-link>
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
											<router-link :to="{name: 'Relationship',query:{tabPane:'2'}}"><span>模板设计</span></router-link>
											<router-link :to="{name: 'Relationship',query:{tabPane:'3'}}"><span>短信记录</span></router-link>
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
											<router-link :to="{name: 'Charge',query:{tabPane:'1'}}"><span>录入数据</span></router-link>
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
											<router-link :to="{name: 'Relationship',query:{tabPane:'3'}}"><span>查看详情</span></router-link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row" v-if="DetailShow">
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
			<!--添加新员工弹窗-->
				<el-dialog title="添加新员工" :visible.sync="add" width="30%">
					<el-form :model="addperson" ref="addperson" label-width="80px" size="small" class="chuang">
						<el-form-item label="姓名:">
							<el-input placeholder="请输入姓名" v-model="addperson.name"></el-input>
						</el-form-item>
						<el-form-item label="昵称:">
							<el-input id="nickname" placeholder="请输入昵称" v-model="addperson.nickname"></el-input>
						</el-form-item>
						<el-form-item label="手机号:">
							<el-input id="phone" placeholder="请输入手机号" v-model="addperson.number"></el-input>
						</el-form-item>
						<el-form-item label="密码:">
							<el-input id="mima" placeholder="新增密码" v-model="addperson.mima"></el-input>
						</el-form-item>
						<el-form-item label="微信号:">
							<el-input id="wechart" placeholder="请输入微信号" v-model="addperson.wechat"></el-input>
						</el-form-item>
						<el-form-item label="邮箱:">
							<el-input id="email" placeholder="请输入邮箱" v-model="addperson.email"></el-input>
						</el-form-item>
						<el-form-item label="角色:">
							<el-select id="position" placeholder="请输入职位" v-model="addperson.position">
								<el-option label="总经理" value=180717116472055595008>总经理</el-option>
								<el-option label="adaf" value=180717124465488855040>adaf</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="岗位:">
							<el-input id="gangwei" placeholder="请输入岗位" v-model="addperson.gangwei"></el-input>
						</el-form-item>
						<el-form-item label="备注:">
							<el-input id="remark" placeholder="备注信息" v-model="addperson.beizhu"></el-input>
						</el-form-item>
					</el-form>
					<div class="footer">
						<button class="confirm" @click="addOne">确定</button>
						<button class="cancel" @click="add = !add">取消</button>
					</div>
				</el-dialog>

				<!--导入弹窗-->
            <el-dialog
                    title="导入"
                    :visible.sync="isShow"
                    width="30%">
                    <div class="put">
                        <p>导入设置:</p>
                        <form>
                            <ul class="shuju">
                                <li>
                                    <el-radio v-model="radio" label="0">重复数据不导入</el-radio>
                                    </li>
                                <li>
                            <el-radio v-model="radio" label="1">重复数据覆盖</el-radio>
                             </li>
                            </ul>
                        </form>
                        <div class="upload">
                            <span>选择excel上传：</span><div class="file"><input type="file" @change="getPath" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>点击上传</div>
                             </div>
                        <div>{{this.file}}</div>
                        </div>
                        
                        <div>
                            <p>如何导入通讯录</p>
                                <ul class="liebiao">
                                 <li class="how">数据导入采用Excel表格导入</li>
                                 <li>1、不支持Excel公式导入，尽量去除所有文字和表格样式</li>
                                 <li>2、只支持工作表1导入</li>
                                 <li>3、请点击下载微小区实例</li>
                                 <li>4、如需导入时间，时间格式必须为YYYY-MM-DD(例如：2016-01-01)</li>
                                 <li class="how">必须项目(必须项目不能为空且不能重复)</li>
                                 <li>姓名</li>
                                 <li>手机号（必须是手机格式且不能重复）</li>
                                 <li>部门（必须与组织架构对应）</li>
                                 <li>选填项目（选填项目可以为空）</li>
                                 <li>微信（填写员工微信号）</li>
                                 <li>昵称（填写员工昵称）</li>
                                 <li>职位（填写员工职位）</li>
                                 <li>备注</li>
                            </ul>
                        </div>
                        <div class="footer1">
                            <button class="confirm" @click="submit">确定</button><button class="cancel" @click="isShow = !isShow">取消</button>
                             </div>
                </el-dialog>
			<DetailsNotification v-if="!DetailShow" />
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
            //添加员工
            add: false,
            addperson: {
                name: "",
                number: "",
                wechat: "",
                nickname: "",
                post: "",
                position: "",
                beizhu: "",
                gangwei: "",
                mima: ""
            },
            form: {},
						//导入员工
            isShow:false,
            radio:'0',
            file:'',

            inform: [
                {
                    class: "new",
                    title: "0",
                    main: "昨日发送节日祝福",
                    time: "",
                    id: 10
                },
                {
                    class: "new",
                    title: "0",
                    main: "昨日发送生日祝福",
                    time: "",
                    id: 11
                },
                {
                    class: "new",
                    title: "0",
                    main: "昨日发送活动通知",
                    time: "",
                    id: 12
                },
                {
                    class: "new",
                    title: "0",
                    main: "昨日发送欠费通知",
                    time: "",
                    id: 13
                },
                {
                    class: "new",
                    title: "0",
                    main: "昨日发送费用通知",
                    time: "",
                    id: 14
                }
            ],
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
            DetailShow: true
        };
    },

    mounted() {
        let uname = getCookie("phone");
        this.$ajax
            .get(url + "/user/findById", {
                params: {
                    token: sessionStorage.getItem("userId")
                }
            })
            .then(res => {
                console.log(res.data);
            });
				this.countWorkMethod();
				this.countNoteMethod()
        this.username = uname;

        /*如果cookie不存在，则跳转到登录页*/
        // if(uname == ""){
        //     this.$router.push('/')
        // }
    },

    methods: {
        toDetail() {
            //this.DetailShow = false;
            this.$router.push({name: 'Relationship',query:{tabPane:'3'}})
        },
        //快捷工作台
        countWorkMethod() {
            this.$ajax.get(url + "/index/countWork").then(res => {
                console.log(res.data);
                this.countWork = res.data;
            });
        },
        //添加员工
        addOne() {
            var users = {};
            users.name = this.addperson.name;
            users.username = this.addperson.nickname;
            users.phone = this.addperson.number;
            users.password = this.addperson.mima;
            users.wechat = this.addperson.wechat;
            users.email = this.addperson.email;
            users.orgId = this.addperson.gangwei;
            users.remark = this.addperson.beizhu;
            users.roleId = this.addperson.position;
            this.$ajax.post(url + "user/insert", users).then(res => {
                this.form = res.data;
                console.log(res.data);
            });
        },
				//导入员工
        //上传的方法
         getPath(e){
            // console.log(e.target.value)
            
            // this.path = e.target.value;
            this.file = e.currentTarget.files[0].name//百度是没有name的
            
            console.log(this.src)
        },
        submit(){
            var formData = new FormData()
            console.log(this.files)
            formData.append('path', this.file)
            formData.append('status', this.radio)
            this.$ajax.post(url+ 'user/excelImport',formData).then(res => {
                console.log(res)
            })
				},
				//通知
				countNoteMethod(){
            this.$ajax.get(url+ 'index/countNote').then(res => {
                                //this.inform
                                for(var i=0;i<5;i++){
                                this.inform[i].title=res.data[i].count
                                }
								
            })
				},
        quit() {
            /*删除cookie*/
            delCookie("username");
        },
        task() {
            this.$ajax.get("/").then(res => {
                this.task1 = res.data;
            });
        },
        detail() {
            console.log(index);
        }
    },
    components: {
        NavBar,
        NavHeader,
        DetailsNotification
    }
};
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
</style>
