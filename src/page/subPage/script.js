export default {
    name: 'SubPage',
    isPage: true,
    title: '第二页',
    Data: {
        name: 'logan',
        age: '12'
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$data.title = 'hahaha'
        })
    },
    willEnterPage: function(data) {
    },
    didEnterPage: function(data) {
    },
    methods: {}
}