# 智能家居解决方案官网

一个现代化的智能家居解决方案展示网站，提供智能家居产品介绍、场景展示和在线咨询等功能。

## 项目结构

```
.
├── index.html          # 主页面，包含所有网站内容和结构
├── styles.css          # 全局样式表，定义网站的样式和动画效果
├── script.js           # 前端JavaScript脚本，处理交互和动态效果
├── fullpage-scroll.js  # 全屏滚动效果脚本，实现欧瑞博风格的滚动体验
├── server.js           # Node.js后端服务器，处理AI对话等功能
├── banner-showcase.html # 智能家居系统展示专页，详细展示banner.jpg
├── .cursorrules        # 项目开发规范和经验总结
└── image/              # 图片资源目录
    ├── logo.svg        # 网站Logo矢量图
    ├── logo.jpg        # 网站Logo位图
    ├── banner.jpg      # 首页横幅背景图及智能控制中心展示图
    ├── apartment.jpg   # 公寓户型展示图
    ├── flat.jpg        # 平层户型展示图
    ├── villa.jpg       # 别墅户型展示图
    ├── e-control.jpg   # 电器控制功能展示图
    ├── scene-control.jpg # 场景控制功能展示图
    ├── scene-living.jpg # 生活场景展示图
    └── wechat-qr.jpg   # 微信二维码图片
```

## 技术栈

- HTML5 - 网站结构和内容
- CSS3 - 样式和动画效果
- JavaScript (ES6+) - 交互功能和动态效果
- Bootstrap 5 - 响应式布局和UI组件
- Font Awesome - 图标库
- Animate.css - 动画效果库
- Particles.js - 粒子动画背景
- Node.js - 后端服务器
- Express - Web服务框架
- DeepSeek API - AI对话功能

## 主要功能

- 响应式设计，适配各种设备屏幕
- 智能家居产品展示
- 不同户型解决方案展示
- 智能场景演示
- 全屏滚动效果，增强用户体验
- 智能控制中心专区展示
- AI智能助手在线对话
- 联系方式和地址信息

## 开发说明

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
node server.js
```

3. 访问网站
```
http://localhost:3000
```

## 自定义配置

1. AI对话配置
   - 在server.js中配置DeepSeek API密钥
   - 可自定义对话模型和参数

2. 场景配置
   - 在script.js中可以自定义不同的智能场景
   - 可以根据需求添加新的场景模式

3. 样式定制
   - 在styles.css中可以修改颜色、布局等样式
   - 支持自定义动画效果

4. 滚动效果
   - 在fullpage-scroll.js中可自定义滚动行为和动画
   - 可根据项目需求调整滚动灵敏度和过渡效果

## 页面结构

1. 首页Banner - 展示核心理念和主题
2. 解决方案 - 提供三大核心产品系统
3. 应用场景 - 展示不同空间的智能家居应用
4. 智能控制中心 - 详细展示控制系统功能与特点
5. 智能场景模式 - 提供多种预设场景和自定义选项
6. 房型选择 - 根据户型推荐不同的智能家居解决方案
7. 产品优势 - 展示产品的核心竞争力
8. 关于我们 - 公司信息和技术背景
9. 联系方式 - 提供多种沟通渠道

## 注意事项

- 确保Node.js环境已正确安装
- 运行前需要配置正确的API密钥
- 建议使用现代浏览器访问以获得最佳体验
