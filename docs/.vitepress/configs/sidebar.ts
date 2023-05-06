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
                { text: 'JavaScript基础', link: '/ts/js-base' },
                { text: 'HTML/CSS', link: '/ts/html-css' },
            ]
        },
        {
            text: 'TypeScript',
            collapsed: false,
            items: [
                { text: 'TypeScript 装饰器', link: '/ts/ts-decorator' },
            ]
        },
        {
            text: 'HTML/CSS',
            collapsed: false,
            items: []
        },
        {
            text: '常用库使用技巧',
            collapsed: false,
            items: [
                { text: 'Knex基本用法', link: '/ts/knex' },
                { text: 'Pinia基本用法', link: '/ts/pinia' },
            ]
        },
        {
            text: '自动化',
            collapsed: false,
            items: [
                { text: 'Github Actions', link: '/ts/github-actions' },
            ]
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
