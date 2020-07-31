from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'TemPre/index.html')

def weatherForecastSevenDays(request):
    return render(request,'TemPre/weather.html')