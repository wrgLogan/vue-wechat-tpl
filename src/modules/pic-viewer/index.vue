<template>
    <div class="pic-viewer" @scroll="onViewerScroll" v-show="visible">
        <transition name="fadeup">
            <div class="pic-container" v-show="containerVisiable">
                <div class="pic-item" v-for="(item, index) in pictureList" :key="index" >
                    <img v-if="index < initNumber" :data-src="item.url" :src="index < initNumber ? item.url : null" alt="图片加载中..." :class="{ 'show': index < initNumber }" >
                    <loading-flip :class="{ 'show': index >= initNumber }"/>
                </div>
                <img :src="closeUrl" alt="" class="close-btn" @click="close">
            </div>
        </transition>
    </div>
</template>
<script>
import loadingFlip from '@/components/loading-flip.vue';
import closeUrl from '../assets/image/shanchu.png';

export default {
    name: 'picviewer',
    data: function() {
        var list = [];
        this.picList.forEach((item, index) => {
            if (index < this.initNum){
                item.isLoad = true;
            } else {
                item.isLoad = false;
            }

            list.push(item);
        })
        return {
            initNumber: this.initNum || 2,
            visible: false,
            containerVisiable: false,
            closeUrl: closeUrl,
            pictureList: list
        }
    },
    props: ['picList', 'initNum'],
    mounted: function() {
        // this.bindGallery();
    },
    methods: {
        'onViewerScroll': function() {
            var lock = false;

            var load = function(evt) {

                var scrollTop = evt.target.scrollTop;
                var viewerHeight = evt.target.offsetHeight;
                // var imgDoms = this.$el.getElementsByTagName('img');
                var loadingDoms = this.$el.getElementsByClassName('loading');
                var picItemDoms = this.$el.getElementsByClassName('pic-item');

                for(let i = 0, len = picItemDoms.length; i < len; i++) {
                    var $item = picItemDoms[i];
                    var $img = $item.getElementsByTagName('img')[0];

                    if (!$img && (scrollTop + viewerHeight > $item.offsetTop - 10)) {
                        if (lock) break;
                        lock = true;
                        setTimeout(() => {
                            lock = false;
                        }, 100);

                        $img = document.createElement('img');
                        $img.src = this.picList[i].url;
                        $img.style.width = '100%';
                        $item.appendChild($img);
                        $img.onload = function() {
                            console.log('ready')
                            setTimeout(() => {
                                loadingDoms[i].className = 'loading';
                            }, 300);
                        }
                    }
                }

                // this.bindGallery();

            }

            return function(evt) {
                // setTimeout(() => {
                    load.call(this, evt);
                // }, 10);
                
            }
        }(),
        open() {
            this.visible = true;
            setTimeout(() => {
                this.containerVisiable = true;
            }, 100);
        },
        close() {
            
            this.containerVisiable = false;
            setTimeout(() => {
                this.visible = false;                
            }, 400);
        },
        bindGallery() {
            var imgDoms = this.$el.getElementsByTagName('img');
            var picItemDoms = this.$el.getElementsByClassName('pic-item');

            for(let i = 0, len = picItemDoms.length; i < len; i++) {
                    
                var $img = picItemDoms[i].getElementsByTagName('img')[0];
                
                if ($img) {
                    $img.onclick = function() {
                        this.$gallery($img.src);
                    }.bind(this);
                }
                
            }
        }
    },
    components: {
        loadingFlip
    }
}
</script>
<style scoped>
.pic-viewer{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: scroll;
    z-index: 2;
}

.pic-container{
    position: relative;
    padding: .2rem;
    background-color: #666;
    min-height: 100%;
}

.pic-item{
    position: relative;
    width: 100%;
    min-height: 8.266667rem;
    background-color: #fff;
    margin: 0rem auto .2rem;
}

.pic-item img{
    width: 100%;
    /* opacity: 0; */
}

.close-btn{
    position: fixed;
    top: 15px;
    left: 15px;
    width: .8rem;
    opacity: .8;
    z-index: 2;
}

.loading{
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
}

.loading.show, .pic-item img.show{
    opacity: 1;
}

</style>