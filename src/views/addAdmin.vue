<template>
    <div class="addAdmin">
        <h3>{{name}}小区</h3>
        <div class="tianjia">
            <div class="input">
            <el-form :model="ruleForm" ref="ruleForm" label-width="130px" class="demo-ruleForm" size='small' >
                <div id="fenkai">
                    <el-form-item label="小区名称：">
                        <el-input v-model="ruleForm.namec"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区：">
                        <el-select v-model="ruleForm.region" placeholder="请选择所在地区">
                        <el-option :label="item.label" :value="item.value" v-for="item in ww" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址：">
                        <el-input v-model="ruleForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="客服电话：">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人：">
                        <el-input v-model="ruleForm.person"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话：">
                        <el-input v-model="ruleForm.phoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="楼宇数量">
                        <el-input v-model="ruleForm.number"></el-input>
                    </el-form-item>
                </div>
                <div id="fenkai1">
                    <el-form-item label="占地面积：">
                        <el-input v-model="ruleForm.coverArea">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="建筑面积：">
                        <el-input v-model="ruleForm.buildArea">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="公共区域面积：">
                        <el-input v-model="ruleForm.public">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="绿化面积：">
                        <el-input v-model="ruleForm.green">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                    
                    <el-form-item label="设计车位面积：">
                        <el-input v-model="ruleForm.car">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="车库面积：">
                        <el-input v-model="ruleForm.carArea">
                            <template slot="append">平方米</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="车位数">
                        <el-input v-model="ruleForm.carNumber">
                            <template slot="append">个</template>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
            </div>
            <div class="nn">
            <button class="nextStep">保存</button><button class="cancel" @click="goBack">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addAdmin',
    data(){
        return{
            name:'',
            // ww:false,
            ruleForm: {
                namec:'',
                region:'',
                address:'',
                phone:'',
                person:'',
                phoneNumber:'',
                number:'',
                coverArea:'',
                buildArea:'',
                public:'',
                green:'',
                car:'',
                carArea:'',
                carNumber:''
            },
            ww:[
                {
                    label:"区域一",
                    value:"shanghai"
                },
                {
                    label:"区域一",
                    value:"beijing"
                },
                {
                    label:"区域一",
                    value:"guangzhou"
                }
            ]
        }
    },
    mounted(){
        this.id = this.$route.query.id
        console.log(this.$route.query.id)
    },
    methods:{
        goBack(){
            window.history.back()
        },
        submit(){
            this.$ajax.post(url + '',{
                param:{},
                data:{
                    '':this.ruleForm.namec
                }
            }).then(res => {
                goBack()
            })
        }
    }

}
</script>

<style scoped>
.addAdmin {
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
    margin: 5% 14% 0 10%
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
.input {
    display: block;
}
.el-radio {
    display: block;
    margin-top: 15px;
}
.el-radio+.el-radio {
    margin-left: 0!important;
}
#fenkai {
    display: inline-block;
    width: 40%;
    margin-right: 10%;
}
#fenkai1 {
    display: inline-block;
    width: 40%;
}
</style>
