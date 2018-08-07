<template>
    <div class="return">
        <h3>服务派单回访</h3>

        <el-form :model="input" ref="detail" label-width="130px" class="demo-detail">
            <div style="width:92.5%;margin-bottom:20px;">
            <div class="pp">
                    <el-form-item label="满意程度:">
                        <el-input v-model="input.cacsi" ></el-input>
                    </el-form-item>
                </div>
                <div class="pp">
                    <el-form-item label="验收情况:">
                        <el-input v-model="input.checkCondition"></el-input>
                    </el-form-item>
                </div>
                <div class="pp">
                    <el-form-item label="回访情况:">
                        <el-input v-model="input.visitExplain"></el-input>
                    </el-form-item>
                </div>
                <div class="pp">
                    <el-form-item label="服务及时率:">
                        <el-input v-model="input.serviceTimeliness"></el-input>
                    </el-form-item>
                </div>
                
                </div>
         </el-form>    
         <h4>申请信息</h4>
        <el-form  ref="detail" label-width="130px" class="demo-input" size = "small" :disabled=true>
        <div class="tianjia">
            <div class="input">
                    <el-form-item label="姓名:">
                        <el-input :value="detail.name"  readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="关联房屋:">
                        <el-input :value="detail.house"  readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="服务类别:">
                        <el-select :value="detail.service_classes"  readonly="readonly">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="zhuangxiu">
                        <el-form-item label="受理时间:">
                            <el-date-picker
							v-model="detail.receiverTime"
							type="datetime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
                            readonly="readonly"
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
                            readonly="readonly"
							placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    </div>
                    <el-form-item label="派工至:">
                        <el-select :value="detail.handler"  readonly="readonly">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>


            </div>
        </div>

        <div class="tianjia">
            <div class="input">
                    <el-form-item label="手机号：">
                        <el-input :value="detail.phone"  readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-input :value="detail.leaseType"  readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="报修方式:">
                        <el-select :value="detail.way"  readonly="readonly">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="zhuangxiu">
                        <el-form-item label="派工时间:">
                            <el-date-picker
							v-model="detail.dispatchingTime"
							type="datetime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
                            readonly="readonly"
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
                            readonly="readonly"
							placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    </div>
                   
                    <el-form-item label="专业分类:">
                        <el-input :value="detail.professional_list"  readonly="readonly"></el-input>
                    </el-form-item>
                    
            </div>
        </div>
        <div style="width:90%">
            <el-form-item label="要求处理事项：">
            <el-input type="textarea" :rows="4"  :value="detail.problem" readonly="readonly">
        </el-input>
        </el-form-item>
        <el-form-item label="备注：">
            <el-input type="textarea" :rows="4"  :value="detail.remarks" readonly="readonly">
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

    name:'return',
    data(){
        return{
            detail: {
                name: '李文',
                service_classes: '',
                house: '办公室C座301',
                professional_list:'',
                startTime: '2018.6.23',
                dispatchingTime: '2017.6.23',
                handler:'',
                phone: '18874562233',
                leaseType: '',
                way: 'beijing',
                endTime:'2017.6.23',
                receiverTime:'2017.6.23',
                problem: '',
                remarks:'',
           
            },
            input: {
                // cacsi: '满意',
                // visitExplain: '回访情况',
                // checkCondition: '验收情况',
                // serviceTimeliness: '服务及时率',
            },
            
        }
    },
    mounted(){
        console.log(this.$route.query.id)
         this.id = this.$route.query.id
         this.$ajax.get(url +'serviceAccept/findIdVO/'+this.id).then(res => {
                console.log(res.data)
                this.detail = res.data;
                this.detail.house =  res.data.buildingName+"-"+res.data.roomNumber;
         })
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
      },
       addOne(){
            var serviceVisit={};
            serviceVisit.acceptid = this.id;
            serviceVisit.cacsi = this.input.cacsi;
            serviceVisit.visitExplain = this.input.visitExplain;
            serviceVisit.checkCondition = this.input.checkCondition;
            serviceVisit.serviceTimeliness = this.input.serviceTimeliness;
            this.$ajax.post(url+"serviceVisit/insert",serviceVisit).then((res) => {
                this.form = res.data
                console.log(this.form);
                 if(res.data=="seccess"){
                         alert("添加数据成功");
                     }else{
                            alert("失败");
                     }
            })
        
        },
      goBack(){
          window.history.back()
      }
    }
}
</script>

<style scoped>
.return {
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
    margin: 2% 0 0 40%;
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
.pp{
    display: inline-block;
    width: 24%;
}

</style>
