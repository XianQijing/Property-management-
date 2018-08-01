<template>
<!--房间-添加房间-->
    <div class="next">
        <h3>{{this.name}}房间</h3>
        <div class="tianjia" v-show="show1">
            <div class="input">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
               <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
                <el-form-item label="所在楼层:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入所在楼层"></el-input>
                </el-form-item>
                <el-form-item label="房号:" prop="roomnumber">
                <el-input v-model="ruleForm.roomnumber" placeholder="请输入房号"></el-input>
                </el-form-item>
                <el-form-item label="建筑面积:" prop="buildArea">
                <el-input v-model="ruleForm.buildArea" placeholder="请输入建筑面积">
                    <template slot="append">平方米</template>
                </el-input>
                </el-form-item>
                <el-form-item label="套内面积:" prop="roomArea">
                <el-input v-model="ruleForm.roomArea" placeholder="请输入套内面积">
                    <template slot="append">平方米</template>
                </el-input>
                </el-form-item>
                <el-form-item label="公摊面积:" prop="publicArea">
                <el-input v-model="ruleForm.publicArea" placeholder="请输入公摊面积">
                    <template slot="append">平方米</template>
                </el-input>
                </el-form-item>
                <el-form-item label="房屋类型:" prop="roomType">
                <el-input v-model="ruleForm.roomType" placeholder="请输入房屋类型"></el-input>
                </el-form-item>
                <el-form-item label="房屋标签:" prop="roomLabel">
                <el-input v-model="ruleForm.roomLabel" placeholder="请输入房屋标签"></el-input>
                </el-form-item>
                <el-form-item label="房屋户型:" prop="houseType">
                <el-input v-model="ruleForm.houseType.shi" style="width:32%">
                    <template slot="append">室</template>
                </el-input>
                <el-input v-model="ruleForm.houseType.ting" style="width:32%">
                    <template slot="append">厅</template>
                </el-input>
                <el-input v-model="ruleForm.houseType.wei" style="width:32%">
                    <template slot="append">卫</template>
                </el-input>
                </el-form-item>
            </el-form>
            </div>
            <div class="nn">
            <button class="nextStep" @click="show2 = true,show1 =false">下一步</button><button class="cancel" @click="goBack">取消</button>
            </div>
        </div>
        <!--下一步-->
        <div v-show="show2" class="tianjia">
            <div class="input">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="房间朝向:" prop="houseDirection">
                <el-input v-model="ruleForm.houseDirection" placeholder="请输入房屋类型"></el-input>
                </el-form-item>
                <el-form-item label="交房时间:" prop="time">
                <el-date-picker v-model="ruleForm.time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="产权年限:" prop="houseYear">
                <el-input v-model="ruleForm.houseYear" placeholder="请输入房屋类型">
                    <template slot="append">年</template>
                </el-input>
                </el-form-item>
                <!-- 上传 -->
                <el-form-item label="附件:" prop="Enclosure">
                    <div style="margin-left:20px">
                    <span>最多可上传5张组片,且图片大小不超过2M.</span>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                     <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                </div>
                </el-form-item>
                <el-form-item label="备注:" prop="remarks">
                <el-input v-model="ruleForm.remarks" placeholder="请输入房屋类型"></el-input>
                </el-form-item>
            </el-form>
            
            </div>
            <div class="nn">
            <button class="nextStep">保存</button><button class="cancel" @click="show1 = true,show2 =false">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import url from '../assets/Req.js'
export default {
    data(){
        return{
            show1:true,
            show2:false,
            name:'',
            ruleForm: {
                name: '',
                region: '',
                roomnumber: '',
                buildArea:'',
                houseType: {
                    shi: '',
                    ting: '',
                    wei: ''
                },
                roomLabel: '',
                roomType: '',
                roomArea: '',
                buildLabel:'',
                houseDirection:'',
                time: '',
                houseYear:'',
                remarks:''
            },
            dialogImageUrl: '',
            dialogVisible: false,
         rules: {
          name: [
            { required: true, message: '请输入所在楼层', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择小区/楼宇/单元', trigger: 'change' }
          ],
          roomnumber: [
            { required: true, message: '请输入房号', trigger: 'blur' }
          ],
          buildArea: [
            { required: true, message: '请输入建筑面积', trigger: 'blur' }
          ]
        },
        }
    },
    mounted(){
        console.log(this.$route.query.id)
        if (this.$route.query.id!=="qq") {
            this.name = "编辑"
            console.log(this.$route.query.id)
            this.id = this.$route.query.id
            this.name = "编辑"
            this.$ajax.get(url + 'building/flndById/'+this.id+'').then(res => {
                console.log(res.data.data)
            })
        }else if(this.$route.query.id==="qq"){
            this.name = "添加"
            console.log(this.$route.query.id)
        }
    },
    methods:{
        goBack(){
            window.history.back()
        },
        handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    }
}
</script>

<style scoped>
.next {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
}
.tianjia{
    vertical-align: top;
}


.next input {
    margin-left: 20px
}

.input {
    width: 40%;
    margin: 4% 0 0 24%;
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
    height: 500px;
}
.el-icon-date:before {
    margin-left: 20px;
}
</style>
