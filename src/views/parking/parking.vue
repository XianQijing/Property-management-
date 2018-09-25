<template>
  <div class="parking">
		<div>
			<!-- <nav-header/> -->
			<div class="card row">
				<div class="col-md-12">
					<el-tabs v-model="activeName" @tab-click="handleClick">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple allPrice">
                  <div style="padding-top:33px">
                    <span>今日应收合计：</span>
                    <div class="radius">
                      <span>{{this.today.should}}<p style="font-size:18px;">元</p></span>
                    </div>
                  </div>
                  <div style="padding-top:33px">
                    <span>今日实收合计：</span>
                    <div class="radius1">
                      <span>{{this.today.had}}<p style="font-size:18px;">元</p></span>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple allPrice1">
                  <div class="sel">
                    <el-date-picker
                    style="width:240px;"
                      size="mini"
                      v-model="time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :clearable="clear"
                      value-format="yyyy-MM-dd"
                      @change="selectTime">
                    </el-date-picker>
                  </div>
                  <div style="display: flex;justify-content: space-around;text-align: center;">
                    <div>
                      <span>应收合计：</span>
                      <div class="radius">
                        <span>{{this.select.should}}<p style="font-size:18px;">元</p></span>
                      </div>
                    </div>
                    <div>
                      <span>实收合计：</span>
                      <div class="radius1">
                        <span>{{this.select.had}}<p style="font-size:18px;">元</p></span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-tab-pane label="今日停车" name="first" :lazy="lazy" v-if="this.role.indexOf('rubik:todayCar:list')!==-1">
              <today/>
            </el-tab-pane>
            <el-tab-pane label="历史停车" name="second" :lazy="lazy" v-if="this.role.indexOf('rubik:historyCar:list')!==-1">
              <history/>
            </el-tab-pane>
            <el-tab-pane label="包月" name="third" :lazy="lazy" v-if="this.role.indexOf('rubik:moon:list')!==-1">
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
      role:[],
      lazy: true,
      today: {
        should: 0,
        had: 0
      },
      time: [],
      select: {
        should: 0,
        had: 0
      },
      clear: false
    }
  },
  mounted(){
    this.$ajax.get(url + 'role/findPermission').then(res => {
      res.data.data.forEach(v => {
        this.role.push(v.permission)
      })
    })
    this.$ajax.get(url + 'pack/queryToDayReceivableAndPayables').then(res => {
      if (res.data.data) {
        this.today.should = res.data.data.receivable
        this.today.had = res.data.data.payables
      }
    })
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push('/parking')
    },
    selectTime(){
        this.$ajax.get(url + 'pack/queryReceivableAndPayablesByDate', {
          params: {
            "begTime": this.time[0],
            "endTime": this.time[1]
          }
        }).then(res => {
          if(res.data.data){
            this.select.should = res.data.data.receivable
            this.select.had = res.data.data.payables
          }else{
            this.$message({
              message: '没有数据',
              type: 'error'
            })
          }
        })
    }
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
.parking {
  background: #eeeeee;
}
	
.card {
  margin: 0;
  background-color: white;
  width: 99%;
  margin: 10px 10px 0 5px;
}
.allPrice {
  height: 205px;
  border: 1px solid #eeeeee;
  box-shadow: 1px 3px 5px #888888;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.allPrice1 {
  height: 205px;
  border: 1px solid #eeeeee;
  box-shadow: 1px 3px 5px #888888;
  border-radius: 10px;
  margin-bottom: 20px;
  /* display: flex;
  justify-content: space-around; */
  /* text-align: center; */
}
.radius{
  height: 139px;
  width: 139px;
  background: #707AFF;
  display: inline-block;
  border-radius: 70px;
  vertical-align: middle;
}
.radius1{
  height: 139px;
  width: 139px;
  background: #FF8168;
  display: inline-block;
  border-radius: 70px;
  vertical-align: middle;
}
.allPrice span {
  font-size:18px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(40,40,40,1);
}
.allPrice1 span {
  font-size:18px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(40,40,40,1);
}
.radius span {
  font-size:26px;
  font-family:MicrosoftYaHei;
  font-weight:bold;
  color:rgba(255,255,255,1);
  position: relative;
  top: 43px
}
.radius1 span {
  font-size:26px;
  font-family:MicrosoftYaHei;
  font-weight:bold;
  color:rgba(255,255,255,1);
  position: relative;
  top: 43px
}
.sel{
  padding:5px 0 5px 5px;
}
</style>
<style>
.parking .el-date-editor .el-range-separator {
    padding: 0!important;
    line-height: 20px;
    width: 5%;
    color: #303133;
}
</style>


