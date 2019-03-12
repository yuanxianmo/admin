<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/home/order.png">客服列表
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/service/cs/add')" v-permission="'service_add'">
                    <img src="images/add.png"> 新增客服
                </button>
            </div>
        </div>
        <div class="page-body">
            <table class="common row-border">
                <thead>
                    <tr>
                        <th>客服ID</th>
                        <th>客服头像</th>
                        <th>客服名称</th>
                        <th>登录账号</th>
                        <th>客服分组</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.id}}</td>
                        <td>
                            <img class="table-thumb" :src="i.header" v-broken-link>
                        </td>
                        <td>{{i.name}}</td>
                        <td>{{i.account}}</td>
                        <td>{{i.groupName}}</td>
                        <td>{{i.createTime | dateStr}}</td>
                        <td>
                            <div class="theme order-status" v-if="i.status===0">启用</div>
                            <div class="gray order-status" v-else>禁用</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple" @click="$router.push('/service/cs/'+i.id)" v-permission="'service_detail'">编辑</button>
                                <button class="simple" @click="onoff(i,1)" v-if="i.status===0" v-permission="'service_onoff'">禁用</button>
                                <button class="simple" @click="onoff(i,0)" v-else v-permission="'service_onoff'">启用</button>
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
                    url: "/admin/customerservice",
                    success: function (res) {
                        if (res.code === 0) {
                            that.list = res.data;
                            that.total = res.total;
                        }
                    }
                });
            },
            onoff: function (obj, status) {
                var that = this;
                ajax({
                    url: "/admin/customerservice",
                    type: "delete",
                    data: {
                        id: obj.id,
                        status: status
                    },
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