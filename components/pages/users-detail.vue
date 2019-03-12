<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/users/user.png">用户列表>用户详情
            </div>
        </div>
        <div class="page-body" v-if="data">
            <table class="edit">
                <tbody>
                    <tr>
                        <td>用户：</td>
                        <td>{{originalData.username}}</td>
                    </tr>
                    <tr>
                        <td>用户ID：</td>
                        <td>{{originalData.id}}</td>
                    </tr>
                    <tr>
                        <td>用户分组：</td>
                        <td>
                            <drop-down :width="'400px'" @select="selectGI" :data="groupList"></drop-down>
                        </td>
                    </tr>
                    <tr>
                        <td>绑定手机：</td>
                        <td>{{originalData.phone||"未绑定"}}</td>
                    </tr>
                    <tr>
                        <td>绑定邮箱：</td>
                        <td>{{originalData.email||"未绑定"}}</td>
                    </tr>
                    <tr>
                        <td>成交订单数：</td>
                        <td>{{originalData.orderCount}}</td>
                    </tr>
                    <tr>
                        <td>成交金额：</td>
                        <td>￥{{originalData.orderPriceCount||"0.00"}}</td>
                    </tr>
                    <tr>
                        <td>注册时间：</td>
                        <td>{{$root.getDateStr(originalData.createTime)}}</td>
                    </tr>
                    <tr>
                        <td>黑名单：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="open" value="1" v-model="data.status">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="open" value="0" v-model="data.status">
                                <div></div>
                                <span>否</span>
                            </label>
                            <span class="tip">
                                <strong class="required">*</strong>设置黑名单后，此会员无法访问商城
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>备注：</td>
                        <td>
                            <input class="focus" placeholder="请输入备注" v-model="data.userNote">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/users/proxy.png">设置代理商
            </div>
        </div>
        <div class="page-body">
            <table class="edit">
                <tbody>
                    <tr>
                        <td>区域代理：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="area" v-model="proxy" :value="true">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="area" v-model="proxy" :value="false">
                                <div></div>
                                <span>否</span>
                            </label>
                        </td>
                    </tr>
                    <tr v-if="proxy">
                        <td>代理区域：</td>
                        <td>
                            <drop-down :width="'400px'" :data="[{name:'广东省',value:'1'},{name:'山西省',value:'2'},{name:'湖北省',value:'3'},{name:'福建省',value:'4'}]"></drop-down>
                        </td>
                    </tr>
                    <tr v-if="proxy">
                        <td>代理区域：</td>
                        <td>
                            <input class="focus mr5" placeholder="每笔订单代理分红的比例">%
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action @click.native="submit" class="black" :text="'提交'" v-permission="'admin_edit'"></action>
                            <button class="black-simple" @click="$router.push('/users')">返回列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style>
    main input {
        width: 400px;
    }

    main table.edit td:first-child {
        width: 150px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                data: {
                    id: undefined,
                    groupId: undefined,
                    status: 0,
                    userNote:""
                },
                originalData: {},
                groupList: [],
                proxy: false
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/user/findUserById/" + that.$route.params.id,
                    type: "post",
                    success: function (res) {
                        res.data.createTime = that.$root.getDate(res.data.createTime);
                        that.originalData = res.data;
                        that.data.id = res.data.id;
                        that.data.groupId = res.data.userGroupInfoVOS ? res.data.userGroupInfoVOS[0]
                            .id : undefined;
                        that.data.status = res.data.status;
                        that.data.userNote=res.data.userNote;
                        that.getGroupList();
                    }
                });
            },
            getGroupList: function () {
                var that = this;
                ajax({
                    url: "/admin/group",
                    data: {
                        pageSize: 100
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            $.each(res.data, function (index, item) {
                                that.groupList.push({
                                    name: item.groupName,
                                    value: item.id,
                                    selected: item.id == that.data.groupId ? true :
                                        false
                                })
                            });
                        }
                    }
                });
            },
            selectGI: function (value) {
                this.data.groupId = value;
            },
            submit: function () {
                var that = this;
                ajax({
                    url: "/admin/user/userEdit",
                    type: "put",
                    data: that.data,
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/users");
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