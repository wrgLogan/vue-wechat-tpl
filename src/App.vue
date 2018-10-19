<template>
    <div id="app">
        <transition :name="animation">
            <router-view class="page-container" comp-type="page"></router-view>
        </transition>
        <!-- 两个固定埋点 -->
        <input type="hidden" input-tag="main_source" value="wechat">
        <input type="hidden"  input-tag="project_name" value="test"/>
    </div>
</template>
<script>
export default {
  name: "app",
  data: function() {
    return {
      animation: 'fade'
    };
  },
};
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  position: relative;
  height: 100%;
  width: 100%;
}

.page-container {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
}

/* .page{
    position: absolute;
    height: 100%;
    width: 100%;
    background: #F17A7A;
    color: #fff;
} */
</style>