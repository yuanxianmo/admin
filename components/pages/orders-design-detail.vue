<template>
    <main v-if="data">
        <div class="page-head mb10">
            <div class="left">
                <img src="images/orders/order.png">印刷订单>订单详情
            </div>
        </div>
        <div class="page-body" v-if="data">
            <table class="edit">
                <tbody>
                    <tr>
                        <td>用户：</td>
                        <td>{{data.receiver}}</td>
                    </tr>
                    <tr>
                        <td>用户信息：</td>
                        <td class="user-info">
                            <span>ID: {{data.userId}}</span>
                            <span>手机号: {{data.userMobile||"未绑定"}}</span>
                            <span>邮箱: {{data.userEmail||"未绑定"}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>订单编号：</td>
                        <td>{{data.orderNo}}</td>
                    </tr>
                    <tr v-if="data.payNo">
                        <td>支付单号：</td>
                        <td>{{data.payNo}}</td>
                    </tr>
                    <tr v-if="data.payType">
                        <td>付款方式：</td>
                        <td>
                            <div class="pay-type flex-center" v-if="data.payType==1">
                                <div class="img mr5">
                                    <img src="images/orders/alipay.png" class="v-top">
                                </div>
                                <div class="text">支付宝</div>
                            </div>
                            <div class="pay-type flex-center" v-else-if="data.payType==2">
                                <div class="img mr5">
                                    <img src="images/orders/wechat.png" class="v-top">
                                </div>
                                <div class="text">微信</div>
                            </div>
                            <div class="pay-type flex-center" v-else-if="data.payType==5">
                                <div class="img mr5">
                                    <img src="images/orders/range.png" class="v-top">
                                </div>
                                <div class="text">月结</div>
                            </div>
                            <div class="pay-type flex-center" v-else-if="data.payType==6">
                                <div class="img mr5">
                                    <img src="images/orders/range.png" class="v-top">
                                </div>
                                <div class="text">年结</div>
                            </div>
                            <div class="pay-type flex-center" v-else>
                                <div class="text">未支付</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>订单状态：</td>
                        <td>
                            <div class="order-status red" v-if="data.orderStatus==11000">未支付</div>
                            <div class="order-status red" v-else-if="data.orderStatus==12000">已支付，未上传</div>
                            <div class="order-status red" v-else-if="data.orderStatus==13000">审核中</div>
                            <div class="order-status red" v-else-if="data.orderStatus==14000">审核失败</div>
                            <div class="order-status green" v-else-if="data.orderStatus==18000">已完成</div>
                            <div class="order-status gray" v-else-if="data.orderStatus==30000">客户关闭</div>
                            <div class="order-status gray" v-else-if="data.orderStatus==30500">系统关闭订单</div>
                            <div class="order-status gray" v-else-if="data.orderStatus==31000">退款中</div>
                        </td>
                    </tr>
                    <tr>
                        <td>下单日期：</td>
                        <td>{{data.createTime | dateStr}}</td>
                    </tr>
                    <tr v-if="data.payTime">
                        <td>付款时间：</td>
                        <td>{{data.payTime | dateStr}}</td>
                    </tr>
                    <tr>
                        <td>设计次数：</td>
                        <td>{{data.designTime}}次</td>
                    </tr>
                    <tr>
                        <td class="v-top lh32">设计稿：</td>
                        <td>
                            <div :class="['flex-input','mb10','w600',{empty:!data.fileSrc}]">
                                <input readonly class="desc h32" placeholder="未上传设计稿" :value="data.fileSrc">
                                <button class="black" @click="selectImage=true" v-if="data.orderStatus==12000">上传设计稿</button>
                                <button class="black" @click="selectImage=true" v-else-if="data.fileKey">重新上传</button>
                            </div>
                            <div class="design-file" @click="downloadFile" v-if="data.fileKey">{{data.fileKey.split('.').pop().toString().toUpperCase()}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page-body" v-if="data">
            <div class="title">联系人信息</div>
            <table class="edit receiver">
                <tbody>
                    <tr>
                        <td>姓名：</td>
                        <td>
                            <input class="focus" readonly v-model="data.receiver">
                        </td>
                    </tr>
                    <tr>
                        <td>手机：</td>
                        <td>
                            {{data.receiverMobile}}
                        </td>
                    </tr>
                    <tr>
                        <td>QQ：</td>
                        <td>
                            {{data.receiverQq}}
                        </td>
                    </tr>
                    <tr>
                        <td>微信：</td>
                        <td>
                            {{data.receiverWechat}}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button class="black edit" @click="showAddress">修改地址</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page-body" v-if="data">
            <div class="title">设计师信息</div>
            <table class="common receiver row-border">
                <thead>
                    <tr>
                        <th>设计师ID</th>
                        <th>设计师名称</th>
                        <th>设计师等级</th>
                        <th>上传作品数</th>
                        <th>邀约价格</th>
                        <th>邀约次数</th>
                        <th>设计状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {{data.designerId}}
                        </td>
                        <td>
                            {{data.designerName}}
                        </td>
                        <td>
                            {{data.designerLevel}}
                        </td>
                        <td>
                            {{data.opusnum}}
                        </td>
                        <td>
                            ￥{{data.designerPrice}}
                        </td>
                        <td>
                            {{data.employNum}}次
                        </td>
                        <td>
                            {{data.free=="0"?"空闲":"设计中"}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="actions" v-if="data">
            <button class="black-simple" @click="$router.push('/orders/design')">返回列表</button>
        </div>
        <transition name="fade">
            <keep-alive>
                <images-selector v-if="selectImage" :oss="true" :file-mode="true" :single="true" @close="selectImage=false" @confirm="setFile($event[0])">
                </images-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    main .message {
        width: 400px;
    }

    main .express {
        width: 400px;
        resize: none;
    }

    .gray {
        color: gray;
    }

    .page-body {
        border-bottom: 1px solid #d2d2d2;
        padding: 15px 0;
    }

    .design-file {
        width: 80px;
        height: 80px;
        background-color: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }

    .page-body .title {
        color: #353535;
        margin-bottom: 10px;
    }

    table.edit td:first-child {
        width: 105px;
    }

    button.edit {
        height: 32px;
        width: 100px;
    }

    table.receiver input.focus {
        padding: 0 7px;
    }

    table.receiver input.focus:read-only {
        border-color: transparent;
        background-color: transparent;
        padding-left: 0;
    }

    .page-body:nth-last-of-type(2) {
        border-bottom: none;
    }

    main table.common {
        margin-left: 20px;
        width: calc(100% - 20px);
    }

    main table.common th {
        border-bottom: 1px solid #d2d2d2;
    }

    .page-body:not(:nth-last-of-type(2)) main table.common tbody tr:last-of-type td {
        border-bottom: none;
    }

    .user-info span {
        margin-right: 20px;
    }

    table.items-info strong {
        color: #c7000a;
        font-weight: normal;
    }

    #download-zone {
        margin-left: 20px;
    }

    #download-zone p {
        display: flex;
        align-items: center;
    }

    #download-zone p img {
        margin-right: 10px;
    }

    #reason {
        width: 400px;
    }

    .page-body .body {
        display: flex;
        align-items: center;
    }

    .page-body .body .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #d2d2d2;
        padding: 25px 20px;
    }

    .page-body .body .info h3 {
        margin: 0 0 5px;
        font-weight: normal;
        font-size: 16px;
        color: #353535;
    }

    .page-body .body .info h4 {
        margin: 0 0 5px;
        font-weight: normal;
        font-size: 16px;
        color: #353535;
    }

    .page-body .body .list {
        list-style: none;
        flex: 1 0;
        padding-left: 40px;
    }

    .express-item:first-of-type {
        color: #c4a66a;
    }

    .express-item {
        display: flex;
        color: #8f8f8f;
        font-size: 12px;
        line-height: 16px;
    }

    .express-item .time {
        display: flex;
        align-items: center;
        padding-right: 35px;
        position: relative;
        flex-shrink: 0;
    }

    .express-item:first-of-type .time::after {
        background-color: #c4a66a;
    }

    .express-item .time:after {
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #c4c4c4;
        position: absolute;
        right: -3px;
        top: calc(50% - 3px);
    }

    .express-item .status {
        border-left: 1px solid #c4c4c4;
        padding: 7px 0 7px 35px;
        flex: 1;
    }

    .order-item {
        border: 1px solid #d2d2d2;
        margin: 20px 0;
        padding: 20px;
    }

    .order-item .page-body {
        border-bottom: none;
    }

    .empty.flex-input input {
        border-right: 1px solid #d2d2d2;
    }
</style>
<script>
    ({
        data: function () {
            return {
                id: this.$route.params.id,
                data: null,
                type: this.$route.meta.type,
                reason: "",
                techDownloading: false,
                selectImage: false
            }
        },
        methods: {
            toLocaleString: function (v) {
                return new Date(v).toLocaleString();
            },
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/designerOrder/selectDetail",
                    data: {
                        id: that.id
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            res.data.downloading = false;
                            that.data = res.data;
                            that.ajaxStatus = "ready";
                        }
                    }
                });
            },
            downloadTech: function (id) {
                var that = this;
                this.techDownloading = true;
                ajax({
                    url: "/admin/order/export-print-detail",
                    data: {
                        orderItemId: id
                    },
                    xhrFields: {
                        responseType: 'blob'
                    },
                    dataType: "binary",
                    success: function (res, status, xhr) {
                        if (!xhr.getResponseHeader("Content-Disposition")) {
                            that.$root.alerts.push({
                                text: "下载失败,未能获取文件类型"
                            });
                            that.techDownloading = false;
                            return;
                        }
                        var fileName = xhr.getResponseHeader("Content-Disposition").split(";").pop()
                            .split("=").pop().replace(/\"/g, "");
                        that.techDownloading = false;
                        var a = $("<a target='blank' download='" + fileName + "' href='" +
                            URL.createObjectURL(res) + "'></a>");
                        a[0].click();
                    }
                });
            },
            setFile: function (src) {
                var that = this;
                ajax({
                    url: "/admin/designerOrder/saveOpusZip",
                    type: "put",
                    data: {
                        id: that.id,
                        fileSrc: src
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.getData();
                        }
                    }
                });
            },
            downloadFile: function () {
                var that = this;
                this.data.downloading = true;
                ajax({
                    url: "/admin/designerOrder/getRecevierZip",
                    data: {
                        orderNo: that.data.orderNo
                    },
                    xhrFields: {
                        responseType: 'blob'
                    },
                    dataType: "binary",
                    success: function (res, status, xhr) {
                        if (!xhr.getResponseHeader("Content-Disposition")) {
                            that.$root.alerts.push({
                                text: "下载失败,未能获取文件类型"
                            });
                            that.data.downloading = false;
                            return;
                        }
                        var fileName = xhr.getResponseHeader("Content-Disposition").split(";").pop()
                            .split("=").pop().replace(/\"/g, "");
                        that.data.downloading = false;
                        var a = $("<a target='blank' download='" + fileName + "' href='" +
                            URL.createObjectURL(res) + "'></a>");
                        a[0].click();
                    }
                });
            },
            showAddress: function () {
                var that = this;
                this.$root.prompts.push({
                    title: "修改联系人",
                    fn: function () {
                        ajax({
                            url: "/admin/designerOrder/saveReceiverInfo",
                            data: {
                                id: that.id,
                                receiver: this.data[0].value,
                                receiverMobile: this.data[1].value,
                                receiverQq: this.data[2].value,
                                receiverWechat: this.data[3].value
                            },
                            type: "put",
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getData();
                                }
                            }
                        });
                    },
                    data: [{
                            type: "text",
                            name: "联系人",
                            value: that.data.receiver,
                            required: true
                        },
                        {
                            type: "text",
                            name: "手机号",
                            value: that.data.receiverMobile,
                            required: true
                        },
                        {
                            type: "text",
                            name: "QQ",
                            value: that.data.receiverQq
                        },
                        {
                            type: "text",
                            name: "微信",
                            value: that.data.receiverWechat
                        }
                    ]
                });
            },
            changeRemark: function () {
                var that = this;
                this.$root.prompts.push({
                    title: "修改备注",
                    data: [{
                        name: "备注留言",
                        value: ""
                    }],
                    fn: function () {
                        ajax({
                            url: "/admin/order/changeReamark",
                            type: "post",
                            data: {
                                id: that.data.id,
                                remark: this.data[0].value
                            },
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getData();
                                }
                            }
                        });
                    }
                });
            },
            setReceiver: function (v) {
                var that = this;
                ajax({
                    url: "/admin/order/changeRecevier",
                    type: "post",
                    data: {
                        id: that.data.id,
                        receiver: v.name,
                        receiverMobile: v.phone,
                        receiverAddress: v.address,
                        receiverProvince: v.province.label,
                        receiverCity: v.city.label,
                        receiverDistrict: v.area.label
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.getData();
                        }
                    }
                });
            },
        },
        mounted: function () {
            this.getData();
        },
        activated: function () {
            this.getData();
        }
    })
</script>