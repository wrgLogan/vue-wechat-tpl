export default {
    name: 'SubPage',
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
    didEnterPage: function() {
        console.log(this.$data);
    },
    methods: {}
}