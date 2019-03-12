<template>
    <button class="action" v-if="$parent.ajaxStatus==='ready'">{{text}}</button>
    <button class="action working" disabled v-else-if="$parent.ajaxStatus==='working'"></button>
</template>
<style>
    button.action {
        background-color: #232321;
        color: white;
        padding: 0 16px;
        border: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        transition: all .2s;
    }

    button.action:not(.working):hover {
        background-color: rgba(0, 0, 0, .7);
    }

    button.action.working {
        cursor: no-drop;
    }

    button.action.working:before {
        content: "";
        width: 22px;
        height: 22px;
        display: inline-block;
        border-radius: 50%;
        border-top: 3px solid white;
        border-right: 3px solid rgba(255, 255, 255, .3);
        border-bottom: 3px solid rgba(255, 255, 255, .3);
        border-left: 3px solid rgba(255, 255, 255, .3);
        animation: rotate .5s linear infinite;
        -webkit-animation: rotate .5s linear infinite;
    }
    button.action:disabled {
        background-color: #ccc;
    }
</style>
<script>
    ({
        props: {
            fn: {},
            text: {
                default: "保存"
            }
        }
    })
</script>