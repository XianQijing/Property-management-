<template>
    <div class="apply">
        <h3>装修申请</h3>
        <el-form :model="detail" ref="detail" :rules="rules" label-width="130px" class="demo-detail" :disabled="edit">
        <div class="tianjia">
            <div class="input">
                
                    <el-form-item label="租户姓名:" prop="name">
                        <el-input v-model="detail.name" v-on:blur="transformName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="关联房屋:" prop="house">
                        <el-cascader expand-trigger="hover" :options="options" v-model="detail.house" @change="handleChange"></el-cascader>
                    </el-form-item>
                    <el-form-item label="负责人电话:" prop="principal_phone">
                        <el-input v-model="detail.principal_phone" @blur="blur" clearable></el-input>
                    </el-form-item>

                    <el-form-item label="开始装修时间:">
                        <el-date-picker
							v-model="detail.startTime"
							type="datetime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
							placeholder="选择日期时间">
						</el-date-picker>
                    </el-form-item>

                        


                    <el-form-item label="装修性质:">
                         <el-radio-group v-model="detail.natureName">
                            <el-radio label="客户自行装修"></el-radio>
                            <el-radio label="委托装修公司"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                     <el-form-item label="装修项目:">
                        <el-input v-model="detail.project " clearable></el-input>
                    </el-form-item>


            </div>
        </div>

        <div class="tianjia">
            <div class="input">
                   <el-form-item label="手机号：" prop="phone">
                        <el-input v-model="detail.phone" v-on:blur="transform" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="装修保证金：">
                        <el-input v-model="detail.cash_deposit" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="负责人身份证号:" prop="principal_card">
                        <el-input v-model="detail.principal_card" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="预估结束时间:">
                            <el-date-picker
							v-model="detail.endTime"
							type="datetime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
							placeholder="选择日期时间">
						</el-date-picker>
                    </el-form-item>
                    <el-form-item label="施工负责人:">
                        <el-input v-model="detail.principal_man" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="装修公司名称:">
                        <el-input v-model="detail.company" clearable></el-input>
                    </el-form-item>
            </div>
        </div>
        <div style="width:90%">
        <el-form-item label="备注：">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="detail.remarks">
        </el-input>
        </el-form-item>
        </div>
        </el-form>
        <div class="nn">
            <button class="nextStep" @click="addOne">保存</button><button class="cancel" @click="goBack">返回</button>
            </div>
    </div>
</template>

<script>
import url from '../assets/Req.js'	

export default {
    name:'apply',
    data(){
        return{
            detail: {
                name: '',
                area: '',
                house: [],
                startTime: '',
                endTime: '',
                fitUp:'客户自行装修',
                project: '',
                phone:'',
                mold: '',
                money: '',
                card: '',
                person:'',
                company:'',
                textarea:'',
            },
            options: [],
         rules: {
          name: [
            { required: true, message: '请输入租户姓名', trigger: 'blur' },
          ],
          house: [
            { required: true, message: '请选择关联房屋', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          principal_phone: [
            { required: true, message: '请输入负责人手机号', trigger: 'blur' },
          ],
          principal_card:[
            { required: true, message: '请输入负责人身份证号', trigger: 'blur' },
          ]
         },
         edit:true
            
            // input: {
            //     name: '李文',
            //     sex: '男',
            //     house: '办公室C座301',
            //     type:'管理费',
            //     money: '5000元/年',
            //     time: '2018.6.23',
            //     startTime: '2017.6.23',
            //     card: '323265787894',
            //     phone:'18874562233',
            //     mold: '办公区',
            //     ammeter:'1354',
            //     watermeter:'787',
            //     textarea:'2年',
            //     rentTime:'2年',
            // },
            
        }
    },
    mounted(){
         this.id = this.$route.query.id
        if(this.$route.query.msg == 8){
            this.$ajax.get(url +'adornApply/findIdVO/'+this.id).then(res => {
                if(res.status === 200){
                this.detail = res.data;
                this.detail.house = [res.data.precinct, res.data.buildings, res.data.room];
                this.editChange(res.data.name,res.data.phone)
                this.edit = true
                }else if(res.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.goBack()
                    }
                    });
                }
            })
        }else if(this.$route.query.msg == 7){
            this.$ajax.get(url +'adornApply/findIdVO/'+this.id).then(res => {
                if(res.status === 200){
                this.detail = res.data;
                this.detail.house = [res.data.precinct, res.data.buildings, res.data.room];
                this.editChange(res.data.name,res.data.phone)
                this.edit = false
                }else if(res.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.goBack()
                    }
                    });
        }
            })
        }else(
            this.datail = '',
            this.edit = false,
            this.$ajax.get(url + 'room/flndByClientId/aaa').then(res => {
                this.options=res.data;
             })
        )
    },
    methods: {
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
       //编辑事件时弹出该客户已有的房间
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
          if(!this.detail.name){
              this.$message({
                message: '请先输入业主姓名',
                 type: 'error'
               })
            
          }else{
              if(!this.detail.phone){
                  this.$ajax.get(url + 'owner/findByName/'+this.detail.name).then(res => {
                       if(res.data.length==0){
                           this.$message({
                                message: '没有找到该业主的任何信息',
                                type: 'error'
                            })
                          
                         this.detail.name = null;
                       }
                   })
                 }else{
                      this.$ajax.get(url + 'owner/findByNameAndPhone/'+this.detail.name+'/'+this.detail.phone).then(res => {
                        if(!res.data){
                             
                            this.detail.phone = null;
                        }
                    })
                 }
              }
      },
    //失去焦点事件，当移开电话时判断
      transform:function(){
          if(!this.detail.name){
               this.$message({
                      message: '请先输入业主姓名',
                    type: 'error'
                }) 

          }else if(!this.detail.phone){
                         this.$message({
                                message: '请输入电话号码',
                                type: 'error'
                            }) 

          }else{
           this.$ajax.get(url + 'owner/findByNameAndPhone/'+this.detail.name+'/'+this.detail.phone).then(res => {
                var aa = "";
                if(!res.data){
                     this.$message({
                                message: '业主绑定的电话号码有误，请重新输入！',
                                type: 'error'
                            })
                    this.detail.phone = null;
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
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
      },
      //修改或新增装修申请
	   addOne(){
            var adornApplyvo={};
            adornApplyvo.name=this.detail.name;           //租户姓名
            adornApplyvo.principal_phone=this.detail.principal_phone;   //负责人电话号码
            var arr=this.detail.house;
            adornApplyvo.roomNumber=arr[arr.length-1];//关联房屋
            adornApplyvo.startTime=this.detail.startTime;    //开始装修时间
            adornApplyvo.endTime=this.detail.endTime;    //预估结束时间
            adornApplyvo.natureName=this.detail.natureName;    //装修性质
            adornApplyvo.project=this.detail.project;    //装修项目
            adornApplyvo.phone=this.detail.phone;    //手机号
            adornApplyvo.leaseType=this.detail.leaseType;   //类型
            adornApplyvo.cash_deposit=this.detail.cash_deposit;   //装修保证金
            adornApplyvo.principal_card=this.detail.principal_card;    //负责人身份证号
            adornApplyvo.principal_man=this.detail.principal_man;    //施工负责人
            adornApplyvo.company=this.detail.company;    //装修公司名称
            adornApplyvo.remarks=this.detail.remarks;    //备注
            if(this.$route.query.msg == 7){
                 adornApplyvo.id = this.id;
                this.$ajax.put(url+"adornApply/update",adornApplyvo).then((res) => {
                    this.form = res.data
                     if(res.data.status === 200){
                         this.$message({
                                message: '修改数据成功',
                                type: 'success'
                            }),
                            this.goBack()
                        }else if(res.data.status===403){
                            this.$message({
                                message: '权限不足',
                                type: 'error'
                            })
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                        }) 
                     }
                })
            }else if(this.$route.query.msg == 8){
                this.goBack()
            }else{
                this.$ajax.post(url+"adornApply/insert",adornApplyvo).then((res) => {
                    this.form = res.data
                     if(res.data.status === 200){
                         this.$message({
                                message: '新增数据成功',
                                type: 'success'
                            }),
                            this.goBack()
                        }else if(res.data.status===403){
                            this.$message({
                                message: '权限不足',
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
                  this.detail.name = res.data.data.name
                  this.detail.phone = res.data.data.phone
              }else{
                  this.$message({
                      message:res.data.msg,
                      type: 'error'
                  })
                  this.detail.name = '',
                  this.detail.phone = ''
              }
          })
      }
    }
}
</script>

<style scoped>
.apply {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
    height: 100%;
}
.tianjia{
    display: inline-block;
    vertical-align: top;
    width: 47%;
}


.next input {
    margin-left: 20px
}

.input {
    width: 90%;

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
    margin: 4% 0 0 40%;
    display: flex;
    justify-content: space-between;
}
.el-upload-list--picture-card .el-upload-list__item{
    width: 123px;
    height: 123px;
}
.el-upload--picture-card{
    width: 123px;
    height: 123px;
}
form {
    margin-top: 35px;
}
.zhuangxiu {
    width: 49%;
    display: inline-block;
    vertical-align: top;
}
/* .el-radio{
    display: block;
    margin-left: 0;
    margin-top: 13px;
    margin-bottom: 52px;
}
.el-form-item__label {

} */
</style>
