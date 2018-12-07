FROM node:8

RUN apt-get update

# 指定工作目录
WORKDIR /app

# 将当前目录下的用到文件拷贝到工作目录下面
COPY ./build  /app/build/
COPY ./src /app/src/
COPY ./config /app/config/
COPY ./package.json /app/
COPY ./static /app/static/
COPY ./.babelrc /app/
COPY ./index.html /app/

RUN   npm  install

EXPOSE  3000

CMD [ "npm", "start" ]
