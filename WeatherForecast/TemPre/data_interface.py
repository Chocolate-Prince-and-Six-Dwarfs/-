"""
@Author: Kowaine
@TODO 数据接口定义
"""
from django.http import JsonResponse
import json
from WeatherForecast.settings import STATICFILES_DIRS


def getMonthlyData(request):
    """ 
    @return 返回某个月的天气数据json
    @param year 年份
    @param month 月份
    @tips 请用GET访问
    """
    if request.method == "GET":
        year = int(request.GET['year'])
        month = int(request.GET['month'])
        filepath = STATICFILES_DIRS[0] + "/data/" + str(year) + "{:0>2}".format(month) + ".json"
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            return JsonResponse(data)
    else:
        return JsonResponse("{'msg': '请用GET方法进行访问！'}")
    