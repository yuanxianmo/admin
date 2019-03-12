<template>
    <form class="search">
        <input type="text" :placeholder="placeholder" :style="{width:width}" :value="value" @input="$emit('input',$event.target.value)" @keydown.enter.prevent="$emit('search')">
        <button @click="$emit('search')" class="theme-bt" type="button">
            <img src="images/search.png">搜索</button>
    </form>
</template>
<style>
    .search {
        display: flex;
    }
    .search input {
        border-left: 1px solid #c4a66a;
        border-top: 1px solid #c4a66a;
        border-bottom: 1px solid #c4a66a;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        height: 34px;
        width: 230px;
        border-right: none;
        padding: 0 7px;
    }

    .search button {
        height: 34px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        padding: 0 12px;
    }
    .search button img {
        margin-right: 3px;
    }
</style>
<script>
    ({
        props: {
            value: {
                default: ""
            },
            placeholder: {
                default: "请输入关键字"
            },
            width:{
                default:"230px"
            }
        }
    })
</script>