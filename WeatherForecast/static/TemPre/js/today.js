$(document).ready(function(){
    drawTodayPic();
});
function drawTodayPic(){
    var myChart = echarts.init(document.getElementById('todayweather'));
    myChart.showLoading();
    // 异步加载数据
    console.log('123');
    $.get('getTodayData/').done(function (data) {
        tmp = data["data"];
        tem8 = tmp[0]["hours"][0]["tem"].split("℃")[0];
        tem11 = tmp[0]["hours"][1]["tem"].split("℃")[0];
        tem14 = tmp[0]["hours"][2]["tem"].split("℃")[0];
        tem17 = tmp[0]["hours"][3]["tem"].split("℃")[0];
        tem20 = tmp[0]["hours"][4]["tem"].split("℃")[0];
        tem23 = tmp[0]["hours"][5]["tem"].split("℃")[0];
        tem2 = tmp[0]["hours"][6]["tem"].split("℃")[0];
        tem5 = tmp[0]["hours"][7]["tem"].split("℃")[0];


        myChart.hideLoading();
        myChart.setOption({
            title: {

            },
            tooltip: {},
            legend: {

            },
            xAxis: {
                data: ['8:00\n',
                '11:00\n',
                '14:00\n',
                '17:00\n',
                '20:00\n',
                '23:00\n',
                '2:00\n',
                '5:00\n'],
                axisTick: { show: false },
                splitLine: {show : true},
            },
            yAxis: {
                show: false,
                splitLine: {show : false},
            },
            series: [{
                name: '温度',
                type: 'line',
                data: [tem8,tem11,tem14,tem17,tem20,tem23,tem2,tem5],
                itemStyle : { normal: {label : {show: true}}},
                color: '#FFB90F'
            }]
        });
    });
}