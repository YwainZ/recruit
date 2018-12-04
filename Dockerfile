FROM centos:7


# 指定工作目录
WORKDIR /app

# 将当前目录下的所有文件拷贝到工作目录下面
COPY . /app/

RUN   npm install

EXPOSE  3000

CMD [ "npm", "start" ]
