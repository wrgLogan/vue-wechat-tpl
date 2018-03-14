<template>
    <div class="l-upload">
        <ul class="file-container">
            <li v-for="(file, index) in fileList" :key="index">
                <img :src="file.url" />
                <p>{{ file.status }}</p>
                <!-- <div class="pic-item" :style="{ backgroundImage: 'url(' + file.url + ')' }"></div> -->
            </li>
            <li>
                <div class="pic-item" :style="{ backgroundImage: 'url(' + uploadIcon + ')' }">
                    <input type="file" multiple="multiple" @change="handleChange($event)"/>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import uploadIcon from "@/assets/image/upload.png";
export default {
  name: "L-Upload",
  props: ["action"],
  data: function() {
    return {
      fileList: [],
      uploadIcon: uploadIcon
    };
  },
  methods: {
    handleChange(evt) {
      var fileArr = Array.prototype.slice.call(evt.target.files);
      console.log(fileArr);

      if (fileArr && fileArr.length) {
        var length = fileArr.length;
        for (var i = 0; i < length; i++) {
          var file = fileArr[i];
          var url = URL.createObjectURL(file);
          this.fileList.push({
            fileItem: file,
            url: url,
            status: "waiting"  // waiting loading success error
          });
        }
      }

      this.uploadFiles();
    },
    uploadFiles() {
        var fileList = this.fileList;
        var length = fileList.length;
        for (var i = 0; i < length; i++) {
            var file = fileList[i];
            var formData = new FormData();
            formData.append('file', file.fileItem);

            // (file => {
            //     this.axios({
            //         method: 'post',
            //         url: this.action,

            //     })
            // })(file)
        }
    }
  }
};
</script>
<style scoped>
.file-container {
  list-style: none;
  padding: 5px;
  /* text-align: center; */
}

.file-container li {
  display: inline-block;
  width: 22.5%;
  margin-right: 5px;
}

.pic-item {
  width: 100%;
  height: 100px;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(3);
}

.file-container li:last-child .pic-item {
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
}

.file-container li img {
  height: 100px;
  width: 100%;
}

.file-container li p {
  position: absolute;
  top: 10px;
  color: #fff;
  font-size: 17px;
}

.file-container li:last-child .pic-item input {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  opacity: 0;
}
</style>
