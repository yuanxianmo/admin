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
                        link: "/users",
                        name: "用户列表",
                        exact: this.$route.meta.group == 'users' ? false : true,
                        permission: "user_list"
                    },
                    {
                        link: "/users/groups",
                        name: "用户分组",
                        permission: "group_list"
                    }
                ]
            }
        }
    })
</script>