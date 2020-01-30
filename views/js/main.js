const vscode = acquireVsCodeApi()

const app = new Vue({
    el: '#app',
    data: {
        news: JSON.parse(GLOBAL_DATA.replace(/&quot;/gi, '"')).news
    },
    filters: {
        cn (title) {
            switch (title) {
                case 'Gcores':
                    return '机核网'
                case 'Gamersky':
                    return '游民星空'
                case 'IGN':
                    return 'IGN中国'
                default:
                    return title
            }
        }
    },
    methods: {
        handlePreview (url) {
            console.log('发送消息')
            vscode.postMessage({
                command: 'preview',
                text: url
            })
        }
    }
})
