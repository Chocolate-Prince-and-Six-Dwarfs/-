"""
@Author: Kowaine
@TODO 数据接口定义
"""
from django.http import JsonResponse
import json
from WeatherForecast.settings import STATICFILES_DIRS
import pickle, os
import pandas as pd
import numpy as np
from sklearn.neural_network import MLPRegressor

def getMonthlyData(request):
    """ 
    @TODO 返回某个月的天气数据
    @return 某个月的天气数据json
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


def predict(request):
    """
    @TODO 预测温度
    @return 预测的温度json， 键为temp
    """
    model_path = STATICFILES_DIRS[0] + "/model/" + "model.pickle"
    data_path = STATICFILES_DIRS[0] + "/model/" + "data_row.csv"

    # 读取数据
    data = np.array(pd.read_csv(data_path, header=None))
    batch = 15
    x = data[0][-(batch-1):]

    # 训练数据
    x_train = []
    y_train = []
    for _ in range(2800):
        temp_i = np.random.choice(list(range(len(data[0]) - batch)))
        x_train.append(data[0][temp_i:temp_i+batch-1])
        y_train.append(data[0][temp_i+batch-1])

    x_train = np.array(x_train)
    y_train = np.array(y_train)

    x = x.reshape(-1, batch-1)
    x_train = x_train.reshape(-1, batch-1)

    # print(x_train.shape)
    # print(y_train.shape)

    # 归一化
    # mms = preprocessing.MinMaxScaler()
    # x = mms.fit_transform(x)
    # x_train = mms.fit_transform(x_train)

    result = None

    # 读取模型并预测
    # with open(model_path, "rb") as f:
    #     model = pickle.load(f)
    #     model.fit(x_train, y_train)
    #     result = model.predict(x)
    #     return JsonResponse({"temp": np.rint(result[0])})
    if os.path.isfile(model_path):
        with open(model_path, "rb") as f:
            model = pickle.load(f)
    else:
        model = MLPRegressor(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(20,), activation="identity", random_state=1)
    model.fit(x_train, y_train)
    result = model.predict(x)
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
    return JsonResponse({"temp": int(np.rint(result[0]))})
        