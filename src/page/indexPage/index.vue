<template>
    <div id="page" class="page" 
        
        v-touchup="{fn: onTouchup}" 
        v-touchdown="{ fn: onTouchdown }"
        >
        <header>
            <h1>{{ title }}</h1>
        </header>
        <main>
            <div class="btn-container"  @click="switchTo('/sub', {age: '23'})">
                <button>Sub</button>
            </div>
            <div class="btn-container"  @click="switchTo('/feeling')">
                <button>情怀</button>
            </div>
        </main>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>