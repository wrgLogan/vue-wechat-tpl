<template>
    <div id="page" class="page">
        <header>
            <h1 click-tag="index-title">{{ title }}</h1>
            <br>
            <!-- <a href="/#/feeling">查看新用户邀请榜</a> -->
            <a href="javascript:void(0);" @click="switchTo('/feeling', {name: 'logan'},'fade');">查看老用户邀请榜</a>
        </header>
        <main>
            <!-- Target -->
        <textarea id="bar">Mussum ipsum cacilds...</textarea>

        <!-- Trigger -->
        <button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">
            Cut to clipboard
        </button>
        </main>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>