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
                        link: "/service",
                        name: "客服列表",
                        exact: this.$route.meta.group == 'service' ? false : true,
                        permission:"service_list"
                    },
                    {
                        link: "/service/group",
                        name: "客服组",
                        permission: "service_group_list"
                    },
                    {
                        link: "/service/chat",
                        name: "聊天管理"
                    }
                ]
            }
        }
    })
</script>