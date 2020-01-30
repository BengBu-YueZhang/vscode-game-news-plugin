const app = new Vue({
    el: '#app',
    data: {
        news: JSON.parse(GLOBAL_DATA.replace(/&quot;/gi, '"')).news
    }
})
