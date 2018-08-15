<template>
  <div class="support">
    <nav-bar/>
    <div class="container">
      <nav-header/>
      <div class="card row">
        <div class="col-md-12">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="房产与客户" name="first">
              <house-and-cust/>
            </el-tab-pane>

            <el-tab-pane label="租赁分析">
            </el-tab-pane>

            <el-tab-pane label="收入分析">             
            </el-tab-pane>

            <el-tab-pane label="水电报表">
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
  import HouseAndCust from './houseAndCust.vue'
export default {
  name:'support',
  data(){
    return{
      activeName: 'first'
    }
  },
  components: {
    NavHeader,
    NavBar,
    HouseAndCust
      },
  methods: {
      changePosition() {
    console.log(this.position)
  },
  handleClick(tab, event) {
    console.log(tab, event);
      },
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
    min-width: 1000px;
	}

.support {
	background: #eeeeee;
	}

.card {
		margin: 0;
		background-color: white;
		width: 99%;
		margin: 10px 10px 0 5px;
	}

/* .add {
		color: white;
		background-color: #32a8ee;
		font-size: 14px;
		font-family: "Microsoft YaHei";
		border: 1px solid #32a8ee;
		border-radius: 5px;
		width: 100px;
		height: 31px;
        margin-right: 10px;
        margin-top: 10px;
		margin-bottom: 20px;
    }

    .fenye {
		float: right;
		padding: 20px 0;
        display: block!important;
	}

    .main {
		padding: 0 40px 0 50px;
		width: 99%;
		margin-left: 2px;
	}
.confirm {
    background-color: #32a8ee;
    border: #32a8ee;
    color: white;
    border-radius: 5px;
}

.cancel {
    background-color: white;
    border: 1px solid rgb(217, 217, 217);
    color: rgb(138, 138, 138);
    border-radius: 5px;
}

.active {
    background: white !important;
} */



.main1 {
    margin: 10vh 10vw;
    border: 1px solid #eeeeee;
    border-top: 2px solid #00BFB4;
}

.main1 ul {
    padding: 0;
    background: #F1F1F1;
    margin: 0;
}
.main1 li{
    display: inline-block;
    padding: 15px 20px 15px 20px;
    color: #999999;
}

#main div {
    position: relative;
    background: white
}

</style>
