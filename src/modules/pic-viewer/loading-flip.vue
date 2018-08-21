<template>
    <div class="loading">
        <div class="loading-flip"></div>
    </div>
</template>
<style scoped>
    .loading{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(255,255,255, .6);
    }

    .loading-flip{
        margin: 0 auto;
        height: 20px;
        width: 20px;
        background-color: #2267A8;
        animation: flip 8s infinite;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @keyframes flip {
        0% {
            transform: rotateX(0) rotateY(0);
        }
        20%, 25% {
            transform: rotateX(0) rotateY(720deg);
        }
        45%, 50% {
            transform: rotateX(720deg) rotateY(720deg);
        }
        70%, 75% {
            transform: rotateX(720deg) rotateY(0);
        }
        95%, 100% {
            transform: rotateX(0) rotateY(0);
        }
    }
</style>