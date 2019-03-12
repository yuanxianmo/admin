<template>
    <div id="ping" :title="ping<0?'连接超时':'服务器延迟'+ping+'ms'" :class="{good:ping<80,med:(ping>=90&&ping<150),bad:ping>=150,offline:ping<0}">
        <div :class="['grid',{active:ping<200&&ping!=-1}]"></div>
        <div :class="['grid',{active:ping<150&&ping!=-1}]"></div>
        <div :class="['grid',{active:ping<100&&ping!=-1}]"></div>
        <div :class="['grid',{active:ping<80&&ping!=-1}]"></div>
        <div :class="['grid',{active:ping<50&&ping!=-1}]"></div>
    </div>
</template>
<script>
    ({
        computed: {
            ping: function () {
                return this.$root.ping
            }
        }
    })
</script>
<style>
    #ping {
        display: flex;
        align-items: flex-end;
        position: fixed;
        height: 20px;
        right: 5px;
        bottom: 5px;
        opacity: 0;
        animation: fadein .2s;
    }

    #ping:hover {
        opacity: 1;
    }

    .grid {
        width: 5px;
        background-color: #ddd;
    }

    .grid:not(:last-child) {
        margin-right: 1px;
    }

    .grid:nth-child(1) {
        height: 20%;
    }

    .grid:nth-child(2) {
        height: 40%;
    }

    .grid:nth-child(3) {
        height: 60%;
    }

    .grid:nth-child(4) {
        height: 80%;
    }

    .grid:nth-child(5) {
        height: 100%;
    }

    #ping.good .grid.active {
        background-color: #0d0;
    }

    #ping.med .grid.active {
        background-color: #cc0;
    }

    #ping.bad .grid.active {
        background-color: #d00;
    }
</style>