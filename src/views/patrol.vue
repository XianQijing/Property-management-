<template>
  <div class="patrol">
    <h3>装修巡检</h3>
    <div class="shou">
      <div class="ds">
        <el-form :model="detail" ref="detail" label-width="130px" class="demo-detail">
          <div class="zhuangxiu">
            <el-form-item label="巡检日期:">
              <el-date-picker
                v-model="detail.day"
                type="date"
                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="zhuangxiu">
            <el-form-item label="巡检次数:">
              <el-input v-model="detail.number"></el-input>
            </el-form-item>
          </div>
          <div class="zhuangxiu">
            <el-form-item label="巡检人:">
              <el-input v-model="detail.person"></el-input>
            </el-form-item>
          </div>
          <div class="zhuangxiu">
            <el-form-item label="巡检人联系方式:">
              <el-input v-model="detail.phone"></el-input>
            </el-form-item>
          </div>
          <div class="zhuangxiu">
            <el-form-item label="是否完工:">
              <el-radio v-model="detail.radio" label="1">是</el-radio>
              <el-radio v-model="detail.radio" label="2">否</el-radio>
            </el-form-item>
          </div>
          <div class="zhuangxiu">
            <el-form-item label="是否违规:">
              <el-radio v-model="detail.violation" label="1">是</el-radio>
              <el-radio v-model="detail.violation" label="2">否</el-radio>
            </el-form-item>
          </div>
          <el-form-item label="巡查说明：">
            <el-input v-model="detail.remark" type="textarea" :rows="4">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="nn">
        <button class="nextStep" @click="addOne">保存</button><button class="cancel" @click="goBack">返回</button>
    </div>
    <div class="tables">
        <div style="width:73%">
    <el-table :data="tableData3" height="250" border style="width: 100%;">
        <el-table-column prop="roomNumber" label="房间号" width="180"></el-table-column>
        <el-table-column prop="name" label="客户姓名" width="180"></el-table-column>
        <el-table-column prop="patrol_man" label="巡检人" width="180"></el-table-column>
        <el-table-column prop="patrol_number" label="巡检次数" width="180"></el-table-column>
        <el-table-column prop="isIllegal"  label="是否违规"></el-table-column>
        <el-table-column prop="isAchieve"  label="是否完工"></el-table-column>
  </el-table>
  </div>
    </div>
  </div>
</template>

<script>
import url from '../assets/Req.js'

export default {
    name:'patrol',
    data(){
        return{
            detail: {
                day:'',
                number:'',
                person:'',
                phone: '',
                radio:'是',
                textarea:'',
            },
            tableData3: []

        }
    },
     mounted(){
        console.log(this.$route.query.id)
         this.id = this.$route.query.id
         this.getPatrol()
       
    },
    methods: {
        formatRole: function(row, column) {
            return row.authority == '0' ? "是" : "否";
        },
        //增加巡查记录
        addOne(){
            var adornPatrol={};
            adornPatrol.applyid = this.id;
            adornPatrol.patrolTime = this.detail.day;
            console.log(this.detail.day)
            adornPatrol.patrolNumber = this.detail.number;
            adornPatrol.patrolMan = this.detail.person;
            adornPatrol.patrolPhone = this.detail.phone;
            if(this.detail.radio==1){
                adornPatrol.isAchieve = 1;
            }else{
                adornPatrol.isAchieve = 0;
            }
            if(this.detail.violation==1){
                adornPatrol.isIllegal = 1;
            }else{
                adornPatrol.isIllegal = 0;
            }
            console.log(adornPatrol.isIllegal)
            adornPatrol.patrolContent = this.detail.remark;
            
           this.$ajax.post(url+"adornPatrol/insert/",adornPatrol).then((res) => {
                   if(res.data.status === 200){
                         this.$message({
                                message: '新增数据成功',
                                type: 'success'
                            }),
                            this.goBack()
                        }else if(res.data.status===403){
                            this.$message({
                                message:'权限不足',
                                type: 'error'
                            })
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                        }) 
                 }
            })
        },
        getPatrol(){
            this.$ajax.get(url+'adornPatrol/condition/'+this.id).then(res=>{
                if(res.status === 200){
                this.tableData3 = res.data.data
                }else if(res.status===403){
                    this.$alert('您的权限不足', '权限不足', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.goBack()
                        }
                    });
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
.patrol {
    position: absolute;
    background: white;
    z-index: 2000;
    width: 100%;
    height: 100%
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
.shou{
    padding: 0vh 12vw 0 6vw
}
.tables {
    padding-top: 20px;
    display: flex;
    justify-content:center;
}
</style>
