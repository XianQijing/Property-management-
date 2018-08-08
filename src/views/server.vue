<template>
    <div class="server">
        <h3>服务派单</h3>
        <el-form :model="detail" ref="detail" label-width="130px" class="demo-detail">
        <div class="tianjia">
            <div class="input">
                
                    <el-form-item label="姓名:">
                        <el-input v-model="detail.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="关联房屋:">
                        <el-cascader expand-trigger="hover" :options="options" v-model="detail.house" @change="handleChange"></el-cascader>
                        
                    </el-form-item>
                    <el-form-item label="服务类别:">
                        
                        <el-select v-model="detail.service_classes" placeholder="服务类别">
                            <el-option
								v-for="item in service"
								:key="item.value"
								:label="item.value"
								:value="item.value">
							</el-option>
                        </el-select>
                    </el-form-item>
                     <div class="zhuangxiu">
                        <el-form-item label="受理时间:">
                            <el-date-picker
							v-model="detail.receiverTime"
							type="datetime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
							placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                    <el-form-item label="开工时间:">
                         <el-date-picker
							v-model="detail.startTime"
							type="datetime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
							placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    </div>
                    
                    <el-form-item label="派工至:">
                        <el-input v-model="detail.handler" clearable></el-input>
                    </el-form-item>


            </div>
        </div>

        <div class="tianjia">
            <div class="input">
                    <el-form-item label="手机号：">
                        <el-input v-model="detail.phone" v-on:blur="transform" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-input v-model="detail.leaseType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="报修方式:">
                        <el-select v-model="detail.way" placeholder="报修方式">
                            <el-option
								v-for="item in ways"
								:key="item.value"
								:label="item.value"
								:value="item.value">
							</el-option>
                        </el-select>
                    </el-form-item>
                    <div class="zhuangxiu">
                        <el-form-item label="派工时间:">
                            <el-date-picker
							v-model="detail.dispatchingTime"
							type="datetime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
							placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                    <el-form-item label="完工时间:">
                        <el-date-picker
							v-model="detail.endTime"
							type="datetime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
							placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    </div>
                    <el-form-item label="专业分类:">
                        <el-input v-model="detail.professional_list" clearable></el-input>
                    </el-form-item>
                    
            </div>
        </div>
        <div style="width:90%">
            <el-form-item label="要求处理事项：">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="detail.problem">
        </el-input>
        </el-form-item>
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
    name:'server',
    data(){
        return{
            detail: {
                name: '',
                area: '',
                house: [],
                server:'',
                startTime: '',
                sendTime: '',
                to:'',
                phone: '',
                mold: '',
                type: '',
                endTime:'',
                time:'',
                card: '',
                person:'',
                require: '',
                textarea:'',
            },
            service:[

            ],
            ways:[

            ],
            options: [
          {
          value: 'bangongqu',
          label: '办公区',
          children: [{
              value: 'Azuo',
              label: 'A座',
              children: [{
                value: '101',
                label: '101'
              }, {
                value: '102',
                label: '102'
              }, {
                value: '103',
                label: '103'
              }, {
                value: '104',
                label: '104'
              },
              {
                value: '105',
                label: '105'
              }]
          }, 
          {
            value: 'Bzuo',
            label: 'B座',
            children: [{
              value: '101',
              label: '101'
            }, {
              value: '102',
              label: '102'
            }, {
              value: '103',
              label: '103'
            }, {
              value: '104',
              label: '104'
            },
            {
              value: '105',
              label: '105'
            }]
          },{
            value: 'Czuo',
            label: 'C座',
            children: [{
              value: '101',
              label: '101'
            }, {
              value: '102',
              label: '102'
            }, {
              value: '103',
              label: '103'
            }, {
              value: '104',
              label: '104'
            },
            {
              value: '105',
              label: '105'
            }]
          }]
        },{
          value: 'yanjiedianpu',
          label: '沿街店铺',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
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
        console.log(this.$route.query.id)
         this.id = this.$route.query.id
         
        
         this.$ajax.get(url + 'serviceAccept/findByDictType/1').then(res => {
                this.service=res.data;
         })
         this.$ajax.get(url + 'serviceAccept/findByDictType/2').then(res => {
                this.ways=res.data;
         })
        if(this.$route.query.msg == 8){
            this.$ajax.get(url +'serviceAccept/findIdVO/'+this.id).then(res => {
                this.detail = res.data;
                this.detail.house = [res.data.precinct, res.data.buildings, res.data.room];
                this.editChange(res.data.name,res.data.phone)
            })
        }else(
            this.datail = '',
            this.$ajax.get(url + 'room/flndByClientId/aaa'+'').then(res => {
                this.options=res.data;
            })
        )
    },
    methods: {
    //   handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //   },
    //   handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //   },
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
    transform:function(){
          if(!this.detail.name){
              alert("请先输入业主姓名");
          }else if(!this.detail.phone){
              alert("请输入电话号码");
          }else{
           this.$ajax.get(url + 'owner/findByNameAndPhone/'+this.detail.name+'/'+this.detail.phone).then(res => {
                var aa = "";
                if(!res.data){
                    alert("业主姓名和业主电话号码输入有误！");
                    aa = "aaa";
                }else{
                    aa = res.data.id;
                }
                 this.$ajax.get(url + 'room/flndByClientId/'+aa).then(res => {
                     this.options=res.data;
                 })
                console.log(res.data)
            })
          }
      },

    //修改或新增服务派工
	   addOne(){
            var serviceAcceptVO={};
            serviceAcceptVO.name=this.detail.name;           //租户姓名
            serviceAcceptVO.service_classes=this.detail.service_classes;   //服务类别
            var arr=this.detail.house;
            serviceAcceptVO.roomNumber=arr[arr.length-1];//关联房屋
            serviceAcceptVO.startTime=this.detail.startTime;    //开始时间
            serviceAcceptVO.endTime=this.detail.endTime;    //结束时间
            serviceAcceptVO.dispatchingTime=this.detail.dispatchingTime;    //派工时间
            serviceAcceptVO.handler=this.detail.handler;    //派工至
            serviceAcceptVO.phone=this.detail.phone;    //手机号
            serviceAcceptVO.leaseType=this.detail.leaseType;   //类型
            serviceAcceptVO.way=this.detail.way;   //报修方式
            alert(serviceAcceptVO.way);
            serviceAcceptVO.receiverTime=this.detail.receiverTime;    //工时
            serviceAcceptVO.professional_list=this.detail.professional_list;    //专业分类
            serviceAcceptVO.problem=this.detail.problem;    //要求处理事项
            serviceAcceptVO.remarks=this.detail.remarks;    //备注
            if(this.$route.query.msg == 8){
                 serviceAcceptVO.id = this.id;
                this.$ajax.put(url+"serviceAccept/update",serviceAcceptVO).then((res) => {
                    this.form = res.data
                    console.log(this.form);
                     if(res.data=="seccess"){
                         alert("修改数据成功");
                     }else{
                            alert("失败");
                     }
                })
            }else{
                this.$ajax.post(url+"serviceAccept/insert",serviceAcceptVO).then((res) => {
                    this.form = res.data
                    console.log(this.form);
                     if(res.data=="seccess"){
                         alert("增加数据成功");
                     }else{
                            alert("失败");
                     }
                })
            }
            
        },
      goBack(){
          window.history.back()
      },
      handleChange(value) {
        //console.log(value);
      }
    }
}
</script>

<style scoped>
.server {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
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
