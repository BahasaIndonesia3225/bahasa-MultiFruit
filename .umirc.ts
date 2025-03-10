import { defineConfig } from "umi";

//配置文件，包含 Umi 所有非运行时配置
export default defineConfig({
  esbuildMinifyIIFE: true,
  title: "印尼语东仔",
  npmClient: 'pnpm',
  outputPath: 'ptdpintar.cn',
  history: { type: 'hash' },
  hash: true,  //让 build 之后的产物包含 hash 后缀, 避免浏览器加载缓存
  mock: false, //关闭 Mock 功能
  clientLoader: {}, //路由数据预加载
  theme: {
    '@primary-color': '#1DA57A'
  },
  proxy: {
    //备用环境
    '/prod-api': {
      // 'target': 'http://bahasaindo.cn/prod-api/',
      'target': 'http://damin.portuguesa.cn/prod-api',
      'changeOrigin': true,
      'pathRewrite': { '^/prod-api' : '' },
    },
    //通义千问
    '/compatible-mode': {
      'target': 'https://dashscope.aliyuncs.com/compatible-mode/',
      'changeOrigin': true,
      'pathRewrite': { '^/compatible-mode' : '' },
    },
  },
  routes: [
    { path: "/", component: "home" },
    { path: "/home", component: "home" },
    { path: "/login", component: "login", name: "登录东东通行证" },
    { path: "/courseCatalog", component: "courseCatalog", name: "阶段列表" },
    { path: "/courseDetail", component: "courseDetail", name: "关卡列表" },
    { path: "/setting", component: "setting", name: "设置" },
  ],
  alias: {},
  plugins: ['@umijs/plugins/dist/dva'],
  dva: {}
});
