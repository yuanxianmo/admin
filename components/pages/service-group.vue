<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/home/order.png">客服组
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/service/group/add')" v-permission="'service_group_add'">
                    <img src="images/add.png"> 新增分组
                </button>
            </div>
        </div>
        <div class="page-body">
            <table class="common row-border">
                <thead>
                    <tr>
                        <th>分组ID</th>
                        <th>客服组名称</th>
                        <th>服务内容</th>
                        <td>创建时间</td>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.id}}</td>
                        <td>
                            {{i.name}}
                        </td>
                        <td>{{i.descript}}</td>
                        <td>{{i.createTime | dateStr}}</td>
                        <td>
                            <div class="theme order-status" v-if="i.status==0">启用</div>
                            <div class="gray order-status" v-else>禁用</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple" @click="$router.push('/service/group/'+i.id)" v-permission="'service_group_detail'">编辑</button>
                                <button class="simple" v-if="i.status==0" @click="update(i,1)" v-permission="'service_group_edit'">禁用</button>
                                <button class="simple" v-else @click="update(i,0)" v-permission="'service_group_edit'">启用</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager @pager="currentPage=$event" :xcurrent-page="currentPage" :xpages="pages"></pager>
        </div>
    </main>
</template>
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
                    url: "/admin/customergroup",
                    data: {
                        pageSize: that.pageSize,
                        currentPage: that.currentPage
                    },
                    success: function (res) {
                        if (res.code == 0) {
                            that.list = res.data;
                            that.total = res.total;
                        }
                    }
                });
            },
            update: function (obj, status) {
                var that = this;
                ajax({
                    url: "/admin/customergroup",
                    type: "put",
                    data: $.extend({}, obj, {
                        status: status
                    }),
                    success: function (res) {
                        if (res.code === 0) {
                            obj.status = status;
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
        }
    })
</script>