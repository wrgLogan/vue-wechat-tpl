import uploadBlock from '@/components/upload.vue'

export default {
    name: 'About',
    data: function () {
        return {
            maxFileLength:'5',
            fileListArr: {
                fileList0: [],
            },
            actionUrl:'/rest/v0/noticeofloss/tmpmaterials/CLINIC_MEDICAL_RECORD/11111111111111',
            pathListArr:{
                pathList0: [],
            },
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
    methods: {
        fileChange(fileList, id){
            console.log('fileChange',fileList)
            console.log(id);
            console.log(fileList[fileList.length - 1].status);
            var _this=this;
            this.fileListArr['fileList' + id] = fileList;
            this.path = [];
            //过滤成功的状态;
            this.path = fileList.filter(function(file){ return file.status === 'success';}).map(function(file) {
                console.log(file);
                return file
                // console.log(file.apiRes);
                /* return {
                    "domainName": "insurance.claim.model.ClaimMaterials",
                    "createTime": file.apiRes.createTime,
                    "materialType": file.apiRes.materialType,
                    "name": file.apiRes.name,
                    "path": file.apiRes.path,
                    'base64Data':file.apiRes.base64Data
                } */
            });
            console.log(this.path);
            _this.pathListArr['pathList' + id] = this.path;
            console.log(_this.pathListArr);
            // _this.handleInputShow(fileList);
        },
        handleInputShow(fileList){
            var _this = this;
            var pathListArr = this.pathListArr;
            Object.keys(pathListArr).forEach(function (key, index) {
                var pathList = pathListArr[key];
                _this.showInputArr['showInput' + index] = true;
                if (pathList.length >= _this.maxFileLength) {
                    _this.showInputArr['showInput' + index] = false;
                }
                //团体医疗凭证只能上传一张
                if(_this.pathListArr.pathList6.length >= _this.maxFileLength1){
                    _this.showInputArr.showInput6 = false;
                }
            });
        },
        uploadError(error){
            // mui.toast(error.errorMsg);
            this.$message.alert("提示",error.errorMsg)
        }
    },
    components: {
        uploadBlock
    }
}