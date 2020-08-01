$(document).ready(function () {
    initSelect("sel_year", "sel_month");
    onchangeSelect("sel_year", "sel_month");
    drawHistoryPic(new Date().getFullYear(), new Date().getMonth());
    processLatestSevenDaysData(new Date().getFullYear(), new Date().getMonth() + 1);
    //new Date().getMonth() + 1 为当前月份
});

function processLatestSevenDaysData(year, month) {
    // 异步加载数据
    $.get('getMonthlyData/?year=' + year + '&month=' + month).done(function (data) {
        weatherData = data.data;
        var date = new Array();
        var max = new Array();
        var min = new Array();
        if (weatherData.length < 6 && weatherData.length > 0) {
            $.get('getMonthlyData/?year=' + year + '&month=' + (month - 1)).done(function (lastMonthData) {
                var dateData = JSON.parse(JSON.stringify(lastMonthData.data).replace(']', '') + ',' + JSON.stringify(weatherData).replace('[', ''));
                processThisMonthAndLastMonth(month, date, max, min, dateData);
            });
        } else if (weatherData.length >= 6) {
            processThisMonthAndLastMonth(month, date, max, min, weatherData);
        } else if (weatherData.length == 0) {
            $.get('getMonthlyData/?year=' + year + '&month=' + (month - 1)).done(function (lastMonthData) {
                processThisMonthAndLastMonth(month, date, max, min, lastMonthData.data);
            });
        } else {
            return;
        }
    });
}

function drawHistoryPic(year, month) {
    var myChart = echarts.init(document.getElementById('historyPic'), 'walden');
    myChart.showLoading();
    // 异步加载数据
    $.get('getMonthlyData/?year=' + year + '&month=' + month).done(function (data) {
        console.log(data.data);
        var historyData = data.data;
        var dateList = new Array(historyData.length);
        var maxList = new Array(historyData.length);
        var minList = new Array(historyData.length);
        for (var i = 0; i < historyData.length; i++) {
            dateList[i] = historyData[i].ymd;
            maxList[i] = historyData[i].bWendu.replace('\u2103', '');
            minList[i] = historyData[i].yWendu.replace('\u2103', '');
        }
        myChart.hideLoading();
        myChart.setOption({
            title: {
                text: '',
                subtext: '数据来源',
            },
            xAxis: {
                data: dateList,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                z: 10,
            },
            yAxis: {
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#999',
                    }
                }
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 15,
                    minSpan: 15,
                    maxSpan: 25,
                }
            ],
            series: [
                {
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
                    type: 'bar',
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: maxList,
                    animation: false
                },
                {
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
                    type: 'bar',
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: minList,
                    animation: false
                },
            ]
        });
    });
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

function processThisMonthAndLastMonth(month, date, max, min, weatherData) {
    for (var i = weatherData.length - 1; i >= weatherData.length - 6; i--) {
        var md = weatherData[i].ymd.split('-')[1] + "-" + weatherData[i].ymd.split('-')[2];
        date.unshift(md);
        max.unshift(Number(weatherData[i].bWendu.split('\u2103')[0]));
        min.unshift(Number(weatherData[i].yWendu.split('\u2103')[0]));
    }
    drawLatestSevenDaysPic(month, date, max, min);
}

function drawLatestSevenDaysPic(month, date, max, min) {
    var myChart = echarts.init(document.getElementById('latestSevenDaysPic'), 'walden');
    myChart.showLoading();
    $.get('predict/').done(function (data) {
        var predictValue = Number(data.temp);
        myChart.hideLoading();
        myChart.setOption({
            title: {
                text: "",
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['最低温度', '最高温度'],
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                data: [{ value: date[0], textStyle: { lineHeight: 50 } },
                { value: date[1], textStyle: { lineHeight: 50 } },
                { value: date[2], textStyle: { lineHeight: 50 } },
                { value: date[3], textStyle: { lineHeight: 50 } },
                { value: date[4], textStyle: { lineHeight: 50 } },
                { value: date[5], textStyle: { lineHeight: 50 } },
                { value: month + "-" + new Date().getDate(), textStyle: { lineHeight: 50, fontWeight: 'bold', fontSize: 15 } },
                ],
            },
            yAxis: {
                axisTick: { show: false },
                axisLine: { show: false },
                splitLine: { show: false },
                show: false,
            },
            series: [
                {
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, position: 'bottom', formatter: function (data) {
                                    if (data.dataIndex == 6) {
                                        data.value = data.value + "\u2103(预测值)";
                                    } else {
                                        data.value = data.value + "\u2103";
                                    }
                                    return data.value;
                                }
                            }
                        }
                    },
                    name: '最低温度',
                    type: 'line',
                    data: [min[0], min[1], min[2], min[3], min[4], min[5], predictValue],
                },
                {
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, formatter: function (data) {
                                    if (data.dataIndex == 6) {
                                        data.value = data.value + "\u2103(预测值)";
                                    } else {
                                        data.value = data.value + "\u2103";
                                    }
                                    return data.value;
                                }
                            }
                        }
                    },
                    name: '最高温度',
                    type: 'line',
                    data: [max[0], max[1], max[2], max[3], max[4], max[5], predictValue],
                }
            ]
        });
    });
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}