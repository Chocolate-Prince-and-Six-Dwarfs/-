from django.urls import path
from . import views
from . import data_interface

#为 URL 名称添加命名空间(分辨重名的 URL)
app_name="TemPre"
urlpatterns=[
    path('',views.index,name='index'),
    path('forecast',views.weatherForecastSevenDays,name='forecast'),
    path(r'getMonthlyData/', data_interface.getMonthlyData, name="获取月数据"),
]