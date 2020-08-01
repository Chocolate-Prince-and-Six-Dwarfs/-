from django.http import JsonResponse
import json, requests


def getTodayData(request):
    """
    @TODO 返回今天的天气数据
    @return 今天的天气数据json
    @tips 请用GET访问
    """
    if request.method == "GET":
        url = "https://tianqiapi.com/api?version=v1&appid=69134262&appsecret=1c67vcFr&city=成都"
        res = requests.get(url)
        res.encoding = "utf-8"
        data = json.loads(res.text)
        return JsonResponse(data)
    else:
        return JsonResponse("{'msg': '请用GET方法进行访问！'}")

