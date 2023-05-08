import { defineConfig } from 'vitepress'
import { head,nav,sidebar } from './configs'
export default defineConfig({
  base: '/',
  ignoreDeadLinks: true,
  title: "HADES",
  description: "HADES的成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等",
  head,
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {

    logo: '/logo.png',

    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录'
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/HDAES/blog' }],

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})


