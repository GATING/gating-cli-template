# uni-app-simple-template

已知问题：

- 原生 tab 不受 router api 控制，即路由 beforeEach 无法拦截 tabbar 跳转。如需控制请在 request 控制，或者自定义 tabbar

- uni-simple-router 导航守卫使用 path 方式不跳转，name 成功跳转了，这个作者还在修复中

- 如果是小程序开发模式，则还要需要运行 mockjs 下的 app.js，并且同步更改 .env.xxx 环境变量配置文件

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
