<template>
  <!-- 收入分析表 -->
  <div class="houseAndCust container">
    <DecisionCommonHeader/>
    <div class="charts">
      <div class="title">
        <h3>收入分析表</h3>
        <div class="tab">
          <button class="left" :class="{active:0 == num}" @click="tab(0)">
            <img v-if="num === 1" src="../../assets/img/icon_1.png" alt="">
            <img v-if="num === 0" src="../../assets/img/icon_3.png" alt="">
          </button>
          <button class="right" :class="{active:1 == num}" @click="tab(1)">
            <img v-if="num === 0" src="../../assets/img/icon_2.png" alt="">
            <img v-if="num === 1" src="../../assets/img/icon_4.png" alt="">
          </button>
        </div>
      </div>
      <div id="main3" style="width: 100%;height:500px;background: #fff;margin: 0 auto;"></div>
    </div>
  </div>
</template>

<script>
import DecisionCommonHeader from './DecisionCommonHeader'
import url from '../../assets/Req.js'
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
//引入折线图
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')
export default {
  name: 'houseAndCust',
  data () {
    return {
      num: 0,
      color: ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA'],
      Data: {}
    }
  },
  mounted () {
    // console.log(this.title)
    // payRanking
    // this.$ajax.get(url + 'report/contractValue', {
    //   params: {
    //     howTime: '0',
    //     // time: '',
    //     // building: ''
    //   }
    // }).then(res => {
    //   // console.log(res.data)
    //   this.Data = res.data
    //   this.charts()
    // })
  },
  methods: {
    tab (index) {
      this.num = index
    },
    // 收入分析表
    charts () {
      var myChart = echarts.init(document.getElementById('main3'));
      var weatherIcons = {
          'Sunny': './data/asset/img/weather/sunny_128.png',
          'Cloudy': './data/asset/img/weather/cloudy_128.png',
          'Showers': './data/asset/img/weather/showers_128.png'
      };
      myChart.setOption({
          color: this.color,
          title: {
              text: '天气情况统计',
              subtext: '虚构数据',
              left: 'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              // orient: 'vertical',
              // top: 'middle',
              bottom: 10,
              left: 'center',
              data: ['西凉', '益州','兖州','荆州','幽州']
          },
          series : [
              {
                  type: 'pie',
                  radius : '65%',
                  center: ['50%', '50%'],
                  selectedMode: 'single',
                  data:[
                      {
                          value:1548,
                          name: '幽州',
                          label: {
                              normal: {
                                  formatter: [
                                      '{title|{b}}{abg|}',
                                      '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                                      '{hr|}',
                                      '  {Sunny|}{value|202}{rate|55.3%}',
                                      '  {Cloudy|}{value|142}{rate|38.9%}',
                                      '  {Showers|}{value|21}{rate|5.8%}'
                                  ].join('\n'),
                                  backgroundColor: '#eee',
                                  borderColor: '#777',
                                  borderWidth: 1,
                                  borderRadius: 4,
                                  rich: {
                                      title: {
                                          color: '#eee',
                                          align: 'center'
                                      },
                                      abg: {
                                          backgroundColor: '#333',
                                          width: '100%',
                                          align: 'right',
                                          height: 25,
                                          borderRadius: [4, 4, 0, 0]
                                      },
                                      Sunny: {
                                          height: 30,
                                          align: 'left',
                                          backgroundColor: {
                                              image: weatherIcons.Sunny
                                          }
                                      },
                                      Cloudy: {
                                          height: 30,
                                          align: 'left',
                                          backgroundColor: {
                                              image: weatherIcons.Cloudy
                                          }
                                      },
                                      Showers: {
                                          height: 30,
                                          align: 'left',
                                          backgroundColor: {
                                              image: weatherIcons.Showers
                                          }
                                      },
                                      weatherHead: {
                                          color: '#333',
                                          height: 24,
                                          align: 'left'
                                      },
                                      hr: {
                                          borderColor: '#777',
                                          width: '100%',
                                          borderWidth: 0.5,
                                          height: 0
                                      },
                                      value: {
                                          width: 20,
                                          padding: [0, 20, 0, 30],
                                          align: 'left'
                                      },
                                      valueHead: {
                                          color: '#333',
                                          width: 20,
                                          padding: [0, 20, 0, 30],
                                          align: 'center'
                                      },
                                      rate: {
                                          width: 40,
                                          align: 'right',
                                          padding: [0, 10, 0, 0]
                                      },
                                      rateHead: {
                                          color: '#333',
                                          width: 40,
                                          align: 'center',
                                          padding: [0, 10, 0, 0]
                                      }
                                  }
                              }
                          }
                      },
                      {value:535, name: '荆州'},
                      {value:510, name: '兖州'},
                      {value:634, name: '益州'},
                      {value:735, name: '西凉'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      })
    },
  },
  components: {
    DecisionCommonHeader
  },
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.houseAndCust{
  background: white;
  width: 100%;
  margin: 0;
  position: static;
  min-width: 1270px;
  height: 100%;
}
.charts {}
.title {
  overflow: hidden;
  padding: 35px 0 0;
}
h3 {
  float: left;
  font-size: 24px;
  padding-left: 100px;
}
.tab {
  overflow: hidden;
  float: right;
  margin-right: 100px;
}
button {
  width: 60px;
  height: 30px;
  background: #fff;
  border: 1px solid #dbdbdb;
  float: left;
  padding: 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  cursor: pointer;
  outline: none;
}
img {
  width: 30px;
}
.tab .left {
  border-radius:5px 0px 0px 5px;
}
.tab .right {
  border-radius:0px 5px 5px 0px;
  border-left: 0
}
.title .tab .active {
  background:#FF9494;
}
</style>
