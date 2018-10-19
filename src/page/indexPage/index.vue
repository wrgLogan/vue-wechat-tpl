<template>
    <div id="page" class="page" >
        <!-- <img ref="myImg" src="../../assets/image/bg.png" alt="" v-show="false" > -->
        <img ref="icon" src="../../assets/image/shareicon.jpg" alt="" v-show="false">
        <canvas ref="myCanvas" width="750" v-show="false" ></canvas>
        <img :src="dataURL" v-show="dataURL" id="drawImg" @click="switchTo('/sub');"/>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>