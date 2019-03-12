<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/users/layers.png">分组列表
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/users/groups/add')" v-permission="'group_add'">
                    <img src="images/add.png">新增分组
                </button>
            </div>
        </div>
        <div class="page-body" v-if="data">
            <table class="common row-border">
                <thead>
                    <tr>
                        <th>分组ID</th>
                        <th>分组名称</th>
                        <th>分组描述</th>
                        <th>组内用户数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in data.data">
                        <td>{{i.id}}</td>
                        <td>{{i.groupName}}</td>
                        <td>{{i.groupDescript.replace(/\|\|/gm,";")}}</td>
                        <td>{{i.peopleNumber}}</td>
                        <td>
                            <div class="simple-bts" v-if="i.groupDescript.search('不允许修改')==-1">
                                <button class="simple" @click="$router.push('groups/'+i.id)" v-permission="'group_list'">编辑</button>
                                <button class="simple" @click="del(i)" v-permission="'group_del'">删除</button>
                            </div>
                            <div class="disabled" disabled v-else>不允许修改</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager :xpages="$root.pager(data).pages"></pager>
        </div>
    </main>
</template>
<style>
</style>
<script>
    ({
        data: function () {
            return {
                data: null,
                currentPage: 1
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/group",
                    data: {
                        currentPage: that.currentPage,
                        pageSize: 10
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.data = res;
                        }
                    }
                });
            },
            del: function (obj) {
                var that = this;
                this.$root.confirms.push({
                    text: "您确定要删除分组 " + obj.groupName + "？",
                    fn: function () {
                        ajax({
                            url: "/admin/group/" + obj.id,
                            type: "delete",
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getList();
                                }
                            }
                        });
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
        }
    })
</script>