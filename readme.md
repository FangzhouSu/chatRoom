# 蚂蚁前端成电校园行-小全栈聊天室项目

> 21/12/5 第一版-原生JS+聊天室 
>
> ![image-20211205180642856](https://gitee.com/su-fangzhou/blog-image/raw/master/202112051806009.png)

> 后期需补充功能-
>
> - 注册功能
> - 私聊功能
>
> 小bug
>
> - 一个用户下线会导致另一个用户的侧边栏显示异常 [object object] 
>
> ![image-20211205180328759](https://gitee.com/su-fangzhou/blog-image/raw/master/202112051803031.png)

[项目仓库](https://github.com/FangzhouSu/chatRoom)

> 21/12/7
>
> [这个接口](https://netease.im/im?from=bdjj20200433807)感觉不错？
>
> ![image-20211207194633731](https://gitee.com/su-fangzhou/blog-image/raw/master/202112071946951.png)

## 运行方法

因为使用了`.gitignore`忽略了`node_modules`所以先使用`npm install`安装相关依赖（主要是服务端用到了Koa和socket.io）

![image-20211205181129203](https://gitee.com/su-fangzhou/blog-image/raw/master/202112051811294.png)

之后`npm start`即可（已经在`package.json`配置过了，该命令等同于`node server.js`）

用户名随意输入，密码输入123456（服务端写死了密码（因为没做注册功能嘛~）密码不对进不去嗷）

只要服务器在运行，则历史聊天记录和用户信息都会被记录，关闭服务器则数据丢失（没有涉及到数据库内容辣~）

## demo要求: 一个聊天室

> 适合想要学习node以及进行实际应用的小伙伴进行练手

来自蚂蚁前端成电校园行的最终结课项目

<hr>

## 官方提示

- 先做好简单的对话界面
  - 推荐使用flex布局哦~

![image-20211030224616072](https://gitee.com/su-fangzhou/blog-image/raw/master/202110302246165.png)

- 基础的行为定义，可以关注点分离，实现好每一个具体行为

![image-20211128214345279](https://gitee.com/su-fangzhou/blog-image/raw/master/202111282143465.png)

- 最终成果：消息可以广播到多个用户处

## 小结与心得

使用Node写出简单的接口然后在客户端处使用的一个小demo，跟着蚂蚁技术体验部的老师用时两天完成

之后打算把这个项目拓展出更多内容（使用Vue重写，实现更多功能），最终放到简历中~

OVER🎉