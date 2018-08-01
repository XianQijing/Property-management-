<template>
    <div class="householdDetail">
        <h3>住户详情</h3>
        <div class="qq">
        <el-form :model="detail" ref="detail" label-width="130px" class="demo-detail" :disabled="edit">
        <div class="tianjia">
            <div class="input">
                
                    <el-form-item label="承租方:">
                        <el-input v-model="detail.name" :placeholder="input.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系地址:">
                        <el-input v-model="detail.address" :placeholder="input.address"></el-input>
                    </el-form-item>
                    <el-form-item label="关联房屋:">
                        <el-input v-model="detail.house" :placeholder="input.house"></el-input>
                    </el-form-item>
                    <el-form-item label="租赁时间:">
                        <el-input v-model="detail.startTime" :placeholder="input.startTime" style="width:44%"></el-input><span style="color:#c0c4cc"> —— </span>
                        <el-input v-model="detail.endtime" :placeholder="input.endtime" style="width:44%"></el-input>
                    </el-form-item>
                    <el-form-item label="租金:">
                        <el-input v-model="detail.price" :placeholder="input.price">
                            <template slot="append">元/天/平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="物业管理费:">
                        <el-input v-model="detail.price" :placeholder="input.price">
                            <template slot="append">元/天/平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="装修免租金日期:">
                        <el-input v-model="detail.price" :placeholder="input.price"></el-input>
                    </el-form-item>
            </div>
        </div>

        <div class="tianjia">
            <div class="input">
                    <el-form-item label="联系电话：">
                        <el-input v-model="detail.phone" :placeholder="input.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="建筑面积：">
                        <el-input v-model="detail.area" :placeholder="input.area"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺类型：">
                        <el-input v-model="detail.type" :placeholder="input.type"></el-input>
                    </el-form-item>
                    <el-form-item label="交付时间：">
                        <el-input v-model="detail.rentTime" :placeholder="input.rentTime"></el-input>
                    </el-form-item>
                    <el-form-item label="三年后租金增幅：">
                        <el-input v-model="detail.riseMoney" :placeholder="input.riseMoney" style="width:35%" >
                            <template slot="append">%/月</template>
                        </el-input>
                        <span>每月租金为：</span>
                        <el-input v-model="detail.rentMoney" :placeholder="input.rentMoney" style="width:35%">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="每两月缴费日期：">
                        <el-input v-model="detail.day" :placeholder="input.day"></el-input>
                    </el-form-item>
                    <el-form-item label="合同保证金：">
                        <el-input v-model="detail.riseMoney" :placeholder="input.riseMoney" style="width:20%" >
                        </el-input>
                        <span>物业押金：</span>
                        <el-input v-model="detail.rentMoney" :placeholder="input.rentMoney" style="width:20%">
                        </el-input>
                        <span>合计：</span>
                        <el-input v-model="detail.rentMoney" :placeholder="input.rentMoney" style="width:20%">
                        </el-input>
                    </el-form-item>
            </div>
        </div>
        <div style="width:90%">
        <el-form-item label="备注：">
            <el-input type="textarea" :rows="2" :placeholder="input.textarea" v-model="detail.textarea">
        </el-input>
        </el-form-item>
        </div>
        </el-form>
        </div>
        <div class="nn" v-show="ww">
            <button class="nextStep"  @click="edit = false, tt = true, ww =false">修改</button><button class="cancel" @click="goBack">返回</button>
            </div>
        <div class="nn" v-show="tt">
            <button class="nextStep"  @click="edit = true, ww = true, tt = false">保存</button><button class="cancel" @click="edit = true,edit = true, ww = true, tt = false ">取消</button>
            </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ww:true,
            tt:false,
            detail: {
                name: '',
                address: '',
                house: '',
                endtime: '',
                startTime: '',
                price: '',
                phone:'',
                area: '',
                type:'',
                watermeter:'',
                textarea:'',
                rentTime:'',
                riseMoney: '',
                rentMoney:'',
                day: '',
            },
            input: {
                name: '李文',
                address: '男',
                house: '办公室C座301',
                endtime: '2018.6.23',
                startTime: '2017.6.23',
                price: '323265787894',
                phone:'18874562233',
                area: '办公区',
                type:'1354',
                watermeter:'787',
                textarea:'2年',
                rentTime:'2年',
                riseMoney: '30',
                rentMoney: '1000',
                day: '2018.06.01',
            },
            edit: true
            
        }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePicturepricePreview(file) {
        this.dialogImageUrl = file.url;
      },
      goBack(){
            window.history.back()
        },
    }
}
</script>

<style scoped>
.householdDetail {
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
.el-upload-list--picture-price .el-upload-list__item{
    width: 123px;
    height: 123px;
}
.el-upload--picture-price{
    width: 123px;
    height: 123px;
}
form {
    margin-top: 35px;
}
.main span {
font-size: 14px;color: #606266;padding-left:10px;font-weight: 700;
}
.qq {
    padding: 0 10%
}
</style>
