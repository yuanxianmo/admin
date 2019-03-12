<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/backend/admin.png">操作员管理
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/backend/admin/add')" v-permission="'admin_add'">
                    <img src="images/add.png">新增操作员
                </button>
            </div>
        </div>
        <div class="page-body">
            <div class="top-fns mb20">
                <search :placeholder="'请输入姓名/登录账号'" v-model="keyword" @search="currentPage==1?getList():currentPage=1"></search>
                <v-filter :height="'34px'" @filter="currentPage==1?getList():currentPage=1">
                    <div>
                        <drop-down :theme="'simple'" :min-width="'100px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'启用',value:0},{name:'禁用',value:1}]"
                            @select="filter.status=$event" :placeholder="'状态'" :all="'全部'"></drop-down>
                    </div>
                </v-filter>
            </div>
            <table class="common row-border">
                <thead>
                    <tr>
                        <td>操作员ID</td>
                        <td>姓名</td>
                        <td>登录账号</td>
                        <td>角色</td>
                        <td>状态</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.id}}</td>
                        <td>{{i.username}}</td>
                        <td>{{i.email||i.phone||"未绑定"}}</td>
                        <td>
                            <div v-for="j in i.roleVOList">{{j.roleName}}</div>
                        </td>
                        <td>
                            <div class="order-status theme" v-if="i.status==0">启用</div>
                            <div class="order-status gray" v-if="i.status!=0">禁用</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple" @click="$router.push('/backend/admin/'+i.id)" v-permission="'user_detail'">编辑</button>
                                <button class="simple" @click="$root.confirms.push({fn:del,arg:i.id,text:'您确定要禁用该操作员？'})" v-permission="'admin_del'">禁用</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager :current-page="currentPage" :xpages="pages"></pager>
        </div>
    </main>
</template>
<style>
</style>
<script>
    ({
        data: function () {
            return {
                list: [],
                status: 0,
                filter: {
                    status: undefined
                },
                keyword: ""
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/user/adminList",
                    data: {
                        pageSize: that.pageSize,
                        currentPage: that.currentPage,
                        status: that.filter.status,
                        phone: that.keyword
                    },
                    success: function (res) {
                        that.list = res.data;
                        that.total = res.total
                    }
                });
            },
            del: function (id) {
                var that = this;
                ajax({
                    url: "/admin/user/" + id,
                    type: "delete",
                    success: function (res) {
                        if (res.code === 0) {
                            that.getList();
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
        },
        watch: {
            currentPage: function () {
                this.getList();
            }
        }
    })
</script>