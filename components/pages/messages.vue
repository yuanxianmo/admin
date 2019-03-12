<template>
    <div id="app-body">
        <aside-menu :links='asideLinks'></aside-menu>
        <router-view></router-view>
    </div>
</template>
<style>
</style>
<script>
    ({
        computed: {
            asideLinks: function () {
                return [{
                        link: "/messages",
                        name: "消息列表",
                        exact: this.$route.meta.group == 'messages' ? false : true
                    },
                    {
                        link: "/messages/native",
                        name: "站内信"
                    },
                    {
                        link:"/messages/template",
                        name:"消息模板"
                    }
                ]
            }
        }
    })
</script>