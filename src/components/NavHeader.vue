<template>
    	<div class="navHeader ">
				<div class="search">
					<span>当前物业</span>
					<select>
						<option>卢比克魔方</option>
					</select>

					<div class="sousuo">
						<!--搜索-->
						<form action="" method="post" style="display:inline-block;">
						</form>
						<img src="">
						<span>{{name}}</span>
					</div>
				</div>
			</div>
</template>

<script>
export default {
	props:{
		name:''
	},
	data() {
		return{
		}
	},
	
	methods: {

	}
}
</script>

<style scoped>
	.navHeader {
		width: 100%;
		height: 3.17%;
		background-color: white;
	}
	
	.sousuo {
		float: right;
	}
	
	.search {
		padding: 21px 34px;
	}
	
	img {
		border-radius: 50%;
		width: 2em;
		height: 2em;
		background-color: #2e3d50;
		overflow: hidden;
	}
	input{
		background-image: url(.././assets/search.png);
		background-size: 1em;
        background-repeat:no-repeat;
        z-index: 99;
        background-position: 95% 50%;
		border: 1px solid #eeeeee;
		border-radius: 6px;
	}
</style>
