<template>
    <div id="not-found">
        <div class="text">
            <h3>404</h3>
            <p>您访问的页面暂时找不到了哦~</p>
        </div>
        <p class="info">如有疑问请发送邮件至
            <br>xjltech@xjlit.com</p>
        <button class="black-simple" @click="$router.push('/')">返回首页</button>
    </div>
</template>
<style>
    body,
    html,
    #app {
        height: 100%;
        background-color: white;
    }

    body {
        perspective: 1000px;
        perspective-origin: center calc(50% + 100px);

    }

    html {
        overflow: hidden;
    }

    #not-found {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        animation: rotateY 5s infinite;
        transform-style: preserve-3d;
    }

    #not-found .text {
        position: relative;
        transform-style: preserve-3d;
    }

    #not-found .text h3 {
        font-size: 221px;
        margin: 0;
        color: #363636;
        position: relative;
    }

    #not-found .text p {
        position: absolute;
        width: 100%;
        bottom: 83px;
        background-color: white;
        text-align: center;
        font-size: 14px;
        letter-spacing: 10px;
        transform: translateZ(50px);
        opacity: .9;
    }

    #not-found .info {
        text-align: center;
        line-height: 1.7em;
        margin-top: 0;
        margin-bottom: 40px;
    }

    #not-found .black-simple {
        padding: 12px 30px;
        background-color: transparent;
        display: inline-flex;
        align-items: center;
        transform: translateZ(50px);
    }

    #not-found .black-simple img {
        margin-right: 3px;
    }

    @keyframes rotateY {
        to {
            transform: rotateY(360deg);
        }
    }
</style>
<script>
    ({
        mounted: function () {
            this.$root.showNav = false;
        },
        beforeDestroy: function () {
            this.$root.showNav = true;
        }
    })
</script>