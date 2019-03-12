<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/backend/roles.png">角色管理
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/backend/roles/add')" v-permission="'role_add'">
                    <img src="images/add.png">新增角色
                </button>
            </div>
        </div>
        <div class="page-body">
            <div class="top-fns mb20">
                <search :placeholder="'请输入角色名称'" v-model="keyword" @search="currentPage==1?getList():currentPage=1"></search>
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
                        <td>角色ID</td>
                        <td>角色名称</td>
                        <td>角色描述</td>
                        <td>状态</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.roleId}}</td>
                        <td>{{i.roleName}}</td>
                        <td>{{i.roleDesc}}</td>
                        <td>
                            <div class="order-status theme" v-if="i.status==0">启用</div>
                            <div class="order-status gray" v-if="i.status!=0">禁用</div>
                        </td>
                        <td>
                            <div class="simple-bts" v-if="i.roleDesc.search('不允许修改')==-1">
                                <button class="simple" @click="$router.push('/backend/roles/'+i.roleId)" v-permission="'role_list'">编辑</button>
                                <button class="simple" @click="$root.confirms.push({fn:del,arg:i.roleId,text:'您确定要禁用'+i.roleName+'？'})" v-permission="'role_del'">禁用</button>
                            </div>
                            <div class="disabled" v-else>不允许修改</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager :xcurrent-page="currentPage" :xpages="pages" @pager="currentPage=$event"></pager>
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
                confirmText: "",
                confirmArg: "",
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
                    url: "/admin/role",
                    data: {
                        pageSize: that.pageSize,
                        currentPage: that.currentPage,
                        status: that.filter.status,
                        roleName: that.keyword
                    },
                    success: function (res) {
                        that.list = res.data;
                        that.total = res.total
                    }
                });
            },
            del: function (id) {
                var that = this;
                ajax.call(this, {
                    url: "/admin/role/" + id,
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
        computed: {
            pages: function () {
                return Math.ceil(this.total / this.pageSize);
            }
        },
        watch: {
            currentPage: function () {
                this.getList();
            }
        }
    })
</script>