<template>
    <main>
        <ul class="type-select mb20">
            <li :class="{current:status===undefined}" @click="status=undefined">全部</li>
            <li :class="{current:status==0}" @click="status=0">待审核</li>
            <li :class="{current:status==1}" @click="status=1">审核成功</li>
            <li :class="{current:status==2}" @click="status=2">审核失败</li>
            <li :class="{current:status==3}" @click="status=3">已寄出</li>
            <li :class="{current:status==4}" @click="status=4">已完成</li>
            <li :class="{current:status==-1}" @click="status=-1">已取消</li>
        </ul>
        <div class="top-fns mb15 justify-between">
            <search :width="'320px'" :placeholder="'申请流水号'" v-model="keyword" @search="getList"></search>
            <button class="theme-bt export" onclick="saveXSL($('table.common')[0])">导出EXCEL</button>
        </div>
        <ul class="statis-count mb10">
            <li>总发票数：{{total}}</li>
            <li>总发票金额：{{priceCount}}元</li>
        </ul>
        <table class="common row-border">
            <thead>
                <tr>
                    <th>发票ID</th>
                    <th>申请流水号</th>
                    <th>总额</th>
                    <th>申请时间</th>
                    <th>抬头/开具类型/发票类型</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in list">
                    <td>{{i.id}}</td>
                    <td>{{i.applyNumber}}</td>
                    <td>¥{{i.totalFee}}</td>
                    <td>{{i.createTime | dateStr}}</td>
                    <td>
                        <div>{{i.invoiceHeader}}</div>
                        <div>{{i.issueType==1?"企业":"个人"}}</div>
                        <div>{{i.invoiceType==1?"增值税发票":"普通"}}</div>
                    </td>
                    <td>
                        <div class="flex-column">
                            <div class="order-status red" v-if="i.approvalStatus==0">审核中</div>
                            <div class="order-status red" v-if="i.approvalStatus==1">审核成功</div>
                            <div class="order-status red" v-if="i.approvalStatus==2">审核失败</div>
                            <div class="order-status red" v-if="i.approvalStatus==3">已寄出</div>
                            <div class="order-status green" v-if="i.approvalStatus==4">已完成</div>
                            <div class="order-status gray" v-if="i.approvalStatus==-1">已取消</div>
                            <button class="simple" @click="$router.push('/orders/invoice/'+i.id)" v-permission="'invoice_detail'">查看详情</button>
                        </div>
                    </td>
                    <td>
                        <div class="flex-column action">
                            <button class="theme-bt" @click="approval(i.id,1)" v-if="i.approvalStatus==0" v-permission="'invoice_approval'">通过审核</button>
                            <button class="simple" @click="approval(i.id,2)" v-if="i.approvalStatus==0" v-permission="'invoice_approval'">不通过审核</button>
                            <button class="simple" @click="del(i.id)" v-permission="'invoice_del'">删除订单</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <pager @pager="currentPage=$event" :xcurrent-page="currentPage" :xpages="pages"></pager>
    </main>
</template>
<style>
    .action {
        align-items: center;
    }

    .action button {
        padding: 5px 9px;
        border-radius: 2px;
    }

    .action button:not(:last-child) {
        margin-bottom: 5px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                status: undefined,
                list: [],
                keyword: "",
                priceCount: 0
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/invoice",
                    data: {
                        pageSize: that.pageSize,
                        currentPage: that.currentPage,
                        approvalStatus: that.status,
                        applyNumber: that.keyword
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.list = res.data;
                            that.total = res.total;
                            that.priceCount = res.priceCount;
                        }
                    }
                });
            },
            approval: function (id, status) {
                var that = this;
                function appr(reason) {
                    ajax({
                        url: "/admin/invoice/approval",
                        type: "post",
                        data: {
                            approvalStatus: status,
                            id: id,
                            approvalMsg: reason
                        },
                        success: function (res) {
                            if (res.code === 0) {
                                that.getList();
                            }
                        }
                    });
                }
                if (status == 1) {
                    this.$root.confirms.push({
                        fn: appr,
                        text: "您确定要通过该发票的审核？"
                    });
                } else {
                    this.$root.prompts.push({
                        title: "请填写不通过原因",
                        data: [{
                            name: "原因",
                            value: ""
                        }],
                        fn: function () {
                            appr(this.data[0].value);
                        }
                    });
                }
            },
            del: function (id) {
                var that = this;
                this.$root.confirms.push({
                    fn: function () {
                        ajax({
                            url: "/admin/invoice/" + id,
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getList();
                                }
                            }
                        });
                    },
                    text: "您确定要删除该发票订单？"
                });
            }
        },
        watch: {
            status: function () {
                this.list = [];
                if (this.currentPage != 1) {
                    this.currentPage = 1;
                } else {
                    this.getList();
                }
            }
        },
        mounted: function () {
            this.getList();
        },
        activated: function () {
            this.getList();
        }
    })
</script>