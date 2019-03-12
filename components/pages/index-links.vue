<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/links.png">专题链接
            </div>
        </div>
        <table class="edit">
            <tbody>
                <tr v-for="i in data">
                    <td>{{i.name}}：</td>
                    <td>
                        <input class="focus" readonly :value="i.link">
                        <button class="theme-bt" @click="copy($event)">复制</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>
<style>
    table.edit input {
        width: 500px;
        margin-right: 15px;
        color: #A6A6A6;
    }

    table.edit .theme-bt {
        height: 32px;
        padding: 0 12px;
        border-radius: 4px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                data: [{
                        name: "首页链接",
                        link: "http://preview.xjl698.com"
                    },
                    {
                        name: "购物车入口",
                        link: "http://preview.xjl698.com/join"
                    },
                    {
                        name: "个人中心入口",
                        link: "http://preview.xjl698.com/printingOrder"
                    },
                    {
                        name: "其它入口",
                        link: "http://preview.xjl698.com"
                    }
                ]
            }
        },
        methods:{
            copy:function(e){
                e.target.previousElementSibling.select();
                document.execCommand("copy");
            }
        }
    })
</script>