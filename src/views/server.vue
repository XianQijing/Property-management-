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
                        <el-select v-model="detail.server" placeholder="请选择小区">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="zhuangxiu">
                    <el-form-item label="开工时间:">
                        <el-input v-model="detail.startTime"></el-input>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                        <el-form-item label="派工时间:">
                        <el-input v-model="detail.sendTime"></el-input>
                    </el-form-item>
                    </div>
                    <el-form-item label="派工至:">
                        <el-select v-model="detail.to" placeholder="请选择小区">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
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
                    <el-form-item label="报修方式:">
                        <el-select v-model="detail.type" placeholder="请选择小区">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="zhuangxiu">
                    <el-form-item label="完工时间:">
                        <el-input v-model="detail.endTime"></el-input>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                        <el-form-item label="工时:">
                        <el-input v-model="detail.time"></el-input>
                    </el-form-item>
                    </div>
                    <el-form-item label="专业分类:">
                        <el-input v-model="detail.person" clearable></el-input>
                    </el-form-item>
                    
            </div>
        </div>
        <div style="width:90%">
            <el-form-item label="要求处理事项：">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="detail.require">
        </el-input>
        </el-form-item>
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
    methods: {
    //   handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //   },
    //   handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //   },
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
