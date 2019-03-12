<template>
    <main>
        <div class="page-head mb10">
            <div class="left">
                <img src="images/orders/order.png">发票详情
            </div>
        </div>
        <div class="page-body" v-if="data">
            <table class="edit">
                <tbody>
                    <tr>
                        <td>用户：</td>
                        <td>{{data.userVO.username||data.userVO.email||data.userVO.phone}}</td>
                    </tr>
                    <tr>
                        <td>用户信息：</td>
                        <td class="user-info">
                            <span>ID: {{data.userVO.id}}</span>
                            <span>手机号: {{data.userVO.phone||"未绑定"}}</span>
                            <span>邮箱: {{data.userVO.email||"未绑定"}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>发票抬头：</td>
                        <td>{{data.userInvoiceVO.invoiceHeader}}</td>
                    </tr>
                    <tr>
                        <td>开具类型：</td>
                        <td>{{data.userInvoiceVO.issueType==1?"企业":"个人"}}</td>
                    </tr>
                    <tr>
                        <td>发票类型：</td>
                        <td>{{data.userInvoiceVO.invoiceType==1?"增值税发票":"普通"}}</td>
                    </tr>
                    <template v-if="data.userInvoiceVO.issueType==1">
                        <tr>
                            <td>税务登记号：</td>
                            <td>{{data.userInvoiceVO.taxCode}}</td>
                        </tr>
                        <tr>
                            <td>开户银行名称：</td>
                            <td>{{data.userInvoiceVO.bankName}}</td>
                        </tr>
                        <tr>
                            <td>开户银行账号：</td>
                            <td>{{data.userInvoiceVO.bankNumber}}</td>
                        </tr>
                        <tr>
                            <td>注册场所地址：</td>
                            <td>{{data.userInvoiceVO.address}}</td>
                        </tr>
                        <tr>
                            <td>注册固定电话：</td>
                            <td>{{data.userInvoiceVO.telePhone}}</td>
                        </tr>
                    </template>
                    <tr>
                        <td>申请发票金额：</td>
                        <td>{{data.totalFee}}</td>
                    </tr>
                    <tr>
                        <td>申请状态：</td>
                        <td>
                            <div class="order-status red" v-if="data.approvalStatus==0">审核中</div>
                            <div class="order-status red" v-if="data.approvalStatus==1">审核成功</div>
                            <div class="order-status red" v-if="data.approvalStatus==2">审核失败</div>
                            <div class="order-status red" v-if="data.approvalStatus==3">已寄出</div>
                            <div class="order-status green" v-if="data.approvalStatus==4">已完成</div>
                            <div class="order-status gray" v-if="data.approvalStatus==-1">已取消</div>
                        </td>
                    </tr>
                    <tr v-if="data.approvalStatus==2">
                        <td>未通过原因：</td>
                        <td>{{data.approvalMsg||"未填写"}}</td>
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
                            <input class="focus" readonly :value="data.userAddressVO.receiver||'未填写'">
                        </td>
                    </tr>
                    <tr>
                        <td>手机：</td>
                        <td>
                            <input class="focus" readonly :value="data.userAddressVO.cellPhone||data.userAddressVO.cellPhone||'未填写'">
                        </td>
                    </tr>
                    <tr>
                        <td>地址：</td>
                        <td>
                            {{data.userAddressVO.provinceName+data.userAddressVO.cityName+data.userAddressVO.areaName+data.userAddressVO.address}}
                        </td>
                    </tr>
                    <tr>
                        <td>邮编：</td>
                        <td>
                            <input class="focus" readonly :value="data.userAddressVO.zipcode||'未填写'">
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button class="black edit" @click="showAddress=true">修改地址</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page-body table" v-if="data">
            <div class="title">作品信息</div>
            <table class="common items-info">
                <thead>
                    <tr>
                        <th>所开发票订单</th>
                        <th>订单类型</th>
                        <th>商品实付款/可开票金额</th>
                        <th>总额</th>
                        <th>申请时间</th>
                        <th>抬头/开具类型/发票类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i,index) in data.goodsInfo">
                        <td>
                            <div class="goods">
                                <img :src="i.goodsImageUrl " class="table-thumb" v-broken-link>
                                <div>
                                    <div>{{i.orderNo}}</div>
                                    <div>{{i.goodsName}}</div>
                                </div>
                            </div>
                        </td>
                        <td>{{i.orderType==1?"自定义订单":"成品订单"}}</td>
                        <td>
                            <div>{{i.payPrice}}</div>
                            <div>{{i.payPrice}}</div>
                        </td>
                        <td :rowspan="data.goodsInfo.length" v-if="index==0">
                            <strong>￥{{data.totalFee}}</strong>

                        </td>
                        <td :rowspan="data.goodsInfo.length" v-if="index==0">
                            {{data.createTime | dateStr}}
                        </td>
                        <td :rowspan="data.goodsInfo.length" v-if="index==0">
                            <div>{{data.userInvoiceVO.invoiceHeader}}</div>
                            <div>{{data.userInvoiceVO.issueType==1?"企业":"个人"}}</div>
                            <div>{{data.userInvoiceVO.invoiceType==1?"增值税发票":"普通"}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="actions" v-if="data&&data.approvalStatus==0">
            <action :text="'审核通过'" @click.native="approval(1)"></action>
            <action :text="'审核不通过'" @click.native="approval(2)"></action>
        </div>
        <div class="page-body" v-if="data&&data.approvalStatus==0">
            <table class="edit">
                <tbody>
                    <tr>
                        <td class="v-top lh32">不通过原因：</td>
                        <td>
                            <textarea id="reason" rows="4" placeholder="请简要描述不通过原因" class="focus" v-model="data.approvalMsg"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <transition name="fade">
            <keep-alive>
                <address-selector v-if="showAddress" :name="data.userAddressVO.receiver" :phone="data.userAddressVO.cellPhone||data.userAddressVO.telePhone"
                    :province="{label:data.userAddressVO.provinceName,value:data.userAddressVO.provinceId}" :city="{label:data.userAddressVO.cityName,value:data.userAddressVO.cityId}"
                    :area="{label:data.userAddressVO.areaName,value:data.userAddressVO.areaId}" :address="data.userAddressVO.address"
                    :zipcode="data.userAddressVO.zipcode" @confirm="setReceiver($event);showAddress=false" @close="showAddress=false"></address-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    .goods {
        display: flex;
        align-items: center;
        text-align: left;
    }

    .goods img {
        margin-right: 5px;
    }

    main .message {
        width: 400px;
    }

    main .express {
        width: 400px;
        resize: none;
    }

    .page-body {
        padding: 15px 0;
    }

    .page-body:not(:last-of-type) {
        border-bottom: 1px solid #d2d2d2;
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

    .page-body.table {
        border-bottom: none;
    }

    main table.common {
        margin-left: 20px;
        width: calc(100% - 20px);
    }

    .page-body:not(:nth-last-of-type(2)) main table.common tbody tr:last-of-type td {
        border-bottom: none;
    }

    .user-info span {
        margin-right: 20px;
    }

    table.items-info th,
    table.items-info td {
        font-size: 12px;
    }

    table.items-info strong {
        color: #c7000a;
        font-weight: normal;
    }

    table.items-info th,
    table.items-info tr:last-of-type td,
    table.items-info td[rowspan] {
        border-bottom: 1px solid #d2d2d2;
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

    .address {}
</style>
<script>
    ({
        data: function () {
            return {
                data: null,
                id: this.$route.params.id,
                showAddress: false
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/invoice/" + that.id,
                    success: function (res) {
                        if (res.code === 0) {
                            that.data = res.data;
                        }
                    }
                });
            },
            approval: function (status) {
                var that = this;
                this.$root.confirms.push({
                    fn: function () {
                        ajax({
                            url: "/admin/invoice/approval",
                            data: {
                                approvalStatus: status,
                                id: that.data.id,
                                approvalMsg: that.data.approvalMsg
                            },
                            type: "post",
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getData();
                                }
                            }
                        });
                    },
                    text: status == 1 ? "确定通过改发票审核？" : "确定不通过改发票审核？"
                });
            },
            setReceiver: function (v) {
                var that = this;
                ajax({
                    url: "/admin/invoice/changeAddress",
                    type: "post",
                    data: {
                        address: v.address,
                        areaId: v.area.value,
                        cellphone: v.phone,
                        cityId: v.city.value,
                        countyId: 1,
                        id: that.data.userAddressVO.id,
                        provinceId: v.province.value,
                        receiver: v.name,
                        zipcode: v.zipcode
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.getData();
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