from django.urls import path
from . import views
from . import data_interface
from . import today_data_interface

#为 URL 名称添加命名空间(分辨重名的 URL)
app_name="TemPre"
urlpatterns=[
    path('',views.index,name='index'),
    path(r'getMonthlyData/', data_interface.getMonthlyData, name="获取月数据"),
    path(r'predict/', data_interface.predict, name="预测温度"),
    path(r'getTodayData/', today_data_interface.getTodayData , name="获取今日数据"),
]