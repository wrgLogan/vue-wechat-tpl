<template>
    <div id="page" class="page" >
        <img :src="dataURL" v-show="dataURL" id="drawImg" @click="switchTo('/sub');"/>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>