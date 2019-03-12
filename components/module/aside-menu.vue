<template>
    <div id="aside-menu">
        <router-link :to="i.link" v-for="(i,index) in links" :key="index" :exact="i.exact" v-permission="i.permission||''" v-if="!i.permission||$root.hasPermission(i.permission)">{{i.name}}</router-link>
    </div>
</template>
<style>
    #aside-menu {
        width: 240px;
        background-color: #fafafa;
        flex-shrink: 0;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        overflow: hidden;
    }

    #aside-menu a {
        display: block;
        height: 60px;
        color: #888;
        line-height: 60px;
        text-align: center;
        color: #888;
    }

    #aside-menu a:hover {
        color: #c4a66a;
    }
    #aside-menu a.router-link-active {
        color: white;
        background-color: #c4a66a;
    }
</style>
<script>
    ({
        props: ["links"]
    })
</script>