<template>
    <nav>
        <router-link to="/" class="logo"></router-link>
        <div class="nav-links">
            <router-link to="/" :exact="$route.meta.group!='index'">首页</router-link>

            <router-link to="/works" v-if="$root.hasPermission('goods_list')" :class="{'router-link-active':$route.matched[0].path=='/works'}" v-permission="'goods_list'">作品管理</router-link>
            <router-link to="/works/profession" v-else-if="$root.hasPermission('profession_list')" :class="{'router-link-active':$route.matched[0].path=='/works'}" v-permission="'profession_list'">作品管理</router-link>
            <router-link to="/works/structure" v-else-if="$root.hasPermission('structure_list')" :class="{'router-link-active':$route.matched[0].path=='/works'}" v-permission="'structure_list'">作品管理</router-link>

            <router-link to="/price" v-if="$root.hasPermission('price_list')" :class="{'router-link-active':$route.matched[0].path=='/price'}" v-permission="'price_list'">报价价格管理</router-link>
            <router-link to="/price/technology" v-else-if="$root.hasPermission('technology_list')" :class="{'router-link-active':$route.matched[0].path=='/price'}" v-permission="'technology_list'">报价价格管理</router-link>

            <router-link to="/artists" v-if="$root.hasPermission('artists_list')" v-permission="'artists_list'">设计师管理</router-link>
            <router-link to="/artists/works" v-else-if="$root.hasPermission('artists_works_list')" v-permission="'artists_works_list'" :class="{'router-link-active':$route.matched[0].path=='/artists'}">设计师管理</router-link>
            <!-- <router-link to="/messages">消息管理</router-link> -->

            <router-link to="/users" v-if="$root.hasPermission('user_list')" :class="{'router-link-active':$route.matched[0].path=='/users'}" v-permission="'user_list'">用户管理</router-link>
            <router-link to="/users/groups" v-else-if="$root.hasPermission('group_list')" :class="{'router-link-active':$route.matched[0].path=='/users'}" v-permission="'group_list'">用户管理</router-link>

            <router-link to="/orders" v-if="$root.hasPermission('order_list')" :class="{'router-link-active':$route.matched[0].path=='/orders'}" v-permission="'order_list'">订单管理</router-link>
            <router-link to="/orders/invoice" v-else-if="$root.hasPermission('invoice_list')" :class="{'router-link-active':$route.matched[0].path=='/orders'}" v-permission="'invoice_list'">订单管理</router-link>

            <!-- <router-link to="/distribution">分销管理</router-link> -->
            <router-link to="/service" v-if="$root.hasPermission('service_list')" v-permission="'service_list'">客服管理</router-link>
            <router-link to="/service/group" v-else-if="$root.hasPermission('service_group_list')" v-permission="'service_group_list'" :class="{'router-link-active':$route.matched[0].path=='/service'}">客服管理</router-link>
            <router-link to="/service/chat" v-else :class="{'router-link-active':$route.matched[0].path=='/service'}">客服管理</router-link>


            <router-link to="/backend" v-if="$root.hasPermission('role_list')" v-permission="'role_list'">后台管理</router-link>
            <router-link to="/backend/admin" :class="{'router-link-active':$route.matched[0].path=='/backend'}" v-else-if="$root.hasPermission('admin_list')" v-permission="'admin_list'">后台管理</router-link>
            <router-link to="/backend/website" :class="{'router-link-active':$route.matched[0].path=='/backend'}" v-else-if="$root.hasPermission('website_detail')" v-permission="'website_detail'">后台管理</router-link>
            <router-link to="/backend/trade" :class="{'router-link-active':$route.matched[0].path=='/backend'}" v-else-if="$root.hasPermission('trade_detail')" v-permission="'trade_detail'">后台管理</router-link>
            <router-link to="/backend/permission" :class="{'router-link-active':$route.matched[0].path=='/backend'}" v-else-if="$root.hasPermission('permission_list')" v-permission="'permission_list'">后台管理</router-link>
            <router-link to="/backend/printnumber" :class="{'router-link-active':$route.matched[0].path=='/backend'}" v-else-if="$root.hasPermission('printnumber_detail')" v-permission="'printnumber_detail'">后台管理</router-link>
            <router-link to="/backend/shipping" :class="{'router-link-active':$route.matched[0].path=='/backend'}" v-else-if="$root.hasPermission('shipping_detail')" v-permission="'shipping_detail'">后台管理</router-link>
            <!-- <router-link to="/data">数据设置</router-link>
            <router-link to="/finance">财务管理</router-link> -->
        </div>
        <div class="right">
            <div class="welcome">欢迎，管理员 {{$root.userInfo.username}}</div>
            <div class="fns">
                <span @click="changePassword" class="pointer">修改密码</span>
                丨
                <span @click="logout" class="pointer">退出</span>
            </div>
        </div>
    </nav>
</template>
<style>
    nav {
        display: flex;
        height: 90px;
        background-color: #232321;
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        box-shadow: 0 0 15px rgba(0, 0, 0, .1);
        justify-content: space-between;
        white-space: nowrap;
        z-index: 100;
    }

    nav .logo {
        flex: 1;
        background-image: url(images/logo.png);
        background-repeat: no-repeat;
        background-position: center center;
        max-width: 345px;
    }

    .nav-links {
        color: #d7d7d7;
        display: flex;
        font-size: 14px;
        max-width: 1200px;
    }

    .nav-links a {
        line-height: 90px;
        flex: 1;
        text-align: center;
        max-width: 150px;
        display: block;
        min-width: 130px;
        padding: 0 10px;
        transition: color .2s;
    }

    .nav-links a:not(.router-link-active) {
        transition: all .2s;
    }

    .nav-links a.router-link-active {
        background-color: white;
        color: #222;
    }

    .nav-links a:not(.router-link-active):hover {
        color: #c4a66a;
    }

    nav .right {
        flex-shrink: 0;
        color: #979797;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        padding: 0 30px;
    }

    nav .right .welcome {
        margin-right: 40px;
    }

    .pointer {
        cursor: pointer;
    }

    nav .fns span {
        transition: all .2s;
    }

    nav .fns span:hover {
        color: white;
    }

    @media (min-width:1920px) {
        nav {
            justify-content: space-between;
        }
    }

    @media (max-width:1400px) {
        nav .logo {
            display: none;
        }
    }
</style>
<script>
    ({
        methods: {
            logout: function () {
                var that = this;
                ajax({
                    url: "/oauth/authentication/loginout",
                    type: "post",
                    success: function (res) {
                        that.$root.clearLogin();
                        that.$router.push("/login");
                    }
                });
            },
            changePassword: function () {
                var that = this;
                this.$root.prompts.push({
                    title: "修改密码",
                    data: [{
                            name: "旧密码",
                            value: "",
                            required: true,
                            password: true
                        },
                        {
                            name: "新密码",
                            value: "",
                            required: true,
                            password: true
                        },
                        {
                            name: "再次输入新密码",
                            value: "",
                            required: true,
                            password: true
                        }
                    ],
                    fn: function () {
                        if (this.data[0].value == "") {
                            that.$root.alerts.push({
                                text: "请输入旧密码！"
                            });
                            return;
                        }
                        if (this.data[1].value == "") {
                            that.$root.alerts.push({
                                text: "请输入新密码！"
                            });
                            return;
                        }
                        if (this.data[1].value != this.data[2].value) {
                            that.$root.alerts.push({
                                text: "两次密码输入不一致！"
                            });
                            return;
                        }
                        ajax({
                            url: "/admin/user/changPassword",
                            type: "post",
                            data: {
                                oldPassword: this.data[0].value,
                                newPassword: this.data[1].value
                            },
                            success: function (res) {
                                if (res.code === 0) {
                                    that.$root.coms["prompt"].last = that.$root.prompts
                                        .shift();
                                    that.logout();
                                }
                            }
                        });
                    },
                    keep: true
                });
            }
        }
    })
</script>