<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/backend/logs.png">系统操作日志
            </div>
        </div>
        <div class="page-body">
            <table class="common row-border mb20">
                <thead>
                    <tr>
                        <th>日志ID</th>
                        <th>操作员</th>
                        <th>操作描述</th>
                        <th>操作IP</th>
                        <th>操作时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.id}}</td>
                        <td>{{i.userName||"无"}}</td>
                        <td>{{i.descript||"无"}}</td>
                        <td>{{i.ip}}</td>
                        <td>{{i.createTime | dateStr}}</td>
                    </tr>
                </tbody>
            </table>
            <pager @pager="pager" :xcurrent-page="currentPage" :xpages="pages"></pager>
        </div>
    </main>
</template>
<style>
    table.common .simple {
        color: #C4A66A;
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
                    url: "/admin/log",
                    data: {
                        currentPage: that.currentPage,
                        pageSize: that.pageSize,
                    },
                    success: function (res) {
                        that.list = res.data;
                        that.total = res.total;
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
        }
    })
</script>