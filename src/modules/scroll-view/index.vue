<template>
    <div class="scroll-view" :style="{height: height}">
        <div class="pull-down-tag" v-show="pulldown">{{ updateTxt }}</div>
        <div class="container">
            <slot></slot>
        </div>

    </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "scrollView",
  data: function() {
    return {
      scroll: null,
      status: {
        ready: 0,
        pulldown: 1,
        updating: 2,
        updateSuccess: 3,
        pullup: 4,
        loading: 5,
        loadingSuccess: 6
      },
      scrollStatus: 0,
      updateTxt: "下拉以更新"
    };
  },
  props: ["height", "pulldown", "pullup"],
  mounted: function() {
    var _this = this;
    this.scroll = new BScroll(this.$el.getElementsByClassName("container")[0], {
      pullUpLoad: {
        threshold: 50
      },
    //   scrollbar: {
    //     fade: false,
    //     interactive: true // 1.8.0 新增
    //   }
    });

    if (this.pulldown) {
      this.initPullDown();
    }

    if (this.pullup) {
      this.initPullUp();
    }
  },
  methods: {
    initPullDown() {
      var _this = this;
      this.scroll.openPullDown();

      this.scroll.on("scroll", function(p) {
        if (_this.scrollStatus < _this.status["updating"]) {
          if (p.y > 40) {
            _this.scrollStatus = _this.status["pulldown"];
          } else {
            _this.scrollStatus = _this.status["ready"];
          }
        }
      });

      this.scroll.on("pullingDown", function() {
        console.log("pullingDown");
        _this.scrollStatus = _this.status["updating"];

        setTimeout(() => {
          _this.scrollStatus = _this.status["updateSuccess"];
          setTimeout(() => {
            _this.scrollStatus = _this.status["ready"];
          }, 300);
          this.finishPullDown();
        }, 2000);
      });
    },
    initPullUp() {
      var _this = this;
      this.scroll.openPullUp();

      this.scroll.on("pullingUp", function() {
        console.log("pullingUp");
      });
    }
  },
  watch: {
    scrollStatus: function(val) {
      var txts = ["下拉以更新", "松开加载更多", "正在加载...", "更新成功"];
      this.updateTxt = txts[val];
    }
  }
};
</script>
<style scoped>
.scroll-view {
  position: relative;
  overflow: hidden;
}

.container {
  height: 100%;
}

.pull-down-tag {
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}
</style>