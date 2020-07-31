$(document).ready(function(){
    initSelect();
    drawPic1(new Date().getFullYear(),new Date().getMonth() + 1);
    onchangeSelect();
});

function drawPic1(year, month){
    var myChart = echarts.init(document.getElementById('pic1'));
    myChart.showLoading();
    // 异步加载数据
    $.get('getMonthlyData/?year=' + year + '&month=' + month).done(function (data) {
        var t = "月份:" + data.date + " 城市:" + data.city;
        max = Number(data["maxWendu"].split("（")[0]);
        maxDate = data["maxWendu"].split("（")[1].split("）")[0];
        min = Number(data["minWendu"].split("（")[0]);
        minDate = data["minWendu"].split("（")[1].split("）")[0];
        myChart.hideLoading();
        myChart.setOption({
            title: {
                text: t,
            },
            tooltip: {},
            legend: {
                data:['温度'],
            },
            xAxis: {
                data: ['最高温度\n'+maxDate,'最低温度\n'+minDate,'白天平均温度','夜晚平均温度'],
            },
            yAxis: {},
            series: [{
                name: '温度',
                type: 'bar',
                data: [max, min, Number(data['avgbWendu']), Number(data['avgyWendu'])],
            }]
        });
    });
}