<template>
    <div class="tabs">
        <ul class="select">
            <li :style="{zIndex:20-index}" :class="{current:index==currentIndex}" v-for="(item,index) in tabs" @click="currentIndex=index">{{item}}</li>
        </ul>
        <div class="wrap">
            <slot v-for="(item,index) in tabs" :name="index" v-if="currentIndex==index"></slot>
        </div>
    </div>
</template>
<style>
    .tabs .select {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .tabs .select li {
        color: #888;
        font-size: 16px;
        width: 130px;
        border: 1px solid #d2d2d2;
        border-bottom: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        height: 40px;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        position: relative;
        cursor: pointer;
        transition: background-color .2s, border-color .2s;
        user-select: none;
    }
    .tabs .select li:not(.current):hover {
        border-color: #c4a66a;
        color: #c4a66a;
    }
    
    .tabs .select li.current {
        color: white;
        background-color: #c4a66a;
        z-index: 30 !important;
        border-color: #c4a66a;
    }

    .tabs .select li:not(:first-of-type) {
        margin-left: -10px;
    }
    .tabs .wrap {
        border: 1px solid #c4a66a;
        border-top-right-radius: 4px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
</style>
<script>
    ({
        props: ["tabs"],
        data: function () {
            return {
                currentIndex: 0
            }
        }
    })
</script>