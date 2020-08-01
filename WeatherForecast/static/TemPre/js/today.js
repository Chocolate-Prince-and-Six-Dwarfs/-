$(document).ready(function(){
    drawTodayPic();
});
function drawTodayPic(){
    var myChart = echarts.init(document.getElementById('todayweather'));
    myChart.showLoading();
    // 异步加载数据
    $.get('getTodayData/').done(function (data) {
        tmp = data["data"];
        var temp = new Array();
        var num = 0;
        for(num = 0; tmp[0]["hours"][num]!=null;num++){
            temp[num] = tmp[0]["hours"][num]["tem"].split("℃")[0];
        }
        for(var i = 0; i < 8 - num ;i++){
            temp.unshift(0);
        }
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
                itemStyle: {
                    normal: {
                        label: {
                            show: true, position: 'top', formatter: function (data) {
                                data.value = data.value + "\u2103";
                                return data.value;
                            }
                        }
                    }
                },
                name: '温度',
                type: 'line',
                data: [
                    temp[0],
                    temp[1],
                    temp[2],
                    temp[3],
                    temp[4],
                    temp[5],
                    temp[6],
                    temp[7],
                ],
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
        case "阵雨":
            wea_img = "../static/img/25.png";
            tip_text = "今天有阵雨，出门记得带伞~"
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
