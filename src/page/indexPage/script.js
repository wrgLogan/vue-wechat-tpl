import ScrollView from '@/modules/scroll-view/index.vue'
// import pdfjsLib from '@/lib/js/pdf.js'
import pdfUrl from '~static/jiankanggaozhi.pdf'

export default {
    name: 'Index',
    isPage: true,  // 必填项
    Data: {
        list: [
            
        ]
    },
    willEnterPage: function(data) {
        
    },
    mounted() {
        
    },
    didEnterPage(data) {
        console.log(pdfUrl);
    },
    methods: {
        
    },
    components: {
        ScrollView
    }
}