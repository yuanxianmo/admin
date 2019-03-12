<template>
    <main>
        <ul class="type-select mb20" v-if="type=='ys'">
            <li :class="{current:status==undefined}" @click="status=undefined">全部</li>
            <li :class="{current:status=='dfk'}" @click="status='dfk'">待付款</li>
            <li :class="{current:status=='dys'}" @click="status='dys'">待印刷</li>
            <li :class="{current:status=='ysz'}" @click="status='ysz'">印刷中</li>
            <li :class="{current:status=='psz'}" @click="status='psz'">配送中</li>
            <li :class="{current:status=='yqx'}" @click="status='yqx'">已取消</li>
            <li :class="{current:status=='ywc'}" @click="status='ywc'">已完成</li>
        </ul>
        <ul class="type-select mb20" v-else-if="type=='zdy'">
            <li :class="{current:status==undefined}" @click="status=undefined">全部</li>
            <li :class="{current:status=='dfk'}" @click="status='dfk'">待付款</li>
            <li :class="{current:status=='dxz'}" @click="status='dxz'">待下载</li>
            <li :class="{current:status=='dsc'}" @click="status='dsc'">待上传</li>
            <li :class="{current:status=='dsh'}" @click="status='dsh'">待审核</li>
            <li :class="{current:status=='dys'}" @click="status='dys'">待印刷</li>
            <li :class="{current:status=='ysz'}" @click="status='ysz'">印刷中</li>
            <li :class="{current:status=='psz'}" @click="status='psz'">配送中</li>
            <li :class="{current:status=='yqx'}" @click="status='yqx'">已取消</li>
            <li :class="{current:status=='ywc'}" @click="status='ywc'">已完成</li>
        </ul>
        <div class="top-fns mb15 justify-between">
            <search :width="'320px'" v-model="param" :placeholder="'请输入订单号/商品名称/商品ID/快递单等'" @search="currentPage==1?getList():currentPage=1"></search>
            <v-filter :height="'34px'" @filter="currentPage==1?getList():currentPage=1">
                <div>
                    <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'所有时间段',value:undefined,selected:true},{name:'三个月内',value:'threemonth',selected:false},{name:'今年',value:'thisyear',selected:false},{name:'去年',value:'lastyear',selected:false},{name:'前年',value:'lastyearbefore',selected:false}]"
                        @select="timeLimit=$event"></drop-down>
                </div>
            </v-filter>
            <button class="theme-bt export" onclick="saveXSL($('.orders.common')[0])">导出EXCEL</button>
        </div>
        <ul class="statis-count mb10">
            <li>总订单数：{{total}}</li>
            <li>总订单金额：{{number(list.length?list[0].ordersAllPrice:0).toFixed(2)}}元</li>
        </ul>
        <table class="orders common">
            <thead>
                <tr>
                    <th>作品</th>
                    <th>单价/数量</th>
                    <th>买家</th>
                    <th>支付方式</th>
                    <th>价格</th>
                    <th>状态</th>
                    <th v-if="type=='zdy'">用户文件</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(i,itemIndex) in list">
                    <tr class="statis">
                        <td :colspan="type=='zdy'?8:7" class="info">
                            <div>
                                <span>订单号：{{i.orderNo}}</span>
                                <span v-if="i.payNo">支付编号：{{i.payNo||"未支付"}}</span>
                                <span>下单时间：{{i.createTime | dateStr}}</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(goods,index) in i.itemlist" :key="i.id+'i'+index" :class="{last:index==i.itemlist.length-1}">
                        <td>
                            <div class="goods flex-center">
                                <img :src="goods.imgSrc" class="table-thumb" onload="this.classList.add('img-loaded')" v-broken-link>
                                <span>{{goods.name}}</span>
                            </div>
                        </td>
                        <td>
                            <table class="td inline-table">
                                <tbody>
                                    <tr>
                                        <td>单价：</td>
                                        <td>￥{{goods.unitePrice}}</td>
                                    </tr>
                                    <tr>
                                        <td>数量：</td>
                                        <td>{{goods.number}}个</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td :rowspan="i.itemlist.length" v-if="index==0">
                            <table class="td inline-table">
                                <tr>
                                    <td>收件人姓名：</td>
                                    <td>{{i.receiver}}</td>
                                </tr>
                                <tr>
                                    <td>手机号码：</td>
                                    <td>{{i.userMobile||"未填写"}}</td>
                                </tr>
                                <tr>
                                    <td>用户账户：</td>
                                    <td>{{i.userEmail}}</td>
                                </tr>
                            </table>
                        </td>
                        <td :rowspan="i.itemlist.length" v-if="index==0">
                            <div class="pay-type" v-if="i.payType==1">
                                <div class="img">
                                    <img src="images/orders/alipay.png" class="v-top">
                                </div>
                                <div class="text">支付宝</div>
                            </div>
                            <div class="pay-type" v-else-if="i.payType==2">
                                <div class="img">
                                    <img src="images/orders/wechat.png" class="v-top">
                                </div>
                                <div class="text">微信</div>
                            </div>
                            <div class="pay-type" v-else-if="i.payType==5">
                                <div class="im">
                                    <img src="images/orders/range.png" class="v-top">
                                </div>
                                <div class="text">月结</div>
                            </div>
                            <div class="pay-type" v-else-if="i.payType==6">
                                <div class="img">
                                    <img src="images/orders/range.png" class="v-top">
                                </div>
                                <div class="text">年结</div>
                            </div>
                            <div class="pay-type" v-else>
                                <div class="text">无</div>
                            </div>
                        </td>
                        <td :rowspan="i.itemlist.length" v-if="index==0">
                            <table class="td prices">
                                <tbody>
                                    <tr>
                                        <td>作品总价：</td>
                                        <td>¥{{i.goodsAllPrice}}</td>
                                    </tr>
                                    <tr>
                                        <td>运费：</td>
                                        <td>¥{{i.postFee}}</td>
                                    </tr>
                                    <tr>
                                        <td>应收款：</td>
                                        <td>¥{{i.originalPrice}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td :rowspan="i.itemlist.length" v-if="index==0">
                            <div class="flex-column">
                                <div class="order-status red" v-if="i.orderStatus.toString()[1]==1">未支付</div>
                                <div class="order-status red" v-else-if="i.orderStatus.toString()[1]==2">已支付，未上传</div>
                                <div class="order-status red" v-else-if="i.orderStatus.toString()[1]==3">已上传，等待审核</div>
                                <div class="order-status red" v-else-if="i.orderStatus.toString()[1]==4">审核失败</div>
                                <div class="order-status red" v-else-if="i.orderStatus.toString()[1]==5">审核成功</div>
                                <div class="order-status red" v-else-if="i.orderStatus.toString()[1]==6">生产中</div>
                                <div class="order-status red" v-else-if="i.orderStatus.toString()[1]==7">配送中</div>
                                <div class="order-status green" v-else-if="i.orderStatus.toString()[1]==8">已完成</div>
                                <div class="order-status gray" v-if="i.orderStatus==30000">客户关闭</div>
                                <div class="order-status gray" v-else-if="i.orderStatus==30500">系统关闭订单</div>
                                <router-link class="simple" :to="(i.type=='2'?'/orders/':'/orders/custom/')+i.orderNo" v-permission="'order_detail'">查看详情</router-link>
                            </div>
                        </td>
                        <td :rowspan="i.itemlist.length" v-if="type=='zdy'&&index==0">
                            <button class="download-file" @click="downloadFile(i)" :disabled="i.downloading==true" v-if="i.fileExist=='exist'">{{i.downloading==false?'下载':'下载中'}}</button>
                            <span class="light" v-else>未上传</span>
                        </td>
                        <td :rowspan="i.itemlist.length" v-if="index==0">
                            <div class="flex-column action">
                                <button v-if="i.orderStatus.toString()[1]==3" class="theme-bt" @click="changeToYSB(i,itemIndex)" v-permission="'order_edit_ysh'">通过审核</button>
                                <button v-if="i.orderStatus.toString()[1]==3" class="simple" @click="changeToSHSB(i,itemIndex)" v-permission="'order_edit_shsb'">不通过审核</button>
                                <button v-if="i.orderStatus.toString()[1]==5" class="theme-bt" @click="changeToYSZ(i,itemIndex)" v-permission="'order_edit_ysz'">确认生产</button>
                                <button v-if="i.orderStatus.toString()[1]==6" class="theme-bt" @click="changeToPSZ(i,itemIndex)" v-permission="'order_edit_psz'">确认发货</button>
                                <button v-if="i.orderStatus.toString()[1]==7" class="theme-bt" @click="changeToYWC(i,itemIndex)" v-permission="'order_edit_ywc'">确认完成</button>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <pager @pager="currentPage=$event" :xcurrent-page="currentPage" :xpages="pages"></pager>
    </main>
</template>
<style>
    .goods img {
        margin-right: 7px;
    }

    tr.last td {}

    .top-fns {
        display: flex;
        justify-content: space-between;
    }

    table.common td.align-left {
        text-align: left;
    }

    table.common th,
    table.common>tbody>tr:last-of-type>td,
    table.common>tbody>tr>td[rowspan],
    tr.last>td {
        border-bottom: 1px solid #dadada;
    }

    .prices {
        display: inline-table;
    }

    .top-fns .filter {
        margin-right: 20px;
    }

    .user-info span {
        margin-right: 15px;
    }

    .download-file {
        display: inline-block;
        text-align: center;
        padding-top: 25px;
        background-image: url(images/orders/folder.png);
        background-repeat: no-repeat;
        background-position: center 3px;
        background-color: transparent;
        border: none;
        color: #C4A66A;
    }

    .download-file:disabled {
        background-image: url(images/orders/folder_disabled.png);
        color: #888;
    }

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

    .export {
        border-radius: 2px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                list: [],
                status: undefined,
                timeLimit: undefined,
                type: this.$route.meta.type,
                param: "",
                reason: ""
            }
        },
        methods: {
            toLocaleString: function (v) {
                return new Date(v).toLocaleString();
            },
            number: function (v) {
                return Number(v);
            },
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/order/select",
                    data: {
                        pageSize: that.pageSize,
                        currentPage: that.currentPage,
                        type: that.type,
                        orderstatus: that.status,
                        timeLimit: that.timeLimit,
                        userid: that.$route.params.id,
                        param: that.param
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            $.each(res.data, function (index, item) {
                                item.downloading = false;
                            });
                            that.list = res.data;
                            that.total = res.total;
                        }
                    }
                });
            },
            getSingleData: function (obj, index) {
                var that = this;
                ajax({
                    url: "/admin/order/selectOrderDetail",
                    data: {
                        orderno: obj.orderNo
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            res.data.itemlist = res.data.items;
                            that.$set(that.list, index, res.data);
                        }
                    }
                });
            },
            changeToPSZ: function (obj, index) {
                var that = this;
                this.$root.prompts.push({
                    title: "请输入物流信息",
                    fn: function () {
                        ajax({
                            url: "/admin/order/changeToPSZ",
                            data: {
                                id: obj.id,
                                shippingCompany: this.data[0].value,
                                shippingNo: this.data[1].value,
                                shippingTime: new Date(this.data[2].value.toLocaleDateString() +
                                    " " + this.data[3].value).toISOString()
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getList();
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
                this.$root.prompts.push({
                    text: "确定不通过该订单审核？",
                    data: [{
                        name: "不通过原因",
                        value: ""
                    }],
                    fn: function () {
                        var o=this;
                        ajax({
                            url: "/admin/order/changeToSHSB",
                            data: {
                                id: obj.id,
                                remark: o.data[0].value
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code == 0) {
                                    that.getList();
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
                        ajax({
                            url: "/admin/order/changeToYSH",
                            data: {
                                id: obj.id
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code == 0) {
                                    that.getList();
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
                        ajax({
                            url: "/admin/order/changeToYSZ",
                            data: {
                                id: obj.id
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code == 0) {
                                    that.getList();
                                }
                            }
                        });
                    }
                });
            },
            changeToYWC: function (obj, index) {
                var that = this;
                this.$root.confirms.push({
                    text: "确定要完成该订单？",
                    fn: function () {
                        ajax({
                            url: "/admin/order/changeToYWC",
                            data: {
                                id: obj.id
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code == 0) {
                                    that.getList();
                                }
                            }
                        });
                    }
                });
            },
            downloadFile: function (obj) {
                var that = this;
                obj.downloading = true;
                ajax({
                    url: "/admin/order/getRecevierZip",
                    data: {
                        orderNo: obj.orderNo
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
                            obj.downloading = false;
                            return;
                        }
                        var fileName = xhr.getResponseHeader("Content-Disposition").split(";").pop()
                            .split("=").pop().replace(/\"/g, "");
                        obj.downloading = false;
                        var a = $("<a target='blank' download='" + fileName + "' href='" +
                            URL.createObjectURL(res) + "'></a>");
                        a[0].click();
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
        },
        activated: function () {
            this.getList();
        },
        watch: {
            status: function (after) {
                this.list = [];
                if (this.currentPage != 1) {
                    this.currentPage = 1;
                } else {
                    this.getList();
                }
            }
        }
    })
</script>