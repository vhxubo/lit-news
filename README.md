<div align="center">
<h1>LitNews</h1>
<blockquote>校内新闻样式不再将就</blockquote>
</div>

# 应用概述

**LitNews: 洛阳理工学院新闻客户端**

LitNews 目前新闻源:

- [官网/新闻中心主页](https://www.lit.edu.cn)
- [教务处主页](https://www.lit.edu.cn/jwc)
- [团委主页](https://www.lit.edu.cn/tw)

# 特色功能

- 规范化新闻列表，按照时间倒序展示
- 使用 [typo.css](https://github.com/sofish/typo.css) 替换原有正文样式，构建最适合中文阅读的网页排版

# 应用截图

![教务处]()
![新闻中心]()
![团委]()

# TODO

- [ ] 点击查看大图
- [ ] 设置右键菜单，支持复制、分享、使用浏览器打开
- [ ] 支持下载文件
- [ ] 支持自定义 CSS
- [ ] 提取内核，以支持命令行
- [ ] 插件化，支持更多高校新闻网站

# 应用下载

# 本地构建

```bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

# License

[MIT](https://github.com/vhxubo/lit-news/blob/master/LICENSE)

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
