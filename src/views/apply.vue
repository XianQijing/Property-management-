<template>
    <div class="apply">
        <h3>装修申请</h3>
        <el-form :model="detail" ref="detail" label-width="130px" class="demo-detail">
        <div class="tianjia">
            <div class="input">
                
                    <el-form-item label="租户姓名:">
                        <el-input v-model="detail.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话:">
                        <el-input v-model="detail.area" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="关联房屋:">
                        <el-cascader expand-trigger="hover" :options="options" v-model="detail.house" @change="handleChange"></el-cascader>
                    </el-form-item>
                    <div class="zhuangxiu">
                    <el-form-item label="开始装修时间:">
                        <el-date-picker
							v-model="detail.startTime"
							type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                        <el-form-item label="预估结束时间:">
                            <el-date-picker
							v-model="detail.endTime"
							type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
                    </el-form-item>
                    </div>

                    <el-form-item label="装修性质:">
                        <el-radio-group v-model="detail.fitUp">
                            <el-radio label="客户自行装修"></el-radio>
                            <el-radio label="委托装修公司"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="装修项目:">
                        <el-input v-model="detail.project" clearable></el-input>
                    </el-form-item>


            </div>
        </div>

        <div class="tianjia">
            <div class="input">
                    <el-form-item label="手机号：">
                        <el-input v-model="detail.phone" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-input v-model="detail.mold" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="装修保证金：">
                        <el-input v-model="detail.money" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="负责人身份证号:">
                        <el-input v-model="detail.card" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="施工负责人:">
                        <el-input v-model="detail.person" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="装修公司名称:">
                        <el-input v-model="detail.company" clearable></el-input>
                    </el-form-item>
            </div>
        </div>
        <div style="width:90%">
        <el-form-item label="备注：">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="detail.textarea">
        </el-input>
        </el-form-item>
        </div>
        </el-form>
        <div class="nn">
            <button class="nextStep">保存</button><button class="cancel" @click="goBack">返回</button>
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
                house: '',
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
        if(this.$route.query.msg == 8){
            this.$ajax.get(url + '',{
                params:{

                }
            }).then(res => {
                this.detail = res.data.data
            })
        }else(
            this.datail = ''
        )
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
      },
      goBack(){
          window.history.back()
      },
      handleChange(value) {
        console.log(value);
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
