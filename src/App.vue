<template>
    <div id="app">
        <transition :name="animation">
            <router-view class="page-container"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
  name: "app",
  data: function() {
    return {
      //   animation: ''
    };
  },
  computed: {
    animation: function() {
      return this.$root.animation;
    }
  }
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
}

/* .page{
    position: absolute;
    height: 100%;
    width: 100%;
    background: #F17A7A;
    color: #fff;
} */
</style>