<template>
    <div class="return">
        <h3>服务派单回访</h3>

        <el-form :model="input" ref="detail" label-width="130px" class="demo-detail">
            <div style="width:92.5%;margin-bottom:20px;">
            <div class="pp">
                    <el-form-item label="满意程度:">
                        <el-input v-model="input.name" ></el-input>
                    </el-form-item>
                </div>
                <div class="pp">
                    <el-form-item label="验收情况:">
                        <el-input :value="detail.name"></el-input>
                    </el-form-item>
                </div>
                <div class="pp">
                    <el-form-item label="回访情况:">
                        <el-input :value="detail.name"></el-input>
                    </el-form-item>
                </div>
                <div class="pp">
                    <el-form-item label="服务及时率:">
                        <el-input :value="detail.name"></el-input>
                    </el-form-item>
                </div>
                </div>
        <div class="tianjia">
            <div class="input">
                    <el-form-item label="姓名:">
                        <el-input :value="detail.name"  readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="关联房屋:">
                        <el-input :value="detail.house"  readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="服务类别:">
                        <el-select :value="detail.server"  readonly="readonly">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="zhuangxiu">
                    <el-form-item label="开工时间:">
                        <el-input :value="detail.startTime" readonly="readonly"></el-input>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                        <el-form-item label="派工时间:">
                        <el-input :value="detail.sendTime" readonly="readonly"></el-input>
                    </el-form-item>
                    </div>
                    <el-form-item label="派工至:">
                        <el-select :value="detail.to"  readonly="readonly">
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
                        <el-input :value="detail.mold"  readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="报修方式:">
                        <el-select :value="detail.type"  readonly="readonly">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="zhuangxiu">
                    <el-form-item label="完工时间:">
                        <el-input :value="detail.endTime"  readonly="readonly"></el-input>
                    </el-form-item>
                    </div>
                    <div class="zhuangxiu">
                        <el-form-item label="工时:">
                        <el-input :value="detail.time"  readonly="readonly"></el-input>
                    </el-form-item>
                    </div>
                    <el-form-item label="专业分类:">
                        <el-input :value="detail.person"  readonly="readonly"></el-input>
                    </el-form-item>
                    
            </div>
        </div>
        <div style="width:90%">
            <el-form-item label="要求处理事项：">
            <el-input type="textarea" :rows="4"  :value="detail.require" readonly="readonly">
        </el-input>
        </el-form-item>
        <el-form-item label="备注：">
            <el-input type="textarea" :rows="4"  :value="detail.textarea" readonly="readonly">
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
    name:'return',
    data(){
        return{
            detail: {
                name: '李文',
                area: 'ffre',
                house: '办公室C座301',
                server:'deff',
                startTime: '2018.6.23',
                sendTime: '2017.6.23',
                to:'sdfsd',
                phone: '18874562233',
                mold: 'erw',
                type: 'beijing',
                endTime:'2017.6.23',
                time:'2017.6.23',
                card: '',
                person:'',
                require: '',
                textarea:'',
            },
            input: {
                name
            },
            
        }
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
