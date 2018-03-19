<template>
  <div id="upload-template">
    <div class="photoBox">
        <ul>
            <div v-for="(file, index) in filelist" :key="index" class="liBox" v-if="file.status !== 'deleted'">
                <!--删除-->
                <div class="deleteImg" v-if="file.status === 'success'" @click="deleteImg(file,file.fileItem,file.status)">
                    <img src="../assets/image/shanchu.png">
                </div>
                <!--上传失败-->
                <div class="fileMask" v-if="file.status === 'error'" @click="againUpload(file,file.fileItem)">
                    <span>上传失败，点击重新上传</span>
                </div>
                <div class="fileImg deleteImg" v-if="file.status === 'error'">
                    <img src="../assets/image/shibai.png">
                </div>
                <!--显示图片的li列表-->
                <li>
                    <!--loading-->
                    <div class="loadingmask" v-if="file.status === 'loading'">
                        <div class="loader loader--style1" title="0">
                            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                width="30px" height="30px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                                    <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                                <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                                C22.32,8.481,24.301,9.057,26.013,10.047z">
                                <animateTransform attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 20 20"
                                to="360 20 20"
                                dur="0.5s"
                                repeatCount="indefinite"/></path>
                            </svg>
                        </div>
                    </div>
                    <!--showImg-->
                    <img :src="file.url"/>
                    <p>{{ file.status }}</p>
                </li>
            </div>
        </ul>
        <div class="inputBox"><input type="file" multiple @change="handleChange($event)"/></div>
        
    </div>
  </div>
</template>
<script>
    export default {
        name:'Upload-Template',
        props: ['filelist','id','action','limit'],
        data: function() {
            return{
                //action:'/rest/v0/noticeofloss/tmpmaterials/CLINIC_MEDICAL_RECORD/11111111111111'
            }
        },
        methods:{
            handleChange(evt){
                let _this = this;
                var fileArr = Array.prototype.slice.call(evt.target.files);
                console.log(fileArr.length);
                if(fileArr.length > _this.limit - _this.filelist.length){
                    console.log('超过limit');
                    _this.$emit('upload-error', {errorMsg: '文件选择超过上限'});
                    return;
                }
                //本地生成缩略图
                if (fileArr && fileArr.length){
                    var length = fileArr.length;
                    for (var i = 0; i < length; i++){
                        var file = fileArr[i];
                        var typeArr=['image/jpeg','image/jpg','image/png','image/x-png','image/gif','image/bmp'];
                        if(typeArr.indexOf(file.type ) == -1){
                            _this.$message.alert("提示","请上传规范的图片格式");
                            return;
                        }
                        var url = URL.createObjectURL(file);
                        this.filelist.push({
                            fileItem: file,
                            url: url,
                            status: "waiting"
                        })
                        console.log(this.filelist)
                    }
                }
                _this.uploadFiles();
            },
            uploadFiles(){
                //图片上传到服务器
                var _this = this;
                var fileList = this.filelist;
                console.log(fileList)
                var length = fileList.length;
                for (var i = 0; i < length; i++) {
                    if (fileList[i].status != 'waiting') {
                        continue;
                    }
                    var file = fileList[i];
                    _this.axiosUpload(file.fileItem, file);
                }
            },
            axiosUpload(fileItem,file){
                console.log(fileItem)
                console.log(file);
                let _this = this;
                var formData = new FormData();
                formData.append('file', fileItem);
                (function (file) {
                    _this.changeFileStatus(file, 'loading');
                    _this.axios.post(_this.action, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }).then(function (res) {

                        console.log(res.data);
                        // _this.pathList.push(res.data[0]);
                        file.apiRes = res.data[0];
                        // console.log(_this.pathList)
                        _this.changeFileStatus(file, 'success');
                    }).catch(function (error) {
                        console.log(error);
                        // file.status = 'error';
                        _this.changeFileStatus(file, 'error');
                    })
                })(file);
            },
            againUpload(fileList, file){
                var _this = this;
                console.log(fileList);
                console.log(file);
                _this.axiosUpload(file, fileList);
            },
            deleteImg(file,fileItem,status){
                var _this = this;
                var len = this.filelist.length;
                _this.changeFileStatus(file, 'deleted');
            },
            changeFileStatus(file, status){
                file.status = status;
                this.$emit('file-change', this.filelist, this.id);
            }
        }
    }
</script>
<style scoped>
    li{
        list-style: none;
        float: left;
    }
    .inputBox {
        width: 2.533333rem;
        height: 2.533333rem;
        float: left;
        background: url("../assets/image/input.png") no-repeat;
        border: 1px solid #E1E3E9;
        border-radius: 4px;
        }
    .inputBox input {
        opacity: 0;
        width: 100%;
        height: 100%;
    } 
    .liBox{
    width: 2.533333rem;
    height: 2.533333rem;
    border: 1px solid #E1E3E9;
    border-radius: 4px;
    position: relative;
    float: left;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}
.liBox li{
    width: 2.533333rem;
    height: 2.533333rem;
    overflow: hidden;
}
.liBox li img{
    height: 2.533333rem;
    margin: auto;
    display: block;
}
.fileMask{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
}

.fileMask span{
    color: #fff;
    margin-top: 28%;
    display: block;
    line-height: .586667rem;
    font-size: .32rem;
}
.fileMaskId span{
    height: 3rem;
    margin-top: -4%;
    line-height: 0;
}
.deleteImg,.fileImg{
    width: 25%;
    height: 25%;
    position: absolute;
    right: -5%;
    top: -5%;
    z-index: 2;
}
.liBox .deleteImg img{
    width:100%;
    height: 100%;
}
.loadingmask{
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    position: absolute;
    background-color: rgba(0,0,0,.3);
    z-index: 999;
}
.loader--style1{
    position: absolute;
    top: 50%;
    margin-top: -20%;
    left: 50%;
    margin-left: -20%;
}
</style>

