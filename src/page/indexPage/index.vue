<template>
    <div id="page" class="page">
        <header>
            <h1>微信sdk测试</h1>
        </header>
        <main>
            <div class="btn-container"   v-safeClick="{fn: onSafeClick, params: {name: 'logan'}}">
                <button>safe click</button>
            </div>
            <div class="btn-container"  @click="switchTo('/about')">
                <button>about</button>
            </div>
            <div class="btn-container" @click="hideOuterBrowser">
                <button>禁止外部浏览器打开</button>
            </div>
            <div class="btn-container" @click="openOuterBrowser">
                <button>启用外部浏览器打开</button>
            </div>
            <div class="btn-container" @click="hideShareMemu">
                <button>禁止分享</button>
            </div>
            <div class="btn-container" @click="configShare">
                <button>打开分享</button>
            </div>
            <div class="btn-container" @click="openDebug">
                <button>打开debug模式</button>
            </div>
            <div class="btn-container" @click="closeDebug">
                <button>关闭debug模式</button>
            </div>
            
        </main>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>