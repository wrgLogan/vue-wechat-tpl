<template>
    <div id="page" class="page">
        <div id="wheel">
            <ul class="wheel-scroll">

                <li class="wheel-item" v-for="(item, index) in list" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>