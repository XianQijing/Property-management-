<template>
    <div class="addCustomer">
        <h3>{{name}}客户事件</h3>
        <div class="tianjia">
            <div class="input">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" size='small' :disabled="ww">
                <div id="fenkai">
                <el-form-item label="客户名字：" prop="name">
                <el-input v-model="ruleForm.name" v-on:blur="transformName" placeholder="请输入客户名字"></el-input>
                </el-form-item>
                <el-form-item label="客户手机号：" prop="phone">
                <el-input v-model="ruleForm.phone" v-on:blur="transform" placeholder="请输入客户手机号" @blur="blur"></el-input>
                </el-form-item>
               <el-form-item label="关联房屋：" prop="house">
                    <!-- <el-select :value="ruleForm.house" v-model="ruleForm.house" placeholder="请选择活动楼宇" > -->
                    <el-cascader expand-trigger="hover" :options="options" v-model="ruleForm.house" @change="handleChange" style="width:100%"></el-cascader>
                </el-form-item>
                
                <el-form-item label="事件类型：" prop="event_type">
                <el-select v-model="ruleForm.event_type" placeholder="请选择事件类型"  style="width:100%">
                   <el-option
						v-for="item in ways"
							:key="item.id"
							:label="item.value"
							:value="item.id">
					</el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="处理情况：" prop="process_condition" v-show="pan">
                <el-input v-model="ruleForm.process_condition" placeholder="请输入处理情况"></el-input>
                </el-form-item>
                
                <el-form-item label="处理时间：" prop="processTime" v-show="pan" >
                    <el-date-picker
                        v-model="ruleForm.processTime"
                        type="datetime"
                        format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
                        placeholder="选择日期时间"
                        style="width:100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="回访时间：" prop="visitTime" v-show="show">
                    <el-date-picker
                        v-model="ruleForm.visitTime"
                        type="datetime"
                        format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
                        placeholder="选择日期时间"
                        style="width:100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="事件损失：" prop="loss" v-show="duan">
				<el-input v-model="ruleForm.event_loss" placeholder="请输入事件造成的损失"></el-input>
				</el-form-item>
                
                </div>
                <div id="fenkai1">
                    <el-form-item label="事情描述：" prop="event_depict">
                <el-input v-model="ruleForm.event_depict" placeholder="请输入描述事情"></el-input>
                </el-form-item>
                    <el-form-item label="受理人：" prop="agent">
                <el-input v-model="ruleForm.agent" placeholder="请输入受理人姓名"></el-input>
                </el-form-item>
                    <el-form-item label="处理方式：" prop="process_mode" v-show="duan">
                <el-input v-model="ruleForm.process_mode" placeholder="请输入处理方式"></el-input>
                </el-form-item>
                
                <el-form-item label="处理满意度：" prop="process_cacsi" >
                    <el-select v-model="ruleForm.process_cacsi" placeholder="请选择">
                        <el-option label="非常满意" value="非常满意"></el-option>
                        <el-option label="满意" value="满意"></el-option>
                        <el-option label="一般" value="一般"></el-option>
                        <el-option label="不满意" value="不满意"></el-option>
                        <el-option label="非常不满意" value="非常不满意"></el-option>
                    </el-select>
                <!-- <el-input v-model="ruleForm.process_cacsi" placeholder="请输入处理满意度"></el-input> -->
                </el-form-item>
                <el-form-item label="回访情况：" prop="visit_condition" v-show="show">
                <el-input v-model="ruleForm.visit_condition" placeholder="请输入回访情况"></el-input>
                </el-form-item>
                <el-form-item label="发生时间:" prop="occurrenceTime">
                    <el-date-picker
                        v-model="ruleForm.occurrenceTime"
                        type="datetime"
                        format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="回访满意度：" prop="visit_cacsi" v-show="pan">
                    <el-select v-model="ruleForm.visit_cacsi" placeholder="请选择">
                        <el-option label="非常满意" value="非常满意"></el-option>
                        <el-option label="满意" value="满意"></el-option>
                        <el-option label="一般" value="一般"></el-option>
                        <el-option label="不满意" value="不满意"></el-option>
                        <el-option label="非常不满意" value="非常不满意"></el-option>
                    </el-select>
                <!-- <el-input v-model="ruleForm.visit_cacsi" placeholder="请输入回访满意度"></el-input> -->
                </el-form-item>
                <el-form-item label="备注：" prop="remarks" v-show="pan">
                <el-input v-model="ruleForm.remarks" placeholder="请输入房屋类型"></el-input>
                </el-form-item>
                </div>
            </el-form>
            </div>
            <div class="nn">
            <button class="nextStep" @click="addOne">保存</button><button class="cancel" @click="goBack">返回</button>
            </div>
        </div>
    </div>
</template>

<script>

import url from '../assets/Req.js'	

export default {
    name: 'addCustomer',
    data(){
        return{
            name:'',
            pan:false,
            duan:true,
            ww:false,
            show:true,
            ways:[

            ],
            options: [],
        rules: {
          name: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' },
          ],
          house: [
            { required: true, message: '请选择小区/楼宇/单元', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          buildArea: [
            { required: true, message: '请输入建筑面积', trigger: 'blur' }
          ]
        },
            ruleForm: {
                house: [],
                event_type:'',
                name: '',
                process_condition:'',
                processTime: '',
                datetime: '',
                visitTime: '',
                event_depict: '',
                phone:'',
                agent:'',
                process_mode:'',
                process_cacsi:'',
                visit_condition:'',
                occurrenceTime:'',
                visit_cacsi:'',
                remarks:''
            },
            // input:{
            //     house:["bangongqu","Azuo","105"],
            //     event_type:'12',
            //     name: '121',
            //     process_condition:'12',
            //     processTime: '2017.6.23',
            //     datetime: '',
            //     visitDate: '2017.6.23',
            //     event_depict: 'qwq',
            //     phone:'123123111231',
            //     agent:'er',
            //     process_mode:'wr',
            //     process_cacsi:'wq',
            //     visit_condition:'qr',
            //     eventDate:'2017.6.23',
            //     visit_cacsi:'1241',
            //     remarks:'142'
            // },

        
        }
    },
    mounted(){
        this.id = this.$route.query.id
        
        if(this.$route.query.msg === 2){    //客户反馈信息查看 
            this.ww = true,
            this.name = '查看'
            this.pan = true,
            this.duan = false,
            this.show = true
            //返回反馈信息的下拉框
            this.$ajax.get(url + 'serviceAccept/findByDictType/3').then(res => {
                this.ways=res.data;
            })
             this.$ajax.get(url +'feedbackMessage/findIdVO/'+this.id).then(res => {
                 if(res.status===200){

                    this.ruleForm = res.data;
                    this.ruleForm.event_type = res.data.category;
                    // this.ruleForm.visitDate = res.data.visitTime;
                    this.ruleForm.event_depict = res.data.content;
                    this.ruleForm.agent = res.data.handler;
                    this.ruleForm.eventDate = res.data.occurrenceTime;
                    this.ruleForm.house = [res.data.precinct, res.data.buildings, res.data.room];
                    this.editChange(res.data.name,res.data.phone)
                }else if(res.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.goBack()
                        }
                    });
                }
                 
            })
        }else if(this.$route.query.msg === 3){    //客户反馈信息修改
            this.name = '修改'
            this.pan = true,
            this.duan = false
            this.show = true
            //返回反馈信息的下拉框
             this.$ajax.get(url + 'serviceAccept/findByDictType/3').then(res => {
                this.ways=res.data;
            })
             this.$ajax.get(url +'feedbackMessage/findIdVO/'+this.id).then(res => {
                if(res.status === 200){
                    this.ruleForm = res.data;
                    this.ruleForm.event_type = res.data.category;
                    // this.ruleForm.visitDate = res.data.visitTime;
                    this.ruleForm.event_depict = res.data.content;
                    this.ruleForm.agent = res.data.handler;
                    // this.ruleForm.eventDate = res.data.occurrenceTime;
                    this.ruleForm.house = [res.data.precinct, res.data.buildings, res.data.room];
                    this.editChange(res.data.name,res.data.phone)
                }else if(res.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.goBack()
                        }
                    });
                }
            })
        }else if(this.$route.query.msg === 1){    //客户事件新增
            this.name = '新增',
            this.pan = false,
            this.duan = true,
            this.show = false
            this.$ajax.get(url + 'serviceAccept/findByDictType/4').then(res => {
                this.ways=res.data;
            })
            this.$ajax.get(url + 'room/flndByClientId/aaa').then(res => {
                this.options=res.data;
            })
            
        }else if(this.$route.query.msg === 4){  //客户事件查看
            this.name = '查看',
            this.pan = false,
            this.duan = true,
            this.ww = true,
            this.show = true
            this.$ajax.get(url + 'serviceAccept/findByDictType/4').then(res => {
                this.ways=res.data;
            })
            this.$ajax.get(url +'customerEvent/findIdVO/'+this.id).then(res => {
                if(res.status === 200){
                    this.ruleForm = res.data;
                    this.ruleForm.house = [res.data.precinct, res.data.buildings, res.data.room];
                    this.ruleForm.process_cacsi = res.data.cacsi;
                    this.ruleForm.occurrenceTime = res.data.eventDate;
                    this.ruleForm.visitTime = res.data.visitDate;
                    this.editChange(res.data.name,res.data.phone)
                }else if(res.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.goBack()
                        }
                    });
                }
            })
        }else if(this.$route.query.msg === 5){   //客户事件回访
            this.name = '回访',
            this.pan = false,
            this.duan = true,
            this.show = true,
            this.$ajax.get(url + 'serviceAccept/findByDictType/4').then(res => {
                this.ways=res.data;
            })
           this.$ajax.get(url +'customerEvent/findIdVO/'+this.id).then(res => {
               if(res.status === 200){
                this.ruleForm = res.data;
                this.ruleForm.house = [res.data.precinct, res.data.buildings, res.data.room];
                this.ruleForm.process_cacsi = res.data.cacsi;
                this.ruleForm.occurrenceTime = res.data.eventDate;
                this.ruleForm.visitTime = res.data.visitDate;
                this.editChange(res.data.name,res.data.phone)
               }else if(res.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.goBack()
                        }
                    });
                }
            })     
        }else{                              //客户反馈信息新增
            this.name = '新增'
            this.pan = true,
            this.duan = false,
            this.show = true
             this.$ajax.get(url + 'serviceAccept/findByDictType/3').then(res => {
                this.ways=res.data;
            })
            this.$ajax.get(url + 'room/flndByClientId/aaa').then(res => {
                this.options=res.data;
             })
        }
    },
    methods:{
        blur (e) {
            var reg = /^\+?[1-9][0-9]*$/
            if (!reg.test(e.target.value)) {
                e.target.style.borderColor = 'red'
                this.$message({
                message: '请输入数字',
                type: 'error'
                })
            }else if(e.target.value.length!==11){
                e.target.style.borderColor = 'red'
                this.$message({
                message: '请输入11位数字',
                type: 'error'
                })
            } else {
                e.target.style.borderColor = '#67c23a'
            }
        },
        editChange(a,b){
            this.$ajax.get(url + 'owner/findByNameAndPhone/'+a+'/'+b).then(res => {
                var aa = "";
                    if(!res.data){
                        aa = "aaa";
                    }else{
                        aa = res.data.id;
                    }
                    this.$ajax.get(url + 'room/flndByClientId/'+aa).then(res => {
                        this.options=res.data;
                    })
                })
        },
     //失去焦点事件，当移开姓名时判断
      transformName:function(){
          if(!this.ruleForm.name){
              this.$message({
                message: '请先输入业主姓名',
                 type: 'error'
               })
            
          }else{
              if(!this.ruleForm.phone){
                  this.$ajax.get(url + 'owner/findByName/'+this.ruleForm.name).then(res => {
                       if(res.data.length==0){
                           this.$message({
                                message: '没有找到该业主的任何信息',
                                type: 'error'
                            })
                          
                         this.ruleForm.name = null;
                       }
                   })
                 }else{
                      this.$ajax.get(url + 'owner/findByNameAndPhone/'+this.ruleForm.name+'/'+this.ruleForm.phone).then(res => {
                        if(!res.data){
                             this.$message({
                                message: '业主绑定的电话号码有误，请重新输入！',
                                type: 'error'
                            })
                         
                            this.ruleForm.phone = null;
                        }
                    })
                 }
              }
      },
    //失去焦点事件，当移开电话时判断
      transform:function(){
          if(!this.ruleForm.name){
               this.$message({
                      message: '请先输入业主姓名',
                    type: 'error'
                }) 

          }else if(!this.ruleForm.phone){
                         this.$message({
                                message: '请输入电话号码',
                                type: 'error'
                            }) 

          }else{
           this.$ajax.get(url + 'owner/findByNameAndPhone/'+this.ruleForm.name+'/'+this.ruleForm.phone).then(res => {
                var aa = "";
                if(!res.data){
                     this.$message({
                                message: '业主绑定的电话号码有误，请重新输入！',
                                type: 'error'
                            })
                    this.ruleForm.phone = null;
                    aa = "aaa";
                }else{
                    aa = res.data.id;
                }
                 this.$ajax.get(url + 'room/flndByClientId/'+aa).then(res => {
                     this.options=res.data;
                 })
            })
          }
      },
         //修改或新增
	   addOne(){
            var customerEventVO={};   //客户事件的数据
            customerEventVO.name=this.ruleForm.name;           //租户姓名
            customerEventVO.phone=this.ruleForm.phone;   //电话号码
            var arr=this.ruleForm.house;
            customerEventVO.room=arr[arr.length-1];//关联房屋
            customerEventVO.event_type=this.ruleForm.event_type;   //事件类型
            customerEventVO.event_depict=this.ruleForm.event_depict;   //事情描述
            customerEventVO.agent=this.ruleForm.agent;   //受理人
            customerEventVO.process_mode=this.ruleForm.process_mode;   //处理方式
            customerEventVO.eventDate=this.ruleForm.occurrenceTime;   //发生时间
            customerEventVO.visitDate = this.ruleForm.visitTime;  //回访时间
            customerEventVO.visit_condition = this.ruleForm.visit_condition;  //回访情况
            customerEventVO.event_loss = this.ruleForm.event_loss;   //事件损失
            customerEventVO.cacsi = this.ruleForm.process_cacsi;   //处理满意度


            var feedbackMessageVO={};   //客户反馈信息的数据
            feedbackMessageVO.name=this.ruleForm.name;           //租户姓名
            feedbackMessageVO.phone=this.ruleForm.phone;   //电话号码
            var arr=this.ruleForm.house;
            feedbackMessageVO.room=arr[arr.length-1];//关联房屋
            feedbackMessageVO.category=this.ruleForm.event_type;   //事件类型
            feedbackMessageVO.process_condition = this.ruleForm.process_condition;  //处理情况
            feedbackMessageVO.processTime = this.ruleForm.processTime;  //处理时间
            feedbackMessageVO.visitTime = this.ruleForm.visitTime;  //回访时间
            feedbackMessageVO.content=this.ruleForm.event_depict;   //事情描述
            feedbackMessageVO.handler=this.ruleForm.agent;   //受理人
            feedbackMessageVO.process_cacsi=this.ruleForm.process_cacsi;   //处理满意度
            feedbackMessageVO.visit_condition=this.ruleForm.visit_condition;   //回访情况
            feedbackMessageVO.occurrenceTime=this.ruleForm.occurrenceTime;   //反馈时间
            feedbackMessageVO.visit_cacsi=this.ruleForm.visit_cacsi;   //回访满意度
            feedbackMessageVO.remarks=this.ruleForm.remarks;   //备注
          
        if(this.$route.query.msg === 2){   //客户反馈信息查看
           this.goBack()
        }else if(this.$route.query.msg === 3){  //客户反馈信息修改
            feedbackMessageVO.id = this.id;
            this.$ajax.put(url+"feedbackMessage/update",feedbackMessageVO).then((res) => {
                        if(res.data.status === 200){
                         this.$message({
                                message: '修改数据成功',
                                type: 'success'
                            }),
                            this.goBack()
                        }else if(res.data.status===403){
                            this.$message({
                                message:'权限不足',
                                type: 'error'
                            })
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                        }) 
                     }
                       
            })
          
        }else if(this.$route.query.msg === 1){    //客户事件新增
            this.$ajax.post(url+"customerEvent/insert",customerEventVO).then((res) => {
               if(res.data.status === 200){
                         this.$message({
                                 message: '增加数据成功',
                                type: 'success'
                            }),
                            this.goBack()
                        }else if(res.data.status===403){
                            this.$message({
                                message:'权限不足',
                                type: 'error'
                            })
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                        }) 
                     }
            })
            
        }else if(this.$route.query.msg === 4){  //客户事件查看
          this.goBack()
          
        }else if(this.$route.query.msg === 5){   //客户事件回访
            customerEventVO.id = this.id;
           this.$ajax.put(url+"customerEvent/update",customerEventVO).then((res) => {
                   if(res.data.status === 200){
                         this.$message({
                                message: '修改数据成功',
                                type: 'success'
                            }),
                            this.goBack()
                        }else if(res.data.status===403){
                            this.$message({
                                message:'权限不足',
                                type: 'error'
                            })
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                        }) 
                     }
            })
         
        }else{                            //客户反馈信息新增
            this.$ajax.post(url+"feedbackMessage/insert",feedbackMessageVO).then((res) => {
                   if(res.data.status === 200){
                         this.$message({
                                 message: '添加数据成功',
                                type: 'success'
                            }),
                            this.goBack()
                        }else if(res.data.status===403){
                            this.$message({
                                message:'权限不足',
                                type: 'error'
                            })
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                        }) 
                     }
            })
        }
            
        },
        goBack(){
            window.history.back()
        },
        handleChange(value) {
            this.$ajax.get(url + 'owner/findOwnerByRoomId/'+value[2]).then(res => {
              if(res.data.status === 200){
                  this.ruleForm.name = res.data.data.name
                  this.ruleForm.phone = res.data.data.phone
              }else{
                  this.$message({
                      message:res.data.msg,
                      type: 'error'
                  })
                  this.ruleForm.name = '',
                  this.ruleForms.phone = ''
              }
          })
      }
    }

}
</script>

<style scoped>
.addCustomer {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
    height: 100%;
}
.tianjia{
    vertical-align: top;
}


.next input {
    margin-left: 20px
}

.input {
    margin: 5% 14% 0 10%
}
.nextStep {
  border-radius: 5px;
  background-color: rgb(50, 168, 238);
  width: 65px;
  height: 33px;
  border: none;
  color: white;
}

.cancel {
  border-width: 1px;
  border-color: rgb(217, 217, 217);
  border-style: solid;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  width: 63px;
  height: 33px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(138, 138, 138);
}
.nn {
    width: 20%;
    margin: 2% 0 0 40%;
    display: flex;
    justify-content: space-between;
}
.input {
    display: block;
}
.el-radio {
    display: block;
    margin-top: 15px;
}
.el-radio+.el-radio {
    margin-left: 0!important;
}
#fenkai {
    display: inline-block;
    width: 49%;
}
#fenkai1 {
    display: inline-block;
    width: 49%;
}
</style>
