import provision from "@/components/provision/index2.vue"
import json from "@/assets/doc/provisionJson2.js"
import json3 from "@/assets/doc/provisionJson3.js"
import tiaokuan from "@/assets/doc/baoxiantiaokuanA.pdf"
export default {
    name: 'SubPage',
    isPage: true,
    title: '第二页',
    Data: {
        name: 'logan',
        age: '12',
        json:[
            {   title:"税延条款",
                json:json,
                anchorNum:"shui1"
            },
            {   title:"账户利益条款",
                json:json3,
                anchorNum:"shui2"
            },
        ],
        
        tiaokuan:tiaokuan,
        firstPageInfo:{
            title:"税延所有条款",
            tip:"本阅读指引有助于您理解条款，对本合同内容的解释以条款为准。",
            remind:"条款是保险合同的重要内容，为充分保障您的权益，请您仔细阅读本条款。"
        }
    },
    components:{
        provision
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