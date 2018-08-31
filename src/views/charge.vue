<template>
    <div class="charge">
        <div class="container">
            <nav-header/>
            <div class="card row">
                <div class="col-md-12">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="应收费用" name="third" v-if="this.role.indexOf('rubik:receivable:list')!==-1">
                          <div class="main">
                            <button class="add" @click="Interim" v-if="this.num != 1">录入数据</button>
                              <div id="card"><el-button size="small" v-for="(item, index) in date" :key="index" :class="{actived:index == num}" @click="tableTab(index)">{{ item.name }}</el-button></div>
                              <div id="main">
                                  <el-table :data="temporary" style="width: 100%" v-if="this.num == 0" key="routine">
                                    <!-- <el-table-column prop="roomType" label="房屋类型" width="180"></el-table-column> -->
                                    <el-table-column prop="roomBuilding" label="楼宇"></el-table-column>
                                    <el-table-column prop="roomNum" label="房号"></el-table-column>
                                    <el-table-column prop="ownerName" label="租户名称"></el-table-column>
                                    <el-table-column prop="payItemName" label="收费项目"></el-table-column>
                                    <el-table-column prop="payItemTypeName" label="仪表种类"></el-table-column>
                                    <el-table-column prop="shouldPrice" label="应收费用"></el-table-column>
                                    <el-table-column prop="payPrice" label="实收费用"></el-table-column>
                                    <el-table-column prop="shouldTime" label="应收时间"></el-table-column>
                                    <el-table-column prop="payTime" label="实收时间"></el-table-column>
                                    <el-table-column prop="remarks" label="备注"></el-table-column>
                                    <el-table-column>
                                      <template slot-scope="scope">
                                        <el-dropdown>
                                          <span class="el-dropdown-link">
                                              操作<i class="el-icon-arrow-down el-icon--right"></i>
                                          </span>
                                          <el-dropdown-menu slot="dropdown">
                                            <span  @click="pay(scope.$index,temporary)"><el-dropdown-item>付款</el-dropdown-item></span>
                                            <span  @click="Interim(scope.$index,temporary,'edit')"><el-dropdown-item>修改</el-dropdown-item></span>
                                          </el-dropdown-menu>
                                        </el-dropdown>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                  <el-table :data="temporary" style="width: 100%" v-if="this.num == 1" key="Meter">
                                    <!-- <el-table-column prop="roomType" label="房屋类型" width="180"></el-table-column> -->
                                    <el-table-column prop="build" label="楼宇"></el-table-column>
                                    <el-table-column prop="roomNum" label="房号"></el-table-column>
                                    <el-table-column prop="clientName" label="租户名称"></el-table-column>
                                    <el-table-column prop="itemName" label="收费项目"></el-table-column>
                                    <el-table-column prop="meterName" label="仪表种类"></el-table-column>
                                    <el-table-column prop="price" label="费用"></el-table-column>
                                    <el-table-column prop="createTime" label="时间"></el-table-column>
                                    <el-table-column prop="remarks" label="备注"></el-table-column>
                                    <el-table-column>
                                      <template slot-scope="scope">
                                        <el-button size="small" @click="pay(scope.$index,temporary)">付款</el-button>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                  <el-table :data="temporary" style="width: 100%" v-if="this.num == 2" key="interim">
                                    <!-- <el-table-column prop="roomType" label="房屋类型" width="180"></el-table-column> -->
                                    <el-table-column prop="feeEarners" label="收费人"></el-table-column>
                                    <el-table-column prop="receivable" label="应收费用"></el-table-column>
                                    <el-table-column prop="officialReceipts" label="实收费用"></el-table-column>
                                    <el-table-column prop="time" label="收费日期"></el-table-column>
                                    <el-table-column prop="remarks" label="备注"></el-table-column>
                                    <el-table-column>
                                      <template slot-scope="scope">
                                        <el-button size="small" @click="pay(scope.$index,temporary)">付款</el-button>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                  <div class="fenye">
                                    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2"  :page-size="pageSize2" :page-sizes="pageSizes2" layout="total, sizes, prev, pager, next, jumper" :total="totalData2">
                                    </el-pagination>
                                  </div>
                              </div>
                          </div>                 
                        </el-tab-pane>
                        <el-tab-pane label="抄表录入" v-if="this.role.indexOf('rubik:meterReading:list')!==-1" name="second">
                          <div class="main">
                            <button class="add" @click="luru('','','add')">录入数据</button>
                            <el-table :data="meter" style="width: 100%">
                              <el-table-column prop="roomType" label="房屋类型"></el-table-column>
                              <el-table-column prop="build" label="楼宇"></el-table-column>
                              <el-table-column prop="roomNum" label="房号"></el-table-column>
                              <el-table-column prop="payItemName" label="收费项目"></el-table-column>
                              <el-table-column prop="payMonth" label="收款日期"></el-table-column>
                              <el-table-column prop="univalence" label="单价"></el-table-column>
                              <el-table-column prop="lastRead" label="起度"></el-table-column>
                              <el-table-column prop="currentRead" label="止度"></el-table-column>
                              <el-table-column prop="use" label="用量"></el-table-column>
                              <el-table-column prop="orderPrice" label="费用"></el-table-column>
                              <el-table-column prop="remark" label="备注"></el-table-column>
                              <el-table-column>
                                <template slot-scope="scope">
                                  <span ><button @click="editThis(scope.$index,meter)">编辑</button></span>
                                </template>
                              </el-table-column>
                            </el-table>
                            <div class="fenye">
                              <el-pagination 
                              @size-change="handleSizeChange1" 
                              @current-change="handleCurrentChange1" 
                              :current-page="currentPage1"  :page-size="pageSize1" 
                              :page-sizes="pageSizes1" layout="total, sizes, prev, pager, next, jumper" 
                              :total="totalData1">
                              </el-pagination>
                            </div>
                          </div>                 
                        </el-tab-pane>
                        <el-tab-pane label="历史费用" name="first" lazy>
                          <history-charge/>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <el-dialog
            :title="this.name"
                :visible.sync="entry"
                width="30%" :model="entrydata">
                <div class="tanchuang">
                    <el-form ref="sd" label-width="130px" class="demo-sd" size="mini" :model="entrydata" :rules="rule">
                    <el-form-item label="关联租户：" prop="houseType">
                    <el-cascader expand-trigger="hover" :options="option" v-model="entrydata.houseType" style="width:100%"></el-cascader>
                    </el-form-item>
                        <el-form-item label="收费项目:" prop="payItemMeterId">
                            <el-select v-model="entrydata.payItemMeterId" placeholder="请选择费用项目类型" style="width:100%">
                                <el-option v-for="item in charges" :label="item.payItemMeterName" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="录入时间:">
                            <el-date-picker
                              v-model="entrydata.paymentDay"
                              type="datetime"
                              placeholder="选择日期"
                              style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="单价:">
                            <el-input v-model="entrydata.univalence"></el-input>
                        </el-form-item>
                        <el-form-item label="起度:" prop="lastRead">
                            <el-input @blur="isStudentNo" v-model="entrydata.lastRead"></el-input>
                        </el-form-item>
                        <el-form-item label="止度:" prop="currentRead">
                            <el-input @blur="isStudentNo" v-model="entrydata.currentRead"></el-input>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input v-model="entrydata.remark"></el-input>
                        </el-form-item>
                        
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="entry = false">取 消</el-button>
                    <el-button type="primary" @click="submitIn">确 定</el-button>
                </span>

            </el-dialog>
            <el-dialog
              title="应收费用"
              :visible.sync="dialogVisible"
              width="500px">
              <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="金额:">
                <el-input v-model="form.money" @blur="float"></el-input>
              </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="moneyYes">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="录入"
              :visible.sync="interimCharge"
              width="500px">
              <el-form ref="form" :model="form" :rules="rul" label-width="100px">
                <el-form-item label="房号:" prop="roomNum" v-if="this.num == 0">
                <el-cascader
                    expand-trigger="hover"
                    :options="option"
                    v-model="form.roomNum"
                    @change="find">
                </el-cascader>
              </el-form-item>
              <el-form-item label="租户名称:" prop="ownerName" v-if="this.num == 0">
                <el-input v-model="ownerName"></el-input>
              </el-form-item>
              <!-- <el-form-item label="收费项目:" prop="payItemName" v-if="this.num == 0">
                <el-input v-model="form.payItemName"></el-input>
              </el-form-item> -->
              <el-form-item label="仪表种类:" prop="payItemTypeId" v-if="this.num == 0">
                <!-- <el-input v-model="form.payItemTypeName"></el-input> -->
                <el-select v-model="form.payItemTypeId" placeholder="请选择费用项目类型" style="width:100%">
                    <el-option v-for="item in list" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="应收费用:" prop="shouldPrice" v-if="this.num == 0">
                <el-input v-model="form.shouldPrice" @blur="float"></el-input>
              </el-form-item>
              <el-form-item label="实收费用:" prop="payPrice" v-if="this.num == 0">
                <el-input v-model="form.payPrice" @blur="float"></el-input>
              </el-form-item>
              <el-form-item label="实收时间:" prop="shouldTime" v-if="this.num == 0">
                <el-date-picker
                  v-model="form.shouldTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:100%"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="实收时间:" prop="payTime" v-if="this.num == 0">
                <el-date-picker
                  v-model="form.payTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:100%"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="备注:"  v-if="this.num == 0">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
              <el-form-item label="应收费用:" prop="receivable" v-if="this.num == 2">
                <el-input v-model="form.receivable" @blur="float"></el-input>
              </el-form-item>
              <el-form-item label="实收费用:" prop="officialReceipts" v-if="this.num == 2">
                <el-input v-model="form.officialReceipts" @blur="float"></el-input>
              </el-form-item>
              <el-form-item label="收费人:" prop="feeEarners" v-if="this.num == 2" >
                <el-input v-model="form.feeEarners"></el-input>
              </el-form-item>
              <el-form-item label="收费日期:" prop="time" v-if="this.num == 2" >
                <el-date-picker
                  v-model="form.time"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:100%"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="备注:"  v-if="this.num == 2">
                <el-input v-model="form.remarks"></el-input>
              </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="interimCharge = false">取 消</el-button>
                <el-button type="primary" @click="moneyYes">确 定</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavBar from "@/components/NavBar";
import qs from "qs";
import url from "../assets/Req.js";
import HistoryCharge from "@/views/historyCharge"
export default {
  name: "charge",
  data() {
    return {
      msg: '',
      list: [],
      ownerName: '',
      moneyName: '常规费用',
      moneyId: '',
      form:{
        money: '',
        receivable: '',
        officialReceipts: '',
        feeEarners: '',
        time: '',
        remarks: '',
        //常规
        roomNum: [],
        ownerName: '',
        payItemName: '',
        payItemTypeId: '',
        shouldPrice: '',
        payPrice: '',
        shouldTime: '',
        payTime: '',
        remark: ''
      },
      dialogVisible: false,
      date: [],
      num: 0,
      rule: {
        payItemMeterId: [
          { required: true, message: '请选择收费项目', trigger: 'change' },
        ],
        houseType: [
          { required: true, message: '请选择租户', trigger: 'change' },
        ],
        lastRead: [
          { required: true, message: '请输入起度', trigger: 'blur' },
        ],
        currentRead: [
          { required: true, message: '请输入止度', trigger: 'blur' },
        ],
      },
      rul: {
        receivable: [
          { required: true, message: '请输入应收费用', trigger: 'blur' },
        ],
        officialReceipts: [
          { required: true, message: '请输入实收费用', trigger: 'blur' },
        ],
        feeEarners: [
          { required: true, message: '请输入收费人', trigger: 'blur' },
        ],
        time: [
          { required: true, message: '请输入收费日期', trigger: 'blur' },
        ],
      },
      updatePayMeterId:'',
      //应收费用的id
      entryChange: false,
      entry: false,
      news: false,
      edit: true,
      dialogVisible: false,
      //分页数据
      // currentPage: 1,
      // pageSize: 10,
      // pageSizes: [10, 20, 30, 40, 50],
      // totalData: 400, //customerMsg数据的总数,
      //仪表管理
      currentPage1: 1,
      pageSize1: 10,
      pageSizes1: [10, 20, 30, 40, 50],
      totalData1: 400, //customerMsg数据的总数,
      //应收费用
      currentPage2: 1,
      pageSize2: 10,
      pageSizes2: [10, 20, 30, 40, 50],
      totalData2: 400, //customerMsg数据的总数,
      addNewOne: true,
      changeOne: false,
      name: "新建",
      modify: false,
      activeName: "third",
      //收费参数
      charge: [],
      ceshi: '2018-08-05 17:04:45',
      //仪表管理
      meter: [],
      //应收费用
      temporary: [],
      //收费参数-新增
      add: {
        name: "",
        payItemId: "",
        type: "",
        remarks: ""
      },
      payItems:[],
      types:[],
      //收费参数-编辑
      upload: {
        name: "",
        chargeType: " ",
        type: " ",
        remarks: ""
      },
      
      //仪表管理-录入
      entrydata: {
        houseType: [],
        charge: "电表",
        start: "6000",
        univalence:"1.1",
        end: "6500",
        remarks: "",
        time: ""
      },
      option: [],
      name:"录入",
      charges:[],
      //仪表管理-编辑
      changedata: {
        houseType: "店铺",
        charge: "电表",
        start: "6000",
        end: "6500",
        remarks: ""
      },
      //返回的数据
      too: {
        remarks: ""
      },
      role:[],
      interimCharge: false
    };
  },
  mounted() {
    this.$ajax.get(url + 'role/findPermission').then(res => {
				res.data.data.forEach(v => {
              this.role.push(v.permission)
				})
			})
    
    this.getMeter(),
    this.selectCost(),
    // this.Cost(),
    this.getType(),
    this.getCharges(),
    this.getOptions()
    // this.nn()
    if(this.$route.query.tabPane){
      this.activeName = this.$route.query.tabPane
    }else{
      this.activeName = 'third'
    }
  },

  //选项卡
  methods: {
    find(){
      this.$ajax.get(url + 'owner/findOwnerByRoomId/'+this.form.roomNum[2]).then(res => {
        this.ownerName = res.data.data.name
        // var name = res.data.data.name
        // if(res.data.status === 200){
        //     this.form.ownerName = name
        // }else{
        //     this.$message({
        //         message:res.data.msg,
        //         type: 'error'
        //     })
        //     this.form.ownerName = ''
        // }
    })
    },
    //双精度
    float(e){
      var reg=/^[-\+]?\d+(\.\d+)?$/;
      if(!reg.test(e.target.value)){
        e.target.style.borderColor = 'red'
        this.$message({
          message: '请输入数字',
          type: 'error'
        })
      }else{
        e.target.style.borderColor = '#67c23a'
      }  
    },
    Interim(index,rows,msg){
      this.form = {}
      this.ownerName=''
      this.interimCharge = true
      if(this.num == 0){
        this.$ajax.get(url + 'payOrderHistory/selectRoutine/'+this.shouldId).then(res => {
          this.list = res.data.data
        })
      }
      if(msg){
        this.msg = msg
        this.$ajax.get(url + 'payOrderHistory/findId/'+this.temporary[index].id).then(res => {
          // this.form = res.data.data
          console.log(res.data.data)
        })
      }else{this.msg}
    },
    pay(index,rows){
      this.dialogVisible = true
      this.form.money = ''
      this.moneyId = this.temporary[index].id
    },
    moneyYes(){
      if(this.form.money){
      this.$ajax.get (url + 'pay/payOrder',{
        params: {
          "id": this.moneyId,
          "pay_price": parseFloat(this.form.money).toFixed(2)
        }
      }).then(res => {
        if(res.data.status === 200){
          this.$message({
          message: '成功',
          type: 'success'
        })
          this.dialogVisible = false
          this.Cost()
        }
      })
      }else{
        if(this.num == 2){
          this.$ajax.post(url + 'payTemporary/insert',{
            "receivable": this.form.receivable,
            "officialReceipts": this.form.officialReceipts,
            "feeEarners": this.form.feeEarners,
            "time": this.form.time,
            "remarks": this.form.remarks
          }).then(res => {
            if(res.data.status === 200){
              this.$message({
                message:'添加成功',
                type: 'success'
              })
              this.interimCharge = false
              this.Cost()
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        }else if(this.num == 0){
          this.$ajax.post(url + 'payOrderHistory/insert',{
            "roomNum": this.form.roomNum[2],
            "ownerName": this.ownerName,
            "payItemTypeId": this.form.payItemTypeId,
            "shouldPrice": this.form.shouldPrice,
            "payPrice": this.form.payPrice,
            "shouldTime": this.form.shouldTime,
            "payTime": this.form.payTime,
            "remark": this.form.remark
          }).then(res => {
            if(res.data.status === 200){
              this.$message({
                message:'添加成功',
                type: 'success'
              })
              this.interimCharge = false
              this.Cost()
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        }
      }
    },
    tableTab(index){
      this.num = index
      this.shouldId = this.date[index].id
      console.log(this.shouldId)
      this.moneyName = this.date[index].name
      this.handleCurrentChange2 = 1
      setTimeout(this.Cost(),1000)
    },
    isStudentNo(e) {
      var reg=/^\d+$/;   /*定义验证表达式*/
      if(!reg.test(e.target.value)){
        e.target.style.borderColor = 'red'
        this.$message({
          message: '请输入数字',
          type: 'error'
        })
      }else{
        e.target.style.borderColor = '#67c23a'
      }    /*进行验证*/
    },
    changePosition() {
    },
    handleClick(tab, event) {
    },
    
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.getCharge();
    // },
    // handleCurrentChange(val) {},
    handleSizeChange1(val) {
      this.pageSize1 = val;
      this.getMeter();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val
      this.getMeter()
    },
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.Cost();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.Cost();
    },

    //收费参数
    // getCharge() {
    //   this.$ajax
    //     .get(url + "pay/queryPayItemMeterAll", {
    //       params: {
    //         page: this.currentPage,
    //         pageSize: this.pageSize
    //       }
    //       // 前端将每页显示多少条放入 pageSize,第几页放入page
    //     })
    //     .then(res => {
    //       this.charge = res.data.data.rows;
    //       this.totalData = res.data.data.records;
    //     });
    // },
    // getPayItems(){
    //   this.$ajax.get(url+"pay/queryPayItemAll").then(res =>{
    //     this.payItems=res.data.data
    //   })
    // },
    getType(){
      this.$ajax.get(url+"pay/queryMeterAll").then(res =>{
        this.types=res.data.data
      })
    },
    //删除
    chargeDelete(index, rows) {
      let that = this;
      that.id = this.charge[index].id;
      // rows.splice(index, 1);
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
    getOptions(){
      this.$ajax.get(url + 'room/flndByClientId/aaa').then(res => {
          this.option=res.data;
      })
    },
    //弹窗
    // tanchaung(index, rows, msg) {
    //   if (msg === 2) {
    //     let that = this;
    //     (this.addNewOne = false),
    //       (this.changeOne = true),
    //       (that.id = this.charge[index].id);
    //     this.news = true;
    //     if (that.id !== "") {
    //       this.name = "编辑";
    //       this.$ajax
    //         .get(url + "pay/queryPayItemMeter", {
    //           params: {
    //             payItemMeterId: this.id
    //           }
    //         })
    //         .then(res => {
    //           var temp = res.data.data;
    //           this.add = temp;
    //           this.add.payItemId = temp.payItemId;
    //           this.add.remarks = temp.remark;
    //           this.add.name = temp.name;
    //         });
    //     }
    //   }
    // },
    // addNewProject() {
    //   (this.add = {}),
    //   (this.addNewOne = false),
    //   (this.changeOne = true),
    //   (this.news = true);
    // },
    luru() {
      this.entrydata = {};
      this.entry = true;
      this.name = "录入"

    },
    editThis(index,rows){
      // this.entrydata = {};
      this.entry = true;
      this.name = "编辑"
      this.updatePayMeterId = this.meter[index].id
      this.$ajax.get(url + 'pay/getMeterManagementById',{
              params: {
                payMeterId : this.meter[index].id
              }
            })
      .then(res =>{
        if(res.data.status === 200){
          this.entrydata = res.data.data;
          this.entrydata.houseType=res.data.data.arrList;
        }else if(res.status===403){
          this.$alert('您的权限不足', '权限不足', {
              confirmButtonText: '确定',
              callback: action => {
                  this.entry = false;
              }
          });
        }
        //this.entrydata.time = res.data.data.paymentDay
      })
    },
    selectCost(){
      this.$ajax.get(url + 'pay/queryPayItemAll').then(res => {
        this.date = res.data.data
        this.shouldId = res.data.data[0].id
        this.moneyName = res.data.data[0].name
        this.Cost()
      })
    },
    //应收费用
    Cost() {
      if(this.moneyName == "抄表费用"){
        this.$ajax.get(url + "pay/queryReceivable", {
            params: {
              payItem: this.shouldId,
              page: this.currentPage2,
              pageSize: this.pageSize2
            }
          }).then(res => {
          this.temporary = res.data.data.rows;
          this.totalData2 = res.data.data.records;
        });
      }else if(this.moneyName == "临时费用"){
        this.$ajax.get(url + "payTemporary/condition/"+this.currentPage2+'/'+this.pageSize2).then(res => {
          this.temporary = res.data.data.rows;
          this.totalData2 = res.data.data.records;
        });
      }else if(this.moneyName == "常规费用"){
        this.$ajax.get(url + "payOrderHistory/condition/"+this.shouldId+'/'+this.currentPage2+'/'+this.pageSize2).then(res => {
          this.temporary = res.data.data.rows;
          this.totalData2 = res.data.data.records;
        });
      }else{
        this.$ajax.get(url + "pay/queryReceivable", {
            params: {
              payItem: this.shouldId,
              page: this.currentPage2,
              pageSize: this.pageSize2
            }
          }).then(res => {
          this.temporary = res.data.data.rows;
          this.totalData2 = res.data.data.records;
        });
      }
    },
    //选择
    //仪表管理
    getMeter() {
      this.$ajax.get(url + "pay/queryMeterManagementAll", {
          params: {
            page: this.currentPage1,
            pageSize: this.pageSize1
          }
        }).then(res => {
          this.meter = res.data.data.rows;
          this.totalData1 = res.data.data.records;
        });
    },
    getCharges(){
       this.$ajax.get(url+"pay/getPayItemMeterName",{
         params: {
           "payItemId":'180723BR8PBFT354'
         }
       }).then(res =>{
        this.charges=res.data.data;
       });
    },
    //
    //常规
    // feiyong1() {
    //   document.getElementById('linshi').className=''
    //   document.getElementById('chaobiao').className=''
    //   document.getElementById('changgui').className='active'
    //   this.shouldId = "180723BR7M3G986W";
    //   this.$ajax
    //     .get(url + "pay/queryReceivable", {
    //       params: {
    //         payItem: "180723BR7M3G986W",
    //         page: this.currentPage2,
    //         pageSize: this.pageSize2
    //       }
    //     })
    //     .then(res => {
    //       this.temporary = res.data.data.rows;
    //       this.totalData2 = res.data.data.records;
    //     });
    // },
    //抄表
    // feiyong2() {
    //   document.getElementById('linshi').className=''
    //   document.getElementById('chaobiao').className='active'
    //   document.getElementById('changgui').className=''
    //   this.shouldId = "180723BR8PBFT354";
    //   this.$ajax
    //     .get(url + "pay/queryReceivable", {
    //       params: {
    //         payItem: "180723BR8PBFT354",
    //         page: this.currentPage2,
    //         pageSize: this.pageSize2
    //       }
    //     })
    //     .then(res => {
    //       this.temporary = res.data.data.rows;
    //       this.totalData2 = res.data.data.records;
    //     });
    // },
    //临时
    // feiyong3() {
    //   document.getElementById('linshi').className='active'
    //   document.getElementById('chaobiao').className=''
    //   document.getElementById('changgui').className=''
    //   this.shouldId = "180723BRAS3GHR68";
    //   this.$ajax
    //     .get(url + "pay/queryReceivable", {
    //       params: {
    //         payItem: "180723BRAS3GHR68",
    //         page: this.currentPage2,
    //         pageSize: this.pageSize2
    //       }
    //     })
    //     .then(res => {
    //       this.temporary = res.data.data.rows;
    //       this.totalData2 = res.data.data.records;
    //     });
    // },
    submitIn(){
      if(this.name == "录入"){
      var arr=this.entrydata.houseType;
      var payMeterVO = {
        "roomId":arr[arr.length-1],//关联房屋
        "payItemMeterId":this.entrydata.payItemMeterId,//收费项目
        "payMonth":this.entrydata.paymentDay,//录入时间
        "univalence":this.entrydata.univalence,//单价
        "lastRead":this.entrydata.lastRead,//起度
        "currentRead":this.entrydata.currentRead,//止
        "remark":this.entrydata.remark  //备注
      }
      this.$ajax.post(url + 'pay/createPayMeter',payMeterVO).then(res => {
        if(res.data.status === 200){
          this.$message({
            message: '录入成功',
            type: 'success'
          });
          this.entry = false
          this.getMeter()
        }else if(res.data.status===403){
          this.$message({
              message:'权限不足',
              type: 'error'
          })
        }else{
        this.$message({
          message: '录入失败',
          type: 'error'
        });
      }
      })}else {
      var arr=this.entrydata.houseType;
      var payMeter = {
        "id":this.updatePayMeterId,
        "roomId":arr[arr.length-1],//关联房屋
        "payItemMeterId":this.entrydata.payItemMeterId,//收费项目
        "payMonth":this.entrydata.paymentDay,//录入时间
        "univalence":this.entrydata.univalence,//单价
        "lastRead":this.entrydata.lastRead,//起度
        "currentRead":this.entrydata.currentRead,//止
        "remark":this.entrydata.remark  //备注
      }
      this.$ajax.post(url + 'pay/updatePayMeter',payMeter).then(res => {
        if(res.data.status === 200){
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.entry = false
          this.getMeter()
        }else if(res.data.status===403){
          this.$message({
              message:'权限不足',
              type: 'error'
          })
        }else{
          this.$message({
            meter:'修改失败',
            type:'error'
          })
        }
      })}
    },
    // nn() {
    //   var card = document.getElementById("card");
    //   var cardlist = card.children;

    //   for (var i = 0; i < cardlist.length; i++) {
    //     cardlist[i].index = i;
    //     cardlist[i].onclick = function() {
    //       for (var m = 0; m < cardlist.length; m++) {
    //         cardlist[m].className = "";
    //       }
    //       this.className = "active";
    //     };
    //   }
    // }
  },
  components: {
    NavHeader,
    NavBar,
    HistoryCharge
  }
};
</script>
<style scoped>
.container {
  width: 88%;
  position: relative;
  left: 6%;
  background-color: #eeeeee;
  padding: 0;
}

.charge {
  background: #eeeeee;
}

.card {
  margin: 0;
  background-color: white;
  width: 99%;
  margin: 10px 10px 0 5px;
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

.fenye {
  float: right;
  padding: 20px 0;
  display: block !important;
}

.main {
  padding: 0 40px 0 50px;
  width: 99%;
  margin-left: 2px;
  height: 810px;
}
.confirm {
  background-color: #32a8ee;
  border: #32a8ee;
  color: white;
  border-radius: 5px;
}

.cancel {
  background-color: white;
  border: 1px solid rgb(217, 217, 217);
  color: rgb(138, 138, 138);
  border-radius: 5px;
}

.cell button {
  background: none;
  border: none;
  color: #32a8ee;
}

.tanchuang {
  width: 80%;
}

#card button {
  border-radius: 5px;
  margin-left: 5px;
  float: right;
  color: #419EFF;
  border: 1px solid #C6E2FF
}
.active {
  border: 1px solid #32a8ee !important;
  color: #32a8ee !important;
}

#main div:nth-child(2) {
  display: none;
}
#main div:nth-child(3) {
  display: none;
}
.actived{
  background: #ECF5FF;
  color: #419EFF;
  border: 1px solid #C6E2FF
}
#card{
  float: right;
}
</style>
