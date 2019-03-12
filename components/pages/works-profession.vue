<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/works/profession.png">作品行业分类
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/works/profession/add')" v-permission="'profession_add'">
                    <img src="images/add.png">新增分类
                </button>
            </div>
        </div>
        <table class="common row-border">
            <thead>
                <tr>
                    <th>分类ID</th>
                    <th>分类名称</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in list" :key="i.id">
                    <td>
                        {{i.id}}
                    </td>
                    <td>{{i.name}}</td>
                    <td>
                        <div class="order-status theme" v-if="i.status==0">启用</div>
                        <div class="order-status gray" v-else="i.status==1">禁用</div>
                    </td>
                    <td>
                        <div class="flex-column">
                            <button class="simple" v-copy="$root.config.urlBase+'/categories?id='+i.id">复制链接</button>
                            <button class="simple" @click="$router.push('/works/profession/'+i.id)" v-permission="'profession_detail'">编辑</button>
                            <button class="simple" v-if="i.status==1" @click="enable(i.id)" v-permission="'profession_enable'">启用</button>
                            <button class="simple" v-else-if="i.status==0" @click="disable(i.id)" v-permission="'profession_disable'">禁用</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <pager :xpages="pages" :xcurrent-page="currentPage"></pager>
    </main>
</template>
<style>
    button.expand {
        padding-left: 20px;
        background-image: url(images/arrow_down_big.png);
        background-repeat: no-repeat;
        background-position: left center;
        margin-right: 15px;
    }

    button.expand.open {
        background-image: url(images/arrow_up_big.png);
    }

    table.common td.inner {
        padding: 0 0 0 50px;
        border-bottom: none;
    }
</style>
<script>
    ({
        data: function () {
            return {
                list: []
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/goodsprofession/select",
                    success: function (res) {
                        if (res.code === 0) {
                            that.list = res.data;
                        }
                    }
                });
            },
            enable: function (id) {
                var that = this;
                ajax({
                    url: "/admin/goodsprofession/updateProfessionStatus?gid=" + id,
                    type: "put",
                    success: function (res) {
                        if (res.code == 0) {
                            that.getList();
                        }
                    }
                });
            },
            disable: function (id) {
                var that = this;
                ajax({
                    url: "/admin/goodsprofession/delProfession?gid=" + id,
                    type: "delete",
                    success: function (res) {
                        if (res.code == 0) {
                            that.getList();
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
            this.total = 1;
        },
        activated: function () {
            this.getList();
        }
    })
</script>