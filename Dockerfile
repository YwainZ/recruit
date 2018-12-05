FROM node:8


# 指定工作目录
WORKDIR /app

# 将当前目录下的所有文件拷贝到工作目录下面
COPY ./build  /app/
COPY ./config  /app/
COPY ./src  /app/
COPY ./package.json  /app/

RUN   npm  install
RUN   npm install webpack-dev-server

EXPOSE  3000

CMD [ "npm", "start" ]
