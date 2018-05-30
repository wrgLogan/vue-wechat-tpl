<template>
    <div id="page" class="page">
        <header>
            <h1 click-tag="index-title">{{ name }}</h1>
            <br>
            <!-- <a href="/#/"></a> -->
            <a href="javascript:void(0);" @click="switchTo('/', 'fade');">查看新用户邀请榜</a>
        </header>
        <main>
            <table>
                <tr>
                    <th>排名</th>
                    <th>工号</th>
                    <th>姓名</th>
                    <th>邀请数</th>
                </tr>
                <tr v-for="(item, index) in topList" :key="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.job_num}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.num}}</td>
                </tr>
            </table>
        </main>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>