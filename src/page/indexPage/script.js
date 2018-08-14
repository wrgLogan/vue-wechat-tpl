import { resolve } from "path";
import { rejects } from "assert";

export default {
    name: 'Index',
    isPage: true,  // 必填项
    Data: {
        
    },
    willEnterPage: function(data) {
        
    },
    didEnterPage(data) {
        this.echo('promise');
    },
    methods: {
        echo: function(str) {
            return new Promise((resolve, reject) => {
                console.log(str);
                resolve(str);
            })
        }
    }
}