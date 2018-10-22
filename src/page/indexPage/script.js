import ScrollView from '@/modules/scroll-view/index.vue'
import Jigsaw from '@/common/tools/Jigsaw.js'
// import pdfjsLib from '@/lib/js/pdf.js'
// import pdfUrl from '~static/jiankanggaozhi.pdf'

export default {
    name: 'Index',
    isPage: true,  // 必填项
    data:function() {
        return {
            list: [
                
            ],
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                },
                direction: 'vertical'
            },
            dataURL: ''
        }
    } ,
    willEnterPage: function(data) {
        
    },
    mounted() {
        // var canvas = this.$refs.myCanvas;
        window.jigsaw = new Jigsaw();

        var myImgUrl = require('../../assets/image/bg.png');
        var iconUrl = require('../../assets/image/shareicon.jpg');

        jigsaw.drawImage(myImgUrl);

        jigsaw.drawImage(iconUrl, {
            center: true,
            y: 300,
            width: 200,
            height: 200
        })

        jigsaw.fillText('你好啊', {
            center: true,
            y: 500,
            fontSize: '30px',
            color: '#fff'
        })

        jigsaw.fillText('你好啊', {
            center: false,
            x: 200,
            y: 600,
            fontSize: '30px',
            color: 'blue'
        })

        jigsaw.imgOnload = function(dataURL) {
            this.dataURL = dataURL;
        }.bind(this);
    },
    didEnterPage(data) {
        
    },
    methods: {
        
    },
    components: {
        ScrollView
    }
}