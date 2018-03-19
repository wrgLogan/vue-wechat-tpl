export default {
    name: 'SubPage',
    pageData: {
        name: 'logan'
    },
    methods: {
        setData(pageData) {
            var pageData = pageData || {};
            Object.keys(pageData).forEach(key => {
                // if (!(key in this.$data)) {
                    this.$data.name = pageData[key];
                    // Object.defineProperty(this.$data, key, {value: pageData[key]});
                // }
            });
            console.log(this.$data);
            // this.name = 'logan';
        }
    }
}