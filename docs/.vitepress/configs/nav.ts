import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '导航', link: '/nav/' },
    {
        text: '前端物语',
        items: [
            { text: 'JavaScript', link: '/frontEnd-story/web/js-base' },
            { text: 'TypeScript', link: '/frontEnd-story/ts/ts-decorator' },
            { text: 'Threejs', link: '/frontEnd-story/auto/github-actions' },
            { text: '自动化', link: '/frontEnd-story/webgl/threejs' },
        ]
    },
    {
        text: '日常笔记',
        link: '/daily-notes/'
    },
]
