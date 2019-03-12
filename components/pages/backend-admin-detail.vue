<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/home/slideshow.png">操作员管理>{{id?"编辑":"新增"}}操作员
            </div>
        </div>
        <div class="page-index">
            <table class="edit">
                <tbody>
                    <tr>
                        <td><strong class="required">*</strong>操作员姓名：</td>
                        <td>
                            <input class="focus w400" v-model="data.username" placeholder="请输入操作员的姓名" required>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong class="required">*</strong>登录账号：</td>
                        <td>
                            <input class="focus w400" v-model="data.email" placeholder="请输入操作员账号" required>
                        </td>
                    </tr>
                    <tr v-if="id">
                        <td>
                            <strong class="required" v-if="!id">*</strong>密码：</td>
                        <td>
                            <input class="focus w400" autocomplete="new-password" type="password" v-model="data.userpassword" placeholder="请输入登录密码">
                        </td>
                    </tr>
                    <tr v-if="id">
                        <td>
                            <strong class="required" v-if="!id">*</strong>再次输入密码：</td>
                        <td>
                            <input class="focus w400" autocomplete="new-password" type="password" v-model="data.passwordAgain" placeholder="请再次输入密码">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong class="required">*</strong>操作员角色：</td>
                        <td>
                            <drop-down :min-width="'100px'" :data="roleList" @select="selectRole" :invalid="roleId===undefined"></drop-down>
                        </td>
                    </tr>
                    <tr>
                        <td>是否启用：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" :value="0" name="open" v-model="data.status">
                                <div></div>
                                <span>启用</span>
                            </label>
                            <label class="radio">
                                <input type="radio" :value="1" name="open" v-model="data.status">
                                <div></div>
                                <span>禁用</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action :text="'提交'" @click.native="save" v-permission="id?'admin_edit':'admin_add'"></action>
                            <button class="black-simple" @click="$router.push('/backend/admin')">返回</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style>
    .w400 {
        width: 400px;
    }

    .lh32 {
        line-height: 32px !important;
    }
</style>
<script>
    ({
        data: function () {
            return {
                id: this.$route.params.id,
                selectImage: false,
                data: {
                    email: "",
                    id: undefined,
                    phone: "",
                    status: 0,
                    userGroupInfoVOS: null,
                    username: "",
                    userpassword: "",
                    passwordAgain: "",
                    roleVOList: [{}]
                },
                roleList: [],
                roleId: undefined
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/user/findUserById/" + that.$route.params.id,
                    type: "post",
                    success: function (res) {
                        if (res.code === 0) {
                            res.data.userpassword = undefined;
                            that.data = res.data;
                            that.roleId = res.data.roleVOList.length ? res.data.roleVOList[0].roleId :
                                undefined;
                            that.getRoleList();
                        }
                    }
                });
            },
            getRoleList: function () {
                var that = this;
                ajax({
                    url: "/admin/role/drop",
                    data: {
                        pageSize: 100
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            $.each(res.data, function (index, item) {
                                that.roleList.push({
                                    name: item.label,
                                    value: item.value,
                                    selected: (that.data.roleVOList.length && that.data
                                        .roleVOList[0].roleId ==
                                        item.value) ? true : false
                                });
                            })
                        }
                    }
                });
            },
            save: function () {
                if (this.data.userpassword != this.data.passwordAgain) {
                    this.$root.alerts.push({
                        text: "两次输入的密码不一致!"
                    });
                    return;
                }
                if (!this.data.email) {
                    this.$root.alerts.push({
                        text: "请输入登录账号!"
                    });
                    return;
                }
                if (!this.roleId) {
                    this.$root.alerts.push({
                        text: "请选择操作员角色!"
                    });
                    return;
                }
                if (this.id) {
                    this.edit();
                } else {
                    this.add();
                }
            },
            edit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/user/updateAdmin",
                    type: "put",
                    data: {
                        email: that.data.email,
                        id: that.id,
                        roleId: that.roleId,
                        status: that.data.status,
                        username: that.data.username,
                        userpassword: that.data.userpassword
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/backend/admin");
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/user",
                    type: "post",
                    data: $.extend({
                        roleId: that.roleId,
                        userpassword: "password"
                    }, that.data),
                    success: function (res) {
                        if (res.code === 0) {
                            that.$root.alerts.push({
                                text: "新建管理员成功！初始密码：sk123456，请及时修改！",
                                fn: function () {
                                    that.$router.push("/backend/admin");
                                }
                            });
                        }
                    }
                });
            },
            selectRole: function (value) {
                this.roleId = value;
            }
        },
        mounted: function () {
            if (this.id) {
                this.getData();
            } else {
                this.getRoleList();
            }
        }
    })
</script>