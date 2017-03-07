# 这是一个node写的轻量级博客系统

本博客程序 使用 Node.js + MongoDB + express 开发，拥有灵活的内容模型以及完善的权限角色机制。模板引擎用的ejs模板

[演示地址1](http://112.74.63.122/) | [演示地址2](http://www.blogdiv.com) | 作者QQ：100101065

## 演示
- 地址1：[http://112.74.63.122](http://112.74.63.122)
- 地址2(域名没有备案)：[http://www.blogdiv.com](http://www.blogdiv.com)

## 安装执行命令

```bash
$ npm install 
$ npm install express -g
$ npm start
```

推荐安装在 Linux 系统上，若是在 Windows 下安装，需先行安装 express 依赖（请百度express帮助教程）

```bash
$ npm install express -g

```
（其中 -g 是你express  执行全局安装）

完成后访问 http://localhost或者127.0.0.1  进入安装程序

**环境要求：**

1. [Node.js](https://www.nodejs.org) v4.4.3 及以上
2. [Mongodb](https://www.mongodb.org) v3.0.6 及以上
3.维护进程可以用强大的pm2来维护
4.源码里bak目录里已经带有程序测试的数据备份 也可以恢复数据库，教程自行百度吧！！！


## 重新安装
1. 清空数据库
2. 访问 http://localhost或者127.0.0.1 进入安装程序

### 常见问题
- [使用 Nginx 来反向代理 绑定域名](http://www.nodercms.com/help/installation/shi-yong-nginx-lai-fan-xiang-dai-li-duo-ge-nodercms)
- [使用 pm2 来守护 程序](http://112.74.63.122/details/58a8479e569b9f077c9ea0cf)


##  版本说明 
程序为了一起学习node和我一样的小白们学习用，大神们多多指教，谢谢，后面会不断完善功能