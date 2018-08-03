<template>
	<div class="notice">
		<nav-bar/>
    <div class="container">
	<div class="row">
		<div class="personal col-md-12">
			<nav-header :name="username"></nav-header>
		</div>
	</div>
	<div class="row">
		<div class="personal col-md-12">

		</div>
	</div>
		</div> 
    </div>
</template>

<script>
import NavBar from '.././components/NavBar.vue'
import NavHeader from '.././components/NavHeader.vue'
import url from '../assets/Req.js'

export default {
	name:'notice',
  data(){
      return{}
  },

  mounted(){
			
  },
  
  methods:{
  },
  components: {
    NavBar,
	NavHeader
  }
}
</script>

<style scoped>
.notice {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}

html {
  background-color: #eeeeee!important;
}

.container {
		width: 88%;
		position: relative;
		left: 6%;
		background-color: #eeeeee;
	}
	
	.navHeader {
		width: 100%;
		height: 3.17%;
		background-color: white;
	}

  .row {
        margin-top: 5px;
		background-color: white;
		margin-left: -2px;
        margin-right: 1px;
    }

	.col-md-4 {
		position: relative;
		height: 43.65vh;
		border-right: 5px solid #eeeeee;
	}
	.col-md-8 {
		position: relative;
		height: 43.65vh;
	}

</style>
