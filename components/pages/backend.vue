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
                        link: "/backend",
                        name: "角色管理",
                        exact: this.$route.meta.group == 'roles' ? false : true,
                        permission: "role_list"
                    },
                    {
                        link: "/backend/admin",
                        name: "操作员管理",
                        permission: "admin_list"
                    },
                    {
                        link: "/backend/website",
                        name: "网站设置",
                        permission: "website_detail"
                    },
                    {
                        link: "/backend/trade",
                        name: "交易设置",
                        permission: "trade_detail"
                    },
                    {
                        link: "/backend/printnumber",
                        name: "起印数量设置",
                        permission: "printnumber_detail"
                    },
                    {
                        link: "/backend/shipping",
                        name: "邮费设置",
                        permission: "shipping_detail"
                    },
                    {
                        link: "/backend/permission",
                        name: "权限设置",
                        permission: "permission_list"
                    },
                    {
                        link: "/backend/logs",
                        name: "系统操作日志",
                        permission: "admin_log"
                    }
                ]
            }
        }
    })
</script>