<template>
    <div class="income">
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
</template>

<script>
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
name:'income'
}
</script>

<style>

</style>
