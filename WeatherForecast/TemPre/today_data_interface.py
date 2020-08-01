from django.http import JsonResponse
import json, requests


def getTodayData(request):
    """
    @TODO 返回今天的天气数据
    @return 今天的天气数据json
    @tips 请用GET访问
    """
<<<<<<< HEAD

    if request.method == "GET":
        filepath = STATICFILES_DIRS[0] + "/data/今日数据.json"
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            return JsonResponse(data)
=======
    if request.method == "GET":
        url = "https://tianqiapi.com/api?version=v1&appid=69134262&appsecret=1c67vcFr&city=成都"
        res = requests.get(url)
        res.encoding = "utf-8"
        data = json.loads(res.text)
        return JsonResponse(data)
>>>>>>> 17ab0b6492322a1ac8554c4157953fd8f36617e2
    else:
        return JsonResponse("{'msg': '请用GET方法进行访问！'}")

