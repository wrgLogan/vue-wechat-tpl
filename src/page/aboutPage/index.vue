<template>
    <div id="page" class="page">
        <h1>{{}}</h1>
        <!-- <img src="../../assets/image/upload.png" alt=""> -->
        <span>({{pathListArr.pathList0.length}}/ {{ maxFileLength }} )</span>
        <upload-block
                    :filelist="fileListArr['fileList0']"
                    id=0
                    :action="actionUrl"
                    @file-change="fileChange"
                    :limit="maxFileLength"
                    @upload-error="uploadError"
                    
        ></upload-block>

    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>