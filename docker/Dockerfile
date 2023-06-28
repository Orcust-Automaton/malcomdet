FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8-slim

RUN sed -i s/deb.debian.org/mirrors.aliyun.com/g /etc/apt/sources.list && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

COPY ./MalComDet /MalComDet
COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt  -i https://pypi.tuna.tsinghua.edu.cn/simple

WORKDIR /MalComDet

CMD ["python3", "app.py"]
EXPOSE 8080
