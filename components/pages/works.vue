<template>
    <div id="app-body">
        <aside-menu :links='asideLinks'></aside-menu>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<style>
</style>
<script>
    ({
        computed: {
            asideLinks: function () {
                return [{
                        link: "/works",
                        name: "作品管理",
                        exact: this.$route.meta.group == 'works' ? false : true,
                        permission: "goods_list"
                    },
                    {
                        link: "/works/profession",
                        name: "作品行业分类",
                        permission: "profession_list"
                    },
                    {
                        link: "/works/structure",
                        name: "作品结构分类",
                        permission: "structure_list"
                    }
                ]
            }
        }
    })
</script>