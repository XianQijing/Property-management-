<template>
  <div class="parking">
    <nav-bar/>
		<div class="container">
			<nav-header/>
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="今日停车" name="first">
              <today/>
            </el-tab-pane>
            <el-tab-pane label="历史停车" name="second">
              <history/>
            </el-tab-pane>
            <el-tab-pane label="包月" name="third">
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
export default {
  name: 'parjing',
  data(){
    return{
      activeName: 'first'
    }
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

