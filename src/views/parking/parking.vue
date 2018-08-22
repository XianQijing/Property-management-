<template>
  <div class="parking">
		<div class="container">
			<nav-header/>
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="今日停车" name="first" v-if="this.role.indexOf('rubik:todayCar:list')!==-1">
              <today/>
            </el-tab-pane>
            <el-tab-pane label="历史停车" name="second" v-if="this.role.indexOf('rubik:historyCar:list')!==-1">
              <history/>
            </el-tab-pane>
            <el-tab-pane label="包月" name="third" v-if="this.role.indexOf('rubik:moon:list')!==-1">
              <month/>
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
import Today from './today'
import History from './history'
import Month from './month'
import url from '../../assets/Req.js'
export default {
  name: 'parking',
  data(){
    return{
      activeName: 'first',
      role:[]
    }
  },
  mounted(){
    this.$ajax.get(url + 'role/findPermission').then(res => {
      res.data.data.forEach(v => {
        this.role.push(v.permission)
      })
    })
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push('/parking')
    },
  },
  components: {
    NavHeader,
    NavBar,
    Today,
    History,
    Month
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
.parking {
  background: #eeeeee;
}
	
.card {
  margin: 0;
  background-color: white;
  width: 99%;
  margin: 10px 10px 0 5px;
}
</style>

