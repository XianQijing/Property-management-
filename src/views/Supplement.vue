<template>
  <div class="supplement">
    <h3>补充条款</h3>
    <!-- 定义 -->
    <div class="difinition con">
      <p><span>定义</span></p>
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="交付日：">
          <el-date-picker v-model="paymentTime" type="date" placeholder="请选择交付日"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日：">
          <el-date-picker v-model="terminationTime" type="date" placeholder="请选择终止日"></el-date-picker>
        </el-form-item>
        <el-form-item label="免租装修期：" class="percent">
          <el-date-picker v-model="startTime" type="date" placeholder="请选择免租开始日期"></el-date-picker>
          <span>至</span>
          <el-date-picker v-model="endTime" type="date" placeholder="请选择免租结束日期"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <!-- 租金、物业管理费和支付方式补充 -->
    <div class="rent_supplement con">
      <p><span>租金、物业管理费和支付方式补充</span></p>
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="租金：">
          <el-input placeholder="请输入租金" v-model="monthlyRent">
            <template slot="append">元人民币/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="物业管理费：">
          <el-input placeholder="请输入物业管理费" v-model="monthlyManagementFee">
            <template slot="append">元人民币/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="合计：">
          <el-input placeholder="请输入租金与物业管理费合计" v-model="total">
            <template slot="append">元人民币/月</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 保证金和其他费用补充 -->
    <div class="bond_supplement con">
      <p><span>保证金和其他费用补充</span></p>
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="租赁保证金：">
          <el-input placeholder="请输入保证金" v-model="leaseCommencementDate">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="管理费押金：">
          <el-input placeholder="请输入管理费押金" v-model="cashPledge">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="物业管理费：" class="percent">
          <el-date-picker v-model="manageStartTime" type="date" placeholder="请选择开始日期"></el-date-picker>
          <span>至</span>
          <el-date-picker v-model="manageEndTime" type="date" placeholder="请选择结束日期"></el-date-picker>
          <span>为</span>
          <el-input placeholder="请输入物业管理费" v-model="administrativeFee">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="租金：" class="percent">
          <el-date-picker v-model="rentalStartTime" type="date" placeholder="请选择开始日期"></el-date-picker>
          <span>至</span>
          <el-date-picker v-model="rentalEndTime" type="date" placeholder="请选择结束日期"></el-date-picker>
          <span>为</span>
          <el-input placeholder="请输入租金" v-model="rental">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="物业管理费：" class="percent">
          <el-date-picker v-model="managementCostStartTime" type="date" placeholder="请选择开始日期"></el-date-picker>
          <span>至</span>
          <el-date-picker v-model="managementCostEndTime" type="date" placeholder="请选择结束日期"></el-date-picker>
          <span>为</span>
          <el-input placeholder="请输入物业管理费" v-model="managementCost">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="合计：">
          <el-input placeholder="请输入费用合计" v-model="aggregate">
            <template slot="append">元人民币</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button type="primary" @click="save">确定</el-button>
        <span style="margin: 0 100px;"></span>
        <el-button type="info" plain @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import url from '../assets/Req.js'
export default {
  name:'Supplement',
  data () {
    return {
      form: {
        paymentTime: '',
        terminationTime: '',
        startTime: '',
        endTime: '',
        monthlyRent: '',
        monthlyManagementFee: '',
        total: '',
        leaseCommencementDate: '',
        cashPledge: '',
        manageStartTime: '',
        manageEndTime: '',
        administrativeFee: '',
        rentalStartTime: '',
        rentalEndTime: '',
        rental: '',
        managementCostStartTime: '',
        managementCostEndTime: '',
        managementCost: '',
        aggregate: '',
      },
      date: ''
    }
  },
  methods: {
    save () {
      
      // 交付时间： paymentTime
      // 合同终止时间： terminationTime
      // 租赁时间： startTime   endTime

      // 月租金： monthlyRent
      // 月物业管理费： monthlyManagementFee
      // 租金物业费合计： total
      
      // 租赁保证金： leaseCommencementDate
      // cashPledge 物业管理费押金
      // 物业管理费开始日期 manageStartTime
      // 物业管理费结束日期 manageEndTime
      // 管理费 administrativeFee
      // 租金开始时间 rentalStartTime
      // 租金结束时间 rentalEndTime
      // 租金 rental
      // 管理费开始时间 managementCostStartTime
      // 合同中的第二次管理费结束时间 managementCostEndTime
      // 合同中的第二次管理费 managementCost
      // 合计 aggregate
      
      // this.$ajax.post(url + 'contract/addContract', contractVO).then(res => {
          
      // })
    },
    back () {}
  }
}
</script>

<style lang="less" scoped>
.supplement {
  position: absolute;
  background: white;
  z-index: 2000;
  width: 100%;
  height: 100%;
  .el-form {
    overflow: hidden;
    width: 100%;
    min-width: 1100px;
  }
  .el-form-item {
    width: 50%;
    float: left;
  }
  .el-input {
    width: 390px;
  }
  .con {
    padding: 0 5%;
    .percent {
      width: 100%;
      float: none;
      clear: both;
      .el-input {
        float: left;
        width: 265px;
      }
      span {
        float: left;
        padding: 0 18px;
      }
    }
  }
  p {
    span {
      border-left: #ffa517 solid 4px;
      line-height: 18px;
      height: 18px;
      padding-left: 6px;
    }
  }
}
</style>
