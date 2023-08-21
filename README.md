# Vue 3 + Vite + pinia 仿youtube电影站

如何使用
1、下载当前源码源码，安装前端依赖

```bash
yarn install
```
2、运行查看效果
复制配置
```bash
cp env.example .env

yarn run dev
```
3、打包

打开 .env 文件，修改 `VUE_APP_DEBUG=false`
```bash
yarn run build
```

4、上传到自己的服务器

配置nginx反向代理

```nginx configuration pro
location / {
    try_files $uri $uri/ /index.html;
    proxy_set_header Host $http_host;
    proxy_set_header App_key $http_app_key;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

location /api {
    proxy_pass http://162.14.72.65;
}
```
# 备注

安装vuetify

https://vuetifyjs.com/zh-Hans/getting-started/installation/
```bash
yarn add vuetify@^3.3.10
```

安装字体
```bash
yarn add @mdi/font -D
```

sass
```bash
yarn add sass -D
```
v-viewer


```bash

```