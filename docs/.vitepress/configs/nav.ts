import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '导航', link: '/nav/' },
    {
        text: '前端物语',
        items: [
            { text: 'JavaScript基础', link: '/ts/types' },
            { text: 'HTML/CSS', link: '/ts/types' },
        ]
    },
    {
        text: '日常笔记',
        link: '/daily-notes/'
    },
]
