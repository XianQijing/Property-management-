<template>
<!--客户关系-添加-->
    <div class="relationshipAdd">
        <h3>{{this.name}}客户</h3>
        <div class="tianjia">
            <div class="input">
            <el-form :model="addCustomer" :rules="rules" ref="addCustomer" label-width="130px" size="small" class="demo-addCustomer" :disabled="edit">
               <el-form-item label="关联房屋:" prop="selectRoom">
                   <div class="block">{{addCustomer.selectRoom}}
                   <el-cascader expand-trigger="hover" :options="options" v-model="addCustomer.selectRoom" @change="handleChange"></el-cascader>
                   </div>
                </el-form-item>

                <el-form-item label="姓名:" prop="name">
                <el-input v-model="addCustomer.name" placeholder="请输入租户姓名"></el-input>
                </el-form-item>
                <div class="ww">
                  <el-form-item label="性别:" prop="radio">
                      <el-radio v-model="addCustomer.radio" label="man" >男</el-radio>
                      <el-radio v-model="addCustomer.radio" label="women">女</el-radio>
                    </el-form-item>
                </div>
                <div class="ww">
                    <el-form-item label="国籍:">
                      <el-input v-model="addCustomer.nationality" placeholder="请输入租户国籍"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="民族:">
                    <el-input v-model="addCustomer.nation" placeholder="请输入租户民族"></el-input>
                  </el-form-item>
                  <el-form-item label="籍贯:">
                    <el-input v-model="addCustomer.place" placeholder="请输入租户籍贯"></el-input>
                  </el-form-item>
                  <el-form-item label="政治面貌:">
                    <el-input v-model="addCustomer.political" placeholder="请输入租户政治面貌"></el-input>
                </el-form-item>
                <div class="ww">
                    <el-form-item label="身份证号:">
                      <el-input v-model="addCustomer.card" placeholder="请输入租户身份证号"></el-input>
                    </el-form-item>
                </div>
                <div class="ww">
                    <el-form-item label="生日:">
                      <el-date-picker
                          v-model="addCustomer.birth"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <el-form-item label="手机号:">
                      <el-input v-model="addCustomer.phone" placeholder="请输入租户手机"></el-input>
                </el-form-item>
                <div class="ww">
                    <el-form-item label="邮箱:">
                      <el-input v-model="addCustomer.mail" placeholder="请输入租户邮箱"></el-input>
                    </el-form-item>
                </div>
                <div class="ww">
                    <el-form-item label="邮编:">
                      <el-input v-model="addCustomer.post" placeholder="请输入邮编"></el-input>
                    </el-form-item>
                </div>
                <div class="ww">
                    <el-form-item label="紧急联系人:">
                      <el-input v-model="addCustomer.contact" placeholder="请输入紧急联系人"></el-input>
                    </el-form-item>
                </div>
                <div class="ww">
                    <el-form-item label="联系电话:">
                      <el-input v-model="addCustomer.contactPhone" ></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="现住址:">
                      <el-input v-model="addCustomer.address" ></el-input>
                    </el-form-item>
                    <el-form-item label="传真:">
                      <el-input v-model="addCustomer.fax"></el-input>
                    </el-form-item>
            </el-form>
            </div>
            <div class="nn" v-show="xiangqing">
            <button class="nextStep" @click="goBack">确定</button><button class="cancel" @click="goBack">返回</button>
            </div>
        <div class="nn" v-show="bianji">
            <button class="nextStep"  @click="addOne">保存</button><button class="cancel" @click="goBack">取消</button>
        </div>
        </div>
        
    </div>
</template>

<script>
import url from '../assets/Req.js'
export default {
    data(){
        return{
          edit: true,
          bianji:false,
          name:"查看",
          xiangqing:true,
          addCustomer: {
              name: '',
              selectRoom: ["bangongqu","Azuo","105"],
              radio: '',
              nationality:'',
              nation: '',
              place: '',
              political:'',
              card: '',
              birth:'',
              phone:'',
              mail: '',
              post: '',
              contact:'',
              contactPhone:'',
              address:'',
              fax:''
        },
         rules: {
          name: [
            { required: true, message: '请输入所在楼层', trigger: 'blur' },
          ],
          selectRoom: [
            { required: true, message: '请选择小区/楼宇/单元', trigger: 'change' }
          ],
          roomnumber: [
            { required: true, message: '请输入房号', trigger: 'blur' }
          ],
          buildArea: [
            { required: true, message: '请输入建筑面积', trigger: 'blur' }
          ]
        },
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
        }],

        }
    },
    mounted(){
            this.id = this.$route.query.id
            // console.log("id"+this.$route)
            this.roomid = this.$route.query.roomid
            
            this.sa()
            
    },
    methods:{
        submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      sa(){
        // console.log(this.roomid)
            this.$ajax.get(url + 'room/flndByClientId'+'').then(res => {
                // console.log(res.data)
                // console.log(res)
                this.options=res.data;
               
            })
            this.$ajax.get(url + 'owner/get/'+this.id+'/'+this.roomid+'').then(res => {
                console.log(res.data.sexs)
                this.addCustomer.name=res.data.name;
                //this.addCustomer.selectRoom=res.data.buildingName+res.data.roomNumber;
                this.addCustomer.radio=res.data.sexs;
                this.addCustomer.nationality=res.data.nationality;
                this.addCustomer.nation=res.data.nation;
                this.addCustomer.place=res.data.nativeAddress;
                this.addCustomer.political=res.data.politicsStatus;
                this.addCustomer.card=res.data.idCard;
                this.addCustomer.birth=res.data.birthday;
                this.addCustomer.phone=res.data.phone;
                this.addCustomer.mail=res.data.email;
                this.addCustomer.post=res.data.postcode;
                this.addCustomer.contact=res.data.linkman;
                this.addCustomer.contactPhone=res.data.linkphone;
                this.addCustomer.address=res.data.address;
                 this.addCustomer.fax=res.data.fax;
            })
            if(this.$route.query.bian==="qq"){
              this.name = "编辑",
              this.bianji = true,
              this.xiangqing = false,
              this.edit = false
            }else if(this.$route.query.bian==="no"){
              this.name = "查看",
              this.bianji = false,
              this.xiangqing = true,
              this.edit = true
            }
      },
      //修改客户资料
			addOne(){
            var owner={};
            owner.id = this.id;
           // alert(this.id);
            owner.name=this.addCustomer.name;
           var sexs=this.addCustomer.radio;
            if(sexs == 'man'){
              owner.sex = 1; 
            }else{
              owner.sex = 0;
            }
            // console.log(this.addCustomer.radio);
            owner.nationality=this.addCustomer.nationality;
            owner.nation=this.addCustomer.nation;
            owner.nativeAddress=this.addCustomer.place;
            owner.politicsStatus=this.addCustomer.political;
            owner.idCard=this.addCustomer.card;
            owner.birthday=this.addCustomer.birth;
            owner.phone=this.addCustomer.phone;
            owner.email=this.addCustomer.mail;
            owner.postcode=this.addCustomer.post;
            owner.linkman=this.addCustomer.contact;
            owner.linkphone=this.addCustomer.contactPhone;
            owner.address=this.addCustomer.address;
            owner.fax=this.addCustomer.fax;
            this.$ajax.put(url+"owner/update",owner
            ).then((res) => {
                this.form = res.data
				        // console.log(this.form);
            })
        },
        goBack(){
            window.history.back()
        },
      //   handleChange(file, fileList) {
      //   this.fileList = fileList.slice(-2);
      // },
      // 上传成功后的回调
    // uploadSuccess (response, file, fileList) {
    //   console.log('上传文件', response)
    // },
    // 上传错误
    // uploadError (response, file, fileList) {
    //   console.log('上传失败，请重试！')
    // },
    }
}
</script>

<style scoped>
.relationshipAdd {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
}
.tianjia{
    vertical-align: top;
}


.input {
    width: 40%;
    margin: 0 0 0 24%;
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
    margin: 3% 0 0 40%;
    display: flex;
    justify-content: space-between;
    height: 500px;
}
/*  */
.el-input__inner {
  height: 32px;
}
.ww{
  display: inline-block;
  width: 49%
}

</style>
