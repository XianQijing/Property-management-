<template>
<!--房源管理-添加-->
    <div class="rent_addhouse">
        <h3>{{this.name}}房源</h3>
        <div class="tianjia" v-show="show1">
            <div class="input">
            <el-form :model="addCustomer" ref="addCustomer" label-width="130px" class="demo-addCustomer">

                <el-form-item label="房屋类型：" prop="houseType">{{addCustomer.houseType}}
                   <el-select v-model="addCustomer.houseType" placeholder="请选择房屋类型">
                   <el-option label="沿街店铺" value="yanjiedianpu"></el-option>
                   <el-option label="办公区" value="bangongqu"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="楼宇：" prop="build">{{addCustomer.build}}
                   <el-select v-model="addCustomer.build" placeholder="请选择房屋类型">
                   <el-option label="啥都木有" value="yanjiedianpu"></el-option>
                   <el-option label="啥都木有" value="bangongqu"></el-option>
                   </el-select>
                </el-form-item>


                <el-form-item label="房号：" prop="roomNumber">{{addCustomer.roomNumber}}
                   <el-select v-model="addCustomer.roomNumber" placeholder="请选择房屋类型">
                   <el-option label="啥都木有" value="yanjiedianpu"></el-option>
                   <el-option label="啥都木有" value="bangongqu"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="建筑面积：" prop="buildArea">{{addCustomer.buildArea}}
                <el-input v-model="addCustomer.buildArea" placeholder="请输入建筑面积"></el-input>
                </el-form-item>

                <el-form-item label="定价：" prop="price">{{addCustomer.price}}
                    <el-input v-model="addCustomer.price" placeholder="请输入定价">
                        <template slot="append">元/月</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="租用状态：" prop="state">{{addCustomer.state}}
                   <el-select v-model="addCustomer.state" placeholder="请选择房屋类型">
                   <el-option label="卖了" value="yanjiedianpu"></el-option>
                   <el-option label="租了" value="bangongqu"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="预定状态：" prop="order">{{addCustomer.order}}
                   <el-select v-model="addCustomer.order" placeholder="请选择房屋类型">
                   <el-option label="卖了" value="yanjiedianpu"></el-option>
                   <el-option label="租了" value="bangongqu"></el-option>
                   </el-select>
                </el-form-item>
            </el-form>
            </div>
            <div class="nn">
            <button class="nextStep">保存</button><button class="cancel" @click="goBack">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'rent_addhouse',
    data(){
        return{
            name:'添加',
            show1:true,
            show2:false,
            //数据
            addCustomer: {
                houseType:'',
                build:'',
                roomNumber:'',
                buildArea: '',
                price: '',
                state: '',
                order: ''
        },
        
        }
    },
    mounted(){
        console.log(this.$route.query.msg)
        if(this.$route.query.msg == "tianjia"){
            this.name = '添加',
            this.addCustomer = {}
        }else{
            this.name = '编辑'
        }
    },
    methods:{
        submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
        goBack(){
            window.history.back()
        },
        handleChange(file, fileList) {
        this.fileList = fileList.slice(-2);
      },
      // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      console.log('上传文件', response)
    },
    // 上传错误
    uploadError (response, file, fileList) {
      console.log('上传失败，请重试！')
    },
    }
}
</script>

<style scoped>
.rent_addhouse {
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
    margin: 4% 0 0 40%;
    display: flex;
    justify-content: space-between;
    height: 500px;
}
.el-icon-date:before {
    margin-left: 20px;
}
.el-upload__input {
    display: none!important;
}
.el-input__inner {
  height: 32px;
}
</style>
