<template>
  <div class="DecisionCommonHeader">
    <div class="time">
      <span>选择时间：</span>
      <el-button size="small" v-for="(item, index) in dateList" :key="index" :class="{actived:index == num2}" @click="tableTab(index)">{{ item }}</el-button>
    </div>
    <div class="date">
      <span>日期：</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="dateChange"
        size="small"
        format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <!-- <div class="area" v-show="isArea">
      <span>选择区域：</span>
      <el-select v-model="value" placeholder="请选择" size="small">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'DecisionCommonHeader',
  data () {
    return {
      date: '',
      date1: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',
      // dateList: ['年', '月'],
      dateList: ['年', '月', '日', '周', '季'],
      num2: 0,
      // isArea: true
    }
  },
  methods: {
    dateChange (data) {
      var val = data[0].getFullYear() + '-' + (data[0].getMonth() + 1) + '-' + data[0].getDate() + '~' +data[1].getFullYear() + '-' + (data[1].getMonth() + 1) + '-' + data[1].getDate()
      // console.log(val)
      this.$emit('dateTime', val)
    },
    tableTab (index) {
      this.num2 = index
      // console.log(index)
      this.$emit('time', index)
    }
  },
  props: {
    isArea: {
      type: Boolean,
      default () {
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.DecisionCommonHeader {
  // height: 185px;
  height: 100px;
  width: 100%;
  border-bottom: 20px solid rgba(240,240,240,1);
  .time {
    float: left;
    padding: 20px 0 20px 30px;
    button:hover {
      background: #FF9494;
      color: #fff;
      border-color: #FF9494;
    }
    .actived {
      background: #FF9494;
      color: #fff;
      outline: none;
      border-color: #FF9494;
    }
  }
  .date {
    float: left;
    padding: 20px 50px;
  }
  .area {
    clear: both;
    padding: 20px 0 20px 30px;
  }
  .el-date-editor .el-range-separator {
    padding: 0 10px;
  }
}
</style>
