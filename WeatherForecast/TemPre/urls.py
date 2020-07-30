from django.urls import path
from . import views

#为 URL 名称添加命名空间(分辨重名的 URL)
app_name="TemPre"
urlpatterns=[
    path('',views.index,name='index'),
]