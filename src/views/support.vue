<template>
    <div class="support">
        <nav-bar/>
        <div class="container">
            <nav-header/>
            <div class="card row">
                <div class="col-md-12">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="房产与客户" name="first">

                            <div class="main1">
                                <ul id="card">
                                    <li class="active">上半年</li>
                                    <li>下半年</li>
                                </ul>
                            <div id="main">
                                <div id="chart1" style="height:40vh;margin:100px auto;width: 50vw"></div>
                                <div id="chart2" style="display:none;height:40vh;margin:100px auto;width: 50vw"></div>
                            </div>
                            </div>

                        </el-tab-pane>

                        <el-tab-pane label="租赁分析">
                             <div class="main1">
                                 <div id="rent" style="height:40vh;margin:100px auto;width: 50vw"></div>
							</div>                 
                        </el-tab-pane>

                        <el-tab-pane label="收入分析">
                            <div class="main1">
                            <ul id="baobiao">
                                    <li class="active">上半年</li>
                                    <li>下半年</li>
                                </ul>
                                
                            <div id="ww">
                                <div id="shouru" style="height:55vh;margin:50px auto;width: 50vw">
                                </div>
                                <div id="xc" style="display:none;height:55vh;margin:50px auto;width: 50vw"></div>
							</div>    
                            </div>             
                        </el-tab-pane>

                        <el-tab-pane label="水电报表">
                            <div class="main1">
                                
                                <div>
                                    <div id="shuibiao" style="height:55vh;margin:50px auto;width: 50vw">
                                    </div>
                                    <div></div>
                                </div>
							</div> 
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import url from '../assets/Req.js'
	import NavHeader from '@/components/NavHeader'
    import NavBar from '@/components/NavBar'
    var echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    //引入折线图
    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend')
    
export default {
    name:'support',
    data(){
        return{         
            modify:false,
            activeName: 'first',
            chart: [
                [5,20,36,10,10,20],
                [15, 17, 10, 13, 18,8]
            ],
            chartxia:[ 
                [5,20,36,10,10,20],
                [15, 17, 10, 13, 18,8]
            ],
            incomeData: [
                [20,50,30,54,19,33],
                [20,50,30,54,51,33],
                [20,50,30,54,10,33],
                [20,50,30,54,80,33]
            ],
            meter: {
                names:['水费','电费'],
                data:[
                [121,145,48,498,2310,565,165,1564,1020,589,1567,546],
                [1564,497,416,445,487,408,486,897,485,1064,471,2000]
                ]
            }
        }
    },
    mounted () {
        this.initNullPrevEchats(),
        this.initNullNextEchats(),
        this.initRentEchats(),
        this.initIncomePrevEchats(),
        this.initIncomeNextEchats(),
        this.initWaterEchats(),
        this.pp(),
        this.nian()
    }, 
    components: {
			NavHeader,
			NavBar
        },
    methods: {
        changePosition() {
			console.log(this.position)
		},
		handleClick(tab, event) {
			console.log(tab, event);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //上半年空置率
        initNullPrevEchats(){
            var myChart1 = echarts.init(document.getElementById('chart1'));
            myChart1.setOption({
                //百分比
                tooltip: {formatter: '{b}:\n{c}%'},
                legend: {data: ['空置资源', '已租资源'],},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: ['1', '2', '3', '4', '5', '6'],
                    name: '月'
                },
                yAxis: {
                    type:'value',
                    name: '空置率%'
                },
                series: [{
                    name: '空置资源',
                    type: 'bar',
                    stack: '广告',
                    data: this.chartxia[1],
                    itemStyle:{color: '#F9A400',}
                },
                {
                name: '已租资源',
                type: 'bar',
                stack: '总量',
                stack: '广告',
                data: this.chartxia[0],
                itemStyle:{color: '#CECECE',},
                barWidth: 50
            },]
            })
            this.$ajax.get(url + 'report/yearRentNull/0', '').then((res) => {
				console.log(res)
                this.chartxia=res.data.data;
                var myChart1 = echarts.init(document.getElementById('chart1'));
                myChart1.setOption({
                    series: [
                        {data: this.chartxia[1],},
                        {data: this.chartxia[0],},
                    ]
                })
            })
        },
        //下半年空置率
        initNullNextEchats(){
            var myChart = echarts.init(document.getElementById('chart2'));
            myChart.setOption({
                tooltip: {
                    formatter: '{b}:\n{c}%'//百分比
                },
                legend: {
                    data: ['空置资源', '已租资源'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: ['7', '8', '9', '10', '11', '12'],
                    name: '月'
                },
                yAxis: {
                    type:'value',
                    name: '空置率%'
                },
                series: [{
                    name: '空置资源',
                    type: 'bar',
                    stack: '广告',
                    data: this.chart[1],
                    itemStyle:{
                        color: '#F9A400',
                    }
                },
                {
                name: '已租资源',
                type: 'bar',
                stack: '总量',
                stack: '广告',
                data: this.chart[0],
                itemStyle:{
                        color: '#CECECE',
                    },
                barWidth: 50
            },]
            })
            this.$ajax.get(url + 'report/yearRentNull/1', '').then((res) => {
						console.log(res)
                var myChart = echarts.init(document.getElementById('chart2'));
                        this.chart=res.data.data;
                myChart.setOption({
                   series: [{
                    
                    data: this.chart[1],
                    
                    },
                    {
                    
                    data: this.chart[0],
                   
                    },]
                })
            })
        },
        initRentEchats(){
            var rent = echarts.init(document.getElementById('rent'));
            rent.setOption({
                title: {
                    text: '租赁分析'
                },
                tooltip: {
                        formatter: '{b}:\n{c}%'//百分比
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        data: ['商机签约率', '续租率', '出租率', '退租率']
                    },
                    yAxis: {
                        type:'value',
                        name: '%'
                    },
                    series: [
                    {
                    type: 'bar',
                    stack: '总量',
                    stack: '广告',
                    data: ["ribike","ribike","ribike","ribike"],
                    itemStyle:{
                            color: '#F0788F',
                        },
                    barWidth: 40
                },]
            })
            this.$ajax.get(url + 'report/analysisOfLease').then((res) => {
                console.log(res.data.data);
                var rent = echarts.init(document.getElementById('rent'));
                rent.setOption({
                    series: [
                        {data: res.data.data,},
                    ]
                })
            })
        },
        //上半年收入分析
        initIncomePrevEchats(){
            var shouru = echarts.init(document.getElementById('shouru'));
            shouru.setOption({
                title: {
                    text: '收入分析'
                },
                tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['临时费', '物业费','水费','电费'],
            },
            grid: {
                left: '0',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value',
                name: '元'
            },
            yAxis: {
                type: 'category',
                data: ['一月','二月','三月','四月','五月','六月'],
                name: '月份'
            },
            series: [
                {
                    name: '临时费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.incomeData[0],
                    itemStyle:{
                            color: '#F0788F',
                        }
                },
                {
                    name: '物业费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.incomeData[1],
                    itemStyle:{
                            color: '#D471C1',
                        }
                },
                {
                    name: '水费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.incomeData[2],
                    itemStyle:{
                            color: '#9972E7',
                        }
                },
                {
                    name: '电费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.incomeData[3],
                    itemStyle:{
                            color: '#6E72EA',
                        }
                },
                
            ]
            })
            this.$ajax.get(url + 'report/incomeAnalysisYear/0', '').then((res) => {
                console.log(res)
                this.incomeData=res.data.data;
                var shouru = echarts.init(document.getElementById('shouru'));
                shouru.setOption({
                    series: [
                        {data: this.incomeData[0],},
                        {data: this.incomeData[1],},
                        {data: this.incomeData[2],},
                        {data: this.incomeData[3],},
                    ]
                })
            })
            
        },
            //下半年收入分析
        initIncomeNextEchats(){
            var xc = echarts.init(document.getElementById('xc'));
            xc.setOption({
                title: {text: '收入分析'},
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['临时费', '物业费','水费','电费'],
                },
                grid: {left: '0',bottom: '3%',containLabel: true},
                xAxis:  {type: 'value',name: '元'},
                yAxis: {
                    type: 'category',
                    data: ['七月','八月','九月','十月','十一月','十二月'],
                    name: '月份'
                },
            series: [
                {
                    name: '临时费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.incomeData[0],
                    itemStyle:{
                            color: '#F0788F',
                        }
                },
                {
                    name: '物业费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.incomeData[1],
                    itemStyle:{
                            color: '#D471C1',
                        }
                },
                {
                    name: '水费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.incomeData[2],
                    itemStyle:{
                            color: '#9972E7',
                        }
                },
                {
                    name: '电费',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: this.incomeData[3],
                    itemStyle:{
                            color: '#6E72EA',
                        }
                },
            ]
            })
            this.$ajax.get(url + 'report/incomeAnalysisYear/1', '').then((res) => {
                console.log(res)
                this.incomeData=res.data.data;
                var xc = echarts.init(document.getElementById('xc'));
                xc.setOption({
                    series: [
                        {data: this.incomeData[0],},
                        {data: this.incomeData[1],},
                        {data: this.incomeData[2],},
                        {data: this.incomeData[3],},
                    ]
                })
            })
        },
        //水电报表
        initWaterEchats(){
            var shuibiao = echarts.init(document.getElementById('shuibiao'))
            shuibiao.setOption({
                title: {
                    text: '水电费分析'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:this.meter.names
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1','2','3','4','5','6','7','8','9','10','11','12']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:this.meter.names[0],
                        type:'line',
                        data:this.meter.data[0],
                        itemStyle:{
                            color: '#32D2C9',
                        },
                        lineStyle: {
                            width:5
                        },
                        symbolSize: 10
                    },
                    {
                        name:this.meter.names[1],
                        type:'line',
                        itemStyle:{
                            color: '#f8a20f',
                        },
                        lineStyle: {
                            width:5
                        },
                        symbolSize: 10,
                        data:this.meter.data[1]
                    }
                ]
            })
            this.$ajax.get(url + 'report/meterReadingAnalysis', '').then((res) => {
                console.log(res.data)
                this.meter=res.data.data;
                var shuibiao = echarts.init(document.getElementById('shuibiao'))
                shuibiao.setOption({
                    series: [
                        {
                            name:this.meter.names[0],
                            data:this.meter.data[0],
                        },
                        {
                            name:this.meter.names[1],
                            data:this.meter.data[1]
                        }
                    ]
                })
            })
        },



    pp(){
        var card =document.getElementById("card");
		var cardlist = card.children;
		var main = document.getElementById("main");
        var mainlist = main.children;
        
		for (var i= 0;i<cardlist.length;i++){ 
			cardlist[i].index = i;
			cardlist[i].onclick = function (){
				for (var m = 0;m< mainlist.length;m++){
					cardlist[m].className = "";
					mainlist[m].style.display ="none";
				}
				this.className = "active";
				mainlist[this.index].style.display = "block";
			}
		}
    },
    nian(){
        var baobiao = document.getElementById("baobiao");
        var baobiaolist = baobiao.children;
        var ww = document.getElementById("ww");
        var wwlist = ww.children;

        for (var i= 0;i<baobiaolist.length;i++){ 
			baobiaolist[i].index = i;
			baobiaolist[i].onclick = function (){
				for (var m = 0;m< wwlist.length;m++){
					baobiaolist[m].className = "";
					wwlist[m].style.display ="none";
				}
				this.className = "active";
				wwlist[this.index].style.display = "block";
			}
		}
    }

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

.support {
	background: #eeeeee;
	}

.card {
		margin: 0;
		background-color: white;
		width: 99%;
		margin: 10px 10px 0 5px;
	}

.add {
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
		height: 844px;
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
}



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
