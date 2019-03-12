<template>
    <main>
        <div class="page-head mb10">
            <div class="left">
                <img src="images/backend/trade.png">交易设置
            </div>
        </div>
        <div class="page-index">
            <table class="edit">
                <tbody>
                    <tr>
                        <td>自动关闭未付款订单天数：</td>
                        <td>
                            <input class="focus w400" type="number" placeholder="订单处于待付款状态,N天后自动关闭，不填默认为1天" v-model="data.transactionNoPayDay">天
                        </td>
                    </tr>
                    <tr>
                        <td>自动关闭未付款订单执行间隔时间：</td>
                        <td>
                            <input class="focus w400" type="number" placeholder="执行自动关闭未付款订单操作的间隔时间，不填默认为60分钟" v-model="data.transactionNoPayDayIntervals">分钟
                        </td>
                    </tr>
                    <tr>
                        <td>自动收货天数：</td>
                        <td>
                            <input class="focus w400" type="number" placeholder="订单发货后，用户收货的天数，不填默认为不自动收货" v-model="data.transactionAutoReceipt">天
                        </td>
                    </tr>
                    <tr>
                        <td>自动收货执行间隔时间：</td>
                        <td>
                            <input class="focus w400" type="number" placeholder="执行自动收货操作间隔时间，不填默认为60分钟" v-model="data.transactionAutoReceiptIntervals">分钟
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action :text="'保存'" type="number" @click.native="save" v-permission="'trade_edit'"></action>
                            <button @click="getData" class="black-simple">取消</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style>
    table.edit input {
        width: 400px;
        margin-right: 7px;
    }

    .page-index {
        padding-right: 400px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                data: {
                    transactionAutoReceipt: "",
                    transactionAutoReceiptIntervals: "",
                    transactionNoPayDay: "",
                    transactionNoPayDayIntervals: ""
                },
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/settings/getTransactionSettings",
                    success: function (res) {
                        if (res.code === 0) {
                            that.ajaxStatus = "ready";
                            that.data = res.data;
                        }
                    }
                });
            },
            save: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/settings/setTransactionSettings",
                    type: "post",
                    data: that.data,
                    success: function (res) {
                        if (res.code === 0) {
                            that.$root.alerts.push("保存成功！");
                            that.ajaxStatus="ready";
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getData();
        }
    })
</script>