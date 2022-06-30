# VITE_APP_BASE=/good/
# 部署位置 /usr/local/wwwroot/vuestatic
# 需要在部署位置里面新建good文件夹，将build文件夹里面的内容复制到good文件夹里面

```
location /good {
  alias   /usr/local/wwwroot/vuestatic/good/; # 注意这里
  index  index.html index.htm;
  try_files $uri $uri/ /bi/index.html; #解决页面刷新404问题
}

```
