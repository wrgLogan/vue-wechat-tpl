export default {
    name: 'About',
    data: function () {
        return {
            message: 'About'
        }
    },
    willEnterPage() {
        console.log('willEnterPage');
        console.log(this);
    },
    didEnterPage() {
        console.log('didEneterPage')
    },
    mounted (){
        // this.$gallery(`https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=306068080,2400069474&fm=27&gp=0.jpg`)
    },
    components: {
        
    }
}