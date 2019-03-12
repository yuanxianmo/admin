<template>
    <div id="app-body">
        <aside-menu :links='asideLinks'></aside-menu>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<style></style>
<script>
    ({
        computed: {
            asideLinks: function () {
                return [{
                        link: "/orders",
                        name: "印刷订单列表",
                        exact: this.$route.meta.group == 'home' ? false : true,
                        permission: "order_list"
                    },
                    {
                        link: "/orders/design",
                        name: "设计订单列表"
                    },
                    {
                        link: "/orders/custom",
                        name: "自定义订单列表",
                        permission: "order_list"
                    },
                    {
                        link: "/orders/invoice",
                        name: "发票列表",
                        permission: "invoice_list"
                    }
                ]
            }
        }
    })
</script>