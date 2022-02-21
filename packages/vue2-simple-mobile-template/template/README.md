# vue2-simple-mobile-template

注意的点：

- 该模板只能在 mobile 使用，在 pc 使用会因为全局 vw 导致变得很大

- 有接口的话就注释掉 `vue.config.js` 中的 `onBeforeSetupMiddleware: require('./mocks')`，这里只是为了做拦截案例

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

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
