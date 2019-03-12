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
                        link: "/price",
                        name: "自动报价价格列表",
                        exact: this.$route.meta.group == 'price' ? false : true,
                        permission: "price_list"
                    },
                    {
                        link: "/price/technology",
                        name: "工艺分类",
                        permission: "technology_list"
                    }
                ]
            }
        }
    })
</script>