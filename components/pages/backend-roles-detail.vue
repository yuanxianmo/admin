<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/order.png">角色管理>{{id?"编辑":"新增"}}角色
            </div>
        </div>
        <div class="page-body">
            <table class="edit">
                <tbody>
                    <tr>
                        <td><strong class="required">*</strong>角色名称：</td>
                        <td>
                            <input class="focus w486" placeholder="请输入角色的名称" v-model="role.roleName" required>
                        </td>
                    </tr>
                    <tr>
                        <td>角色描述：</td>
                        <td>
                            <input class="focus w486" placeholder="简述该角色的主要工作内容" v-model="role.roleDesc">
                        </td>
                    </tr>
                    <tr>
                        <td>是否启用：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="open" :value="0" v-model="role.status">
                                <div></div>
                                <span>启用</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="open" :value="1" v-model="role.status">
                                <div></div>
                                <span>禁用</span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page-head mb20" v-if="$route.params.id">
            <div class="left">
                <img src="images/home/order.png">操作权限
            </div>
        </div>
        <div class="page-body">
            <dl class="per-block per1" v-for="i in permissions">
                <dt class="per1-head">
                    <label class="checkbox">
                        <input type="checkbox" v-model="i.selected">
                        <div></div>
                        <span>{{i.label}}</span>
                    </label>
                </dt>
                <dd class="per1-body">
                    <dl class="per2" v-for="j in i.children">
                        <dt class="per2-head">
                            <label class="checkbox">
                                <input type="checkbox" v-model="j.selected">
                                <div></div>
                                <span>{{j.label}}</span>
                            </label>
                        </dt>
                        <dd class="per2-body">
                            <label class="checkbox" v-for="k in j.children">
                                <input type="checkbox" v-model="k.selected">
                                <div></div>
                                <span>{{k.label}}</span>
                            </label>
                        </dd>
                    </dl>
                </dd>
            </dl>
        </div>
        <div class="actions">
            <action :text="'提交'" @click.native="save" v-permission="id?'role_edit':'role_add'"></action>
            <button class="black-simple" @click="$router.push('/backend')">返回列表</button>
        </div>
    </main>
</template>
<style>
    .w486 {
        width: 486px;
    }

    .per1-head {
        background-color: #f6f6f5;
        padding: 8px;
    }

    .per1-body {
        padding: 8px;
    }

    .per2 {
        display: flex;
    }

    .per2:last-child .per2-body {
        margin-bottom: -8px;
    }

    .per2:last-child .per2-head .checkbox {
        margin-bottom: 0;
    }

    .per2-head {
        width: 140px;
        border-right: 1px solid #eee;
        padding-right: 5px;
    }

    .per2-body {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding-left: 20px;
    }

    .per1-body label.checkbox {
        margin-bottom: 8px;
        margin-right: 0;
        padding-right: 10px;
    }

    .per2-body label.checkbox {
        width: calc(100% / 6);
    }

    .per-block {
        margin-bottom: 5px;
        border: 1px solid #eee;
    }
</style>
<script>
    ({
        data: function () {
            return {
                id: this.$route.params.id,
                role: {
                    roleCode: "roleCode" + (Math.random() * 1000000).toFixed(0),
                    roleName: "",
                    roleDesc: "",
                    status: 0
                },
                permissions: [],
                ownPermissions: []
            }
        },
        computed: {
            computedOwnPermissions: function () {
                var ownPermissions = [];
                $.each(this.permissions, function (index, item) {
                    if (item.selected) {
                        ownPermissions.push(item.id);
                    }
                    $.each(item.children, function (index2, item2) {
                        if (item2.selected) {
                            ownPermissions.push(item2.id);
                        }
                        $.each(item2.children, function (index3, item3) {
                            if (item3.selected) {
                                ownPermissions.push(item3.id);
                            }
                        })
                    });
                });
                return ownPermissions;
            }
        },
        methods: {
            getRole: function (fn) {
                var that = this;
                ajax({
                    url: "/admin/role/" + that.$route.params.id,
                    success: function (res) {
                        if (res.code === 0) {
                            that.role = res.data;
                            fn(that.getPermissions);
                        }
                    }
                });
            },
            //获取权限列表
            getPermissions: function () {
                var that = this;
                ajax({
                    url: "/admin/permission/select",
                    success: function (res) {
                        if (res.code === 0) {
                            that.permissions = res.data;
                            $.each(that.permissions, function (index, item) {
                                if (that.ownPermissions.indexOf(item.id) != -1) {
                                    that.$set(item, "selected", true);
                                } else {
                                    that.$set(item, "selected", false);
                                }
                                that.$watch("permissions." + index + ".selected", function (v) {
                                    $.each(item.children, function (index2, item2) {
                                        that.$set(item2, "selected", v);
                                    });
                                });
                                $.each(item.children, function (index2, item2) {
                                    if (that.ownPermissions.indexOf(item2.id) != -1) {
                                        that.$set(item2, "selected", true);
                                    } else {
                                        that.$set(item2, "selected", false);
                                    }
                                    that.$watch("permissions." + index + ".children." + index2 + ".selected", function (v) {
                                        var selectedCount = 0;
                                        $.each(item.children, function (index4, item4) {
                                            if (item4.selected) {
                                                selectedCount++;
                                            }
                                        });
                                        if (selectedCount == 0) {
                                            item.selected = false;
                                        } else if (selectedCount == item.children.length) {
                                            item.selected = true;
                                        }
                                        $.each(item2.children, function (index3, item3) {
                                            that.$set(item3, "selected", v);
                                        });
                                    });
                                    $.each(item2.children, function (index3, item3) {
                                        if (that.ownPermissions.indexOf(item3.id) != -1) {
                                            that.$set(item3, "selected", true);
                                        } else {
                                            that.$set(item3, "selected", false);
                                        }
                                        that.$watch("permissions." + index + ".children." + index2 + ".children." + index3 + ".selected",
                                            function (v) {
                                                var selectedCount = 0;
                                                $.each(item2.children, function (index4, item4) {
                                                    if (item4.selected) {
                                                        selectedCount++;
                                                    }
                                                });
                                                if (selectedCount == 0) {
                                                    item2.selected = false;
                                                } else if (selectedCount == item2.children.length) {
                                                    item2.selected = true;
                                                }
                                            });
                                    })
                                });
                            });
                        }
                    }
                });
            },
            //获取当前角色的权限
            getOwnPermissions: function (fn) {
                var that = this;
                ajax({
                    url: "/admin/permission/findMenuIdByRole",
                    data: {
                        roleCode: that.role.roleCode
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.ownPermissions = res.data;
                            fn();
                        }
                    }
                })
            },
            save: function () {
                var that = this;
                if (this.$route.params.id) {
                    this.edit();
                } else {
                    this.add();
                }
            },
            edit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/role",
                    type: "put",
                    data: {
                        roleCode: that.role.roleCode,
                        roleName: that.role.roleName,
                        roleDesc: that.role.roleDesc,
                        status: Number(that.role.status),
                        roleId: that.role.roleId,
                        permissionId: that.computedOwnPermissions
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/backend");
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/role",
                    type: "post",
                    data: {
                        roleCode: that.role.roleCode,
                        roleName: that.role.roleName,
                        roleDesc: that.role.roleDesc,
                        status: Number(that.role.status),
                        permissionId: that.computedOwnPermissions
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/backend");
                        }
                    }
                });
            },
            assignPermissions: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/role/roleMenuUpdate",
                    type: "put",
                    data: {
                        permissionId: that.computedOwnPermissions,
                        roleId: that.role.roleId
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/backend");
                        }
                    }
                });
            }
        },
        mounted: function () {
            var that = this;
            if (this.$route.params.id) {
                this.getRole(that.getOwnPermissions);
            }
        }
    })
</script>