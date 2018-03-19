<template>
    <div id="page" class="page">
        <header>
            <h1>About</h1>
        </header>
        <main>
            <div class="container">
                <p>这是一个基于vue的移动端开发模版</p>
                <p>openId:{{openId || '未授权'}}</p>
            </div>
            <div class="btn-container"  @click="authReload()">
                <button>授权</button>
            </div>
        </main>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>