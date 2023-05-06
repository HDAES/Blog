import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/ts/': sidebarTs(),
    '/daily-notes/':  sidebarDailyNotes()
}


function sidebarTs() {
    return [
        {
            text: 'JavaScript',
            collapsed: false,
            items: [
                { text: '数据类型', link: '/ts/types' },
            ]
        },
        {
            text: 'TypeScript',
            collapsed: false,
            items: []
        },
        {
            text: 'HTML/CSS',
            collapsed: false,
            items: []
        },
        {
            text: '常用库使用技巧',
            collapsed: false,
            items: []
        },
    ]
}

function sidebarDailyNotes(){
    return [
        {
            text: '2023年',
            collapsed: false,
            items: [
                { text: '日常笔记1', link: '/ts/types' },
            ]
        },
    ]
}
