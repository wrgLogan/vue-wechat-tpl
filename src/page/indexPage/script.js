export default {
    name: 'Index',
    data: function () {
        return {
            message: 'Index'
        }
    },
    shareOption: {
         
    },
    didEnterPage() {
        console.log('didEneterPage index')
    },
    methods: {
        onSafeClick: function(params, open) {
            open();
        }
    },
    components: {
    
    }
}