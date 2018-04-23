<template>
    <div id="page" class="page" 
        
        v-touchup="{fn: onTouchup}" 
        v-touchdown="{ fn: onTouchdown }"
        >
        <header>
            <h1 click-tag="index-title">{{ title }}</h1>
        </header>
        <main>
            <div class="btn-container"  @click="switchTo('/sub', {age: '23'})" input-tag="btn1">
                <button>Sub</button>
            </div>
            <div class="btn-container"  @click="switchTo('/feeling')" >
                <button click-tag="qinghuai">情怀</button>
            </div>
        </main>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>