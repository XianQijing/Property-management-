<template>
    <div class="charge">
        <nav-bar/>
        <div class="container">
            <nav-header/>
            <div class="card row">
                <div class="col-md-12">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="收费参数" name="first">
                            <div class="main">
								<button class="add" @click="addNewProject">新增收费项目</button>
								<el-table :data="charge" style="width: 100%">
									<el-table-column prop="name" label="名称" width="280"></el-table-column>
									<el-table-column prop="charge" label="收费项目" width="280"></el-table-column>
									<el-table-column prop="meter" label="仪表种类"></el-table-column>
                    <el-table-column prop="remark" label="备注" width="280"></el-table-column>
									<el-table-column>
										<template slot-scope="scope">
											<el-dropdown>
												<span class="el-dropdown-link">
                              操作<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
												<el-dropdown-menu slot="dropdown">
													
											        <span @click="tanchaung(scope.$index, charge,2)"><el-dropdown-item>编辑</el-dropdown-item></span>
													<span @click="chargeDelete(scope.$index, charge)"><el-dropdown-item>删除</el-dropdown-item></span>
												</el-dropdown-menu>
											</el-dropdown>
										</template>
										
									</el-table-column>
								</el-table>
                                <div class="fenye">
								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="pageSize" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="totalData">

                                </el-pagination>
                                </div>
							</div>
                        </el-tab-pane>

                        <el-tab-pane label="仪表管理" name="second">

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
								<el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1"  :page-size="pageSize1" :page-sizes="pageSizes1" layout="total, sizes, prev, pager, next, jumper" :total="totalData1">

                                </el-pagination>
                                </div>
							</div>                 
                        </el-tab-pane>

                        <el-tab-pane label="应收费用" name="third">

                            <div class="main">
                                <div id="card"><button @click="feiyong3">临时费用</button><button @click="feiyong2">抄表费用</button><button class="active" @click="feiyong1">常规费用</button></div>
                                <div id="main">
			                    <div>
								<el-table :data="temporary" style="width: 100%">
									<el-table-column prop="roomType" label="房屋类型" width="180"></el-table-column>
									<el-table-column prop="build" label="楼宇" width="180"></el-table-column>
									<el-table-column prop="roomNum" label="房号"></el-table-column>
                                    <el-table-column prop="clientName" label="租户名称" width="180"></el-table-column>
                                    <el-table-column prop="itemName" label="收费项目" width="180"></el-table-column>
                                    <el-table-column prop="meterName" label="仪表种类" width="180"></el-table-column>
                                    <el-table-column prop="price" label="费用" width="180"></el-table-column>
                                    <el-table-column prop="createTime" label="时间" width="180"></el-table-column>
                                    <el-table-column prop="remarks" label="备注" width="180"></el-table-column>
								</el-table>
                                <div class="fenye">
                                    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2"  :page-size="pageSize2" :page-sizes="pageSizes2" layout="total, sizes, prev, pager, next, jumper" :total="totalData2">

                                    </el-pagination>
                                </div>
                                </div>
                            </div>
							</div>                 
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>

             <!-- 收费参数-新建弹窗 -->
            <el-dialog :title="this.name" :visible.sync="news" width="30%">
                <div class="tanchuang">
                    <el-form ref="shuru" label-width="130px" class="demo-shuru" size="mini" :model="add" :value="too">
                        <el-form-item label="名称:">
                        <el-input v-model="add.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <el-form-item label="费用项目类型:">
                            <el-select v-model="add.payItemId" placeholder="请选择费用项目类型">
                                <el-option v-for="item in payItems" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="仪表种类:">
                            <el-select v-model="add.type" placeholder="请选择费用项目类型">
                                <el-option v-for="item in types" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input v-model="add.remarks" type="textarea" :rows="4" :value="too.remarks"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer" v-show="addNewOne">
                    <el-button @click="news= false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </span>
                <span slot="footer" class="dialog-footer" v-show="changeOne">
                    <el-button @click="news= false">取 消</el-button>
                    <el-button type="primary" @click="createPayItem">确 定</el-button>
                </span>

            </el-dialog>

            <!-- 收费参数-编辑弹窗 -->
            <!-- <el-dialog
                title="编辑收费项目"
                :visible.sync="dialogVisible"
                width="30%" :model="upload">
                <div class="tanchuang">
                    <el-form ref="sd" label-width="130px" class="demo-sd" size="mini">
                    
                        <el-form-item label="名称:">
                        <el-input v-model="upload.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <el-form-item label="费用项目类型:">
                            <el-select v-model="upload.chargeType" placeholder="请选择项目类型">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="仪表种类:">
                            <el-select v-model="upload.type" placeholder="请选择仪表种类">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input v-model="upload.remarks" type="textarea" :rows="4"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>

            </el-dialog> -->

            <!-- 仪表管理-录入 -->
            <el-dialog
            :title="this.name"
                :visible.sync="entry"
                width="30%" :model="entrydata">
                <div class="tanchuang">
                    <el-form ref="sd" label-width="130px" class="demo-sd" size="mini">
                    <el-form-item label="关联房屋：" prop="house">
                    <el-cascader expand-trigger="hover" :options="options" v-model="entrydata.houseType"></el-cascader>
                    </el-form-item>
                        <el-form-item label="收费项目:">
                            <el-select v-model="entrydata.charge" placeholder="请选择费用项目类型">
                                <el-option v-for="item in charges" :label="item.payItemMeterName" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="录入时间:">
                            <el-date-picker
                              v-model="entrydata.time"
                              type="date"
                              placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="单价:">
                            <el-input v-model="entrydata.univalence"></el-input>
                        </el-form-item>
                        <el-form-item label="起度:">
                            <el-input v-model="entrydata.lastRead"></el-input>
                        </el-form-item>
                        <el-form-item label="止度:">
                            <el-input v-model="entrydata.currentRead"></el-input>
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

            <!-- 仪表管理-编辑 -->
            <!-- <el-dialog
                title="编辑"
                :visible.sync="entryChange"
                width="30%" :model="changedata">
                <div class="tanchuang">
                    <el-form ref="sd" label-width="130px" class="demo-sd" size="mini">
                        <el-form-item label="关联房屋:">
                            <el-select v-model="changedata.houseType">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收费项目:">
                            <el-select v-model="changedata.charge">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="起度:">
                            <el-input v-model="changedata.start"></el-input>
                        </el-form-item>
                        <el-form-item label="止度:">
                            <el-input v-model="changedata.end"></el-input>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input v-model="changedata.remarks"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="entryChange = false">取 消</el-button>
                    <el-button type="primary" @click="entryChange = false">确 定</el-button>
                </span>

            </el-dialog> -->
        </div>
    </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavBar from "@/components/NavBar";
import qs from "qs";
import url from "../assets/Req.js";
export default {
  name: "charge",
  data() {
    return {
      //应收费用的id
      shouldId: "180723BR7M3G986W",
      entryChange: false,
      entry: false,
      news: false,
      edit: true,
      dialogVisible: false,
      //分页数据
      currentPage: 1,
      pageSize: 2,
      pageSizes: [1, 2, 3, 4, 5],
      totalData: 400, //customerMsg数据的总数,
      //仪表管理
      currentPage1: 1,
      pageSize1: 2,
      pageSizes1: [1, 2, 3, 4, 5],
      totalData1: 400, //customerMsg数据的总数,
      //应收费用
      currentPage2: 1,
      pageSize2: 2,
      pageSizes2: [1, 2, 3, 4, 5],
      totalData2: 400, //customerMsg数据的总数,
      addNewOne: true,
      changeOne: false,
      name: "新建",
      modify: false,
      activeName: "first",
      //收费参数
      charge: [],
      //仪表管理
      meter: [],
      //应收费用
      temporary: [
        {
          houseType: "sb",
          build: "15946907569",
          roomNumber: "gdfg",
          name: "门面",
          chargeProject: "023",
          meter: "125",
          charge: "200",
          time: "2018.7.14",
          remarks: ""
        }
      ],
      //收费参数-新增
      add: {
        name: "",
        payItemId: "",
        type: "",
        remarks: ""
      },
      payItems:[

      ],
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
      }
    };
  },
  mounted() {
    this.nn(), this.getCharge(), this.getMeter(), this.Cost(),
    this.getPayItems(),
    this.getType(),
    this.getCharges(),
    this.getOptions()
    if(this.$route.query.tabPane){
      this.activeName = this.$route.query.tabPane
    }else{
      this.activeName = 'first'
    }
  },

  //选项卡
  methods: {
    changePosition() {
      console.log(this.position);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getCharge();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getCharge();
    },

    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize1 = val;
      this.getMeter();
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.getMeter();
    },

    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize2 = val;
      this.Cost();
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${this.currentPage2}`);
      this.currentPage2 = val;
      this.Cost();
    },

    //收费参数
    getCharge() {
      this.$ajax
        .get(url + "pay/queryPayItemMeterAll", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize
          }
          // 前端将每页显示多少条放入 pageSize,第几页放入page
        })
        .then(res => {
          this.charge = res.data.data.rows;
          this.totalData = res.data.data.records;
          console.log(res.data);
        });
    },
    getPayItems(){
      this.$ajax.get(url+"pay/queryPayItemAll")
      
      .then(res =>{
        this.payItems=res.data.data
        console.log(this.payItems)
      })
    },
    getType(){
      this.$ajax.get(url+"pay/queryMeterAll")
      
      .then(res =>{
        this.types=res.data.data
        console.log(this.types)
      })
    },
    //删除
    chargeDelete(index, rows) {
      let that = this;
      that.id = this.charge[index].id;
      rows.splice(index, 1);
      this.$ajax
        .delete(url + "pay/deletePayItemMeter", {
          params: {
            payItemMeterId: this.id
          }
        })

        .then(res => {
          this.getCharge();
        });
    },
    getOptions(){
      this.$ajax.get(url + 'room/flndByClientId/aaa')
      
      .then(res => {
          this.options=res.data;
      })
    },
    //弹窗
    tanchaung(index, rows, msg) {
      if (msg === 2) {
        let that = this;
        (this.addNewOne = false),
          (this.changeOne = true),
          (that.id = this.charge[index].id);
        console.log(this.id);
        this.news = true;
        if (that.id !== "") {
          this.name = "编辑";
          this.$ajax
            .get(url + "pay/queryPayItemMeter", {
              params: {
                payItemMeterId: this.id
              }
            })
            .then(res => {
              console.log(res);
              var temp = res.data.data;
              this.add = temp;
              this.add.payItemId = temp.payItemId;
              this.add.type = temp.meterId;
              this.add.remarks = temp.remark;
              this.add.name = temp.name;
            });
        }
      }
    },
    addNewProject() {
      (this.add = {}),
      (this.addNewOne = false),
      (this.changeOne = true),
      (this.news = true);
    },
    luru() {
      this.entrydata = {};
      this.entry = true;
      this.name = "录入"

    },
    editThis(index,rows){
      this.entrydata = {};
      this.entry = true;
      this.name = "编辑"
      // console.log(this.meter[index])
      this.$ajax.get(url + 'pay/getMeterManagementById',{
              params: {
                payMeterId : this.meter[index].id
              }
            })
      .then(res =>{
        this.entrydata=res.data.data;
        this.entrydata.houseType=res.data.data.arrList;
        this.entrydata.charge = res.data.data.payItemMeterId
        this.entrydata.time = res.data.data.paymentDay
      })
    },
    createPayItem() {
      var payItemVO = {};
      payItemVO.payItemMeterId = this.id;
      payItemVO.payItemId = this.add.payItemId;
      payItemVO.meterId = this.add.type;
      payItemVO.payItemMeterName = this.add.name;
      payItemVO.remake = this.add.remarks;
      console.info(payItemVO);
      this.$ajax.post(url + "pay/createPayItemMeter", payItemVO).then(res => {
        alert("成功");
        this.add == {};
        this.news = false;
      });
    },
    //新增收费参数
    submit() {
      var payItemVO = {};
      payItemVO.payItemMeterId = this.id;
      payItemVO.payItemId = this.add.payItemId;
      payItemVO.meterId = this.add.type;
      payItemVO.payItemMeterName = this.add.name;
      payItemVO.remake = this.add.remarks;
      this.$ajax.post(url + "", payItemVO);
    },
    createInstrument(){
      
    },
    //应收费用
    Cost() {
      this.$ajax
        .get(url + "pay/queryReceivable", {
          params: {
            payItem: this.shouldId,
            page: this.currentPage2,
            pageSize: this.pageSize2
          }
        })
        .then(res => {
          console.log(res);
          this.temporary = res.data.data.rows;
          this.totalData2 = res.data.data.records;
        });
    },
    //仪表管理
    getMeter() {
      this.$ajax
        .get(url + "pay/queryMeterManagementAll", {
          params: {
            page: this.currentPage1,
            pageSize: this.pageSize1
          }
        })
        .then(res => {
          console.log(res);
          this.meter = res.data.data.rows;
          this.totalData1 = res.data.data.records;
        });
    },
    getCharges(){
       this.$ajax.get(url+"pay/getPayItemMeterName")
       
       .then(res =>{
        this.charges=res.data.data;
        console.log(this.charges);
       });
    },
    //
    //常规
    feiyong1() {
      this.shouldId = "180723BR7M3G986W";
      this.$ajax
        .get(url + "pay/queryReceivable", {
          params: {
            payItem: "180723BR7M3G986W",
            page: "1",
            pageSize: "2"
          }
        })
        .then(res => {
          console.log(res);
          this.temporary = res.data.data.rows;
          this.totalData2 = res.data.data.records;
        });
    },
    //抄表
    feiyong2() {
      this.shouldId = "180723BR8PBFT354";
      this.$ajax
        .get(url + "pay/queryReceivable", {
          params: {
            payItem: "180723BR8PBFT354",
            page: "1",
            pageSize: "2"
          }
        })
        .then(res => {
          console.log(res);
          this.temporary = res.data.data.rows;
          this.totalData2 = res.data.data.records;
        });
    },
    //临时
    feiyong3() {
      this.shouldId = "180723BRAS3GHR68";
      this.$ajax
        .get(url + "pay/queryReceivable", {
          params: {
            payItem: "180723BRAS3GHR68",
            page: "1",
            pageSize: "2"
          }
        })
        .then(res => {
          console.log(res);
          this.temporary = res.data.data.rows;
          this.totalData2 = res.data.data.records;
        });
    },
    submitIn(){
      var arr=this.entrydata.houseType;
      var payMeterVO = {
        "roomId":arr[arr.length-1],//关联房屋
        "payItemMeterId":this.entrydata.charge,//收费项目
        "payMonth":this.entrydata.time,//录入时间
        "univalence":this.entrydata.univalence,//单价
        "lastRead":this.entrydata.start,//起度
        "currentRead":this.entrydata.end,//止
        "remark":this.entrydata.remarks
      }
      console.log(payMeterVO)
      this.$ajax.post(url + 'pay/createPayMeter',payMeterVO).then(res => {
        if(res.data.status === 200){
          alert('成功')
        }
      })
    },
    nn() {
      var card = document.getElementById("card");
      var cardlist = card.children;

      for (var i = 0; i < cardlist.length; i++) {
        cardlist[i].index = i;
        cardlist[i].onclick = function() {
          for (var m = 0; m < cardlist.length; m++) {
            cardlist[m].className = "";
          }
          this.className = "active";
        };
      }
    }
  },
  components: {
    NavHeader,
    NavBar
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
  height: 844px;
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
  border: 1px solid #999999;
  border-radius: 5px;
  margin-left: 5px;
  background: white;
  color: #999999;
  height: 31px;
  float: right;
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
#main {
  padding-top: 52px;
}
</style>
