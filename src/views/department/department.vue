<template>
  <div class="department">
    <div class="card row">
				<div class="col-md-12">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="部门管理" name="first" v-if="this.role1.indexOf('rubik:divisional:list')!==-1">
              <manage-name/>
            </el-tab-pane>
            <el-tab-pane label="职员信息" name="third" v-if="this.role1.indexOf('rubik:employee:list')!==-1">
              <staff/>
            </el-tab-pane>
          </el-tabs>
				</div>
    </div>
  </div>
</template>
<script>
import manageName from './manage'
import url from '../../assets/Req.js'
import Staff from './staff'
export default {
  name: 'department',
  components:{
      manageName,
      Staff
    },
  data () {
    return {
      role1:[],
      activeName: 'first'
    }
  },
  mounted () {
    this.$ajax.get(url + 'role/findPermission').then(res => {
      res.data.data.forEach(v => {
        this.role1.push(v.permission)
      })
    })
    if(this.$route.query.tabPane){
      this.activeName = this.$route.query.tabPane
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push('/department')
    }
  }
}
</script>
<style scoped>
.department {
  background: #eeeeee;
}
.card {
  margin: 0;
  background-color: white;
  width: 99%;
  margin: 10px 10px 0 5px;
}
</style>

