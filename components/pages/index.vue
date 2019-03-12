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
        data: function () {
            return {
                asideLinks: [{
                        link: "/",
                        name: "首页",
                        exact: true
                    },
                    {
                        link: "/index/slideshow",
                        name: "轮播管理",
                        permission:"banner_list"
                    },
                    {
                        link: "/index/links",
                        name: "专题链接"
                    }
                ]
            }
        }
    })
</script>