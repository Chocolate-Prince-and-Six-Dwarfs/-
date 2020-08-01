$(document).ready(function(){
    drawTodayPic();
});
function drawTodayPic(){
    var myChart = echarts.init(document.getElementById('todayweather'));
    myChart.showLoading();
    // 异步加载数据
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
    window.addEventListener("resize",function (){
        myChart.resize();
    });
}

$.get('getTodayData/').done(function (data){
    document.getElementById("publicDate").innerHTML = data.data[0].date + "发布";
    document.getElementById("temText").innerHTML = data.data[0].tem;
    document.getElementById("nameText").innerHTML = data.data[0].wea;
    document.getElementById("weekText").innerHTML = data.data[0].week;
    document.getElementById("winText").innerHTML = data.data[0].win[0]+" "+data.data[0].win_speed;
    document.getElementById("humText").innerHTML = "湿度:" + data.data[0].humidity +"%";
    document.getElementById("airText").innerHTML = "空气质量:" + data.data[0].air;

    var wea_img
    var tip_text
    switch (data.data[0].wea) {
        case "小雨":
            wea_img = "../static/img/07.png";
            tip_text = "今天有小雨，出门记得带伞~"
            break;
        case "中雨":
            wea_img = "../static/img/08.png";
            tip_text = "今天有中雨，出门记得带伞~"
            break;
        case "大雨":
            wea_img = "../static/img/09.png";
            tip_text = "今天有大雨，出门记得带伞~"
            break;
        case "雷阵雨":
            wea_img = "../static/img/05.png";
            tip_text = "今天有雷阵雨，出门记得带伞~"
            break;
        case "多云":
            wea_img = "../static/img/01.png";
            tip_text = "光芒透过云缝，洒向大地~"
            break
        case "阴":
            wea_img = "../static/img/02.png";
            tip_text = "天暗下来，你就是阳光~"
            break;
        case "晴":
            wea_img = "../static/img/00.png";
            tip_text = "你若安好，便是晴天~"
            break;
        default:
            wea_img = "../static/img/02.png";
            tip_text = "现在的温度比较舒适~"
            break;
    }
    document.getElementById("ct-image").innerHTML = '<img class="weaImg"src="'+wea_img+'"/>'
    document.getElementById("txt-tips").innerHTML = tip_text
})
