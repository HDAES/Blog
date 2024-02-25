import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/frontEnd-story/': frontEnd(),
  '/daily-notes/': sidebarDailyNotes(),
}

function frontEnd() {
  return [
    {
      text: '前端基础',
      collapsed: false,
      items: [
        { text: 'JavaScript基础', link: '/frontEnd-story/web/js-base' },
        { text: 'CSS-filter', link: '/frontEnd-story/web/css-filter' },
      ],
    },
    {
      text: 'TypeScript',
      collapsed: false,
      items: [
        { text: '装饰器', link: '/frontEnd-story/ts/ts-decorator' },
        { text: '抽象类和抽象方法', link: '/frontEnd-story/ts/ts-abstract' },
        { text: 'class-transformer', link: '/frontEnd-story/ts/ts-class-transformer' },
        { text: '简单类型体操', link: '/frontEnd-story/ts/ts-simpler' },
      ],
    },
    {
      text: 'WebGL',
      collapsed: false,
      items: [
        { text: 'Threejs', link: '/frontEnd-story/webgl/threejs' },
        { text: 'Threejs常用组件', link: '/frontEnd-story/webgl/threejs-common-components' },
        { text: 'Threejs实现物体在传送带移动', link: '/frontEnd-story/webgl/threejs-conveyor-belt' },
      ],
    },
    {
      text: '常用库使用技巧',
      collapsed: false,
      items: [
        { text: 'Knex基本用法', link: '/frontEnd-story/npm/knex' },
        { text: 'Pinia基本用法', link: '/frontEnd-story/npm/pinia' },
      ],
    },
    {
      text: '自动化',
      collapsed: false,
      items: [{ text: 'Github Actions', link: '/frontEnd-story/auto/github-actions' }],
    },
  ]
}

function sidebarDailyNotes() {
  return [
    {
      text: '2020年',
      collapsed: true,
      items: [{ text: '金佛山', link: '/daily-notes/travel/2020/JinfoMountain' }],
    },
    {
      text: '2021年',
      collapsed: true,
      items: [
        { text: '丽江', link: '/daily-notes/travel/2021/Lijiang' },
        { text: '武陵山', link: '/daily-notes/travel/2021/Wuling' },
        { text: '天意谷', link: '/daily-notes/travel/2021/ProvidenceValley' },
      ],
    },
    {
      text: '2023年',
      collapsed: true,
      items: [
        { text: '南天湖', link: '/daily-notes/travel/2023/WesternSichuan' },
        { text: '仙女山', link: '/daily-notes/travel/2023/WesternSichuan' },
        { text: '川西之旅', link: '/daily-notes/travel/2023/WesternSichuan' },
      ],
    },
    {
      text: '2024年',
      collapsed: true,
      items: [{ text: '香港', link: '/daily-notes/travel/2023/WesternSichuan' }],
    },
  ]
}
