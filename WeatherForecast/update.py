import requests, json, time
import csv

API = "http://www.tianqiapi.com/api?version=history&appid={appid}&appsecret={appsecret}&city={city}&year={y}&month={m}"

# 范围定义
date = time.localtime(time.time())
year = date.tm_year
month = date.tm_mon
city = "成都"
path = "static/data/"
APPID = "44825923"
APPSecret = "ltrdmPz3"

while(True):

    url = API.format(appid=APPID, appsecret=APPSecret, city=city, y=year, m=month)
    data = requests.get(url)
    data.encoding = "utf-8"
    data = json.loads(data.text)

    if 'data' in data.keys():
        file_name = path + str(year) + "{:0>2}".format(month) + ".json"
        with open(file_name, "w", encoding="utf-8") as f:
            json.dump(data, f)
    else:
        break

    row_data = []

    # 范围定义
    from_year = 2012
    to_year = year-1
    m_from = 1
    m_to = 12

    # 读取json
    for y in range(from_year, to_year+1):
        for m in range(m_from, m_to+1):
            filename = path + str(y) + "{:0>2}".format(m) + ".json"
            with open(filename, "r", encoding="utf-8") as f:
                temp_m = json.load(f)
                for temp_d in temp_m['data']:
                    row_data.append(int(temp_d['bWendu'][:-1]))

    # 范围定义
    year = year
    m_from = 1
    m_to = month

    # 读取json
    for m in range(m_from, m_to+1):
        filename = path + str(year) + "{:0>2}".format(m) + ".json"
        with open(filename, "r", encoding="utf-8") as f:
            temp_m = json.load(f)
            for temp_d in temp_m['data']:
                    row_data.append(int(temp_d['bWendu'][:-1]))

    print(len(row_data))

    csv_name = "static/model/data_row.csv"
    with open(csv_name, "w", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(row_data)

