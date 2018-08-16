<template>
  <div id="page">
    <div class="name">
      <span style="font-size: 20px;line-height: 30px;">角色：{{ name }}</span>
      <span style="float:right">
        <el-button type="primary" size="small" @click="sureUpdate">确定</el-button>
        <el-button type="primary" size="small" @click="back()" style="margin-right: 50px;">返回</el-button>
      </span>
    </div>
    <el-table :data="Data" style="width: 95%" @expand-change="expandChange" v-loading="fullscreenLoading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table  :data="props.row.object" style="width:100%;right: -50px;" :show-header="false">
            <el-table-column label="名称" prop="name" width="550"></el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[0]" v-model="scope.row.fp[0][0].status"  @change="boxchecked($event, scope, 6, props.row)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[0]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[1]" v-model="scope.row.fp[1][0].status"  @change="boxchecked($event, scope, 7, props.row)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[1]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[2]" v-model="scope.row.fp[2][0].status"  @change="boxchecked($event, scope, 8, props.row)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[2]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[3]" v-model="scope.row.fp[3][0].status"  @change="boxchecked($event, scope, 9, props.row)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[3]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.all"  @change="boxchecked($event, scope, 10, props.row)"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" width="600"></el-table-column>
      <el-table-column label="查看" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.look" @change="boxchecked($event, scope, 0)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="添加" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.add" @change="boxchecked($event, scope, 1)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.del" @change="boxchecked($event, scope, 2)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.adit" @change="boxchecked($event, scope, 3)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="全选" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.all" @change="boxchecked($event, scope, 5)"></el-checkbox>
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
      Data: [],
      name: ''
    }
  },
  mounted() {
    // POST  /role/Uajax  roleId=180717116472055595008
    this.fullscreenLoading = true
    // token   1808089Z3Y66CFNC.4E01QMztbXGDAAVY5VXeRQ==
    this.$ajax.get(url + 'role/Uajax?roleId=' + this.$route.query.id).then(res => {
      // console.log(res.data)
      this.fullscreenLoading = false
      this.Data = res.data
    })
    this.$ajax.get(url + 'role/findById', {
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.name = res.data.data.name
    })
  },
  methods: {
    sureUpdate () {
      let arr = []
      this.Data.forEach(v => {
        v.object.forEach(m => {
          m.fp.forEach(n => {
            if (n) {
              if (n[0].status === true) {
                arr.push(n[0].id)
              }
            }
          })
        })
      })
      if (arr.length <= 0) {
        this.$message({
          message: '您还没有选择任何权限',
          type: 'error'
        })
      } else {
        this.$ajax.post(url + 'role/ajaxsave?roleId=' + this.$route.query.id + '&fundIds=' + JSON.stringify(arr).split('[')[1].split(']')[0]).then(res => {
          // console.log(res.data)
          if (res.data.status === 200) {
            window.history.back()
            this.$message({
              message: '修改权限成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      }
    },
    back () {
      window.history.back()
    },
    boxchecked (event, scope, which, father) {
      console.log(event, scope, which, father)
      if (which === 5) {
        if (event === true) {
          scope.row.look = true
          scope.row.add = true
          scope.row.del = true
          scope.row.adit = true
          scope.row.object.forEach(v => {
            v.fp.forEach(m => {
              if (m) {
                m[0].status = true
              }
            })
            v.all = true
          })
        } else {
          scope.row.look = false
          scope.row.add = false
          scope.row.del = false
          scope.row.adit = false
          scope.row.object.forEach(v => {
            v.fp.forEach(m => {
              if (m) {
                m[0].status = false
              }
            })
            v.all = false
          })
        }
      } else if (which <= 3 && which >= 0) {
        if (event === true) {
          scope.row.object.forEach(v => {
            if (v.fp[which]) {
              v.fp[which][0].status = true
            }
          })
        } else {
          scope.row.all = false
          scope.row.object.forEach(v => {
            v.all = false
            if (v.fp[which]) {
              v.fp[which][0].status = false
            }
          })
        }
      } else if (which <= 9 && which >= 6) {
        if (event === false) {
          scope.row.all = false
          father.all = false
          if (which === 6) {
            father.look = false
          }
          if (which === 7) {
            father.add = false
          }
          if (which === 8) {
            father.del = false
          }
          if (which === 9) {
            father.adit = false
          }
        }
      } else if (which === 10) {
        if (event === false) {
          father.look = false
          father.add = false
          father.del = false
          father.adit = false
          father.all = false
          scope.row.fp.forEach(v => {
            if (v) {
              v[0].status = false
            }
          })
        } else {
          scope.row.fp.forEach(v => {
            if (v) {
              v[0].status = true
            }
          })
        }
      }
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