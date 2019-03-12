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
                            <div class="order-status red" v-if="data.orderStatus.toString()[1]==1">未支付</div>
                            <div class="order-status red" v-else-if="data.orderStatus.toString()[1]==2">已支付，未上传</div>
                            <div class="order-status red" v-else-if="data.orderStatus.toString()[1]==3">已上传，等待审核</div>
                            <div class="order-status red" v-else-if="data.orderStatus.toString()[1]==4">审核失败</div>
                            <div class="order-status red" v-else-if="data.orderStatus.toString()[1]==5">审核成功</div>
                            <div class="order-status red" v-else-if="data.orderStatus.toString()[1]==6">生产中</div>
                            <div class="order-status red" v-else-if="data.orderStatus.toString()[1]==7">配送中</div>
                            <div class="order-status green" v-else-if="data.orderStatus.toString()[1]==8">已完成</div>
                            <div class="order-status gray" v-if="data.orderStatus==30000">客户关闭</div>
                            <div class="order-status gray" v-else-if="data.orderStatus==30500">系统关闭订单</div>
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
                        <td>备注留言：</td>
                        <td>
                            <input class="focus message mr10" readonly v-model="data.remark">
                            <button class="black edit" @click="changeRemark" v-permission="'order_remark'">修改备注</button>
                        </td>
                    </tr>
                    <tr v-if="data.shippingCompany">
                        <td>配送方式：</td>
                        <td>{{data.shippingCompany}}</td>
                    </tr>
                    <tr v-if="data.shippingCompany">
                        <td>物流单号：</td>
                        <td>{{data.shippingNo}}</td>
                    </tr>
                    <tr v-if="data.shippingCompany">
                        <td>发货时间：</td>
                        <td>{{data.shippingTime | dateStr}}</td>
                    </tr>
                    <tr v-if="data.expressInfo">
                        <td class="v-top">发货信息：</td>
                        <td>
                            <div class="mb10">快递单号: {{data.shippingNo}}</div>
                            <div class="mb10">发货时间: {{data.shippingTime?toLocaleString(data.shippingTime):"未发货"}}</div>
                            <textarea rows="5" class="focus express" placeholder="物流信息"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>订单总价：</td>
                        <td>￥{{data.originalPrice-data.postFee}}</td>
                    </tr>
                    <tr>
                        <td>运费：</td>
                        <td>￥{{data.postFee}}</td>
                    </tr>
                    <tr>
                        <td>应收款：</td>
                        <td>￥{{data.originalPrice}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page-body" v-if="data">
            <div class="title">收件人信息</div>
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
                            <input class="focus" readonly v-model="data.receiverMobile">
                        </td>
                    </tr>
                    <tr>
                        <td>电话：</td>
                        <td>
                            <input class="focus" readonly v-model="data.receiverPhone">
                        </td>
                    </tr>
                    <tr>
                        <td>地址：</td>
                        <td>
                            {{data.receiverProvince+" "+data.receiverCity+" "+data.receiverDistrict+" "+data.receiverAddress}}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button class="black edit" @click="showAddress=true" v-permission="'order_address'">修改地址</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page-body" v-if="data&&data.shippingNo">
            <div class="title">物流信息</div>
            <div class="body">
                <ul class="list">
                    <li class="express-item" v-for="i in data.shippings">
                        <div class="time">{{i.time}}</div>
                        <div class="status">{{i.content}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <transition name="fade">
            <keep-alive>
                <address-selector v-if="showAddress" :name="data.receiver" :phone="data.receiverMobile" :province="{label:data.receiverProvince,value:-1}" :city="{label:data.receiverCity,value:-1}" :area="{label:data.receiverDistrict,value:-1}" :address="data.receiverAddress" @confirm="setReceiver($event);showAddress=false"
                    @close="showAddress=false"></address-selector>
            </keep-alive>
        </transition>
        <div v-for="i in data.items" v-if="data" class="order-item">
            <div class="page-body" v-if="data">
                <div class="title">作品信息</div>
                <table class="common items-info">
                    <thead>
                        <tr>
                            <th>作品ID</th>
                            <th>作品名称</th>
                            <th>作品分类</th>
                            <th>作品图片</th>
                            <th>价格</th>
                            <th>购买数量</th>
                            <th>实付金额</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{i.id}}</td>
                            <td>{{i.name}}</td>
                            <td>{{i.structureName}}</td>
                            <td>
                                <a target="_blank" :href="$root.config.urlBase+'/'+(i.type=='2'?'shoppingCart':'DIY')+'?id='+i.itemGoodsId">
                                    <img :src="i.imgSrc" class="table-thumb" v-broken-link>
                                </a>
                            </td>
                            <td>
                                <strong>￥{{i.unitePrice}}</strong>
                            </td>
                            <td>{{i.goodsNum}}</td>
                            <td>￥{{i.payPrice}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="page-body" v-if="data&&type=='zdy'&&i.techs&&i.techs.length>0">
                <div class="title">自定义作品印刷要求</div>
                <table class="common">
                    <thead>
                        <tr>
                            <th>成品尺寸</th>
                            <th>材料</th>
                            <th>印刷方式</th>
                            <th>表面处理工艺</th>
                            <th>后道工艺</th>
                            <th>下载工单</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{i.orderItemTech.size}}</td>
                            <td>
                                <div v-for="j in i.orderItemTech.cycl">{{j.techname+j.techAttrName+j.area||''}}</div>
                            </td>
                            <td>
                                <div v-for="j in i.orderItemTech.ysfs">{{j.techname+j.techAttrName+j.area||''}}</div>
                            </td>
                            <td>
                                <div v-for="j in i.orderItemTech.bmcl">{{j.area+j.techname+j.techAttrName||''}}</div>
                            </td>
                            <td>{{i.orderItemTech.hdgy}}</td>
                            <td>
                                <button v-permission="'download_detail'" class="black edit" :disabled="techDownloading" @click="downloadTech(i.id)">{{techDownloading==false?"工单下载":"下载中"}}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="page-body" v-if="data&&type=='zdy'">
            <div class="title">用户上传文件</div>
            <div id="download-zone" v-if="data.fileKey">
                <p>
                    <img src="images/orders/folder_black.png">
                    <span>{{data.fileKey}}&nbsp;&nbsp;&nbsp;{{data.fileSize}}</span>
                </p>
                <button class="black edit" :disabled="data.downloading" @click="downloadFile" v-permission="'order_download'">{{data.downloading==false?"下载文件":"下载中"}}</button>
            </div>
            <div id="download-zone" v-else>
                <span class="gray">未上传</span>
            </div>
        </div>
        <div class="page-body" v-if="data&&data.orderStatus.toString()[1]==3">
            <table class="edit">
                <tbody>
                    <tr>
                        <td class="v-top lh32">不通过原因：</td>
                        <td>
                            <textarea id="reason" rows="4" placeholder="请简要描述不通过原因" class="focus" v-model="reason"></textarea>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
        <div class="actions" v-if="data">
            <action v-if="data.orderStatus.toString()[1]==3" :text="'通过审核'" @click.native="changeToYSH()" v-permission="'order_edit_ysh'"></action>
            <action v-if="data.orderStatus.toString()[1]==3" :text="'不通过审核'" @click.native="changeToSHSB()" v-permission="'order_edit_shsb'"></action>
            <action v-if="data.orderStatus.toString()[1]==5" :text="'确认生产'" @click.native="changeToYSZ()" v-permission="'order_edit_ysz'"></action>
            <action v-if="data.orderStatus.toString()[1]==6" :text="'确认发货'" @click.native="changeToPSZ()" v-permission="'order_edit_psz'"></action>
            <action v-if="data.orderStatus.toString()[1]==7" :text="'确认完成'" @click.native="changeToYWC()" v-permission="'order_edit_ywc'"></action>
        </div>
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

    .page-body .title {
        color: #353535;
        margin-bottom: 10px;
    }

    .actions {
        margin: 50px 0;
        justify-content: flex-start !important;
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
</style>
<script>
    ({
        data: function () {
            return {
                orderno: this.$route.params.id,
                data: null,
                type: this.$route.meta.type,
                showAddress: false,
                reason: "",
                techDownloading: false
            }
        },
        methods: {
            toLocaleString: function (v) {
                return new Date(v).toLocaleString();
            },
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/order/selectOrderDetail",
                    data: {
                        orderno: that.orderno
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
            changeToPSZ: function (obj, index) {
                var that = this;
                this.$root.prompts.push({
                    title: "请输入物流数据",
                    fn: function () {
                        ajax.call(that, {
                            url: "/admin/order/changeToPSZ",
                            data: {
                                id: obj.id,
                                shippingCompany: this.data[0].value,
                                shippingNo: this.data[1].value,
                                shippingTime: new Date(new Date(this.data[2].value).toLocaleDateString() +
                                    " " + this.data[3].value).toISOString()
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getData();
                                }
                            }
                        });
                    },
                    data: [{
                            type: "select",
                            name: "物流公司",
                            list: [{
                                    name: "中通快递"
                                },
                                {
                                    name: "顺丰速运"
                                },
                                {
                                    name: "圆通速递"
                                },
                                {
                                    name: "韵达快运"
                                },
                                {
                                    name: "其它",
                                    input: true
                                }
                            ],
                            value: "",
                            required: true
                        },
                        {
                            type: "text",
                            name: "物流单号",
                            value: "",
                            required: true
                        },
                        {
                            type: "plugin",
                            name: "选择发货日期",
                            plugin: "datepicker",
                            value: new Date(),
                            required: true
                        },
                        {
                            type: "plugin",
                            name: "选择发货时间",
                            plugin: "vue-clock-picker",
                            value: "",
                            required: true
                        }
                    ]
                });
            },
            changeToSHSB: function (obj, index) {
                var that = this;
                this.$root.confirms.push({
                    text: "确定不通过该订单审核？",
                    fn: function () {
                        ajax.call(that, {
                            url: "/admin/order/changeToSHSB",
                            data: {
                                id: that.data.id,
                                remark: that.reason
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code == 0) {
                                    that.getData();
                                }
                            }
                        });
                    }
                });
            },
            changeToYSB: function (obj, index) {
                var that = this;
                this.$root.confirms.push({
                    text: "确定通过该订单审核？",
                    fn: function () {
                        ajax.call(that, {
                            url: "/admin/order/changeToYSH",
                            data: {
                                id: that.data.id
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code == 0) {
                                    that.getData();
                                }
                            }
                        });
                    }
                });
            },
            changeToYSZ: function (obj, index) {
                var that = this;
                this.$root.confirms.push({
                    text: "确定该订单正在生产中？",
                    fn: function () {
                        ajax.call(that, {
                            url: "/admin/order/changeToYSZ",
                            data: {
                                id: that.data.id
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code == 0) {
                                    that.getData();
                                }
                            }
                        });
                    }
                });
            },
            changeToYWC: function (obj) {
                var that = this;
                this.$root.confirms.push({
                    text: "确定要完成该订单？",
                    fn: function () {
                        ajax.call(that, {
                            url: "/admin/order/changeToYWC",
                            data: {
                                id: that.data.id
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code == 0) {
                                    that.getData();
                                }
                            }
                        });
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
            downloadFile: function () {
                var that = this;
                this.data.downloading = true;
                ajax({
                    url: "/admin/order/getRecevierZip",
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