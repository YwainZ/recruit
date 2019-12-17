FROM danjellz/http-server

# 将打包后的文件拷贝到容器中
COPY ./dist  .
CMD http-server  -p 3000

EXPOSE  3000
