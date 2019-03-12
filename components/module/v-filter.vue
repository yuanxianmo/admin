<template>
    <div class="filter" :style="{height:height}">
        <slot></slot>
        <button @click="fn();$emit('filter')" class="theme-bt">
            <img src="images/filter.png">筛选</button>
    </div>
</template>
<style>
    .filter {
        display: flex;
        flex: 0;
    }

    .filter>div {
        display: flex;
        align-items: center;
        border: 1px solid #c4a66a;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
    }

    .filter button {
        border: none;
        padding: 0 12px;
        display: flex;
        align-items: center;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }
    .filter button img {
        margin-right: 6px;
        width: 12px;
    }
    .filter>div .drop-down:not(:last-of-type) dt {
        border-right: 1px solid #D2D2D2;
    }
    .filter .drop-down {
        border-radius: 6px;
    }
    .filter .drop-down dt,
    .filter .drop-down dd li {
        padding-left: 10px;
    }
    .filter .drop-down dd {
        line-height: 34px;
    }
    .filter .drop-down dd ul{
        border-color: #c4a66a;
    }
</style>
<script>
    ({
        props: {
            fn: {
                default: function () {
                    return function () {}
                }
            },
            height:{
                default:"34px"
            }
        }
    })
</script>