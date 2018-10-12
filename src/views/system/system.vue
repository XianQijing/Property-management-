<template>
  <div class="system">
		<div>
			<!-- <nav-header/> -->
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收费参数" name="first" :lazy="lazy" v-if="this.role.indexOf('rubik:charge:list')!==-1">
              <message/>
            </el-tab-pane>
            <el-tab-pane label="短信模板" name="second" :lazy="lazy"  v-if="this.role.indexOf('rubik:addMessageTemplate:list')!==-1">
              <parameters/>
            </el-tab-pane>
            <el-tab-pane label="权限管理" name="third" :lazy="lazy"  v-if="this.role.indexOf('rubik:permission:list')!==-1">
              <role/>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="fourth" :lazy="lazy">
              <operation/>
            </el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import Message from './message'
import Parameters from './parameters'
import Role from './role'
import Operation from './operation'
import url from '../../assets/Req.js'
// import DepartNav from '../../components/departNav.vue'
export default {
  name: 'system',
  data(){
    return{
      activeName: 'first',
      role: [],
      lazy:true
    }
  },
  mounted(){
    this.$ajax.get(url + 'role/findPermission').then(res => {
      res.data.data.forEach(v => {
        this.role.push(v.permission)
      })
    })
    if(this.$route.query.tabPane)
    {this.activeName = this.$route.query.tabPane}else{
      this.activeName ='first'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push('/system')
    },
  },
  components: {
    Message,
    Parameters,
    Role,
    Operation
    // DepartNav
  }
}
</script>
<style scoped>
.container {
  width: 88%;
  position: relative;
  left: 6%;
  background-color: #eeeeee;
  padding: 0;
}
.system {
  background: #eeeeee;
}
	
.card {
  margin: 0;
  background-color: white;
  width: 99%;
  margin: 10px 10px 0 5px;
}
</style>
