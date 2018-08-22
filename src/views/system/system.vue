<template>
  <div class="system">
		<div class="container">
			<nav-header/>
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收费参数" name="first">
              <message/>
            </el-tab-pane>
            <el-tab-pane label="短信模板" name="second">
              <parameters/>
            </el-tab-pane>
            <el-tab-pane label="权限管理" name="third">
              <role/>
            </el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBar from '@/components/NavBar'
import Message from './message'
import Parameters from './parameters'
import Role from './role'
export default {
  name: 'system',
  data(){
    return{
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push('/system')
    },
  },
  components: {
    NavHeader,
    NavBar,
    Message,
    Parameters,
    Role
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
