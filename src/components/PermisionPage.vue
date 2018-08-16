<template>
  <div id="page">
    <!-- <el-table :data="tableData5" style="width: 95%" @expand-change="expandChange" v-loading="fullscreenLoading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table  :data="props.row.tableData" style="width:100%;right: -50px;" :show-header="false">
            <el-table-column label="商品 ID" prop="date" width="550"></el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.look"  @change="checkAll($event, scope, 'single', props, 1)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.add"  @change="checkAll($event, scope, 'single', props, 2)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.adit"  @change="checkAll($event, scope, 'single', props, 3)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.del"  @change="checkAll($event, scope, 'single', props, 4)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.all"  @change="checkAll($event, scope, 'inner', props)"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="id" width="600"></el-table-column>
      <el-table-column label="查看" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.look" @change="checkAll($event, scope, 'look')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="添加" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.add" @change="checkAll($event, scope, 'add')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.adit" @change="checkAll($event, scope, 'adit')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.del" @change="checkAll($event, scope, 'del')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="全选" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.all" @change="checkAll($event, scope, 'outer')"></el-checkbox>
        </template>
      </el-table-column>
    </el-table> -->
    <el-table :data="Data" style="width: 95%" @expand-change="expandChange" v-loading="fullscreenLoading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table  :data="props.row.object" style="width:100%;right: -50px;" :show-header="false">
            <el-table-column label="名称" prop="name" width="550"></el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[0]" v-model="scope.row.fp[0].status"  @change="boxchecked($event)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[0]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[1]" v-model="scope.row.fp[1].status"  @change="boxchecked($event)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[1]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[2]" v-model="scope.row.fp[2].status"  @change="boxchecked($event)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[2]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[3]" v-model="scope.row.fp[3].status"  @change="boxchecked($event)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[3]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.all"  @change="boxchecked($event)"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" width="600"></el-table-column>
      <el-table-column label="查看" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.look" @change="boxchecked($event, scope, 'look')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="添加" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.add" @change="boxchecked($event, scope, 'add')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.del" @change="boxchecked($event, scope, 'del')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.adit" @change="boxchecked($event, scope, 'adit')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="全选" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.all" @change="boxchecked($event, scope, 'all')"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import url from '../assets/Req.js'
export default {
  name: 'Page',
  data() {
    return {
      fullscreenLoading: false,
      tableData5: [
        {
          id: '12987122',
          look: false,
          add: true,
          adit: true,
          del: false,
          all: false,
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            }
          ]
        },
        {
          id: '12987123',
          look: false,
          add: true,
          del: false,
          adit: false,
          all: true,
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            }
          ]
        },
        {
          id: '12987125',
          look: false,
          add: false,
          del: true,
          adit: true,
          all: true,
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            }
          ]
        },
        {
          id: '12987126',
          look: true,
          add: false,
          del: false,
          adit: true,
          all: false,
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              look: false,
              add: true,
              del: false,
              adit: true,
              all: false
            }
          ]
        }
      ],
      Data: []
    }
  },
  mounted() {
    // POST  /role/Uajax  roleId=180717116472055595008
    this.fullscreenLoading = true
    // token   1808089Z3Y66CFNC.4E01QMztbXGDAAVY5VXeRQ==
    this.$ajax.get(url + 'role/Uajax?roleId=180717116472055595008').then(res => {
      console.log(res.data)
      this.fullscreenLoading = false
      this.Data = res.data
    })
  },
  methods: {
    boxchecked (event, scope, which) {
      console.log(event, scope, which)
      if (which === 'all') {} else if (which === 'add') {
        if (event === true) {
          scope.row.object.forEach(v => {
            // if (v.fp[1]) {
            //   v.fp[1].add[0].status = true
            // }
          })
        } else {
          scope.row.object.forEach(v => {
            // if (v.fp[1]) {
            //   v.fp[1].add[0].status = false
            // }
          })
        }
      } else if (which === 'look') {
        if (event === true) {
          scope.row.object.forEach(v => {
            if (v.fp[0]) {
              // v.fp[0].query[0].status = true
            }
          })
        } else {
          scope.row.object.forEach(v => {
            if (v.fp[0]) {
              // v.fp[0].query[0].status = false
            }
          })
        }
      } else if (which === 'del') {
        if (event === true) {
          scope.row.object.forEach(v => {
            if (v.fp[2]) {
              // v.fp[2].delete[0].status = true
            }
          })
        } else {
          scope.row.object.forEach(v => {
            if (v.fp[2]) {
              // v.fp[2].delete[0].status = false
            }
          })
        }
      } else if (which === 'adit') {
        if (event === true) {
          scope.row.object.forEach(v => {
            if (v.fp[3]) {
              // v.fp[3].update[0].status = true
            }
          })
        } else {
          scope.row.object.forEach(v => {
            if (v.fp[3]) {
              // v.fp[3].update[0].status = false
            }
          })
        }
      } else if (which === 'all') {
        if (event === true) {
          scope.row.object.forEach(v => {
          })
        } else {
          scope.row.object.forEach(v => {
          })
        }
      }
    },
    checkAll (val, scope, str, data, num) {
      // console.log(val, scope, str, data, num)
      // if (str === 'outer') {
      //   if (val === true) {
      //     this.tableData5[scope.$index].look = true
      //     this.tableData5[scope.$index].adit = true
      //     this.tableData5[scope.$index].del = true
      //     this.tableData5[scope.$index].add = true
      //     this.tableData5[scope.$index].all = true
      //     for (var i = 0; i < this.tableData5[scope.$index].tableData.length; i++) {
      //       this.tableData5[scope.$index].tableData[i].look = true
      //       this.tableData5[scope.$index].tableData[i].adit = true
      //       this.tableData5[scope.$index].tableData[i].del = true
      //       this.tableData5[scope.$index].tableData[i].add = true
      //       this.tableData5[scope.$index].tableData[i].all = true
      //     }
      //   } else {
      //     this.tableData5[scope.$index].look = false
      //     this.tableData5[scope.$index].adit = false
      //     this.tableData5[scope.$index].del = false
      //     this.tableData5[scope.$index].add = false
      //     this.tableData5[scope.$index].all = false
      //     for (var i = 0; i < this.tableData5[scope.$index].tableData.length; i++) {
      //       this.tableData5[scope.$index].tableData[i].look = false
      //       this.tableData5[scope.$index].tableData[i].adit = false
      //       this.tableData5[scope.$index].tableData[i].del = false
      //       this.tableData5[scope.$index].tableData[i].add = false
      //       this.tableData5[scope.$index].tableData[i].all = false
      //     }
      //   }
      // } else if (str === 'inner') {
      //   if (val === true) {
      //     scope.row.look = true
      //     scope.row.adit = true
      //     scope.row.del = true
      //     scope.row.add = true
      //     scope.row.all = true
      //   } else {
      //     scope.row.look = false
      //     scope.row.adit = false
      //     scope.row.del = false
      //     scope.row.add = false
      //     scope.row.all = false
      //     data.row.look = false
      //     data.row.adit = false
      //     data.row.del = false
      //     data.row.add = false
      //     data.row.all = false
      //   }
      // } else if (str === 'look') {
      //   if (val === true) {
      //     for (var i = 0; i < scope.row.tableData.length; i++) {
      //       scope.row.tableData[i].look = true
      //     }
      //   } else {
      //     for (var i = 0; i < scope.row.tableData.length; i++) {
      //       scope.row.tableData[i].look = false
      //       scope.row.tableData[i].all = false
      //       this.tableData5[scope.$index].all = false
      //     }
      //   }
      // } else if (str === 'add') {
      //   if (val === true) {
      //     for (var i = 0; i < scope.row.tableData.length; i++) {
      //       scope.row.tableData[i].add = true
      //     }
      //   } else {
      //     for (var i = 0; i < scope.row.tableData.length; i++) {
      //       scope.row.tableData[i].add = false
      //       scope.row.tableData[i].all = false
      //       this.tableData5[scope.$index].all = false
      //     }
      //   }
      // } else if (str === 'adit') {
      //   if (val === true) {
      //     for (var i = 0; i < scope.row.tableData.length; i++) {
      //       scope.row.tableData[i].adit = true
      //     }
      //   } else {
      //     for (var i = 0; i < scope.row.tableData.length; i++) {
      //       scope.row.tableData[i].adit = false
      //       scope.row.tableData[i].all = false
      //       this.tableData5[scope.$index].all = false
      //     }
      //   }
      // } else if (str === 'del') {
      //   if (val === true) {
      //     for (var i = 0; i < scope.row.tableData.length; i++) {
      //       scope.row.tableData[i].del = true
      //     }
      //   } else {
      //     for (var i = 0; i < scope.row.tableData.length; i++) {
      //       scope.row.tableData[i].del = false
      //       scope.row.tableData[i].all = false
      //       this.tableData5[scope.$index].all = false
      //     }
      //   }
      // } else if (str === 'single') {
      //   if (val === false) {
      //     scope.row.all = false
      //     data.row.all = false
      //     if (num === 4) {
      //       data.row.del = false
      //     } else if (num === 3) {
      //       data.row.adit = false
      //     } else if (num === 2) {
      //       data.row.add = false
      //     } else if (num === 1) {
      //       data.row.look = false
      //     }
      //   }
      // }
    },
    expandChange (row, expandedRows) {
      // console.log(row)
      // console.log(expandedRows)
    }
  }
}
</script>

<style lang="less" scoped>
#page {
  position: absolute;
  background: #fff;
  z-index: 999999;
  padding-right: 40px;
  width: 100%;
  overflow: scroll;
  height: 100%;
  table td {
    padding: 0 !important;
  }
  .el-table__expanded-cell[class*=cell] {
    background: #0d68e6;
  }
  .el-table--enable-row-transition .el-table__body td {
    background: #0d68e6;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>