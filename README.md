### 运行项目

#### 启动后端服务

```
npx NeteaseCloudMusicApi@latest
```

#### 启动 web 服务

```
yarn dev
```

#### 接口文档地址

https://binaryify.github.io/NeteaseCloudMusicApi/#/

默认端口为 4399 可根据需要在`vite.config.ts`文件中修改

调试会更加方便

### 项目目录

```
react-cloud
├── electron
│ ├── electron-env.d.ts
│ ├── main.ts // electron 主进程文件
│ └── preload.ts // 预加载脚本
├── electron-builder.json5
├── public // 静态资源文件夹
├── src
│ ├── apis // api 文件夹
│ ├── assets // 资源文件
│ ├── components // 公共组件文件夹
│ ├── hooks // 自定义 hooks
│ ├── main.tsx // 入口文件
│ ├── pages // 路由页面文件(这里只有一个 layout)
│ ├── router // react-router 路由表
│ ├── store // redux 仓库文件
│ ├── utils // 工具函数文件夹
│ └── views // 二级路由页面
├── index.html
├── tsconfig.json // ts 配置文件
├── tsconfig.node.json
├── package.json  
├── uno.config.ts //unoCss 配置文件
├── vite.config.ts //vite配置文件
├── README.md //此文档所在位置
└── yarn.lock 
```

