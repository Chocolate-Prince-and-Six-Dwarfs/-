
from django.http import JsonResponse
import json
from WeatherForecast.settings import STATICFILES_DIRS


def getTodayData(request):
    """
    @TODO 返回今天的天气数据
    @return 今天的天气数据json
    @tips 请用GET访问
    """
    print("1")
    if request.method == "GET":
        print("1")
        filepath = STATICFILES_DIRS[0] + "/data/今日数据.json"
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            return JsonResponse(data)
    else:
        return JsonResponse("{'msg': '请用GET方法进行访问！'}")