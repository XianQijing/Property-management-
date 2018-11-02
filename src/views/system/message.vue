<template>
  <div class="message">
    <button class="add" @click="tanchaung(0, 0,1)">新增收费项目</button>
    <el-table :data="charge" style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="charge" label="收费项目"></el-table-column>
      <el-table-column prop="meter" label="仪表种类"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column width=180>
        <template slot-scope="scope">
          <button class="operation" @click="tanchaung(scope.$index, charge,2)">编辑</button>
          <button class="delete1" @click="chargeDelete(scope.$index, charge)">删除</button>
        </template>
      </el-table-column>
      <el-table-column></el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="pageSize" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="totalData">
      </el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="this.name" :visible.sync="news" width="500px">
      <div class="tanchuang">
        <el-form ref="shuru" label-width="130px" class="demo-shuru" size="mini" :model="add" :rules="rule">
          <el-form-item label="名称:" prop="name">
          <el-input v-model="add.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="费用项目类型:" prop="payItemId">
            <el-select v-model="add.payItemId" placeholder="请选择费用项目类型" style="width:100%">
              <el-option v-for="item in payItems" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="仪表种类:" prop="meterId">
            <el-select v-model="add.meterId" placeholder="请选择费用项目类型" style="width:100%">
              <el-option v-for="item in types" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="add.remarks" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- <span slot="footer" class="dialog-footer" v-show="addNewOne">
          <el-button @click="news= false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
      </span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="news= false">取 消</el-button>
        <el-button type="primary" @click="createPayItem">确 定</el-button>
      </span>

  </el-dialog>
  </div>
</template>

<script>
import url from '../../assets/Req.js'
export default {
    name: 'message',
    data(){
      return{
        add: {
          name: "",
          payItemId: "",
          type: "",
          remarks: ""
        },
        addNewOne: true,
        changeOne: false,
        news: false,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        totalData: 400, //customerMsg数据的总数,
        charge: [],
        payItems: [],
        msg:'',
        types: [],
        name:'新建',
        rule: {
          name: [
            { required: true, message: '请填写名称', trigger: 'blur' }
          ],
          payItemId: [
            { required: true, message: '请选择费用项目类型', trigger: 'change' }
          ],
          meterId: [
            { required: true, message: '请选择仪表种类', trigger: 'change' }
          ],
        }
      }
    },
    mounted(){
      this.getCharge()
      this.getPayItems()
      this.getType()
    },
    methods:{
      createPayItem() {
      var payItemVO = {};
      payItemVO.payItemMeterId = this.id;
      payItemVO.payItemId = this.add.payItemId;
      payItemVO.meterId = this.add.meterId;
      payItemVO.payItemMeterName = this.add.name;
      payItemVO.remake = this.add.remarks;
      if(this.msg === 2){
      this.$ajax.post(url + "pay/createPayItemMeter", payItemVO).then(res => {
        if(res.data.status === 200){
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
        this.add == {};
        this.news = false;
        this.getCharge()
        this.id = ''
        }else{
          this.$message({
            message: '编辑失败',
            type: 'error'
          });
        }
      });
      }else{
        this.$ajax.post(url + 'pay/createPayItemMeter',payItemVO).then(res => {
          if(res.data.status === 200){
            this.$message({
              message: '新建成功',
              type: 'success'
            });
            this.add == {};
            this.news = false;
            this.getCharge()
          }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }else{
          this.$message({
            message: '新建失败',
            type: 'error'
          });
        }
        })
      }
    },
      getType(){
        this.$ajax.get(url+"pay/queryMeterAll").then(res =>{
          this.types=res.data.data
        })
      },
      getPayItems(){
        this.$ajax.get(url+"pay/queryPayItemAll").then(res =>{
          this.payItems=res.data.data
        })
      },
      
      tanchaung(index, rows, msg) {
        this.news = true
        this.msg = msg
        if (msg === 2) {
          let that = this
          // this.addNewOne = false
          // this.changeOne = true
          that.id = this.charge[index].id
          if (that.id !== "") {
            this.name = "编辑";
            this.$ajax.get(url + "pay/queryPayItemMeter", {
              params: {
                payItemMeterId: this.id
              }
            }).then(res => {
              if(res.data.status === 200){
                var temp = res.data.data;
                this.add = temp;
                this.add.payItemId = temp.payItemId;
                this.add.remarks = temp.remark;
                this.add.name = temp.name;
              }else if(res.data.status===403){
                this.$alert('您的权限不足', '权限不足', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.news = false
                  }
                });
              }
            });
          }
        }else{
          this.name = "新建"
          this.add={}
        }
      },
      chargeDelete(index, rows) {
      let that = this;
      that.id = this.charge[index].id;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.delete(url + "pay/deletePayItemMeter", {
          params: {
            payItemMeterId: this.id
          }
        }).then(res => {
          if(res.data.status === 200){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.currentPage = 1
            this.getCharge()
          }else if(res.data.status===403){
            this.$message({
              message:'权限不足',
              type: 'error'
            })
          }else{
            this.$message({
            message: '删除失败',
            type: 'error'
          })
          }
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCharge();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCharge()
    },
    getCharge() {
      this.$ajax.get(url + "pay/queryPayItemMeterAll", {
        params: {
          page: this.currentPage,
          pageSize: this.pageSize
        }
        }).then(res => {
          if(res.data.status === 200){
            this.charge = res.data.data.rows;
            this.totalData = res.data.data.records;
          }
      });
    },
  }
}
</script>

<style scoped>
.message{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  height: 805px;
}
.fenye {
  float: right;
  padding: 20px 0;
}
.add {
  color: white;
  background-color: #32a8ee;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  border: 1px solid #32a8ee;
  border-radius: 5px;
  width: 100px;
  height: 31px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.operation{
	width: 64px;
	height: 32px;
	border-radius: 5px;
	border: 1px solid #A1CEFF;
	background: white;
	color: #A1CEFF;
}
.tanchuang{
  margin: 0 60px 0 0;
}
</style>

